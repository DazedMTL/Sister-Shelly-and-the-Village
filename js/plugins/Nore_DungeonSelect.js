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
 * @command Dungeon
 * @text ダンジョン
 * @des ダンジョン
 */
var Nore;
(function (Nore) {
  var WINDOW_LEFT = 610;
  var pluginName = "Nore_DungeonSelect";
  PluginManager.registerCommand(pluginName, "Dungeon", function (args) {
    SceneManager.push(Scene_DungeonSelection);
  });
  var Scene_DungeonSelection = /** @class */ (function (_super) {
    __extends(Scene_DungeonSelection, _super);
    function Scene_DungeonSelection() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_DungeonSelection.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.createPictures();
      this.refreshBg();
      this.createLayerWindow();
      this.createHelpWindow();
      this.createReoWindow();
      //this.createGoldWindow();
      this.createTreasureWindow();
      this.createDamageBonusWindow();
      this.createConfirmWindow();
      this.onLayerChange();
    };
    Scene_DungeonSelection.prototype.createDamageBonusWindow = function () {
      this._damageBonusWindow = new Window_DamageBonus(
        new Rectangle(1010, 581, 210, 300)
      );
      this._damageBonusWindow.refresh();
      this.addChild(this._damageBonusWindow);
    };
    Scene_DungeonSelection.prototype.createPictures = function () {
      var width = Graphics.width;
      var height = Graphics.height;
      var x = (Graphics.width - width) / 2;
      var y = (Graphics.height - height) / 2;
      this._pictureContainer = new Sprite();
      this._pictureContainer.setFrame(x, y, width, height);
      for (var i = 0; i <= $gameScreen.maxPictures(); i++) {
        this._pictureContainer.addChild(new Sprite_Picture(i));
      }
      this.addWindow(this._pictureContainer);
    };
    Scene_DungeonSelection.prototype.refreshBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("bg");
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -4;
      sprite.y = -4;
      this.addWindow(sprite);
      sprite.alpha = 0.8;
      var baseTexture2 = Nore.getSystemBaseTexture(
        ConfigManager.en ? "dungeon_bg_en" : "dungeon_bg"
      );
      var texture = new PIXI.Texture(baseTexture2);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -4 + 250;
      sprite.y = -4;
      this.addWindow(sprite);
      if ($gameActors.actor(4).dmgBonus() > 0) {
        var baseTexture3 = Nore.getSystemBaseTexture("damage_bonus");
        var rect = new Rectangle(ConfigManager.en ? 210 : 0, 0, 210, 260);
        var texture = new PIXI.Texture(baseTexture3, rect);
        var sprite = new PIXI.Sprite(texture);
        sprite.x = 1000;
        sprite.y = 535;
        this.addWindow(sprite);
      }
    };
    Scene_DungeonSelection.prototype.update = function () {
      _super.prototype.update.call(this);
      $gameScreen.update();
    };
    Scene_DungeonSelection.prototype.createGoldWindow = function () {
      this._goldWindow = new Window_Gold(new Rectangle(24, 24, 196, 76));
      this.addWindow(this._goldWindow);
    };
    Scene_DungeonSelection.prototype.createReoWindow = function () {
      this._leoStatusWindow = new Nore.Window_LeoStatus(
        new Rectangle(WINDOW_LEFT, 380, 0, 0),
        $gameSystem.lastStatus()
      );
      this.addChild(this._leoStatusWindow);
    };
    Scene_DungeonSelection.prototype.createTreasureWindow = function () {
      this._treasureWindow = new Window_Item();
      this.addChild(this._treasureWindow);
    };
    Scene_DungeonSelection.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
    };
    Scene_DungeonSelection.prototype.onConfirmOk = function () {
      if (this.isReturn()) {
        $gameVariables.setValue(15, 0);
        this.popScene();
        return;
      }
      $gameSystem.upTryCount();
      var layer = parseInt(this._layerWindow.currentSymbol());
      $gameTemp.lastSelectDungeon = layer - 1;
      $gameSystem.onDungeon();
      $gameVariables.setValue(15, layer);
      this.popScene();
    };
    Scene_DungeonSelection.prototype.onConfirmCancel = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this._layerWindow.activate();
      this._inReturn = false;
    };
    Scene_DungeonSelection.prototype.createLayerWindow = function () {
      this._layerWindow = new Window_DungeonLayer();
      this._layerWindow.setHandler("ok", this.onLayerOk.bind(this));
      this._layerWindow.setHandler("change", this.onLayerChange.bind(this));
      this._layerWindow.setHandler("cancel", this.onLayerCancel.bind(this));
      this.addChild(this._layerWindow);
    };
    Scene_DungeonSelection.prototype.onLayerOk = function () {
      var text = TextManager.confirmFloor;
      if (this.isReturn()) {
        if (!this._layerWindow.canReturn()) {
          SoundManager.playBuzzer();
          return;
        }
        text = TextManager.confirmReturn;
      }
      this.onConfirmOk();
      /*
            this._confirmWindow.setText(text);

            this._confirmWindow.show();
            this._confirmWindow.activate();
            */
    };
    Scene_DungeonSelection.prototype.isReturn = function () {
      return this._layerWindow.index() == 10 || this._inReturn;
    };
    Scene_DungeonSelection.prototype.onLayerChange = function () {};
    Scene_DungeonSelection.prototype.onLayerCancel = function () {
      SceneManager.push(Nore.Scene_Menu2);
    };
    Scene_DungeonSelection.prototype.createHelpWindow = function () {
      var rect = this.helpWindowRect();
      this._helpWindow = new Window_Help(rect);
      this.addWindow(this._helpWindow);
      this._helpWindow.setText(TextManager.selectFloor);
    };
    Scene_DungeonSelection.prototype.helpWindowRect = function () {
      var wx = 300;
      var wy = 40;
      var ww = Graphics.boxWidth - wx * 2;
      var wh = this.helpAreaHeight();
      return new Rectangle(wx, wy, ww, wh);
    };
    return Scene_DungeonSelection;
  })(Scene_MenuBase);
  Nore.Scene_DungeonSelection = Scene_DungeonSelection;
  var Window_DungeonLayer = /** @class */ (function (_super) {
    __extends(Window_DungeonLayer, _super);
    function Window_DungeonLayer() {
      var _this = _super.call(this, new Rectangle(280, 160, 250, 610)) || this;
      _this.select($gameTemp.lastSelectDungeon || 0);
      _this.frameVisible = false;
      _this.backOpacity = 0;
      return _this;
    }
    Window_DungeonLayer.prototype.makeCommandList = function () {
      var clearLayer = $gameVariables.value(Nore.CLEAR_FLOOR_ID) + 1;
      for (var i = 1; i <= 10; i++) {
        this.addCommand(
          TextManager.floor.format(hankaku2Zenkaku(i)),
          i + "",
          i <= clearLayer,
          null
        );
      }
      this.addCommand(TextManager.return, "return", this.canReturn(), null);
    };
    Window_DungeonLayer.prototype.select = function (index) {
      _super.prototype.select.call(this, index);
      if (this._list) {
        this.drawAllItems();
      }
    };
    Window_DungeonLayer.prototype.drawAllItems = function () {
      this._windowContentsSprite.destroyAndRemoveChildren();
      _super.prototype.drawAllItems.call(this);
    };
    Window_DungeonLayer.prototype.drawItem = function (index) {
      var baseTexture = this.getBaseTexture();
      var xx = 0;
      var r;
      if (index == this.index()) {
        if (this._list[index].enabled) {
          r = new PIXI.Rectangle(240 * 2 + 20, index * 80 + 20, 260, 70);
        } else {
          r = new PIXI.Rectangle(240 * 4 + 20, index * 80 + 20, 260, 70);
        }
      } else {
        if (this._list[index].enabled) {
          r = new PIXI.Rectangle(0 + 20, index * 80 + 20, 260, 70);
        } else {
          r = new PIXI.Rectangle(240 * 3 + 20, index * 80 + 20, 260, 70);
        }
      }
      var texture = new PIXI.Texture(baseTexture, r);
      var sprite = new PIXI.Sprite(texture);
      var rect = this.itemRect(index);
      sprite.x = rect.x - 40;
      sprite.y = rect.y + 0;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_DungeonLayer.prototype.getBaseTexture = function () {
      var baseTexture = Nore.getSystemBaseTexture(
        ConfigManager.en ? "dungeon_item_en" : "dungeon_item"
      );
      return baseTexture;
    };
    Window_DungeonLayer.prototype.canReturn = function () {
      if ($gameVariables.value(3) > 1) {
        if ($gameSystem.currentHistory().dungeonCount() == 0) {
          return false;
        }
        return true;
      }
      return false;
    };
    Window_DungeonLayer.prototype.drawItemBackground = function (index) {};
    Window_DungeonLayer.prototype.itemHeight = function () {
      return 52;
    };
    Window_DungeonLayer.prototype.setCursorRect = function () {};
    Window_DungeonLayer.prototype.itemRect = function (index) {
      var rect = _super.prototype.itemRect.call(this, index);
      rect.y += 10;
      return rect;
    };
    Window_DungeonLayer.prototype.cursorDown = function (wrap) {
      for (var i = 0; i < 11; i++) {
        _super.prototype.cursorDown.call(this, wrap);
        if (this.isCurrentItemEnabled()) {
          return;
        }
      }
    };
    Window_DungeonLayer.prototype.cursorUp = function (wrap) {
      for (var i = 0; i < 11; i++) {
        _super.prototype.cursorUp.call(this, wrap);
        if (this.isCurrentItemEnabled()) {
          return;
        }
      }
    };
    return Window_DungeonLayer;
  })(Window_Command);
  function getBaseTexture() {
    var baseTexture = PIXI.utils.BaseTextureCache["system/skill_tree"];
    if (!baseTexture) {
      var bitmap = ImageManager.loadSystem("skill_tree");
      if (!bitmap.isReady()) {
        return;
      }
      baseTexture = new PIXI.BaseTexture(bitmap._image);
      baseTexture.resource.url = "system/skill_tree";
      PIXI.utils.BaseTextureCache["system/skill_tree"] = baseTexture;
    }
    return baseTexture;
  }
  var Window_Item = /** @class */ (function (_super) {
    __extends(Window_Item, _super);
    function Window_Item() {
      var _this =
        _super.call(this, new Rectangle(WINDOW_LEFT, 166, 400, 170)) || this;
      _this.refresh();
      _this.frameVisible = false;
      _this.backOpacity = 0;
      return _this;
    }
    Window_Item.prototype.lineHeight = function () {
      return 28;
    };
    Window_Item.prototype.refresh = function () {
      this.contents.clear();
      var lh = this.lineHeight();
      this.contents.fontSize = 26;
      //this.drawText(TextManager.dungeonInfo, 10, 0, 200, 'left');
      var gold = $gameParty.gold() - $gameSystem.lastGold();
      var right = 148;
      var actor = $gameActors.actor(4);
      this.contents.fontSize = 24;
      var yy = 38;
      var xx = 54;
      this.changeTextColor(ColorManager.systemColor());
      //this.drawText(TextManager.gold, 30, 0 + lh, 200, 'left');
      this.changeTextColor(ColorManager.normalColor());
      this.drawNumber($gameParty.gold(), xx, yy + lh, 200, "right", 8);
      if (gold > 0) {
        this.changeTextColor(ColorManager.textColor(3));
        this.drawNumber("-" + gold, right, yy + lh, 200, "right", 9);
      } else if (gold < 0) {
        this.changeTextColor(ColorManager.textColor(8));
        this.drawNumber(gold, right, yy + lh, 200, "right", 10);
      }
      this.changeTextColor(ColorManager.systemColor());
      // this.drawText(TextManager.currencyUnit, 215, 0 + lh, 100);
      this.changeTextColor(ColorManager.systemColor());
      //this.drawText(TextManager.tryCount, 30, 0 + lh * 2, 200, 'left');
      this.changeTextColor(ColorManager.normalColor());
      this.drawNumber($gameSystem.tryCount(), xx, yy + lh * 2, 200, "right", 8);
      this.changeTextColor(ColorManager.textColor(3));
      var upTryCount = $gameSystem.tryCount() - $gameSystem.lastTryCount();
      if (upTryCount > 0) {
        this.drawNumber("-" + upTryCount, right, yy + lh * 2, 200, "right", 9);
      } else {
        //this.changeTextColor(ColorManager.textColor(8));
        //this.drawNumber('-', right, yy + lh * 2, 200, 'right', 10);
      }
      this.changeTextColor(ColorManager.systemColor());
      //this.drawText(TextManager.countUnit2, 215, 0 + lh * 2, 100);
      var yakusou = $dataItems[31];
      this.changeTextColor(ColorManager.systemColor());
      var name = yakusou.name;
      if (ConfigManager.en) {
        name = yakusou.meta["en"];
      }
      //this.drawText(name, 30, 0 + lh * 3, 200, 'left');
      var yakusouCount = $gameParty.numItems(yakusou);
      this.drawNumber(
        yakusouCount,
        xx,
        yy + lh * 3,
        200,
        "right",
        yakusouCount == 5 ? 9 : 8
      );
      /*if (gold > 0) {
                this.changeTextColor(ColorManager.textColor(3));
                this.drawText('+' + gold, right, 0 + lh * 3, 200, 'right');
            } else {
                this.changeTextColor(ColorManager.textColor(8));
                this.drawText('-', right, 0 + lh * 3, 200, 'right');
            }
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(TextManager.currencyUnit, 215, 0 + lh * 3, 100);
*\

           /* let exp = actor.currentExp() - $gameSystem.lastExp();

            this.changeTextColor(ColorManager.systemColor());
            this.drawText(TextManager.exp, 30, 10 + lh * 2, 200, 'left');
            this.changeTextColor(ColorManager.normalColor());
            this.drawText((actor.currentExp() - actor.currentLevelExp()) + '/' + actor.nextLevelExp(), 10, 10 + lh * 2, 200, 'right');

            this.changeTextColor(ColorManager.textColor(3));
            this.drawText('+' + exp, right, 10 + lh * 2, 200, 'right');
*/
    };
    return Window_Item;
  })(Window_Base);
  var Window_DamageBonus = /** @class */ (function (_super) {
    __extends(Window_DamageBonus, _super);
    function Window_DamageBonus() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_DamageBonus.prototype.refresh = function () {
      this.frameVisible = false;
      this.backOpacity = 0;
      this.makeItems();
      _super.prototype.refresh.call(this);
    };
    Window_DamageBonus.prototype.makeItems = function () {
      this._data = $gameActors.actor(4).dmgBonusInfo();
    };
    Window_DamageBonus.prototype.drawItem = function (index) {
      this.contents.fontSize = 17;
      //this.changeTextColor('#deaa3d');
      var data = this._data[index];
      var rect = this.itemRect(index);
      this.drawText(this.label(data.type()), rect.x, rect.y - 3, 100, "left");
      var value = data.value();
      this.drawNumber(value + "%", rect.x, rect.y, rect.width, "right", 8);
    };
    Window_DamageBonus.prototype.label = function (type) {
      var en = ConfigManager.en;
      switch (type) {
        case DamageBonusEnum.yadoya:
          return en ? "Meal" : "食事";
        case DamageBonusEnum.leoFela:
          return en ? "Blowjob" : "レオにフェラ";
        case DamageBonusEnum.leoIntimacy:
          return en ? "Leo Intimacy" : "レオとの友好度";
        case DamageBonusEnum.item:
          return en ? "Prayer Tool" : "祈祷具";
        case DamageBonusEnum.syusan:
          return en ? "Childbirth" : "出産";
      }
      return "www";
    };
    Window_DamageBonus.prototype.maxItems = function () {
      return this._data ? this._data.length : 1;
    };
    Window_DamageBonus.prototype.itemHeight = function () {
      return 30;
    };
    Window_DamageBonus.prototype.drawItemBackground = function (index) {};
    return Window_DamageBonus;
  })(Window_Selectable);
})(Nore || (Nore = {}));
var Game_Character2 = /** @class */ (function (_super) {
  __extends(Game_Character2, _super);
  function Game_Character2(name, index, x, y) {
    var _this = _super.call(this) || this;
    _this._characterName = name;
    _this._characterIndex = index;
    _this._x = x;
    _this._y = y;
    return _this;
  }
  Game_Character2.prototype.setImage = function () {};
  Game_Character2.prototype.screenX = function () {
    return this._x;
  };
  Game_Character2.prototype.screenY = function () {
    return this._y;
  };
  return Game_Character2;
})(Game_Character);
