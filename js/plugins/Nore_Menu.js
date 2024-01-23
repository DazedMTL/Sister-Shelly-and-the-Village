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
  Scene_Map.prototype.callMenu = function () {
    SoundManager.playOk();
    SceneManager.push(Scene_Menu2);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
  };
  var _Scene_Map_prototype_isMenuCalled = Scene_Map.prototype.isMenuCalled;
  Scene_Map.prototype.isMenuCalled = function () {
    if ($gameSwitches.value(171)) {
      return false;
    }
    if (this._windowBackLog) {
      return false;
    }
    return _Scene_Map_prototype_isMenuCalled.call(this);
    return (
      Input.isTriggered("menu") ||
      Input.isTriggered("cancel") ||
      TouchInput.isCancelled()
    );
  };
  var Window_Bg = /** @class */ (function (_super) {
    __extends(Window_Bg, _super);
    function Window_Bg() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_Bg.prototype._createAllParts = function () {
      this._createContainer();
      this._createBackSprite();
      this._createBack2Sprite();
      this._createFrameSprite();
      this._createClientArea();
      this._createContentsBackSprite();
      this._createCursorSprite();
      this._createContentsSprite();
      this._createArrowSprites();
      this._createPauseSignSprites();
      this._createFrame2Sprite();
      this._isWindow = false;
    };
    Window_Bg.prototype.updateTransform = function () {
      _super.prototype.updateTransform.call(this);
      this.updateFrame2();
    };
    Window_Bg.prototype._updateContentsBack = function () {
      _super.prototype._updateContentsBack.call(this);
      this._backSprite.alpha = 0;
    };
    Window_Bg.prototype._createBack2Sprite = function () {
      var bgGraphics = new PIXI.Graphics();
      bgGraphics.beginFill(0, 0.3);
      bgGraphics.drawRect(0, 0, 1000, 1000);
      bgGraphics.endFill();
      this._bgGraphics = bgGraphics;
      this._container.addChild(bgGraphics);
    };
    Window_Bg.prototype._createFrame2Sprite = function () {
      this._frame2Sprite = new Sprite();
      var baseTexture = Nore.getSystemBaseTexture("bg2");
      var ww = 128;
      {
        var texture1 = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(0, 0, ww, ww)
        );
        var sprite1 = new PIXI.Sprite(texture1);
        sprite1.x = 0;
        sprite1.y = 0;
        this._frame2Sprite.addChild(sprite1);
        this._frame2_1 = sprite1;
      }
      {
        var texture2 = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(ww, 0, ww, ww)
        );
        var sprite2 = new PIXI.Sprite(texture2);
        sprite2.x = this.width - ww;
        sprite2.y = this.height - ww;
        this._frame2Sprite.addChild(sprite2);
        this._frame2_2 = sprite2;
      }
      {
        var texture3 = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(ww * 2, 0, ww, ww)
        );
        var sprite3 = new PIXI.Sprite(texture3);
        sprite3.x = this.width - ww;
        sprite3.y = 0;
        this._frame2Sprite.addChild(sprite3);
        this._frame2_3 = sprite3;
      }
      this._container.addChild(this._frame2Sprite);
    };
    Window_Bg.prototype.updateFrame2 = function () {
      this._frame2_1.y = this.height - 128;
      this._frame2_2.y = this.height - 128;
      this._frame2_2.x = this.width - 128;
      this._frame2_3.x = this.width - 128;
      this._bgGraphics.scale.x = this.width / 1000;
      this._bgGraphics.scale.y = this.height / 1000;
    };
    return Window_Bg;
  })(Window_Base);
  var Scene_Menu2 = /** @class */ (function (_super) {
    __extends(Scene_Menu2, _super);
    function Scene_Menu2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Menu2.prototype.create = function () {
      $gameActors.actor(5).setHoppeId(0);
      Scene_Base.prototype.create.call(this);
      this.createBackground();
      this.updateActor();
      this.createBgWindow();
      this.createWindowLayer();
      this.createCommandWindow();
      this.createGoldWindow();
      this.createStatusWindow();
      this.createButtons();
      this.createRightTachie();
      this.createNinshinGauge();
      this.createPanWindow();
      this.createReoWindow();
      this._statusWindow.hide();
    };
    Scene_Menu2.prototype.createGoldWindow = function () {
      this._goldWindow = new Window_Gold2(new Rectangle(-30, -118, 400, 350));
      this.addWindow(this._goldWindow);
    };
    Scene_Menu2.prototype.createBgWindow = function () {
      this._bgWindow = new Window_Bg(
        new Rectangle(-1, -1, Graphics.width - 1, Graphics.height - 1)
      );
      this.addChild(this._bgWindow);
    };
    Scene_Menu2.prototype.createReoWindow = function () {
      var baseTexture = Nore.getSystemBaseTexture("menu2");
      var rect = new PIXI.Rectangle(0, 0, 390, 430);
      if (ConfigManager.en) {
        rect = new PIXI.Rectangle(717, 0, 390, 430);
      }
      var texture = new PIXI.Texture(baseTexture, rect);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 441;
      sprite.y = 137;
      this._leoStatusBg = sprite;
      this.addChild(sprite);
      var rect2 = new Rectangle(sprite.x + 40, sprite.y + 42, 270, 300);
      this._leoWindow = new Window_LeoStatus(rect2);
      this.addChild(this._leoWindow);
    };
    Scene_Menu2.prototype.createBackground = function () {
      _super.prototype.createBackground.call(this);
      this.createDark();
    };
    Scene_Menu2.prototype.createDark = function () {
      var dark = new PIXI.Graphics();
      dark.beginFill(0, 0.4);
      dark.drawRect(0, 0, Graphics.boxWidth + 10, Graphics.boxHeight + 10);
      dark.endFill();
      this.addChild(dark);
    };
    Scene_Menu2.prototype.createRightTachie = function () {
      Nore.Tachie.actorCashedSprites[5] = false;
      this._rightTachie = new Nore.Sprite_RightTachie();
      this._rightTachie.x += 240;
      this._rightTachie.y += 10;
      this.addChild(this._rightTachie);
    };
    Scene_Menu2.prototype.createNinshinGauge = function () {
      this._ninshinGauge = new Nore.Sprite_NinshinBar();
      this._ninshinGauge.x = 226;
      this._ninshinGauge.y = 22;
      this.addChild(this._ninshinGauge);
    };
    Scene_Menu2.prototype.goldWindowRect = function () {
      var rect = _super.prototype.goldWindowRect.call(this);
      rect.x = -4;
      rect.y = -4;
      return rect;
    };
    Scene_Menu2.prototype.createPanWindow = function () {
      this._panWindow = new Nore.Window_PanYakusou(
        new Rectangle(380, 578, 500, 200)
      );
      this.addWindow(this._panWindow);
    };
    Scene_Menu2.prototype.createCommandWindow = function () {
      var rect = this.commandWindowRect();
      var commandWindow = new Window_MenuCommand2(rect);
      commandWindow.setHandler("item", this.commandItem.bind(this));
      commandWindow.setHandler("skill", this.commandPersonal.bind(this));
      commandWindow.setHandler("medal", this.commandMedal.bind(this));
      commandWindow.setHandler("equip", this.commandEquip.bind(this));
      commandWindow.setHandler("status", this.commandStatus.bind(this));
      commandWindow.setHandler("formation", this.commandFormation.bind(this));
      commandWindow.setHandler("options", this.commandOptions.bind(this));
      commandWindow.setHandler("save", this.commandSave.bind(this));
      commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
      commandWindow.setHandler("cancel", this.popScene.bind(this));
      commandWindow.setHandler("intimacy", this.commandIntimacy.bind(this));
      commandWindow.setHandler("kigae", this.commandKigae.bind(this));
      commandWindow.setHandler("history", this.commandHistory.bind(this));
      commandWindow.setHandler("offering", this.commandOffering.bind(this));
      this.addWindow(commandWindow);
      this._commandWindow = commandWindow;
    };
    Scene_Menu2.prototype.commandWindowRect = function () {
      var ww = this.mainCommandWidth();
      var wh = 608;
      var wx = 80;
      var wy = 145;
      return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Menu2.prototype.commandStatus = function () {
      SceneManager.push(Nore.Scene_EroStatus);
    };
    Scene_Menu2.prototype.commandIntimacy = function () {
      SceneManager.push(Nore.Scene_Intimacy);
    };
    Scene_Menu2.prototype.commandMedal = function () {
      SceneManager.push(Nore.Scene_Medal);
    };
    Scene_Menu2.prototype.commandKigae = function () {
      SceneManager.push(Nore.Scene_Kigae);
    };
    Scene_Menu2.prototype.commandHistory = function () {
      $gameTemp.lastHistoryIndex = null;
      SceneManager.push(Nore.Scene_History);
    };
    Scene_Menu2.prototype.commandEquip = function () {
      SceneManager.push(Nore.Scene_ReoEquip);
    };
    Scene_Menu2.prototype.commandOffering = function () {
      SceneManager.push(Nore.Scene_Upgrade);
    };
    return Scene_Menu2;
  })(Scene_Menu);
  Nore.Scene_Menu2 = Scene_Menu2;
  var Window_MenuCommand2 = /** @class */ (function (_super) {
    __extends(Window_MenuCommand2, _super);
    function Window_MenuCommand2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_MenuCommand2.prototype.initialize = function (rect) {
      _super.prototype.initialize.call(this, rect);
      this.frameVisible = false;
      this.backOpacity = 0;
    };
    Window_MenuCommand2.prototype.makeCommandList = function () {
      this.addMainCommands();
      this.addFormationCommand();
      this.addOriginalCommands();
      this.addOptionsCommand();
      this.addCommand(TextManager.medal, "medal", true);
      this.addSaveCommand();
      this.addCommand(TextManager.kigae, "kigae", isKigaeEnabled());
      this.addGameEndCommand();
    };
    Window_MenuCommand2.prototype.addMainCommands = function () {
      var enabled = this.areMainCommandsEnabled();
      if (this.needsCommand("item")) {
        this.addCommand(TextManager.item, "item", enabled);
      }
      if (this.needsCommand("skill")) {
        this.addCommand(TextManager._skill, "skill", enabled);
      }
      if (this.needsCommand("equip")) {
        this.addCommand(TextManager._equip, "equip", enabled);
      }
      this.addCommand(
        TextManager.offering,
        "offering",
        $gameSwitches.value(243)
      );
      if (this.needsCommand("status")) {
        this.addCommand(TextManager._status, "status", enabled);
      }
      this.addCommand(TextManager.history, "history", true);
      this.addCommand(TextManager.intimacy, "intimacy", true);
    };
    Window_MenuCommand2.prototype.drawItem = function (index) {
      var symbol = this._list[index].symbol;
      this.createButton(index, symbol);
      var button = this["_button" + index];
      if (this._list[index]) {
        if (!this._list[index].enabled) {
          if (index == this.index()) {
            button.setType(2);
          } else {
            button.setType(0);
          }
          return;
        }
      }
      if (index == this.index()) {
        button.setType(3);
      } else {
        button.setType(1);
      }
    };
    Window_MenuCommand2.prototype.indexBySymbol = function (symbol) {
      switch (symbol) {
        case "equip":
          return 0;
        case "status":
          return 1;
        case "intimacy":
          return 2;
        case "medal":
          return 3;
        case "kigae":
          return 4;
        case "offering":
          return 5;
        case "history":
          return 6;
        case "options":
          return 7;
        case "save":
          return 8;
        case "gameEnd":
          return 9;
      }
      return 0;
    };
    Window_MenuCommand2.prototype.select = function (index) {
      _super.prototype.select.call(this, index);
      if (this._list) {
        this.drawAllItems();
      }
    };
    Window_MenuCommand2.prototype.maxCols = function () {
      return 2;
    };
    Window_MenuCommand2.prototype.createButton = function (index, symbol) {
      if (!this["_button" + index]) {
        var rect = this.itemRect(index);
        var button = new MenuButton(this.indexBySymbol(symbol));
        button.x = rect.x;
        button.y = rect.y;
        this["_button" + index] = button;
        this.addChild(button);
        //p('create')
      }
    };
    Window_MenuCommand2.prototype.cursorRight = function (wrap) {
      _super.prototype.cursorLeft.call(this, wrap);
    };
    Window_MenuCommand2.prototype.cursorLeft = function (wrap) {
      _super.prototype.cursorRight.call(this, wrap);
    };
    Window_MenuCommand2.prototype.cursorDown = function (wrap) {
      var last = this.index();
      _super.prototype.cursorDown.call(this, wrap);
      var current = this.index();
      if (last != current) {
        return;
      }
      if (current == 8) {
        this.select(1);
      }
      if (current == 9) {
        this.select(0);
      }
    };
    Window_MenuCommand2.prototype.cursorUp = function (wrap) {
      var last = this.index();
      _super.prototype.cursorUp.call(this, wrap);
      var current = this.index();
      if (last != current) {
        return;
      }
      if (current == 0) {
        this.select(9);
      }
      if (current == 1) {
        this.select(8);
      }
    };
    Window_MenuCommand2.prototype.itemRect = function (index) {
      var rect = _super.prototype.itemRect.call(this, index);
      if (index % 2 == 0) {
        rect.x = 114;
      } else {
        rect.x = 0;
        rect.y += 60;
      }
      return rect;
    };
    Window_MenuCommand2.prototype.itemHeight = function () {
      return 108;
    };
    Window_MenuCommand2.prototype._refreshCursor = function () {};
    Window_MenuCommand2.prototype.drawItemBackground = function (index) {};
    return Window_MenuCommand2;
  })(Window_MenuCommand);
  var MenuButton = /** @class */ (function (_super) {
    __extends(MenuButton, _super);
    function MenuButton(index) {
      var _this = _super.call(this) || this;
      _this._index = index;
      _this.setType(0);
      return _this;
    }
    MenuButton.prototype.setType = function (type) {
      this._type = type;
      if (this._current) {
        this._current.visible = false;
      }
      this._current = this.getSprite(this._type);
      this._current.visible = true;
    };
    MenuButton.prototype.getSprite = function (type) {
      if (!this["_type" + this._type]) {
        var texture = this.getTexture(this._index, this._type);
        var sprite = new PIXI.Sprite(texture);
        this.addChild(sprite);
        this["_type" + this._type] = sprite;
      }
      return this["_type" + this._type];
    };
    MenuButton.prototype.getTexture = function (index, type) {
      var baseTexture;
      if (ConfigManager.en) {
        baseTexture = Nore.getSystemBaseTexture("menu_en");
      } else {
        baseTexture = Nore.getSystemBaseTexture("menu");
      }
      var ww = 128;
      var y = index * ww;
      return new PIXI.Texture(baseTexture, new Rectangle(type * ww, y, ww, ww));
    };
    return MenuButton;
  })(Sprite);
  function isKigaeEnabled() {
    if (!$gameSwitches.value(8)) {
      // 着替え未開放
      return false;
    }
    if ($gameSwitches.value(1)) {
      // 冒険中
      return true;
    }
    if (!$gameSwitches.value(15)) {
      // 外出中
      return false;
    }
    if (
      $gameSwitches.value(32) ||
      $gameSwitches.value(34) ||
      $gameSwitches.value(35)
    ) {
      // 酒場のバイト中
      return false;
    }
    return true;
  }
  var Window_LeoStatus = /** @class */ (function (_super) {
    __extends(Window_LeoStatus, _super);
    function Window_LeoStatus(r, lastStatus) {
      var _this = this;
      r.width = 300;
      if (lastStatus) {
        r.width = 400;
      }
      r.height = 456;
      _this = _super.call(this, r) || this;
      _this._lastStatus = lastStatus;
      _this.refresh();
      _this.frameVisible = false;
      _this.backOpacity = 0;
      return _this;
    }
    Window_LeoStatus.prototype.refreshBg = function () {};
    Window_LeoStatus.prototype.refresh = function () {
      this.drawCurrent();
      this.drawLast();
    };
    Window_LeoStatus.prototype.drawCurrent = function () {
      var actor = $gameActors.actor(4);
      var xx = 0;
      this.contents.fontSize = 21;
      // this.drawLabel('LV', 1);
      this.drawValue(actor._level, 1);
      //this.drawLabel('HP', 2);
      this.drawValue(actor.mhp, 2);
      //this.drawLabel(TextManager.mmp, 3);
      this.drawValue(actor.mmp, 3);
      //this.drawLabel(TextManager.atk, 4);
      this.drawValue(actor.atk, 4);
      //this.drawLabel(TextManager.def, 5);
      this.drawValue(actor.def, 5);
      //this.drawLabel(TextManager.hit, 6);
      this.drawValue(Math.round(actor.hit * 100), 6);
      //this.drawLabel(TextManager.eva, 7);
      this.drawValue(Math.round(actor.eva * 100), 7);
      //this.drawLabel(TextManager.reduceDmg, 8);
      this.drawValue(actor.reduceDmg(), 8);
      //this.drawLabel(TextManager.bonusDmg, 9);
      this.drawValue(actor.dmgBonus(), 9, "%");
      //this.drawLabel(TextManager.fatigue, 10);
      this.drawValue(actor.fatigue(), 10, "%");
      //this.drawLabel(TextManager._exp, 11);
      var exp = actor.currentExp() - $gameSystem.lastExp();
      var expText;
      if (actor.isMaxLevel()) {
        this.drawText("-", 37, 11 * this.lineHeight() + 4, 199, "right");
        return;
      } else {
        expText =
          actor.currentExp() -
          actor.currentLevelExp() +
          "/" +
          (actor.nextLevelExp() - actor.currentLevelExp());
      }
      this.drawValue(expText, 11);
    };
    Window_LeoStatus.prototype.drawLast = function () {
      var last = this._lastStatus;
      if (!last) {
        return;
      }
      var actor = $gameActors.actor(4);
      //this.drawText(TextManager.lastStatus, 230, 0, 200, 'left');
      this.drawValue2(actor._level - last.lv, 1);
      this.drawValue2(actor.mhp - last.hp, 2);
      this.drawValue2(actor.mmp - last.mp, 3);
      this.drawValue2(Math.round(actor.atk - last.atk), 4);
      this.drawValue2(Math.round(actor.def - last.def), 5);
      this.drawValue2(Math.round(actor.hit * 100 - last.hit * 100), 6);
      this.drawValue2(Math.round(actor.eva * 100 - last.eva * 100), 7);
      this.drawValue2(actor.reduceDmg() - last.reduceDmg, 8);
      this.drawValue2(actor.dmgBonus() - last.dmgBonus, 9, "%");
      this.drawValue2(actor.fatigue(), 10, "%");
      if (actor.isMaxLevel()) {
        return;
      }
      var exp = actor.currentExp() - $gameSystem.lastExp();
      this.drawValue2(exp, 11);
    };
    Window_LeoStatus.prototype.drawLabel = function (str, index) {
      this.changeTextColor(ColorManager.systemColor());
      var yy = 4;
      this.drawText(str, 30, index * this.lineHeight() + yy, 129, "left");
    };
    Window_LeoStatus.prototype.drawValue = function (text, index, post) {
      if (post === void 0) {
        post = null;
      }
      this.changeTextColor(ColorManager.normalColor());
      var yy = 4;
      this.drawNumber(
        text,
        65,
        index * this.lineHeight() + yy,
        199,
        "right",
        8
      );
      if (post) {
        this.drawNumber(
          post,
          30 + 228,
          index * this.lineHeight() + yy,
          179,
          "left",
          8
        );
      }
    };
    Window_LeoStatus.prototype.lineHeight = function () {
      return 28;
    };
    Window_LeoStatus.prototype.drawValue2 = function (value, index, post) {
      if (post === void 0) {
        post = null;
      }
      var yy = 4;
      var xx = 169;
      if (value == 0) {
        this.changeTextColor(ColorManager.textColor(8));
        this.drawText("-", xx, index * this.lineHeight() + yy, 159, "right");
        return;
      }
      var text;
      if (value > 0) {
        //text = '+' + value;
        this.changeTextColor(ColorManager.textColor(3));
        this.drawNumber(
          -value,
          xx,
          index * this.lineHeight() + yy,
          179,
          "right",
          9
        );
        if (post) {
          this.drawNumber(
            "%",
            150 + 193,
            index * this.lineHeight() + 5,
            179,
            "left",
            9
          );
        }
      } else {
        this.changeTextColor(ColorManager.deathColor());
        this.drawNumber(
          value,
          xx,
          index * this.lineHeight() + yy,
          179,
          "right",
          10
        );
        if (post) {
          this.drawNumber(
            "%",
            150 + 193,
            index * this.lineHeight() + 5,
            179,
            "left",
            10
          );
        }
      }
      if (post) {
      }
    };
    return Window_LeoStatus;
  })(Window_Base);
  Nore.Window_LeoStatus = Window_LeoStatus;
  var Window_Gold2 = /** @class */ (function (_super) {
    __extends(Window_Gold2, _super);
    function Window_Gold2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_Gold2.prototype.initialize = function (r) {
      _super.prototype.initialize.call(this, r);
      this.refreshBg();
      this.frameVisible = false;
      this.backOpacity = 0;
      this.contents.outlineColor = "rgba(0, 0, 0, 0.8)";
      this.contents.outlineWidth = 5;
      this._isWindow = false;
    };
    Window_Gold2.prototype.refreshBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("menu2");
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(430, 0, 270, 300)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -4;
      sprite.y = -4;
      this._contentsBackSprite.addChild(sprite);
      if (ConfigManager.en) {
        var texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(480, 323, 150, 72)
        );
        var sprite = new PIXI.Sprite(texture);
        sprite.x = 30;
        sprite.y = 112;
        this._contentsBackSprite.addChild(sprite);
      }
    };
    Window_Gold2.prototype.drawCurrencyValue = function (
      value,
      unit,
      x,
      y,
      width
    ) {
      width = 128;
      this._windowContentsSprite.removeChildren();
      this.resetTextColor();
      //this.drawText(value, x, y, width  - 6, "right");
      this.drawNumber(value, 80, 193, width - 6, "right", 13);
      this.drawNumber($gameSystem.day(), 30, 121, 100, "right", 6);
    };
    return Window_Gold2;
  })(Window_Gold);
  Nore.Window_Gold2 = Window_Gold2;
})(Nore || (Nore = {}));
