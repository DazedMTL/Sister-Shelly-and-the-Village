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
var GainItem = /** @class */ (function () {
  function GainItem(type, id, count) {
    this.type = type;
    this.id = id;
    this.count = count;
  }
  return GainItem;
})();
var DegeonProfits = /** @class */ (function () {
  function DegeonProfits() {
    this._gainItems = [];
  }
  DegeonProfits.prototype.gainItem = function (id, count) {
    this._gainItems.push(new GainItem(1, id, count));
    $gameParty.gainItem($dataItems[id], count);
    $gameTemp.addItemLog($dataItems[id]);
    p(id + " " + count);
  };
  return DegeonProfits;
})();
var Nore;
(function (Nore) {
  var Scene_DungeonResult = /** @class */ (function (_super) {
    __extends(Scene_DungeonResult, _super);
    function Scene_DungeonResult() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    return Scene_DungeonResult;
  })(Scene_MenuBase);
  Nore.Scene_DungeonResult = Scene_DungeonResult;
  var Window_DungeonResult = /** @class */ (function (_super) {
    __extends(Window_DungeonResult, _super);
    function Window_DungeonResult() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    return Window_DungeonResult;
  })(Window_Selectable);
})(Nore || (Nore = {}));
