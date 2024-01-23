Window_TitleCommand.prototype.initialize = function (rect) {
  Window_Command.prototype.initialize.call(this, rect);
  this.openness = 0;
  this.opacity = 0;
  this.contentsOpacity = 0;
  this.backOpacity = 0;
  this.frameVisible = false;
  this.selectLast();
};
var Window_TitleCommand_prototype_itemRect =
  Window_TitleCommand.prototype.itemRect;
Window_TitleCommand.prototype.itemRect = function (index) {
  var rect = Window_TitleCommand_prototype_itemRect.call(this, index);
  rect.height += 10;
  return rect;
};
Window_TitleCommand.prototype.windowWidth = function () {
  return 860;
};
Window_TitleCommand.prototype.lineHeight = function () {
  return 44;
};
Window_TitleCommand.prototype.drawBackgroundRect = function (rect) {};
Scene_Title.prototype.commandWindowRect = function () {
  var offsetX = $dataSystem.titleCommandWindow.offsetX;
  var offsetY = $dataSystem.titleCommandWindow.offsetY;
  var ww = this.mainCommandWidth() + 40;
  var wh = this.calcWindowHeight(5, true) + 40;
  var wx = (Graphics.boxWidth - ww) / 2 + offsetX + 240;
  var wy = 436 + offsetY;
  return new Rectangle(wx, wy, ww, wh);
};
Window_TitleCommand.prototype.setCursorRect = function (x, y, width, height) {
  var baseTexture;
  if (!ConfigManager.en) {
    baseTexture = PIXI.utils.BaseTextureCache["system/title02"];
    if (!baseTexture) {
      var bitmap = ImageManager.loadSystem("title02");
      baseTexture = new PIXI.BaseTexture(bitmap._image);
      baseTexture.resource.url = "system/title02";
      PIXI.utils.BaseTextureCache["system/title02"] = baseTexture;
    }
  } else {
    baseTexture = PIXI.utils.BaseTextureCache["system/title02_en"];
    if (!baseTexture) {
      var bitmap = ImageManager.loadSystem("title02_en");
      baseTexture = new PIXI.BaseTexture(bitmap._image);
      baseTexture.resource.url = "system/title02_en";
      PIXI.utils.BaseTextureCache["system/title02_en"] = baseTexture;
    }
  }
  this._windowContentsSprite.removeChildren();
  var rect = new Rectangle(x, y, width + 45, height);
  var sprite = new PIXI.Sprite(new PIXI.Texture(baseTexture, rect));
  sprite.x = 14;
  sprite.y = this.index() * 52 + 11;
  this._windowContentsSprite.addChild(sprite);
};
Scene_Title.prototype.getBaseTexture = function () {
  var baseTexture;
  if (!ConfigManager.en) {
    baseTexture = PIXI.utils.BaseTextureCache["system/title01"];
    if (!baseTexture) {
      var bitmap = ImageManager.loadSystem("title01");
      baseTexture = new PIXI.BaseTexture(bitmap._image);
      baseTexture.resource.url = "system/title01";
      PIXI.utils.BaseTextureCache["system/title01"] = baseTexture;
    }
  } else {
    baseTexture = PIXI.utils.BaseTextureCache["system/title01_en"];
    if (!baseTexture) {
      var bitmap = ImageManager.loadSystem("title01_en");
      baseTexture = new PIXI.BaseTexture(bitmap._image);
      baseTexture.resource.url = "system/title01_en";
      PIXI.utils.BaseTextureCache["system/title01_en"] = baseTexture;
    }
  }
  return baseTexture;
};
Scene_Title.prototype.createBackground = function () {
  this._backSprite1 = new Sprite(
    ImageManager.loadTitle1($dataSystem.title1Name)
  );
  this._backSprite2 = new Sprite(
    ImageManager.loadTitle2($dataSystem.title2Name)
  );
  this.addChild(this._backSprite1);
  this.addChild(this._backSprite2);
  var texture = this.getBaseTexture();
  var s = new PIXI.Sprite(new PIXI.Texture(texture));
  this.addChild(s);
  s.x = 520;
  s.y = 486;
  this._rightTachie = new Nore.Sprite_RightTachie(true);
  var filter3 = new PIXI.filters.OutlineFilter(3, 0xceb397);
  var filter4 = new PIXI.filters.OutlineFilter(5, 0xffffff);
  this._rightTachie.filters = [filter3, filter4];
  this._rightTachie.x += 180;
  this._rightTachie.y += 80;
  this.addChild(this._rightTachie);
};
