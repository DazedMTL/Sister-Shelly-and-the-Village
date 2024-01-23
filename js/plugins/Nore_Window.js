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
 */
var Nore;
(function (Nore) {
  var Window_Tokimemo = /** @class */ (function (_super) {
    __extends(Window_Tokimemo, _super);
    function Window_Tokimemo() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    return Window_Tokimemo;
  })(Window_Selectable);
  Nore.Window_Tokimemo = Window_Tokimemo;
})(Nore || (Nore = {}));
var _Window_prototype_refreshBack = Window.prototype._refreshBack;
Window.prototype._refreshBack = function () {
  if (this.windowskin == ImageManager.loadSystem("Window")) {
    _Window_prototype_refreshBack.call(this);
    return;
  }
  var m = this._margin;
  var w = Math.max(0, this._width - m * 2);
  var h = Math.max(0, this._height - m * 2);
  var sprite = this._backSprite;
  var tilingSprite = sprite.children[0];
  sprite.bitmap = this._windowskin;
  sprite.setFrame(0, 0, 96, 96);
  sprite.move(m, m);
  sprite.scale.x = w / 96;
  sprite.scale.y = h / 96;
  tilingSprite.bitmap = this._windowskin;
  tilingSprite.setFrame(0, 96, 96, 96);
  tilingSprite.move(2, 2, w - 4, h - 4);
  tilingSprite.scale.x = 96 / (w + 8);
  tilingSprite.scale.y = 96 / (h + 8);
  sprite.setColorTone(this._colorTone);
};
