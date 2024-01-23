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
var Game_RogueTemp = /** @class */ (function (_super) {
  __extends(Game_RogueTemp, _super);
  function Game_RogueTemp() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.ninshinDamage = 0;
    _this.taneoya = 0;
    _this._ninshinTotal = 100;
    _this._messageVisible = true;
    _this.eroStatus = null;
    _this.costume = null;
    _this.lastCostume = null;
    _this.history = null;
    _this.lastHistoryIndex = 0;
    _this.bufferedInput = false;
    _this.historyFaceId = 1;
    return _this;
  }
  Game_RogueTemp.prototype.initialize = function () {
    _super.prototype.initialize.call(this);
    this.ignoreFiles = {};
  };
  Game_RogueTemp.prototype.updateBattleCommand = function (b) {
    this._showBattleCommand = b;
  };
  Game_RogueTemp.prototype.isBattleCommand = function () {
    return this._showBattleCommand && !$gameMessage.isBusy();
  };
  Game_RogueTemp.prototype.changeMessageVisible = function () {
    this._messageVisible = !this._messageVisible;
  };
  Game_RogueTemp.prototype.isMessageVisible = function () {
    return this._messageVisible;
  };
  Game_RogueTemp.prototype.upEroInfo = function () {
    this._upEroInfo = this._upEroInfo || new Nore.UpEroInfo();
    return this._upEroInfo;
  };
  Game_RogueTemp.prototype.clearUpEroInfo = function () {
    this._upEroInfo = null;
  };
  Object.defineProperty(Game_RogueTemp.prototype, "ninshinTotal", {
    get: function () {
      return this._ninshinTotal;
    },
    set: function (n) {
      this._ninshinTotal = parseInt(n);
    },
    enumerable: true,
    configurable: true,
  });
  Game_RogueTemp.prototype.addIgnoreFileSet = function (base, index) {
    for (var i = 1; i < 800; i++) {
      var id = i;
      var idString = id + "";
      if (id < 10) {
        idString = "0" + i;
      }
      this.ignoreFiles[base + "_" + idString + "_0" + index] = true;
    }
  };
  Game_RogueTemp.prototype.addIgnoreFiles = function (list) {
    if (!list) {
      return;
    }
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var file = list_1[_i];
      this.ignoreFiles[file] = true;
    }
  };
  Game_RogueTemp.prototype.clearIgnoreFiles = function () {
    this.ignoreFiles = {};
  };
  Game_RogueTemp.prototype.setNextScenario = function (id) {
    this._nextScenario = id;
  };
  Game_RogueTemp.prototype.nextScenario = function () {
    return this._nextScenario;
  };
  Game_RogueTemp.prototype.clearNextScenario = function () {
    this._nextScenario = null;
  };
  Game_RogueTemp.prototype.hasNextScenario = function () {
    return this._nextScenario != null;
  };
  Game_RogueTemp.prototype.showGion = function (id) {
    this.hideGion();
    this.gionId = id;
    var xx = $gameVariables.value(41);
    var yy = $gameVariables.value(42);
    var scale = $gameVariables.value(43) || 100;
    var picId = Nore.GION_PIC_ID;
    if ($gameScreen.picture(picId) && $gameScreen.picture(picId)._name != "") {
      picId++;
    }
    $gameScreen.showPicture(
      picId,
      Nore.gionPrefix + this.gionId,
      0,
      xx,
      yy,
      scale,
      scale,
      255,
      PIXI.BLEND_MODES.NORMAL
    );
  };
  Game_RogueTemp.prototype.hideGion = function () {
    this.gionId = null;
    $gameScreen.erasePicture(Nore.GION_PIC_ID);
    $gameScreen.erasePicture(Nore.GION_PIC_ID + 1);
  };
  Game_RogueTemp.prototype.gainGold = function (n) {
    this._gold = n;
  };
  Game_RogueTemp.prototype.clearGainGold = function () {
    var n = this._gold;
    this._gold = 0;
    return n || 0;
  };
  return Game_RogueTemp;
})(Game_Temp);
