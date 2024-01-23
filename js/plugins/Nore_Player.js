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
var Game_RoguePlayer = /** @class */ (function (_super) {
  __extends(Game_RoguePlayer, _super);
  function Game_RoguePlayer() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Game_RoguePlayer.prototype.turnCount = function () {
    return $gameVariables.value(21);
  };
  Game_RoguePlayer.prototype.locate = function (x, y) {
    _super.prototype.locate.call(this, x, y);
  };
  Game_RoguePlayer.prototype.moveStraight = function (d) {
    _super.prototype.moveStraight.call(this, d);
  };
  /*characterIndex() {
        const actor = $gameActors.actor(1);
        if (actor.outerId == 'c') {
            if (actor.breakId >= 3) {
                return 3;
            }
            return 1;
        }
        if (actor.innerBottomId == 'b') {
            if (actor.breakId >= 3) {
                return 3;
            }
            return 1;
        }
        if (actor.innerBottomId == 'a') {
            return 3;
        }

        return super.characterIndex();
    }*/
  Game_RoguePlayer.prototype.onDamage = function (n) {};
  Game_RoguePlayer.prototype.centerX = function () {
    if ($gameSwitches.value(1)) {
      return 0;
    }
    return _super.prototype.centerX.call(this);
  };
  Game_RoguePlayer.prototype.inAnimation = function () {
    return this._attackAnime > 0;
  };
  Game_RoguePlayer.prototype.isContact = function (x, y) {
    return Math.abs(this.x - x) <= 1 && Math.abs(this.y - y) <= 1;
  };
  Game_RoguePlayer.prototype.rightDir = function () {
    switch (this.direction()) {
      case 2:
        return 4;
      case 4:
        return 8;
      case 8:
        return 6;
      case 6:
        return 2;
    }
    return 0;
  };
  Game_RoguePlayer.prototype.leftDir = function () {
    switch (this.direction()) {
      case 2:
        return 6;
      case 4:
        return 2;
      case 8:
        return 4;
      case 6:
        return 8;
    }
    return 0;
  };
  Game_RoguePlayer.prototype.canMove = function () {
    if ($gameSwitches.value(171)) {
      return false;
    }
    return _super.prototype.canMove.call(this);
  };
  Game_RoguePlayer.prototype.screenY = function () {
    var y = _super.prototype.screenY.call(this);
    if ($gameSwitches.value(206)) {
      return y - 18;
    }
    return y;
  };
  return Game_RoguePlayer;
})(Game_Player);
/*
Game_Player.prototype.realMoveSpeed = function() {
    if ($gameSwitches.value(1)) {
        return 10 + (this.isDashing() ? 1 : 0);
        
    }
    return this._moveSpeed + (this.isDashing() ? 1 : 0);
};*/
