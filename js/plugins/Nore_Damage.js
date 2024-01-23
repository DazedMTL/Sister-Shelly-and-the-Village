/*:ja
 * @target MZ
 * @author ル
 *
 * @command ShowDamage
 * @text ダメージの表示
 * @des ダメージの表示
 * @arg isEnemy
 * @type boolean
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Damage";
  PluginManager.registerCommand(pluginName, "ShowDamage", function (args) {
    var isEnemy = args.isEnemy == "true";
    SceneManager._scene._spriteset.onDamage(isEnemy);
  });
  Game_Action.prototype.applyCritical = function (damage) {
    return damage * 2;
  };
  Game_Action.prototype.apply = function (target) {
    var result = target.result();
    this.subject().clearResult();
    result.clear();
    result.used = this.testApply(target);
    if (result.used) {
      //p( this.itemHit(target) -  this.itemEva(target))
      result.missed =
        Math.random() >= this.itemHit(target) - this.itemEva(target);
    }
    result.physical = this.isPhysical();
    result.drain = this.isDrain();
    if (result.isHit()) {
      if (this.item().damage.type > 0) {
        result.critical = Math.random() < this.itemCri(target);
        var value = this.makeDamageValue(target, result.critical);
        //p(target.name() + ':' + value)
        this.executeDamage(target, value);
      }
      for (var _i = 0, _a = this.item().effects; _i < _a.length; _i++) {
        var effect = _a[_i];
        this.applyItemEffect(target, effect);
      }
      this.applyItemUserEffect(target);
    }
    this.updateLastTarget(target);
  };
  Game_Action.prototype.makeDamageValue = function (target, critical) {
    var item = this.item();
    var baseValue = this.evalDamageFormula(target);
    var a = this.subject();
    //p(Math.round(a.atk * target.defRate()) / Math.round(a.atk / 4));
    var value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
      value *= target.pdr;
    }
    if (this.isMagical()) {
      value *= target.mdr;
    }
    if (baseValue < 0) {
      value *= target.rec;
    }
    if (critical) {
      value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value *= (100 + this.subject().dmgBonus()) / 100;
    value -= target.reduceDmg();
    value += this.subject().dmgPlus2();
    if (value < 0) {
      value = 0;
    }
    if (target.isEnemy()) {
      if ($gameSwitches.value(9)) {
        value *= 3;
      }
    }
    value = Math.round(value);
    return value;
  };
  var defRateMap = {};
  Game_Battler.prototype.defRate = function () {
    var def = this.def;
    if (defRateMap[def]) {
      return defRateMap[def];
    }
    defRateMap[def] = Math.pow(89 / 90, def);
    return defRateMap[def];
  };
  var DamageSpriteManager = /** @class */ (function () {
    function DamageSpriteManager(spriteset) {
      this._damages = [];
      this._spriteset = spriteset;
    }
    DamageSpriteManager.prototype.onResult = function (isEnemy, battler) {
      if (isEnemy) {
        var sprite = new Sprite_Damage();
        sprite.setup(battler);
        sprite.x = 542;
        sprite.y = 408;
        this._damages.push(sprite);
        this._spriteset.addChild(sprite);
      } else {
        var sprite = new Sprite_Damage();
        sprite.setup(battler);
        sprite.x = 682;
        sprite.y = 408;
        this._damages.push(sprite);
        this._spriteset.addChild(sprite);
      }
    };
    DamageSpriteManager.prototype.update = function () {
      if (this._damages.length == 0) {
        return;
      }
      var s = this._damages[0];
      if (!s.isPlaying()) {
        this._damages.shift();
        s.destroy();
      }
    };
    return DamageSpriteManager;
  })();
  Nore.DamageSpriteManager = DamageSpriteManager;
})(Nore || (Nore = {}));
