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
 *
 *
 * @command Show
 * @arg id
 * @text 表示
 * @des 表示
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_GaugeWindow";
  PluginManager.registerCommand(pluginName, "Show", function (args) {
    var id = args.id;
    $gameTemp.addSeiheki(parseInt(id));
  });
  var Window_GaugeProgress = /** @class */ (function (_super) {
    __extends(Window_GaugeProgress, _super);
    function Window_GaugeProgress(gaugeLog, y, callback) {
      if (y === void 0) {
        y = 300;
      }
      var _this = this;
      var x = 180;
      if ($gameSwitches.value(259)) {
        x = 80;
      }
      _this = _super.call(this, new Rectangle(x, y, 580, 90)) || this;
      _this._gaugeLog = gaugeLog;
      _this.padding = 3;
      _this._updateContents();
      _this.initGauge();
      _this._item = $dataArmors[gaugeLog.id];
      _this.backOpacity = 255;
      _this.opacity = 0;
      _this.contentsOpacity = 0;
      _this.refresh();
      _this.appearFrame = 12;
      _this.waitFrame = 150;
      _this.eraseFrame = 30;
      _this._callback = callback;
      _this.frameVisible = false;
      return _this;
    }
    Window_GaugeProgress.prototype.loadWindowskin = function () {
      this.windowskin = ImageManager.loadSystem("Window");
    };
    Window_GaugeProgress.prototype.refresh = function () {
      this.contents.clear();
      var item = this._item;
      var xx = 40;
      var yy = 30;
      this.contents.textColor = "#ff88aa";
      this.contents.fontSize = 24;
      var name = item.name;
      if (ConfigManager.en) {
        name = item.meta["en"];
      }
      AudioManager.playSe({ name: "Chime2", volume: 80, pitch: 100, pan: 0 });
      this.contents.drawText(TextManager.gaugeUp, xx - 20, 0, 300, 30, "left");
      this.contents.textColor = "#ffffff";
      this.contents.fontSize = 30;
      this.drawIcon(item.iconIndex, 2 + xx, 1 + yy);
      this.drawText(name, xx + 40, 1 + yy, 160, "left");
      /*var text = item.description;
            if (item.meta && item.meta.get) {
                text = item.meta.get;
            }
            this.drawTextEx(text, 343 + xx, 1 + yy, 600);
            */
      var rate = Math.round(
        ((this._gaugeLog.end - this._gaugeLog.start) * 100) / this._gaugeLog.max
      );
      this.drawTextEx("+%1%".format(rate), 215 + xx, 1 + yy, 600);
    };
    Window_GaugeProgress.prototype.update = function () {
      _super.prototype.update.call(this);
      this.appearFrame--;
      if (this.appearFrame > 0) {
        this.opacity += 25;
        this.contentsOpacity += 25;
        return;
      }
      this.waitFrame--;
      if (this.waitFrame > 0) {
        return;
      }
      this.eraseFrame--;
      this.opacity -= 25;
      this.contentsOpacity -= 25;
      this._gauge.opacity = this.opacity;
      this.y -= 3;
      if (this.eraseFrame === 0) {
        this._callback();
      }
    };
    Window_GaugeProgress.prototype.initGauge = function () {
      this._gauge = new Nore.Sprite_GaugeMedal(
        this._item,
        this._gaugeLog.start,
        this._gaugeLog.max
      );
      this._gauge.x = 270;
      this._gauge.y = 35;
      this._gauge.updateTargetValue(this._gaugeLog.end, this._gaugeLog.max);
      this.addChild(this._gauge);
    };
    return Window_GaugeProgress;
  })(Window_Base);
  Nore.Window_GaugeProgress = Window_GaugeProgress;
  Game_Temp.prototype.addGauge = function (log) {
    this._gaugeLog = this._gaugeLog || [];
    this._gaugeLog.push(log);
  };
  Game_Temp.prototype.nextGaugeLog = function () {
    this._gaugeLog = this._gaugeLog || [];
    if (this._gaugeLog.length === 0) {
      return null;
    }
    return this._gaugeLog.shift();
  };
  var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
  Scene_Map.prototype.updateMain = function () {
    _Scene_Map_updateMain.call(this);
    var gaugeLog = $gameTemp.nextGaugeLog();
    this._gaugeWindowCount = this._gaugeWindowCount || 0;
    if (gaugeLog) {
      var self = this;
      var window_1;
      var onFinish = function () {
        //window.returnCanvas();
        self._windowLayer.removeChild(window_1);
        window_1.destroy({ texture: true, children: true });
        self._gaugeWindowCount--;
      };
      window_1 = new Window_GaugeProgress(
        gaugeLog,
        480 - self._gaugeWindowCount * 90,
        onFinish
      );
      this._gaugeWindowCount++;
      this.addWindow(window_1);
    }
  };
  Scene_Map.prototype.getLogWindowY = function () {
    for (var i = 0; i < 6; i++) {
      var found = false;
      for (var _i = 0, _a = this._logWindowList; _i < _a.length; _i++) {
        var log = _a[_i];
        if (log.yIndex === i) {
          found = true;
          break;
        }
      }
      if (!found) {
        return i;
      }
    }
    return 0;
  };
})(Nore || (Nore = {}));
var GaugeLog = /** @class */ (function () {
  function GaugeLog(id, start, end, max) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.max = max;
  }
  return GaugeLog;
})();
