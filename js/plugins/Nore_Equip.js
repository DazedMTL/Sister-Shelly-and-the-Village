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
var Nore;
(function (Nore) {
  function gainRank10() {
    var weapon = new Weapon(15, 0, 25, 25);
    $gameActors.actor(4).setWeapon(1, weapon);
  }
  Nore.gainRank10 = gainRank10;
  var Scene_ReoEquip = /** @class */ (function (_super) {
    __extends(Scene_ReoEquip, _super);
    function Scene_ReoEquip() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_ReoEquip.prototype.create = function () {
      _super.prototype.create.call(this);
      this.refreshBg();
      this.createWindowLayer();
      this.createEquipWindows();
      this.createRank10();
    };
    Scene_ReoEquip.prototype.refreshBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("bg");
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 0;
      sprite.y = 0;
      this.addChild(sprite);
    };
    Scene_ReoEquip.prototype.update = function () {
      _super.prototype.update.call(this);
      if (
        Input.isTriggered("cancel") ||
        Input.isTriggered("ok") ||
        TouchInput.isCancelled()
      ) {
        SoundManager.playCancel();
        this.popScene();
      }
    };
    Scene_ReoEquip.prototype.createBackground = function () {
      this._backgroundSprite = SceneManager.backgroundBitmap();
      this.addChild(this._backgroundSprite);
      this._backgroundSprite.alpha = 0.3;
    };
    Scene_ReoEquip.prototype.createEquipWindows = function () {
      var window1 = new Window_Treasure2(40);
      window1.setWeapon($gameActors.mainActor().weapon1(), null);
      this.addWindow(window1);
      var window2 = new Window_Treasure2(340);
      window2.setArmor($gameActors.mainActor().armor1(), null);
      this.addWindow(window2);
      var window3 = new Window_Treasure2(640);
      window3.setArmor($gameActors.mainActor().armor2(), null);
      this.addWindow(window3);
      var window4 = new Window_Treasure2(940);
      window4.setArmor($gameActors.mainActor().armor3(), null);
      this.addWindow(window4);
    };
    Scene_ReoEquip.prototype.createRank10 = function () {
      if (!$gameSystem.isRank10Open()) {
        return;
      }
      var bar = new Rank10Bar();
      this.addChild(bar);
    };
    return Scene_ReoEquip;
  })(Scene_MenuBase);
  Nore.Scene_ReoEquip = Scene_ReoEquip;
  var Rank10Bar = /** @class */ (function (_super) {
    __extends(Rank10Bar, _super);
    function Rank10Bar() {
      var _this = _super.call(this) || this;
      _this.x = 400;
      _this.y = 50;
      _this.refreshBg();
      _this.createGauge();
      return _this;
    }
    Rank10Bar.prototype.refreshBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("ui2");
      var texture = new PIXI.Texture(
        baseTexture,
        new Rectangle(0, 470, 500, 40)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 0;
      sprite.y = 0;
      this.addChild(sprite);
    };
    Rank10Bar.prototype.createGauge = function () {
      var bar = new Nore.Sprite_Rank10();
      bar.x = -2;
      bar.y = 15;
      bar.redraw();
      this.addChild(bar);
    };
    return Rank10Bar;
  })(Sprite);
  Nore.Rank10Bar = Rank10Bar;
  var Window_Treasure2 = /** @class */ (function (_super) {
    __extends(Window_Treasure2, _super);
    function Window_Treasure2(x, y, drawSellPrice) {
      if (y === void 0) {
        y = 220;
      }
      if (drawSellPrice === void 0) {
        drawSellPrice = false;
      }
      var _this = _super.call(this, new Rectangle(x, y, 298, 340)) || this;
      _this.visible = true;
      _this.frameVisible = false;
      _this._drawSellPrice = drawSellPrice;
      _this.backOpacity = 0;
      return _this;
    }
    Window_Treasure2.prototype.setArmor = function (armor, before) {
      this._armor = armor;
      this._beforeArmor = before;
      this.refresh();
      this.refreshArmor();
    };
    Window_Treasure2.prototype.setWeapon = function (weapon, before) {
      this._weapon = weapon;
      this._beforeWeapon = before;
      this.refresh();
      this.refreshWeapon();
    };
    Window_Treasure2.prototype.refresh = function () {
      this.contents.clear();
      this.refreshBg();
      this.resetFontSettings();
      this.drawRank();
      this.drawNew();
      this.drawSellPrice();
    };
    Window_Treasure2.prototype.drawSellPrice = function () {
      if (!this._drawSellPrice) {
        return;
      }
      var equip = this._weapon || this._armor;
      if (!equip) {
        return;
      }
      this.contents.fontSize = 20;
      this.drawText(
        "売却価格　　" + equip.sellPrice() + " G",
        60,
        258,
        200,
        "left"
      );
    };
    Window_Treasure2.prototype.drawRank = function () {
      var equip = this._weapon || this._armor;
      if (!equip) {
        return;
      }
      this.drawNumber(equip.rank(), 98, 18, 200, "left", 12);
    };
    Window_Treasure2.prototype.drawNew = function () {
      if (!this._beforeWeapon && !this._beforeArmor) {
        return;
      }
      //this.contents.fontSize = 22;
      //this.drawText('NEW', 125, 14, 200, 'left');
      var baseTexture = Nore.getSystemBaseTexture("menu2");
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 1350, 150, 46)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 90;
      sprite.y = -14;
      this.addChild(sprite);
      var texture2 = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(180, 1350, 200, 46)
      );
      var sprite2 = new PIXI.Sprite(texture2);
      sprite2.x = -33;
      sprite2.y = 138;
      this.addChild(sprite2);
    };
    Window_Treasure2.prototype.refreshWeapon = function () {
      this.drawIcon(this._weapon.iconIndex(), 46, 76);
      this.contents.fontSize = 22;
      this.contents.outlineWidth = 2;
      this.drawText(this._weapon.name(), 90, 77, 160, "left");
      this.drawLevel(this._weapon.lv());
      var yy = 133;
      this.contents.outlineWidth = 0;
      this.drawHp(this._weapon, this._beforeWeapon, yy + this.lineHeight() * 1);
      this.drawAtk(
        this._weapon,
        this._beforeWeapon,
        yy + this.lineHeight() * 2
      );
      this.drawHit(
        this._weapon,
        this._beforeWeapon,
        yy + this.lineHeight() * 3
      );
    };
    Window_Treasure2.prototype.lineHeight = function () {
      return 31;
    };
    Window_Treasure2.prototype.refreshArmor = function () {
      if (!this._armor) {
        return;
      }
      this.drawIcon(this._armor.iconIndex(), 46, 76);
      this.contents.fontSize = 22;
      this.drawText(this._armor.name(), 90, 77, 160, "left");
      this.drawLevel(this._armor.lv());
      var yy = 133;
      this.contents.outlineWidth = 0;
      this.drawHp(this._armor, this._beforeArmor, yy + this.lineHeight() * 1);
      this.drawDef(this._armor, this._beforeArmor, yy + this.lineHeight() * 2);
      this.drawEva(this._armor, this._beforeArmor, yy + this.lineHeight() * 3);
    };
    Window_Treasure2.prototype.drawHp = function (equip, before, y) {
      this.contents.outlineWidth = 0;
      var left = this.textLeft();
      var width = this.statusWidth();
      this.drawText(TextManager.param(0), left, y, 200, "left");
      this.drawText(equip.hp(), left, y, width, "right");
      if (before) {
        this.contents.outlineWidth = 2;
        var diff = equip.hp() - before.hp();
        if (diff > 0) {
          this.changeTextColor(this.plusColor());
          this.drawText("(+" + diff + ")", left + width + 5, y, width, "left");
        }
        if (diff < 0) {
          this.changeTextColor(this.minusColor());
          this.drawText("(" + diff + ")", left + width + 5, y, width, "left");
        }
      }
    };
    Window_Treasure2.prototype.drawAtk = function (equip, before, y) {
      this.contents.outlineWidth = 0;
      this.changeTextColor(ColorManager.normalColor());
      var left = this.textLeft();
      var width = this.statusWidth();
      this.drawText(TextManager.atk, left, y, 200, "left");
      this.drawText(equip.atk(), left, y, width, "right");
      if (before) {
        this.contents.outlineWidth = 2;
        var diff = equip.atk() - before.atk();
        if (diff > 0) {
          this.changeTextColor(this.plusColor());
          this.drawText("(+" + diff + ")", left + width + 5, y, width, "left");
        }
        if (diff < 0) {
          this.changeTextColor(this.minusColor());
          this.drawText("(" + diff + ")", left + width + 5, y, width, "left");
        }
      }
    };
    Window_Treasure2.prototype.drawDef = function (equip, before, y) {
      this.contents.outlineWidth = 0;
      this.changeTextColor(ColorManager.normalColor());
      var left = this.textLeft();
      var width = this.statusWidth();
      this.drawText(TextManager.def, left, y, 200, "left");
      this.drawText(equip.def(), left, y, width, "right");
      if (before) {
        this.contents.outlineWidth = 2;
        var diff = equip.def() - before.def();
        if (diff > 0) {
          this.changeTextColor(this.plusColor());
          this.drawText("(+" + diff + ")", left + width + 5, y, width, "left");
        }
        if (diff < 0) {
          this.changeTextColor(this.minusColor());
          this.drawText("(" + diff + ")", left + width + 5, y, width, "left");
        }
      }
    };
    Window_Treasure2.prototype.drawHit = function (equip, before, y) {
      this.changeTextColor(ColorManager.normalColor());
      var left = this.textLeft();
      var width = this.statusWidth();
      this.drawText(TextManager.hit, left, y, 200, "left");
      this.drawText(equip.hit(), left, y, width, "right");
      if (before) {
        var diff = equip.hit() - before.hit();
        if (diff > 0) {
          this.changeTextColor(this.plusColor());
          this.drawText("(+" + diff + ")", left + width + 5, y, width, "left");
        }
        if (diff < 0) {
          this.changeTextColor(this.minusColor());
          this.drawText("(" + diff + ")", left + width + 5, y, width, "left");
        }
      }
    };
    Window_Treasure2.prototype.drawEva = function (equip, before, y) {
      this.changeTextColor(ColorManager.normalColor());
      var left = this.textLeft();
      var width = this.statusWidth();
      this.drawText(TextManager.eva, left, y, 200, "left");
      this.drawText(equip.eva(), left, y, width, "right");
      if (before) {
        var diff = equip.eva() - before.eva();
        if (diff > 0) {
          this.changeTextColor(this.plusColor());
          this.drawText("(+" + diff + ")", left + width + 5, y, width, "left");
        }
        if (diff < 0) {
          this.changeTextColor(this.minusColor());
          this.drawText("(" + diff + ")", left + width + 5, y, width, "left");
        }
      }
    };
    Window_Treasure2.prototype.plusColor = function () {
      return ColorManager.textColor(3);
    };
    Window_Treasure2.prototype.minusColor = function () {
      return ColorManager.textColor(2);
    };
    Window_Treasure2.prototype.textLeft = function () {
      return 58;
    };
    Window_Treasure2.prototype.statusWidth = function () {
      if (this._beforeArmor || this._beforeWeapon) {
        return 108;
      }
      return 138;
    };
    Window_Treasure2.prototype.drawLevel = function (rank) {
      var max = 7;
      var interval = 26;
      var xx = 38;
      var yy = 120;
      for (var i = 0; i < max; i++) {
        var icon = 407;
        if (i >= rank) {
          icon = 408;
        }
        this.drawIcon(icon, xx, yy);
        xx += interval;
      }
    };
    Window_Treasure2.prototype.refreshBg = function () {
      this._contentsBackSprite.removeChildren();
      var baseTexture = Nore.getSystemBaseTexture("menu2");
      var rect;
      var equip = this._weapon || this._armor;
      if (equip) {
        rect = new Rectangle(0, 610, 300, 300);
      } else {
        rect = new Rectangle(0, 1048, 300, 300);
        this.setEmpty();
      }
      var texture = new PIXI.Texture(baseTexture, rect);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -0;
      sprite.y = -0;
      this._contentsBackSprite.addChild(sprite);
    };
    Window_Treasure2.prototype.setEmpty = function () {
      var baseTexture = Nore.getSystemBaseTexture("menu2");
      var texture;
      if (!ConfigManager.en) {
        texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(315, 1113, 350, 46)
        );
      } else {
        texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(305, 1165, 350, 46)
        );
      }
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 80;
      if (ConfigManager.en) {
        sprite.x = 70;
      }
      sprite.y = 130;
      this.addChild(sprite);
    };
    return Window_Treasure2;
  })(Window_Base);
  Nore.Window_Treasure2 = Window_Treasure2;
})(Nore || (Nore = {}));
