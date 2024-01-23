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
var Nore;
(function (Nore) {
  var Spriteset_Map2 = /** @class */ (function (_super) {
    __extends(Spriteset_Map2, _super);
    function Spriteset_Map2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Spriteset_Map2.prototype.createUpperLayer = function () {
      this.createUiWindow();
      _super.prototype.createUpperLayer.call(this);
      this.createDamageManager();
    };
    Spriteset_Map2.prototype.createUiWindow = function () {
      /*this._uiWindow = new Window_RogueUi(new Rectangle(0, 0, 900, 200));
            this.addChild(this._uiWindow);*/
      this._enemyInfoWindow = new Nore.Window_EnemyInfo();
      this.addChild(this._enemyInfoWindow);
      this._actorInfoWindow = new Nore.Window_RogueUi();
      this.addChild(this._actorInfoWindow);
    };
    Spriteset_Map2.prototype.createDamageManager = function () {
      this._damageManager = new Nore.DamageSpriteManager(this);
    };
    Spriteset_Map2.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this._damageManager) {
        this._damageManager.update();
      }
    };
    Spriteset_Map2.prototype.onDamage = function (isEnemy) {
      var battler = null;
      if (isEnemy) {
        battler = Nore.enemy;
      } else {
        battler = $gameActors.actor(4);
      }
      this._damageManager.onResult(isEnemy, battler);
    };
    return Spriteset_Map2;
  })(Spriteset_Map);
  Nore.Spriteset_Map2 = Spriteset_Map2;
  Scene_Map.prototype.createSpriteset = function () {
    if (this._spriteset) {
      this.removeChild(this._spriteset);
      this._spriteset.destroy();
    }
    this._spriteset = new Nore.Spriteset_Map2();
    this.addChild(this._spriteset);
    this._spriteset.update();
  };
})(Nore || (Nore = {}));
