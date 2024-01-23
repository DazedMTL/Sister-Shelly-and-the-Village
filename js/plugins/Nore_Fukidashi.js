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
var _Game_Message_prototype_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function () {
  _Game_Message_prototype_clear.call(this);
  this._gizagiza = false;
};
Game_Message.prototype.gizagiza = function () {
  return this._gizagiza;
};
Game_Message.prototype.setGizagiza = function (b) {
  this._gizagiza = b;
};
Game_Interpreter.prototype.command101 = function (params) {
  if ($gameMessage.isBusy()) {
    return false;
  }
  $gameMessage.setFaceImage(params[0], params[1]);
  $gameMessage.setBackground(params[2]);
  $gameMessage.setPositionType(params[3]);
  $gameMessage.setSpeakerName(params[4]);
  $gameMessage.setGizagiza(params[5]);
  while (this.nextEventCode() === 401) {
    // Text data
    this._index++;
    $gameMessage.add(this.currentCommand().parameters[0]);
  }
  switch (this.nextEventCode()) {
    case 102: // Show Choices
      this._index++;
      this.setupChoices(this.currentCommand().parameters);
      break;
    case 103: // Input Number
      this._index++;
      this.setupNumInput(this.currentCommand().parameters);
      break;
    case 104: // Select Item
      this._index++;
      this.setupItemChoice(this.currentCommand().parameters);
      break;
  }
  this.setWaitMode("message");
  return true;
};
var Window_NormalMessage = /** @class */ (function (_super) {
  __extends(Window_NormalMessage, _super);
  function Window_NormalMessage() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this._backType = -1;
    return _this;
  }
  Window_NormalMessage.prototype.initialize = function (rect) {
    _super.prototype.initialize.call(this, rect);
    this.frameVisible = false;
    this.backOpacity = 0;
  };
  Window_NormalMessage.prototype._createAllParts = function () {
    this._createContainer();
    this.createBgContainer();
    this._createBackSprite();
    this._createFrameSprite();
    this._createClientArea();
    this._createContentsBackSprite();
    this._createCursorSprite();
    this._createContentsSprite();
    this._createArrowSprites();
    this._createPauseSignSprites();
  };
  Window_NormalMessage.prototype.createBgContainer = function () {
    this._bgContainer = new PIXI.Sprite();
    this._container.addChild(this._bgContainer);
    this.updateBackType();
  };
  Window_NormalMessage.prototype.updateBackType = function () {
    if (this._backType === $gameVariables.value(18)) {
      return;
    }
    this._bgContainer.destroyAndRemoveChildren();
    this._backType = $gameVariables.value(18);
    switch (this._backType) {
      case 0:
        this.setBack1();
        break;
      case 1:
      case 2:
        this.setBack2();
        break;
      case 3:
        this.setBack3();
        break;
      default:
        this.setBack3();
        break;
    }
  };
  Window_NormalMessage.prototype.setBack1 = function () {
    var baseTexture2 = Nore.getSystemBaseTexture("text_window");
    var texture = new PIXI.Texture(baseTexture2, new Rectangle(0, 0, 808, 200));
    var sprite = new PIXI.Sprite(texture);
    sprite.x = -2;
    sprite.y = -12;
    this._bgContainer.addChild(sprite);
  };
  Window_NormalMessage.prototype.setBack2 = function () {
    var baseTexture2 = Nore.getSystemBaseTexture("text_window");
    var texture = new PIXI.Texture(
      baseTexture2,
      new Rectangle(0, 200, 728, 200)
    );
    var sprite = new PIXI.Sprite(texture);
    sprite.x = -2;
    sprite.y = -12;
    this._bgContainer.addChild(sprite);
  };
  Window_NormalMessage.prototype.setBack3 = function () {
    var baseTexture2 = Nore.getSystemBaseTexture("text_window");
    var texture = new PIXI.Texture(
      baseTexture2,
      new Rectangle(0, 600, 728, 200)
    );
    var sprite = new PIXI.Sprite(texture);
    sprite.x = -2;
    sprite.y = -12;
    this._bgContainer.addChild(sprite);
  };
  Window_NormalMessage.prototype.update = function () {
    if ($gameSwitches.value(17)) {
      this.visible = false;
      this._lastInvisible = true;
      return;
    }
    if (this._lastInvisible) {
      this._lastInvisible = false;
      this.visible = true;
    }
    _super.prototype.update.call(this);
    if (this.isOpen()) {
      if ($gameTemp.isMessageVisible()) {
        this.visible = true;
        this._nameBoxWindow.visible = true;
      } else {
        this.visible = false;
        this._nameBoxWindow.visible = false;
      }
    }
    this.updateX();
    this.updateWidth();
    this.updateBackType();
  };
  Window_NormalMessage.prototype.updateX = function () {
    switch ($gameVariables.value(18)) {
      case 0:
        this.x = 234;
        break;
      case 1:
        this.x = 0;
        break;
      case 2:
        this.x = 630;
        break;
      case 3:
        this.x = 0;
        break;
      case 4:
        this.x = 730;
        break;
    }
  };
  Window_NormalMessage.prototype.updateWidth = function () {
    if (this.width != this.windowWidth()) {
      this.width = this.windowWidth();
    }
  };
  Window_NormalMessage.prototype.lineHeight = function () {
    return 34;
  };
  Window_NormalMessage.prototype.windowWidth = function () {
    switch ($gameVariables.value(18)) {
      case 0:
        return 728;
      case 1:
      case 2:
        return 628;
      case 3:
        return 550;
      case 4:
        return 528;
    }
  };
  Window_NormalMessage.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 24;
    this.resetTextColor();
  };
  Window_NormalMessage.prototype.newLineX = function (textState) {
    var faceExists = $gameMessage.faceName() !== "";
    var faceWidth = ImageManager.faceWidth;
    var spacing = 20;
    var margin = faceExists ? faceWidth + spacing : 4;
    var offset = 5;
    switch (this._backType) {
      case 0:
        offset = 45;
        break;
    }
    return textState.rtl ? this.innerWidth - margin : margin + offset;
  };
  Window_NormalMessage.prototype.newPage = function (textState) {
    this.contents.clear();
    this.resetFontSettings();
    this.clearFlags();
    this.updateSpeakerName();
    this.loadMessageFace();
    textState.x = textState.startX;
    textState.y = 8;
    textState.height = this.calcTextHeight(textState);
  };
  Window_NormalMessage.prototype._refreshPauseSign = function () {
    var sx = 144;
    var sy = 96;
    var p = 24;
    this._pauseSignSprite.bitmap = ImageManager.loadSystem("name_window");
    this._pauseSignSprite.anchor.x = 0.5;
    this._pauseSignSprite.anchor.y = 1;
    this._pauseSignSprite.move(this.centerX(), this._height);
    this._pauseSignSprite.setFrame(350, 0, 30, 30);
    this._pauseSignSprite.alpha = 0;
  };
  Window_NormalMessage.prototype.centerX = function () {
    switch ($gameVariables.value(18)) {
      case 0:
        return 400;
      case 1:
      case 2:
        return 360;
      case 3:
        return 300;
      case 4:
        return 280;
    }
  };
  Window_NormalMessage.prototype._updatePauseSign = function () {
    var sprite = this._pauseSignSprite;
    var x = Math.floor(this._animationCount / 16) % 2;
    var y = Math.floor(this._animationCount / 16 / 2) % 2;
    var sx = 144;
    var sy = 96;
    var p = 24;
    if (!this.pause) {
      sprite.alpha = 0;
    } else if (sprite.alpha < 1) {
      sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
    }
    this._pauseSignSprite.move(this.centerX(), this._height + y);
    //sprite.setFrame(sx + x * p, sy + y * p, p, p);
    sprite.visible = this.isOpen();
  };
  return Window_NormalMessage;
})(Window_Message);
var BitmapNoOutline = /** @class */ (function (_super) {
  __extends(BitmapNoOutline, _super);
  function BitmapNoOutline() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  BitmapNoOutline.prototype._drawTextOutline = function (
    text,
    tx,
    ty,
    maxWidth
  ) {};
  return BitmapNoOutline;
})(Bitmap);
var Window_Fukidashi = /** @class */ (function (_super) {
  __extends(Window_Fukidashi, _super);
  function Window_Fukidashi() {
    var _this = _super.call(this, new Rectangle(800, 0, 400, 200)) || this;
    _this.backOpacity = 0;
    _this.frameVisible = false;
    _this.refreshBack(null);
    _this.createFadeSprite();
    return _this;
  }
  Window_Fukidashi.prototype.createFadeSprite = function () {
    this._fadeSprite = new ScreenSprite();
    this.addChild(this._fadeSprite);
  };
  Window_Fukidashi.prototype.createContents = function () {
    var width = this.contentsWidth();
    var height = this.contentsHeight();
    this.destroyContents();
    this.contents = new BitmapNoOutline(width, height);
    this.contentsBack = new Bitmap(width, height);
    this.resetFontSettings();
  };
  Window_Fukidashi.prototype._createFrameSprite = function () {
    _super.prototype._createFrameSprite.call(this);
    this._bgSprite = new Sprite();
    this._container.addChild(this._bgSprite);
  };
  Window_Fukidashi.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 20;
    this.contents.fontBold = true;
    this.resetTextColor();
  };
  Window_Fukidashi.prototype.resetTextColor = function () {
    this.changeTextColor(ColorManager.textColor(15));
    this.changeOutlineColor(ColorManager.normalColor());
  };
  Window_Fukidashi.prototype.refreshBack = function (text) {
    this._bgSprite.removeChildren();
    var baseTexture = this.getBaseTexture();
    var texture = new PIXI.Texture(baseTexture);
    var type = 0;
    if ($gameMessage.gizagiza()) {
      type = 3;
    } else if (!$gameMessage.speakerName()) {
      type = 2;
    } else if (text && text.indexOf("（") == 0) {
      type = 1;
      this.changeOutlineColor("#bbb");
    } else {
      this.changeOutlineColor(ColorManager.normalColor());
    }
    texture.frame = new PIXI.Rectangle(
      512 * (type % 2),
      384 * Math.floor(type / 2),
      512,
      384
    );
    var sprite = new PIXI.Sprite(texture);
    sprite.x = -80;
    sprite.y = -80;
    this._bgSprite.addChild(sprite);
  };
  Window_Fukidashi.prototype.getBaseTexture = function () {
    var baseTexture = PIXI.utils.BaseTextureCache["system/fukidashi"];
    if (!baseTexture) {
      var bitmap = ImageManager.loadSystem("fukidashi");
      if (!bitmap.isReady()) {
        return;
      }
      baseTexture = new PIXI.BaseTexture(bitmap._image);
      baseTexture.imageUrl = "system/fukidashi";
      PIXI.utils.BaseTextureCache["system/fukidashi"] = baseTexture;
    }
    return baseTexture;
  };
  Window_Fukidashi.prototype.updatePlacement = function () {};
  Window_Fukidashi.prototype.update = function () {
    if (!$gameSwitches.value(17)) {
      this.visible = false;
      return;
    }
    _super.prototype.update.call(this);
    this.visible = true;
    //this.opacity = $gameScreen.brightness();
    this._fadeSprite.opacity = 255 - $gameScreen.brightness();
    this.x = 800;
  };
  Window_Fukidashi.prototype.synchronizeNameBox = function () {};
  Window_Fukidashi.prototype.isAnySubWindowActive = function () {
    return false;
  };
  Window_Fukidashi.prototype.updateSpeakerName = function () {};
  Window_Fukidashi.prototype.startMessage = function () {
    var text = $gameMessage.allText();
    var textState = this.createTextState(text, 0, 0, 0);
    textState.x = this.newLineX(textState);
    textState.startX = textState.x;
    this._textState = textState;
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.refreshBack(text);
    this.open();
  };
  Window_Fukidashi.prototype.terminateMessage = function () {
    //this.close();
    $gameMessage.clear();
  };
  Window_Fukidashi.prototype.newLineX = function (textState) {
    var faceExists = $gameMessage.faceName() !== "";
    var faceWidth = ImageManager.faceWidth;
    var spacing = 20;
    var margin = faceExists ? faceWidth + spacing : 4;
    return textState.rtl ? this.innerWidth - margin : margin + 50;
  };
  return Window_Fukidashi;
})(Window_Message);
Scene_Message.prototype.createMessageWindow = function () {
  var rect = this.messageWindowRect();
  this._messageWindow = new Window_NormalMessage(rect);
  this.addWindow(this._messageWindow);
};
var Window_NameBox2 = /** @class */ (function (_super) {
  __extends(Window_NameBox2, _super);
  function Window_NameBox2() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this._name = "";
    _this._name2 = "";
    _this._backType = -1;
    return _this;
  }
  Window_NameBox2.prototype.initialize = function () {
    _super.prototype.initialize.call(this);
    this.frameVisible = false;
    this.backOpacity = 0;
    this._isWindow = false;
  };
  Window_NameBox2.prototype.refresh = function () {
    this.updateBackType();
    var rect = this.baseTextRect();
    this.contents.clear();
    this.contents.outlineWidth = 6;
    this.drawText(this._name2, rect.x - 4, rect.y, this.calcWidth(), "center");
  };
  Window_NameBox2.prototype.setName = function (name) {
    var _this = this;
    if (this._name !== name) {
      this._name = name;
      var text = this._name;
      if (text) {
        text = text.replace(/\\/g, "\x1b");
        text = text.replace(/\x1b\x1b/g, "\\");
        text = text.replace(/\x1bV\[(\d+)\]/gi, function (_, p1) {
          return $gameVariables.value(parseInt(p1));
        });
        text = text.replace(/\x1bV\[(\d+)\]/gi, function (_, p1) {
          return $gameVariables.value(parseInt(p1));
        });
        text = text.replace(/\x1bN\[(\d+)\]/gi, function (_, p1) {
          return _this.actorName(parseInt(p1));
        });
        text = text.replace(/\x1bP\[(\d+)\]/gi, function (_, p1) {
          return _this.partyMemberName(parseInt(p1));
        });
        text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
        this._name2 = text;
      } else {
        this._name2 = "";
      }
      this.refresh();
    }
  };
  Window_NameBox2.prototype.calcWidth = function () {
    switch (this._backType) {
      case 0:
        return 166;
      case 3:
        return 160; // シェリー
      case 1:
        return 180;
      case 4:
        return 258;
      default:
        return 230;
    }
  };
  Window_NameBox2.prototype.itemPadding = function () {
    return 18;
  };
  Window_NameBox2.prototype.updatePlacement = function () {
    this.width = 290;
    this.height = this.windowHeight();
    var messageWindow = this._messageWindow;
    if ($gameMessage.isRTL()) {
      this.x = messageWindow.x + messageWindow.width - this.width;
    } else {
      this.x = messageWindow.x;
    }
    if (messageWindow.y > 0) {
      this.y = messageWindow.y - this.height;
    } else {
      this.y = messageWindow.y + messageWindow.height;
    }
    this.y += 20;
  };
  Window_NameBox2.prototype._createAllParts = function () {
    this._createContainer();
    this.createBgContainer();
    this._createBackSprite();
    this._createFrameSprite();
    this._createClientArea();
    this._createContentsBackSprite();
    this._createCursorSprite();
    this._createContentsSprite();
    this._createArrowSprites();
    this._createPauseSignSprites();
  };
  Window_NameBox2.prototype.createBgContainer = function () {
    this._bgContainer = new PIXI.Sprite();
    this._container.addChild(this._bgContainer);
    this.updateBackType();
  };
  Window_NameBox2.prototype.updateBackType = function () {
    if (this._backType === this.calcBackType()) {
      return;
    }
    this._bgContainer.destroyAndRemoveChildren();
    this._backType = this.calcBackType();
    if (this._backType < 0) {
      return;
    }
    var baseTexture2 = Nore.getSystemBaseTexture("name_window");
    var texture = new PIXI.Texture(
      baseTexture2,
      new Rectangle(0, 48 * this._backType, 328, 48)
    );
    var sprite = new PIXI.Sprite(texture);
    sprite.x = -2;
    sprite.y = 7;
    this._bgContainer.addChild(sprite);
  };
  Window_NameBox2.prototype.calcBackType = function () {
    if (!this._name2) {
      return -1;
    }
    if (this._name2 == $gameActors.actor(5).name()) {
      return 3;
    }
    if (this._name2.length <= 5) {
      return 0;
    }
    if (this._name2.length <= 6) {
      return 1;
    }
    if (this._name2.length >= 15) {
      return 4;
    }
    return 2;
  };
  return Window_NameBox2;
})(Window_NameBox);
