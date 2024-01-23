/*:ja
 * @target MZ
 */
var Nore;
(function (Nore) {
  Sprite_Gauge.prototype.bitmapWidth = function () {
    return 308;
  };
  var _Sprite_Gauge_prototype_currentValue =
    Sprite_Gauge.prototype.currentValue;
  Sprite_Gauge.prototype.currentValue = function () {
    if (this._battler) {
      switch (this._statusType) {
        case "fame":
          return $gameActors.mainActor().fame;
        case "frustration":
          return $gameActors.mainActor().zasetsu;
      }
    }
    return _Sprite_Gauge_prototype_currentValue.call(this);
  };
  var _Sprite_Gauge_prototype_currentMaxValue =
    Sprite_Gauge.prototype.currentMaxValue;
  Sprite_Gauge.prototype.currentMaxValue = function () {
    if (this._battler) {
      switch (this._statusType) {
        case "fame":
          return $gameActors.mainActor().maxFame;
        case "frustration":
          return $gameActors.mainActor().maxZasetsu;
      }
    }
    return _Sprite_Gauge_prototype_currentMaxValue.call(this);
  };
  Sprite_Gauge.prototype.drawValue = function () {
    var currentValue = this.currentValue();
    var width = this.bitmapWidth();
    var height = this.bitmapHeight();
    this.setupValueFont();
    this.bitmap.drawText(
      Math.floor(currentValue),
      0,
      0,
      width,
      height,
      "right"
    );
  };
  var Sprite_Gauge_prototype_label = Sprite_Gauge.prototype.label;
  Sprite_Gauge.prototype.label = function () {
    switch (this._statusType) {
      case "fame":
        return TextManager.fame;
      case "frustration":
        return TextManager.frustration;
    }
    return Sprite_Gauge_prototype_label.call(this);
  };
  Sprite_Gauge.prototype.gaugeX = function () {
    return this._statusType === "time" ? 0 : 100;
  };
  function getSystemBaseTexture(name) {
    var baseTexture = PIXI.utils.BaseTextureCache["system/" + name];
    if (!baseTexture) {
      var bitmap = ImageManager.loadSystem(name);
      if (!bitmap.isReady()) {
        return;
      }
      baseTexture = new PIXI.BaseTexture(bitmap._image);
      baseTexture.resource.url = "system/" + name;
      PIXI.utils.BaseTextureCache["system/" + name] = baseTexture;
    }
    return baseTexture;
  }
  Nore.getSystemBaseTexture = getSystemBaseTexture;
  var Window_prototype__createContentsSprite =
    Window.prototype._createContentsSprite;
  Window.prototype._createContentsSprite = function () {
    this._windowContentsBackSprite = new Sprite();
    this._clientArea.addChild(this._windowContentsBackSprite);
    this._windowContentsBackSprite2 = new Sprite();
    this._clientArea.addChild(this._windowContentsBackSprite2);
    Window_prototype__createContentsSprite.call(this);
    this._windowContentsSprite = new Sprite();
    this._windowContentsSprite.x = -12;
    this._windowContentsSprite.y = -12;
    this._clientArea.addChild(this._windowContentsSprite);
  };
})(Nore || (Nore = {}));
