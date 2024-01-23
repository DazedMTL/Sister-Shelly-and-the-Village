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
 * @command AddEroAction
 * @text エロアクションの追加
 * @des エロアクションの追加
 * @arg id
 * @text エロアクションID
 * @desc エロアクションID
 *
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Jusei";
  PluginManager.registerCommand(pluginName, "pos", function (args) {
    var x = Math.trunc(args.x);
    var y = Math.trunc(args.y);
    var reverse = args.reverse;
    $gameVariables.setValue(45, x);
    $gameVariables.setValue(46, y);
    $gameSwitches.setValue(47, reverse);
  });
  var _Scene_Map_prototype_createDisplayObjects =
    Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function () {
    _Scene_Map_prototype_createDisplayObjects.call(this);
    this.createJusei();
  };
  Scene_Map.prototype.createJusei = function () {
    var juseiUi = new Sprite_Jusei();
    this._battleUi = juseiUi;
    this.addChild(juseiUi);
  };
  var Sprite_Jusei = /** @class */ (function (_super) {
    __extends(Sprite_Jusei, _super);
    function Sprite_Jusei() {
      var _this = _super.call(this) || this;
      _this._fadeOpacity = 0;
      _this._wait = 0;
      _this._fadeOut = false;
      _this.bitmap = ImageManager.loadSystem("jusei_1");
      _this.x = $gameVariables.value(45);
      _this.y = $gameVariables.value(46);
      _this.update();
      return _this;
    }
    Sprite_Jusei.prototype.update = function () {
      var lastVisible = this.visible;
      this.visible = this.updateVisible();
      if (this.visible && !lastVisible) {
        AudioManager.playSe({ name: "Magic1", volume: 85, pitch: 100, pan: 0 });
      }
      this.updatePosition();
      this.updateFade();
      _super.prototype.update.call(this);
    };
    Sprite_Jusei.prototype.updateVisible = function () {
      if ($gameVariables.value(45) == 0 && $gameVariables.value(46) == 0) {
        return false;
      }
      if (!$gameSwitches.value(26)) {
        return false;
      }
      return $gameSwitches.value(46);
    };
    Sprite_Jusei.prototype.updatePosition = function () {
      if (this.x != $gameVariables.value(45)) {
        this.x = $gameVariables.value(45);
      }
      if (this.y != $gameVariables.value(46)) {
        this.y = $gameVariables.value(46);
      }
      if ($gameSwitches.value(47)) {
        this.scale.x = -1;
      } else {
        this.scale.x = 1;
      }
    };
    Sprite_Jusei.prototype.updateFade = function () {
      if (!this.visible) {
        return;
      }
      if (this._fadeOut) {
        if (this._fadeOpacity > 0) {
          this._fadeOpacity -= 4;
          this.opacity = this._fadeOpacity;
          if (this._fadeOpacity <= 0) {
            this.visible = false;
            $gameSwitches.setValue(46, false);
            this._fadeOut = false;
          }
        }
        return;
      }
      if (this._fadeOpacity < 255) {
        this._fadeOpacity += 4;
        this.opacity = this._fadeOpacity;
        if (this._fadeOpacity >= 255) {
          this._wait = 60;
        }
      }
      if (this._wait > 0) {
        this._wait--;
        if (this._wait <= 0) {
          if (
            Input.isPressed("ok") ||
            Input.isPressed("control") ||
            TouchInput.rightButton ||
            Input.isPressed("shift") ||
            TouchInput.isPressed()
          ) {
            this._fadeOut = true;
          } else {
            this._wait++;
          }
        }
      }
    };
    return Sprite_Jusei;
  })(Sprite);
  Nore.Sprite_Jusei = Sprite_Jusei;
})(Nore || (Nore = {}));
