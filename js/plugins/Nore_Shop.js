var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
/*:ja
 * @target MZ
 * @author ル
 *
 * @command Shop
 * @text ショップ画面へ
 * @des ショップ画面へ
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Shop";
  PluginManager.registerCommand(pluginName, "Shop", function (args) {
    SceneManager.push(Scene_Shop2);
  });
  var Scene_Shop2 = /** @class */ (function (_super) {
    __extends(Scene_Shop2, _super);
    function Scene_Shop2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Shop2.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.refreshBg();
      this.createWeaponWindow();
      this.createInventoryWindow();
      this.createConfirmWindow();
      this.createMsgWindow();
      this.createAllWindows();
      this.addChild(this._messageWindow);
      this.initScenario();
    };
    Scene_Shop2.prototype.refreshBg = function () {
      var baseTexture2 = Nore.getSystemBaseTexture("shop_bg");
      var texture = new PIXI.Texture(baseTexture2);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -0;
      sprite.y = -0;
      this.addChild(sprite);
    };
    Scene_Shop2.prototype.createButtons = function () {};
    Scene_Shop2.prototype.createBackground = function () {
      /* this._backgroundFilter = new PIXI.filters.BlurFilter();
             this._backgroundSprite = SceneManager.backgroundBitmap();
             this._backgroundSprite.filters = [this._backgroundFilter];
             this.addChild(this._backgroundSprite);
             this._backgroundSprite.opacity = 192;*/
    };
    Scene_Shop2.prototype.destroy = function () {
      //this.removeChild(this._backgroundSprite);
      //this._backgroundSprite = null;
      _super.prototype.destroy.call(this);
    };
    Scene_Shop2.prototype.updateActor = function () {
      this._actor = $gameParty.menuActor();
    };
    Scene_Shop2.prototype.initScenario = function () {
      if ($gameSwitches.value(222)) {
        return;
      }
      this._weaponWindow.deactivate();
      $gameSwitches.setValue(222, true);
      this.playScenario("武器屋_説明_01");
    };
    Scene_Shop2.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
    };
    Scene_Shop2.prototype.createMsgWindow = function () {
      this._msgWindow = new Nore.Window_Msg(136);
      this._msgWindow.setHandler("ok", this.onConfirmCancel.bind(this));
      this._msgWindow.deactivate();
      this.addChild(this._msgWindow);
      this._msgWindow.hide();
    };
    Scene_Shop2.prototype.onConfirmOk = function () {
      this._weaponWindow.buy();
      $gameSwitches.setValue(210, true);
      SoundManager.playShop();
      this.onConfirmCancel();
      //this._weaponWindow.makeItems();
      //this._weaponWindow.refresh();
      this._inventoryWindow.refresh();
    };
    Scene_Shop2.prototype.onConfirmCancel = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this._msgWindow.hide();
      this._msgWindow.deactivate();
      this._weaponWindow.activate();
    };
    Scene_Shop2.prototype.finishScenario = function () {
      this._weaponWindow.activate();
    };
    Scene_Shop2.prototype.createWeaponWindow = function () {
      this._weaponWindow = new Window_Weapon();
      this._weaponWindow.setHandler("ok", this.onOk.bind(this));
      this._weaponWindow.setHandler("cancel", this.onCancel.bind(this));
      this.addChild(this._weaponWindow);
    };
    Scene_Shop2.prototype.onCancel = function () {
      if (!$gameSwitches.value(210)) {
        this.playScenario("武器屋_説明_02");
        return;
      }
      this.popScene();
    };
    Scene_Shop2.prototype.createInventoryWindow = function () {
      this._inventoryWindow = new Window_Inventory();
      this.addChild(this._inventoryWindow);
    };
    Scene_Shop2.prototype.onOk = function () {
      var text;
      if (!this._weaponWindow.isCurrentItemEnabled2()) {
        text = TextManager.notEnoughMoney;
        this._msgWindow.setText(text);
        this._msgWindow.show();
        this._msgWindow.activate();
        return;
      }
      this.onConfirmOk();
      /*

            const gold = this._weaponWindow.calcGold();
            const equip = this._weaponWindow.currentItem();
            text = TextManager.shopConfirm.format(gold);
           
            this._confirmWindow.setText(text);
            this._confirmWindow.show();
            this._confirmWindow.activate();
            */
    };
    Scene_Shop2.prototype.equip = function (weapon) {
      SoundManager.playEquip();
      $gameActors.actor(4).changeEquip(0, weapon);
      this._weaponWindow.refreshAll();
      this._weaponWindow.activate();
    };
    return Scene_Shop2;
  })(Nore.Scene_Talk);
  Nore.Scene_Shop2 = Scene_Shop2;
  var Window_Weapon = /** @class */ (function (_super) {
    __extends(Window_Weapon, _super);
    function Window_Weapon() {
      var _this =
        _super.call(
          this,
          new Rectangle(0, 0, Graphics.boxWidth - 380, Graphics.boxHeight)
        ) || this;
      _this.makeItems();
      _this.refresh();
      _this.select(0);
      _this.activate();
      _this.frameVisible = false;
      _this.backOpacity = 0;
      return _this;
    }
    Window_Weapon.prototype.processHandling = function () {
      if ($gameTemp.confirmWindowActive) {
        return;
      }
      _super.prototype.processHandling.call(this);
    };
    Window_Weapon.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
      this._windowContentsSprite.destroyAndRemoveChildren();
      for (var i = 0; i < this.maxItems(); i++) {
        var equip = this.getItemAt(i);
        if (equip.isWeapon()) {
          this.addNewWeapon(i, equip);
        } else {
          this.addNewArmor(i, equip);
        }
      }
    };
    Window_Weapon.prototype.itemRect = function (index) {
      var rect = _super.prototype.itemRect.call(this, index);
      if (index >= 2) {
        rect.y += 5;
      }
      return rect;
    };
    Window_Weapon.prototype.getItemAt = function (index) {
      return this._weaponList[index];
    };
    Window_Weapon.prototype.drawItemBackground = function (index) {};
    Window_Weapon.prototype.addNewWeapon = function (index, weapon) {
      var bg = new Sprite_ShopBg();
      this._windowContentsSprite.addChild(bg);
      var sprite = new Sprite_Weapon(weapon, bg);
      this._windowContentsSprite.addChild(sprite);
      this._weaponSpriteList.push(sprite);
      var rect = this.itemRect(index);
      sprite.x = bg.x = rect.x;
      sprite.y = bg.y = rect.y;
      bg.initPosition();
    };
    Window_Weapon.prototype.addNewArmor = function (index, armor) {
      var bg = new Sprite_ShopBg();
      this._windowContentsSprite.addChild(bg);
      var sprite = new Sprite_Armor(armor, bg);
      this._windowContentsSprite.addChild(sprite);
      this._weaponSpriteList.push(sprite);
      var rect = this.itemRect(index);
      sprite.x = bg.x = rect.x;
      sprite.y = bg.y = rect.y;
      bg.initPosition();
      if (index == 2 && !$gameActors.mainActor().armor2()) {
        bg.setEmpty();
      }
      if (index == 3 && !$gameActors.mainActor().armor3()) {
        bg.setEmpty();
      }
    };
    Window_Weapon.prototype.itemHeight = function () {
      return 380;
    };
    Window_Weapon.prototype.maxCols = function () {
      return 2;
    };
    Window_Weapon.prototype.isCurrentItemEnabled = function () {
      var item = this.currentItem();
      if (item.rank() == 0 || item.lv() == item.maxLv()) {
        return false;
      }
      return true;
    };
    Window_Weapon.prototype.makeItems = function () {
      this._weaponList = [];
      this._weaponSpriteList = [];
      this._weaponList.push(new Weapon(1, 0));
      this._weaponList.push(new Armor(1, 0));
      this._weaponList.push(new Armor(11, 0));
      this._weaponList.push(new Armor(21, 0));
    };
    Window_Weapon.prototype.maxItems = function () {
      if (!this._weaponList) {
        return 0;
      }
      return this._weaponList.length;
    };
    Window_Weapon.prototype.currentItem = function () {
      return this._weaponSpriteList[this.index()].current();
    };
    Window_Weapon.prototype.isCurrentItemEnabled2 = function () {
      var gold = this.calcGold();
      if (gold > $gameParty.gold()) {
        return false;
      }
      var weapon = this.currentItem();
      return true;
    };
    Window_Weapon.prototype.isUpgrade = function () {
      return true;
    };
    Window_Weapon.prototype.buy = function () {
      this._weaponSpriteList[this.index()].buy();
      this.refreshAll();
    };
    Window_Weapon.prototype.refreshAll = function () {
      for (var _i = 0, _a = this._weaponSpriteList; _i < _a.length; _i++) {
        var s = _a[_i];
        s.refresh();
      }
    };
    Window_Weapon.prototype.upgrade = function () {
      var weapon = this.currentItem();
      var next = Nore.$weaoponManager.getNextWeapon(weapon);
      $gameParty.gainItem(next.weapon(), 1);
      $gameParty.loseGold(next.price());
      return next;
    };
    Window_Weapon.prototype.calcGold = function () {
      return this._weaponSpriteList[this.index()].price();
    };
    Window_Weapon.prototype.select = function (index) {
      _super.prototype.select.call(this, index);
      if (!this._weaponSpriteList) {
        return;
      }
      for (var i = 0; i < this._weaponSpriteList.length; i++) {
        this._weaponSpriteList[i].select(i == index);
      }
    };
    Window_Weapon.prototype._updateCursor = function () {
      this._cursorSprite.visible = false;
    };
    Window_Weapon.prototype.cursorDown = function (wrap) {
      if (!this.canMoveVertical()) {
        return;
      }
      _super.prototype.cursorDown.call(this, wrap);
    };
    Window_Weapon.prototype.cursorUp = function (wrap) {
      if (!this.canMoveVertical()) {
        return;
      }
      _super.prototype.cursorUp.call(this, wrap);
    };
    Window_Weapon.prototype.cursorRight = function (wrap) {
      if (this.index() == 0) {
        _super.prototype.cursorRight.call(this, wrap);
        return;
      }
      if (this.index() == 1 && $gameActors.mainActor().armor2()) {
        _super.prototype.cursorRight.call(this, wrap);
        return;
      }
      if (this.index() == 1 && $gameActors.mainActor().armor3()) {
        this.select(3);
        return;
      }
      if (this.index() == 2 && $gameActors.mainActor().armor3()) {
        this.select(3);
        return;
      }
    };
    Window_Weapon.prototype.cursorLeft = function (wrap) {
      if (this.index() == 1) {
        _super.prototype.cursorLeft.call(this, wrap);
        return;
      }
      if (this.index() == 0 && $gameActors.mainActor().armor3()) {
        _super.prototype.cursorLeft.call(this, wrap);
        return;
      }
      if (this.index() == 0 && $gameActors.mainActor().armor2()) {
        this.select(2);
        return;
      }
      if (this.index() == 3 && $gameActors.mainActor().armor2()) {
        this.select(2);
        return;
      }
      this.select(1);
    };
    Window_Weapon.prototype.canMoveVertical = function () {
      if (this.index() == 0 && !$gameActors.mainActor().armor2()) {
        return false;
      }
      if (this.index() == 1 && !$gameActors.mainActor().armor3()) {
        return false;
      }
      return true;
    };
    return Window_Weapon;
  })(Window_Selectable);
  var Sprite_ShopBg = /** @class */ (function (_super) {
    __extends(Sprite_ShopBg, _super);
    function Sprite_ShopBg() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_ShopBg.prototype.initialize = function () {
      _super.prototype.initialize.call(this);
      this.redraw();
    };
    Sprite_ShopBg.prototype.initPosition = function () {
      this.x += 14;
      this.y += 16;
    };
    Sprite_ShopBg.prototype.redraw = function () {
      this.bitmap = ImageManager.loadSystem("shop_item");
      this.setFrame(0, 0, 427, 375);
    };
    Sprite_ShopBg.prototype.update = function () {
      _super.prototype.update.call(this);
    };
    Sprite_ShopBg.prototype.select = function (b) {
      if (this._empty) {
        return;
      }
      if (b) {
        this.setFrame(0, 375, 427, 375);
      } else {
        this.setFrame(0, 0, 427, 375);
      }
    };
    Sprite_ShopBg.prototype.setEmpty = function () {
      this._empty = true;
      this.setFrame(0, 1265, 427, 375);
      var baseTexture = Nore.getSystemBaseTexture("shop_item");
      var texture;
      if (ConfigManager.en) {
        texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(0, 1208, 350, 56)
        );
      } else {
        texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(0, 1168, 350, 56)
        );
      }
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 35;
      sprite.y = 166;
      this.addChild(sprite);
    };
    return Sprite_ShopBg;
  })(Sprite);
  var Sprite_Equip = /** @class */ (function (_super) {
    __extends(Sprite_Equip, _super);
    function Sprite_Equip() {
      var _this = _super.call(this) || this;
      _this._baseX = 30;
      _this._yajirushiX = 130;
      _this._valueW1 = 140;
      _this._valueW2 = 190;
      _this._plusW = 240;
      _this._showPowerup = true;
      return _this;
    }
    Sprite_Equip.prototype.init = function () {
      this._equip = this.findCurrentEquip();
    };
    Sprite_Equip.prototype.price = function () {
      return this._next.price();
    };
    Sprite_Equip.prototype.select = function (b) {
      this._bg.select(b);
    };
    Sprite_Equip.prototype.drawIcon = function (iconIndex, x, y) {
      var bitmap = ImageManager.loadSystem("IconSet");
      var pw = ImageManager.iconWidth;
      var ph = ImageManager.iconHeight;
      var sx = (iconIndex % 16) * pw;
      var sy = Math.floor(iconIndex / 16) * ph;
      this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
    };
    Sprite_Equip.prototype.drawBigIcon = function (iconIndex, x, y) {
      var bitmap = ImageManager.loadSystem("big_icon");
      var pw = ImageManager.iconWidth * 2;
      var ph = ImageManager.iconHeight * 2;
      var sx = (iconIndex % 16) * pw;
      var sy = Math.floor(iconIndex / 16) * ph;
      this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y, pw, ph);
    };
    Sprite_Equip.prototype.drawRank = function () {
      this.resetTextColor();
      this.drawNumber(this._equip.rank(), 90, 16, 200, "left", 12);
    };
    Sprite_Equip.prototype.drawName = function () {
      this.resetTextColor();
      /*if (this.current().rank() > 0) {
                this.drawBigIcon(this.current().iconIndex(), 30, 16);
            }*/
      this.bitmap.fontSize = 28;
      if (this.current().rank() > 0) {
        this.bitmap.drawText(this.current().name(), 56, 145, 330, 40, "center");
        this.drawBigIcon(this.current().bigIcon(), 190, 56);
      } else {
        this.bitmap.drawText(TextManager.notEquip, 56, 145, 330, 40, "center");
      }
      //this.bitmap.drawText(this._next.name(), 200, 110, 130, 40, 'center');
      this.changeSystemTextColor();
      //this.bitmap.drawText('→', 115, 110, 120, 40, 'center');
    };
    Sprite_Equip.prototype.drawLevel = function () {
      var level = this.current().lv();
      var max = this.current().maxLv();
      var interval = 24;
      var xx = 139;
      var yy = 186;
      for (var i = 0; i < max; i++) {
        var icon = 407;
        if (i >= level) {
          icon = 408;
        }
        this.drawIcon(icon, xx, yy);
        xx += interval;
      }
    };
    Sprite_Equip.prototype.drawHp = function (x, y) {
      //this.fillBack(x, y);
      //this._hp = new Sprite_GaugeHp(this.current());
      //this._hp.move(x + 50, y + 14);
      //this.addChild(this._hp);
      //let xx = x + this._hp.gaugeWidth() + 60;
      var xx = x + this._baseX;
      this.resetTextColor();
      this.bitmap.drawText("HP", xx, y, 120, 40, "center");
      this.bitmap.drawText(
        this.current().hp() + "",
        xx,
        y,
        this._valueW1,
        40,
        "right"
      );
      if (this._showPowerup && this._next) {
        this.resetTextColor();
        this.bitmap.drawText(
          this._next.hp() + "",
          xx + 15,
          y,
          this._valueW2,
          40,
          "right"
        );
        var diff = this._next.hp() - this.current().hp();
        if (diff > 0) {
          this.changePlusTextColor();
          this.bitmap.drawText(
            "(+" + diff + ")",
            xx + 25,
            y,
            this._plusW,
            40,
            "right"
          );
        }
      }
    };
    Sprite_Equip.prototype.drawAttack = function (x, y) {
      var xx = x + this._baseX;
      this.resetTextColor();
      this.bitmap.drawText(TextManager.atk, xx, y, 120, 40, "center");
      this.bitmap.drawText(
        this.current().atk() + "",
        xx,
        y,
        this._valueW1,
        40,
        "right"
      );
      if (this._showPowerup && this._next) {
        this.resetTextColor();
        this.bitmap.drawText(
          "" + this._next.atk(),
          xx + 15,
          y,
          this._valueW2,
          40,
          "right"
        );
        var diff = this._next.atk() - this.current().atk();
        if (diff > 0) {
          this.changePlusTextColor();
          this.bitmap.drawText(
            "(+" + diff + ")",
            xx + 25,
            y,
            this._plusW,
            40,
            "right"
          );
        }
      }
    };
    Sprite_Equip.prototype.resetTextColor = function () {
      this.bitmap.textColor = ColorManager.normalColor();
      //this.bitmap.outlineColor = ColorManager.normalColor();
    };
    Sprite_Equip.prototype.changeSystemTextColor = function () {
      this.bitmap.textColor = ColorManager.systemColor();
      //this.bitmap.outlineColor = ColorManager.systemColor();
    };
    Sprite_Equip.prototype.changePlusTextColor = function () {
      this.bitmap.textColor = ColorManager.powerUpColor();
      //this.bitmap.outlineColor = ColorManager.powerUpColor();
    };
    Sprite_Equip.prototype.drawDef = function (x, y) {
      var xx = x + this._baseX;
      this.resetTextColor();
      this.bitmap.drawText(TextManager.def, xx, y, 120, 40, "center");
      this.bitmap.drawText(
        this.current().def() + "",
        xx,
        y,
        this._valueW1,
        40,
        "right"
      );
      if (this._showPowerup && this._next) {
        this.resetTextColor();
        this.bitmap.drawText(
          "" + this._next.def(),
          xx + 15,
          y,
          this._valueW2,
          40,
          "right"
        );
        var diff = this._next.def() - this.current().def();
        if (diff > 0) {
          this.changePlusTextColor();
          this.bitmap.drawText(
            "(+" + diff + ")",
            xx + 25,
            y,
            this._plusW,
            40,
            "right"
          );
        }
      }
    };
    Sprite_Equip.prototype.drawHit = function (x, y) {
      this.resetTextColor();
      var xx = x + this._baseX;
      this.bitmap.drawText(TextManager.hit, xx, y, 120, 40, "center");
      this.resetTextColor();
      this.bitmap.drawText(
        this.current().hit() + "",
        xx,
        y,
        this._valueW1,
        40,
        "right"
      );
      if (this._showPowerup && this._next) {
        this.resetTextColor();
        this.bitmap.drawText(
          "" + this._next.hit(),
          xx + 15,
          y,
          this._valueW2,
          40,
          "right"
        );
        var diff = this._next.hit() - this.current().hit();
        if (diff > 0) {
          this.changePlusTextColor();
          this.bitmap.drawText(
            "(+" + diff + ")",
            xx + 25,
            y,
            this._plusW,
            40,
            "right"
          );
        }
      }
    };
    Sprite_Equip.prototype.drawEva = function (x, y) {
      this.resetTextColor();
      var xx = x + this._baseX;
      this.bitmap.drawText(TextManager.eva, xx, y, 120, 40, "center");
      this.resetTextColor();
      this.bitmap.drawText(
        this.current().eva() + "",
        xx,
        y,
        this._valueW1,
        40,
        "right"
      );
      if (this._showPowerup && this._next) {
        this.resetTextColor();
        this.bitmap.drawText(
          "" + this._next.eva(),
          xx + 15,
          y,
          this._valueW2,
          40,
          "right"
        );
        var diff = this._next.eva() - this.current().eva();
        if (diff > 0) {
          this.changePlusTextColor();
          this.bitmap.drawText(
            "(+" + diff + ")",
            xx + 25,
            y,
            this._plusW,
            40,
            "right"
          );
        }
      }
    };
    Sprite_Equip.prototype.drawCri = function (x, y) {
      this.resetTextColor();
      this.fillBack(x, y);
      this.bitmap.drawText("", x, y, 299, 40, "left");
      this._cri = new Nore.Sprite_GaugeCri(this.current());
      this._cri.move(x + 50, y + 14);
      this.addChild(this._cri);
      //let xx = x + this._cri.gaugeWidth() + 60;
      var xx = x + 60;
      this.bitmap.drawText(
        this.current().cri() + "",
        xx,
        y,
        this._valueW1,
        40,
        "right"
      );
      if (this._showPowerup && this._next) {
        this.changePlusTextColor();
        this.bitmap.drawText(
          "→ " + this._next.cri(),
          xx + 25,
          y,
          this._valueW2,
          40,
          "left"
        );
      }
    };
    Sprite_Equip.prototype.fillBack = function (x, y) {
      this.bitmap.fillRect(x + 10, y + 7, 280, 25, "#777777");
    };
    Sprite_Equip.prototype.drawUpgrade = function (yy) {
      if (!this._next) {
        this.drawMaxEnhance();
        return;
      }
      this.drawGoldBg();
      this.changeSystemTextColor();
      var xx = 80;
      var baseTexture = Nore.getSystemBaseTexture("shop_item");
      var texture;
      if (ConfigManager.en) {
        texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(0, 798, 300, 46)
        );
      } else {
        texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(0, 758, 300, 46)
        );
      }
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 81;
      sprite.y = 336;
      this.addChild(sprite);
      this.drawNumber(this._next.price() + "", 192, 326, 160, "right", 11);
    };
    Sprite_Equip.prototype.drawMaxEnhance = function () {
      var baseTexture = Nore.getSystemBaseTexture("shop_item");
      var texture;
      if (ConfigManager.en) {
        texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(0, 1698, 350, 36)
        );
      } else {
        texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(0, 1664, 350, 36)
        );
      }
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 31;
      sprite.y = 336;
      this.addChild(sprite);
    };
    Sprite_Equip.prototype.setPowerupVisible = function (b) {
      if (this._showPowerup == b) {
        return;
      }
      this._showPowerup = b;
      this.refresh();
    };
    Sprite_Equip.prototype.refresh = function () {
      this.destroyAndRemoveChildren();
      this.initCurrent();
      this.bitmap.clear();
      if (this._equip.rank() == 0) {
        return;
      }
      this.drawName();
      this.drawRank();
      this.bitmap.fontSize = 18;
      this.drawLevel();
      var x = 50;
      var interval = 32;
      var yy = 190 + 36;
      this.drawHp(x, yy);
      if (this._equip.isWeapon()) {
        this.drawAttack(x, yy + interval);
        this.drawHit(x, yy + interval * 2);
      } else {
        this.drawDef(x, yy + interval * 1);
        this.drawEva(x, yy + interval * 2);
      }
      //this.drawCri(x, yy + interval * 3);
      var yyy = yy + interval * 4 + 5;
      /*if (this.calcLevel() == 0) {
                this.drawMaterial(yyy);
            } else {*/
      this.drawUpgrade(yyy);
      //}
      //this.drawEquip();
    };
    Sprite_Equip.prototype.drawGoldBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("gold");
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 38;
      sprite.y = 338;
      this.addChild(sprite);
    };
    return Sprite_Equip;
  })(Sprite_Clickable);
  var Sprite_Weapon = /** @class */ (function (_super) {
    __extends(Sprite_Weapon, _super);
    function Sprite_Weapon(weapon, bg) {
      var _this = _super.call(this) || this;
      _this._base = weapon;
      _this._bg = bg;
      _this.init();
      _this._next = Nore.$weaoponManager.getNextWeapon(_this.current());
      _this.bitmap = new Bitmap(700, 700);
      _this._selected = false;
      _this.refresh();
      return _this;
    }
    Sprite_Weapon.prototype.current = function () {
      return this._equip;
    };
    Sprite_Weapon.prototype.findCurrentEquip = function () {
      if (this._base.wtypeId() == 1) {
        return (
          $gameActors.mainActor().weapon1() || new Weapon(this._base.id(), 0)
        );
      } else {
        return (
          $gameActors.mainActor().weapon2() || new Weapon(this._base.id(), 0)
        );
      }
    };
    Sprite_Weapon.prototype.initCurrent = function () {
      this.init();
      this._next = Nore.$weaoponManager.getNextWeapon(this.current());
    };
    Sprite_Weapon.prototype.buy = function () {
      $gameActors.mainActor().weapon1().upLv();
      //$gameActors.mainActor().setWeapon(this._base.wtypeId(), <Weapon> this._next);
      $gameParty.loseGold(this._next.price());
    };
    return Sprite_Weapon;
  })(Sprite_Equip);
  var Sprite_Armor = /** @class */ (function (_super) {
    __extends(Sprite_Armor, _super);
    function Sprite_Armor(Armor, bg) {
      var _this = _super.call(this) || this;
      _this._base = Armor;
      _this._bg = bg;
      _this.init();
      _this._next = Nore.$weaoponManager.getNextArmor(_this.current());
      _this.bitmap = new Bitmap(700, 700);
      _this.refresh();
      return _this;
    }
    Sprite_Armor.prototype.current = function () {
      return this._equip;
    };
    Sprite_Armor.prototype.findCurrentEquip = function () {
      return (
        $gameActors.mainActor().getArmor(this._base.etypeId()) ||
        new Armor(51, 0)
      );
      /*switch (this._base.etypeId()) {
                case 4: // 鎧
                    return $gameActors.mainActor().armor1() || new Armor(this._base.id(), 0);
                case 3: // 指輪
                    return $gameActors.mainActor().armor2() || new Armor(this._base.id(), 0);
                case 7: // 靴
                    return $gameActors.mainActor().armor3() || new Armor(this._base.id(), 0);
                case 5: // 盾
                    return $gameActors.mainActor().armor4() || new Armor(this._base.id(), 0);
            }*/
    };
    Sprite_Armor.prototype.initCurrent = function () {
      this.init();
      this._next = Nore.$weaoponManager.getNextArmor(this.current());
    };
    Sprite_Armor.prototype.buy = function () {
      $gameActors.mainActor().setArmor(this._next);
      $gameParty.loseGold(this._next.price());
    };
    return Sprite_Armor;
  })(Sprite_Equip);
  var Window_Inventory = /** @class */ (function (_super) {
    __extends(Window_Inventory, _super);
    function Window_Inventory() {
      var _this = this;
      var ww = 380;
      _this =
        _super.call(
          this,
          new Rectangle(Graphics.boxWidth - ww, 0, ww, Graphics.boxHeight)
        ) || this;
      _this.refresh();
      _this.frameVisible = false;
      _this.backOpacity = 0;
      _this.refreshBg();
      return _this;
    }
    Window_Inventory.prototype.refreshBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("shop_item");
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(ConfigManager.en ? 0 : 150, 845, 150, 326)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 76;
      sprite.y = 310;
      this.addChild(sprite);
    };
    Window_Inventory.prototype.refresh = function () {
      this.contents.clear();
      this._windowContentsSprite.destroyAndRemoveChildren();
      this.drawDiscount(180);
      this.drawGold(70);
      this.drawLv(0, "LV");
      this.drawStatus(1, "HP", 0);
      this.drawStatus(2, "ATK", 2);
      this.drawStatus(3, "DEF", 3);
      this.drawStatus(4, "DEF", 4);
      this.drawStatus(5, "DEF", 5);
    };
    Window_Inventory.prototype.drawDiscount = function (y) {
      if ($gameParty.discount() == 0) {
        //return;
      }
      var baseTexture = Nore.getSystemBaseTexture("shop_item");
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, ConfigManager.en ? 1776 : 1736, 320, 36)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 40;
      sprite.y = 156;
      this.addChild(sprite);
      this.resetTextColor();
      this.drawNumber($gameParty.discount(), 142, 154, 130, "right", 13);
    };
    Window_Inventory.prototype.drawGold = function (y) {
      this.contents.fontSize = 28;
      this.resetTextColor();
      this.drawNumber($gameParty.gold(), 74, 226, 200, "right", 13);
      //this.changeTextColor(ColorManager.systemColor());
      //this.drawText('Ｇ', 10, y, 230, 'right');
    };
    Window_Inventory.prototype.drawItem = function (index, item) {
      this.contents.fontSize = 24;
      var yy = index * this.lineHeight() + 100;
      this.drawIcon(item.iconIndex, 10, yy);
      this.drawText(item.name, 54, yy, 140, "left");
      var count = $gameParty.numItems(item);
      this.drawText(count + "", 50, yy, 140, "right");
    };
    Window_Inventory.prototype.drawLv = function (index, label, paramIndex) {
      var yy = index * this.lineHeight() + 310;
      this.drawNumber(
        $gameActors.mainActor()._level,
        150,
        yy,
        140,
        "right",
        13
      );
    };
    Window_Inventory.prototype.drawStatus = function (
      index,
      label,
      paramIndex
    ) {
      var yy = index * 55 + 310;
      var param;
      switch (paramIndex) {
        case 0:
          param = $gameActors.mainActor().mhp;
          break;
        case 2:
          param = $gameActors.mainActor().atk;
          break;
        case 3:
          param = $gameActors.mainActor().def;
          break;
        case 4:
          param = Math.round($gameActors.mainActor().hit * 100);
          break;
        case 5:
          param = Math.round($gameActors.mainActor().eva * 100);
          break;
      }
      this.drawNumber(param, 150, yy, 140, "right", 13);
    };
    return Window_Inventory;
  })(Window_Base);
  Game_Party.prototype.isAnyMemberEquipped = function (item) {
    return $gameActors.actor(4).equips().includes(item);
  };
  function initEquip() {
    $gameActors.mainActor().setWeapon(1, new Weapon(1, 0));
    $gameActors.mainActor().setArmor(new Armor(1, 0));
  }
  Nore.initEquip = initEquip;
})(Nore || (Nore = {}));
