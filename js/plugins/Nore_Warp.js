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
 */
var Nore;
(function (Nore) {
  var PLACE_VAR = 9;
  var WarpCommand;
  (function (WarpCommand) {
    WarpCommand["go"] = "go";
    WarpCommand["upgrade"] = "upgrade";
    WarpCommand["cancel"] = "cancel";
  })((WarpCommand = Nore.WarpCommand || (Nore.WarpCommand = {})));
  var _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    if ($gameSwitches.value(60)) {
      if (this.isMenuEnabled()) {
        if (Input.isTriggered("pagedown")) {
          if (!$gameSwitches.value(1)) {
            SceneManager.push(Scene_DestSelect);
          }
        }
      }
    }
    _Scene_Map_update.call(this);
  };
  var Scene_DestSelect = /** @class */ (function (_super) {
    __extends(Scene_DestSelect, _super);
    function Scene_DestSelect() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_DestSelect.prototype.create = function () {
      SoundManager.playOk();
      _super.prototype.create.call(this);
      this.createBackground();
      this.createDestWindow();
      this.createWindowLayer();
      this.createFadeSprite();
    };
    Scene_DestSelect.prototype.createFadeSprite = function () {
      this._fadeSprite = new ScreenSprite();
      this.addChild(this._fadeSprite);
    };
    Scene_DestSelect.prototype.update = function () {
      _super.prototype.update.call(this);
      $gameScreen.update();
      this._fadeSprite.opacity = 255 - $gameScreen.brightness();
    };
    Scene_DestSelect.prototype.createBackground = function () {
      this._backgroundSprite = SceneManager.backgroundBitmap();
      this.addChild(this._backgroundSprite);
      this._backgroundSprite.alpha = 0.3;
    };
    Scene_DestSelect.prototype.createDestWindow = function () {
      this._destWindow = new Window_DestSelect();
      this._destWindow.setHandler("ok", this.onOk.bind(this));
      this._destWindow.setHandler("change", this.onChange.bind(this));
      this._destWindow.setHandler("cancel", this.onCancel.bind(this));
      this.addChild(this._destWindow);
    };
    Scene_DestSelect.prototype.onWarpCancel = function () {
      this._destWindow.activate();
    };
    Scene_DestSelect.prototype.onOk = function () {
      var item = this._destWindow.item();
      $gameTemp.reserveCommonEvent(38);
      $gameVariables.setValue(40, item);
      this.popScene();
    };
    Scene_DestSelect.prototype.onCancel = function () {
      $gameVariables.setValue(20, 0);
      this.popScene();
    };
    Scene_DestSelect.prototype.onChange = function () {};
    Scene_DestSelect.prototype.start = function () {
      _super.prototype.start.call(this);
      this._destWindow.refresh();
      this._destWindow.activate();
      this._destWindow.select(0);
    };
    return Scene_DestSelect;
  })(Scene_MenuBase);
  Nore.Scene_DestSelect = Scene_DestSelect;
  var Window_DestSelect = /** @class */ (function (_super) {
    __extends(Window_DestSelect, _super);
    function Window_DestSelect() {
      var _this = _super.call(this, new Rectangle(50, 40, 300, 340)) || this;
      _this.makeDestList();
      _this.refresh();
      return _this;
    }
    Window_DestSelect.prototype.makeDestList = function () {
      $gameSwitches.setValue(18, false);
      if (this._destList) {
        return;
      }
      this._destList = [];
      var d = this._destList;
      d.push(Destination.Church);
      d.push(Destination.Inn);
      d.push(Destination.Bakery);
      d.push(Destination.Bar);
      d.push(Destination.WeaponShop);
      d.push(Destination.Tent);
      d.push(Destination.Herborist);
    };
    Window_DestSelect.prototype.windowHeight = function () {
      this.makeDestList();
      return this._destList.length * this.lineHeight() + 18 * 2;
    };
    Window_DestSelect.prototype.item = function () {
      return this._destList[this.index()];
    };
    Window_DestSelect.prototype.drawItem = function (index) {
      var item = this._destList[index];
      var rect = this.itemRect(index);
      if (this.isCurrentPlace(item)) {
        this.changePaintOpacity(false);
      } else {
        this.changePaintOpacity(true);
      }
      this.drawText(getPlaceName(item), rect.x + 36, rect.y, 310, "left");
      this.changePaintOpacity(true);
      /*if (this.isEroEventExists(destId)) {
                this.drawIcon(84, rect.x, rect.y + 2);
            }*/
      //  this.drawIcon(90, rect.x + 28, rect.y + 2);
    };
    Window_DestSelect.prototype.isCurrentPlace = function (item) {
      return false;
      //return $gameVariables.value(PLACE_VAR) == item.id;
    };
    Window_DestSelect.prototype.getDestName = function (destId) {
      return getPlaceName(destId);
    };
    Window_DestSelect.prototype.maxItems = function () {
      if (!this._destList) {
        return 0;
      }
      return this._destList.length;
    };
    Window_DestSelect.prototype.maxCols = function () {
      return 1;
    };
    return Window_DestSelect;
  })(Window_Selectable);
  Nore.Window_DestSelect = Window_DestSelect;
})(Nore || (Nore = {}));
var Destination;
(function (Destination) {
  Destination[(Destination["Church"] = 1)] = "Church";
  Destination[(Destination["Inn"] = 2)] = "Inn";
  Destination[(Destination["Bakery"] = 3)] = "Bakery";
  Destination[(Destination["Bar"] = 4)] = "Bar";
  Destination[(Destination["WeaponShop"] = 5)] = "WeaponShop";
  Destination[(Destination["Tent"] = 6)] = "Tent";
  Destination[(Destination["Herborist"] = 7)] = "Herborist";
})(Destination || (Destination = {}));
