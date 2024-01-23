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
  Nore.CLEAR_FLOOR_ID = 14;
  var DUNGEON_CLEAR_ID = 31;
  var Window_EnemyInfo = /** @class */ (function (_super) {
    __extends(Window_EnemyInfo, _super);
    function Window_EnemyInfo() {
      var _this = _super.call(this, new Rectangle(882, 625, 278, 340)) || this;
      _this._enemy = null;
      _this.visible = false;
      _this.frameVisible = false;
      _this.backOpacity = 0;
      return _this;
    }
    Window_EnemyInfo.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateCharacter();
    };
    Window_EnemyInfo.prototype.updateCharacter = function () {
      if ($gameActors.mainActor().isDead()) {
        this.visible = false;
        return;
      }
      if (this.isChanged()) {
        this.showEnemy($gameTemp.infoEnemy);
      }
    };
    Window_EnemyInfo.prototype.isChanged = function () {
      if (this._enemy !== $gameTemp.infoEnemy) {
        return true;
      }
      if (
        $gameTemp.infoEnemy &&
        $gameTemp.infoEnemy.enemyId() != this._lastEnemyId
      ) {
        return true;
      }
      return false;
    };
    Window_EnemyInfo.prototype.showEnemy = function (enemy) {
      this._enemy = enemy;
      if (enemy) {
        this._lastEnemyId = enemy.enemyId();
      }
      this.refresh();
    };
    Window_EnemyInfo.prototype.refresh = function () {
      this.contents.clear();
      this.refreshBg();
      if (this._hpGauge) {
        this.removeChild(this._hpGauge);
        this._hpGauge = null;
      }
      if (!$gameSwitches.value(1)) {
        this.visible = false;
        return;
      }
      if (!this._enemy) {
        this.visible = false;
        return;
      }
      this.visible = true;
      this.resetFontSettings();
      this.drawHit();
    };
    Window_EnemyInfo.prototype.drawHit = function () {
      var actor = $gameActors.mainActor();
      var action = new Game_Action(actor);
      var action2 = new Game_Action(this._enemy);
      action.setAttack();
      action2.setAttack();
      var hit1 = Math.round(
        (action.itemHit(this._enemy) - action.itemEva(this._enemy)) * 100
      );
      var hit2 = Math.round(
        100 - (action2.itemHit(actor) - action2.itemEva(actor)) * 100
      );
      if (hit2 < 0) {
        hit2 = 0;
      }
      var fatigue = actor.fatigue();
      this._windowContentsSprite.destroyAndRemoveChildren();
      var xx = 146;
      xx += 13;
      this.drawNumber(hit1 + "%", xx, 10, 60, "right", 3);
      this.drawNumber(hit2 + "%", xx, 41, 60, "right", 3);
      this.drawNumber(fatigue + "%", xx, 72, 60, "right", 3);
    };
    Window_EnemyInfo.prototype.refreshBg = function () {
      this._contentsBackSprite.destroyAndRemoveChildren();
      var baseTexture = Nore.getSystemBaseTexture("ui2");
      var rect;
      if (ConfigManager.en) {
        rect = new PIXI.Rectangle(300, 96, 300, 140);
      } else {
        rect = new PIXI.Rectangle(0, 96, 300, 140);
      }
      var texture = new PIXI.Texture(baseTexture, rect);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -0;
      sprite.y = -0;
      this._contentsBackSprite.addChild(sprite);
    };
    Window_EnemyInfo.prototype.clear = function () {
      this._enemy = null;
    };
    Window_EnemyInfo.prototype.resetFontSettings = function () {
      this.contents.fontFace = $gameSystem.mainFontFace();
      this.contents.fontSize = 18;
      this.resetTextColor();
    };
    return Window_EnemyInfo;
  })(Window_Base);
  Nore.Window_EnemyInfo = Window_EnemyInfo;
  var ENEMY1_VAR_ID = 4;
  var ENEMY2_VAR_ID = 5;
  var actor;
  function calcNextEnemy() {
    var troop1 = calcTroopId();
    $gameTroop.setup(troop1);
    actor = $gameActors.actor(4);
    Nore.enemy = $gameTroop.members()[0];
    var bossId = parseInt(Nore.enemy.enemy().meta["boss"]);
    if (bossId) {
      if (troop1 == 200) {
        $gameSystem.reserveEvent("ダンジョン", "ファフニール_01");
      } else if ($gameVariables.value(Nore.CLEAR_FLOOR_ID) == bossId - 1) {
        if ($dataScenario["ボス_" + bossId.padZero(1)]) {
          if ($gameVariables.value(27) < bossId) {
            $gameSystem.reserveEvent("ダンジョン", "ボス_" + bossId.padZero(1));
          }
        } else {
          $gameVariables.setValue(20, Nore.enemy.name());
          $gameSystem.reserveEvent("ダンジョン", "ボス_汎用");
        }
      }
    }
    $gameTemp.infoEnemy = Nore.enemy;
    $gameVariables.setValue(ENEMY1_VAR_ID, Nore.enemy.enemyId());
    $gameParty.onNextFloor();
    //drawDebug();
  }
  Nore.calcNextEnemy = calcNextEnemy;
  function drawDebug() {
    var action1 = new Game_Action(actor);
    action1.setSkill(1);
    var action2 = new Game_Action(Nore.enemy);
    action2.setSkill(1);
    p("レオ");
    p("HP:" + actor.hp);
    p("ATK:" + actor.atk);
    p("DEF:" + actor.def);
    p(action1.makeDamageValue(Nore.enemy, false));
    p(Nore.enemy.name());
    p("HP:" + Nore.enemy.hp);
    p("ATK:" + Nore.enemy.atk);
    p("DEF:" + Nore.enemy.def);
    p(action2.makeDamageValue(actor, false));
  }
  function calcTroopId() {
    var floor = $gameVariables.value(15);
    var wave = $gameVariables.value(16);
    if ($gameVariables.value(3) >= 3) {
      if (!$gameSwitches.value(2)) {
        if (wave == 2) {
          return 200;
        }
      }
    }
    var troopId = (floor - 1) * 10 + wave + 1;
    return troopId;
    /*const troopData = $dataTroops[];
        const enemy = troopData.members[0];
        return enemy.enemyId;*/
  }
  function gainBattleBonus() {
    if (Nore.enemy.enemy().meta["boss"]) {
      var bossId = parseInt(Nore.enemy.enemy().meta["boss"]);
      // ダンジョン攻略フラグ
      // ボス撃破フラグ
      $gameSwitches.setValue(80 + bossId, true);
      if ($gameVariables.value(Nore.CLEAR_FLOOR_ID) < bossId) {
        $gameVariables.setValue(Nore.CLEAR_FLOOR_ID, bossId);
        p("ボスID:" + bossId);
        var bossIdStr = (bossId + "").padZero(2);
        if ($dataScenario["ボス撃破_" + bossIdStr]) {
          $gameSystem.reserveEvent("ダンジョンクリア", "ボス撃破_" + bossIdStr);
        } else {
          $gameSystem.reserveEvent("ダンジョンクリア", "ボス撃破_汎用");
        }
        $gameSwitches.setValue(DUNGEON_CLEAR_ID, true);
      } else {
        //$gameSystem.reserveEvent('ダンジョンクリア', 'ボス撃破_00');
      }
    }
    //p(calcExp() + ' ' + actor.expPlusRate())
    actor.gainExp(calcExp() * actor.expPlusRate() * getExpBonus());
    var gold = Math.floor(
      $gameTroop.goldTotal() * getGoldRate() * actor.goldPlusRate()
    );
    $gameSystem.onGold(gold);
    $gameParty.gainGold(gold);
    //$gameSystem.dungeonProfits().gainItem(10, 2);
  }
  Nore.gainBattleBonus = gainBattleBonus;
  function calcExp() {
    return (getExpBase() * calcExpRate()) / 18 / 2 / 4;
  }
  function calcExpRate() {
    switch ($gameVariables.value(16)) {
      case 0:
        return 2;
      case 1:
        return 2;
      case 2:
        return 2;
      case 3:
        return 2;
      case 4:
        return 2;
      case 5:
        return 3;
      case 6:
        return 3;
      case 7:
        return 3;
      case 8:
        return 4;
      default:
        return 5;
    }
  }
  function getExpBase() {
    switch ($gameVariables.value(15)) {
      case 1:
        return $gameActors.actor(4).expForLevel(8);
      case 2:
        return (
          $gameActors.actor(4).expForLevel(15) -
          $gameActors.actor(4).expForLevel(14)
        );
      case 3:
        return (
          $gameActors.actor(4).expForLevel(25) -
          $gameActors.actor(4).expForLevel(24)
        );
      case 4:
        return (
          $gameActors.actor(4).expForLevel(35) -
          $gameActors.actor(4).expForLevel(34)
        );
      case 5:
        return (
          $gameActors.actor(4).expForLevel(45) -
          $gameActors.actor(4).expForLevel(44)
        );
      case 6:
        return (
          $gameActors.actor(4).expForLevel(55) -
          $gameActors.actor(4).expForLevel(54)
        );
      case 7:
        return (
          $gameActors.actor(4).expForLevel(65) -
          $gameActors.actor(4).expForLevel(64) +
          2200
        );
      case 8:
        return (
          $gameActors.actor(4).expForLevel(77) -
          $gameActors.actor(4).expForLevel(76) +
          10400
        );
      case 9:
        return (
          $gameActors.actor(4).expForLevel(85) -
          $gameActors.actor(4).expForLevel(84) +
          25800
        );
      case 10:
        return (
          $gameActors.actor(4).expForLevel(95) -
          $gameActors.actor(4).expForLevel(94) +
          49600
        );
    }
  }
  function getExpBonus() {
    var diff = getExpDiff();
    p("diff :" + diff);
    if (diff < -10) {
      return 3;
    }
    if (diff < -5) {
      return 2;
    }
    return 1;
  }
  function getExpDiff() {
    var diff = $gameActors.actor(4).level;
    switch ($gameVariables.value(15)) {
      case 1:
        return 0;
      case 2:
        return diff - 15;
      case 3:
        return diff - 25;
      case 4:
        return diff - 35;
      case 5:
        return diff - 45;
      case 6:
        return diff - 55;
      case 7:
        return diff - 65;
      case 8:
        return diff - 75;
      case 9:
        return diff - 85;
      case 10:
        return diff - 95;
    }
    return 0;
  }
  function getGoldRate() {
    switch ($gameVariables.value(15)) {
      case 1:
        return 0.3;
      case 2:
        return 0.5;
      case 3:
        return 0.9;
      case 4:
        return 1.5;
      case 5:
        return 2.2;
      case 6:
        return 3.0;
      case 7:
        return 3.9;
      case 8:
        return 5.6;
      case 9:
        return 8.2;
      case 10:
        return 12.2;
    }
  }
  function isEnemyDead() {
    return Nore.enemy.isDead();
  }
  Nore.isEnemyDead = isEnemyDead;
  function isActorDead() {
    return actor.isDead();
  }
  Nore.isActorDead = isActorDead;
  function attackEnemy(skillId) {
    if (skillId === void 0) {
      skillId = 1;
    }
    var last = actor.hp;
    var action = new Game_Action(Nore.enemy);
    action.setSkill(skillId);
    action.apply(actor);
    $gameSwitches.setValue(42, actor.result().hpDamage > 0);
    if (actor.result().hpDamage > 0) {
      var sprite = new Nore.Sprite_GaugeDamage(false);
      sprite.showDamage(actor, last, actor.result().hpDamage);
      SceneManager._scene.addChild(sprite);
    }
  }
  Nore.attackEnemy = attackEnemy;
  function attackActor(skillId) {
    if (skillId === void 0) {
      skillId = 1;
    }
    var last = Nore.enemy.hp;
    var action = new Game_Action(actor);
    action.setSkill(skillId);
    action.apply(Nore.enemy);
    if ($gameActors.actor(4).weapon1().rank() == 10) {
      $gameActors.actor(4).gainHp(2);
    }
    $gameSwitches.setValue(42, Nore.enemy.result().hpDamage > 0);
    if (Nore.enemy.result().hpDamage > 0) {
      var sprite = new Nore.Sprite_GaugeDamage(true);
      sprite.showDamage(Nore.enemy, last, Nore.enemy.result().hpDamage);
      SceneManager._scene.addChild(sprite);
    }
  }
  Nore.attackActor = attackActor;
  function recoverPlayer() {
    var action = new Game_Action(actor);
    action.setSkill(82);
    action.apply(actor);
  }
  Nore.recoverPlayer = recoverPlayer;
  var _Game_Event_prototype_characterName = Game_Event.prototype.characterName;
  Game_Event.prototype.characterName = function () {
    if (!this.event().meta["enemy"]) {
      return _Game_Event_prototype_characterName.call(this);
    }
    if ($gameVariables.value(4) == 0) {
      return "";
    }
    if (!this._erased) {
      if (Nore.enemy) {
        if (Nore.enemy.enemy().meta["characterName"]) {
          return Nore.enemy.enemy().meta["characterName"];
        }
      }
    }
    return _Game_Event_prototype_characterName.call(this);
  };
  var _Game_Event_prototype_characterIndex =
    Game_Event.prototype.characterIndex;
  Game_Event.prototype.characterIndex = function () {
    if (!this.event().meta["enemy"]) {
      return _Game_Event_prototype_characterIndex.call(this);
    }
    if (!this._erased) {
      if (Nore.enemy) {
        if (Nore.enemy.enemy().meta["characterIndex"]) {
          return Nore.enemy.enemy().meta["characterIndex"];
        }
      }
    }
    return _Game_Event_prototype_characterIndex.call(this);
  };
  function updateClearFloor() {
    var floor = $gameVariables.value(15);
    if (floor > $gameVariables.value(14)) {
      $gameVariables.setValue(14, $gameVariables.value(15));
    }
  }
  Nore.updateClearFloor = updateClearFloor;
})(Nore || (Nore = {}));
