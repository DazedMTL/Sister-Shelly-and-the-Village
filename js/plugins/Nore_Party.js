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
var GUILD_RANK = [300, 2000, 5000, 15000];
var Game_RogueParty = /** @class */ (function (_super) {
  __extends(Game_RogueParty, _super);
  function Game_RogueParty() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Game_RogueParty.prototype.onNextFloor = function () {
    for (var _i = 0, _a = this.armors(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (a.meta["floorHpPlus"]) {
        var plus = parseInt(a.meta["floorHpPlus"]);
        $gameActors.mainActor().gainHp(plus);
      }
    }
  };
  Game_RogueParty.prototype.discount = function () {
    if ($gameSwitches.value(345)) {
      // 結婚後
      return Math.min(35 + $gameSystem.countNakadashi(13), 75);
    }
    if ($gameSystem.intimacy(13).intimacy() >= 90) {
      return 35;
    }
    if ($gameSystem.intimacy(13).intimacy() >= 90) {
      return 30;
    }
    if ($gameSwitches.value(929)) {
      return 25;
    }
    if ($gameSwitches.value(930)) {
      return 20;
    }
    if ($gameSwitches.value(925)) {
      return 15;
    }
    if ($gameSwitches.value(914)) {
      return 10;
    }
    if ($gameSwitches.value(910)) {
      return 5;
    }
    return 0;
  };
  Game_RogueParty.prototype.gainGold = function (n) {
    _super.prototype.gainGold.call(this, n);
    if ($gameSwitches.value(1)) {
      $gameTemp.gainGold(n);
    }
  };
  Game_RogueParty.prototype.ninshinRate = function () {
    var rate = 100;
    for (var _i = 0, _a = this.armors(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (a && a.meta["ninshin"]) {
        var n = parseInt(a.meta["ninshin"]);
        if (n > 0) {
          rate += n;
        }
      }
    }
    p("妊娠rate:" + rate);
    return rate / 100;
  };
  return Game_RogueParty;
})(Game_Party);
