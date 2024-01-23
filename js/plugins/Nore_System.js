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
 * @command UpIntimacy
 * @text 親密度上昇
 * @des 親密度上昇
 * @arg actorId
 * @text ActorId
 * @desc ActorId
 * @arg value
 * @text value
 * @desc value
 */
PluginManager.registerCommand("Nore_System", "UpIntimacy", function (args) {
  if ($gameSwitches.value(996)) {
    return;
  }
  var actorId = parseInt(args.actorId);
  var value = parseInt(args.value);
  $gameSystem.upIntimacy(actorId, value);
});
var CostumeSaver = /** @class */ (function () {
  function CostumeSaver() {
    this.saveCostume();
  }
  CostumeSaver.prototype.saveCostume = function () {
    var actor = $gameActors.mainActor2();
    this._outerId = actor.outerId;
    this._outerTopId = actor.outerTopId;
    this._outerBottomId = actor.outerBottomId;
    this._armId = actor.armId;
    this._legId = actor.legId;
    this._innerTopId = actor.innerTopId;
    this._innerBottomId = actor.innerBottomId;
    this._poseId = actor.poseId;
    this._acceMap = JsonEx.makeDeepCopy(actor.acceMap);
  };
  CostumeSaver.prototype.restoreCostume = function (argActor) {
    var actor = argActor || $gameActors.mainActor2();
    actor.setOuterId(this._outerId);
    actor.setOuterTopId(this._outerTopId);
    actor.setOuterBottomId(this._outerBottomId);
    actor.setArmId(this._armId);
    actor._legId = this._legId;
    actor._innerTopId = this._innerTopId;
    actor._innerBottomId = this._innerBottomId;
    actor.setPoseId(this._poseId);
    actor.acceMap = JsonEx.makeDeepCopy(this._acceMap);
    actor.setCacheChanged();
  };
  return CostumeSaver;
})();
var ScenarioEvent = /** @class */ (function () {
  function ScenarioEvent(file, ero, forEro) {
    this.file = file;
    this.ero = ero;
    this.forEro = forEro;
  }
  return ScenarioEvent;
})();
var Intimacy = /** @class */ (function () {
  function Intimacy(actorId) {
    this._intimacy = 0;
    this._actorId = actorId;
    switch (actorId) {
      case 4:
        this._intimacy = 30;
        break;
    }
  }
  Intimacy.prototype.findText = function () {
    if (this._intimacy >= 100) {
      if ($gameSystem.isKekkonTo(this._actorId)) {
        return TextManager.husband;
      }
    }
    var list = ACTOR_RERLATION_MAP2[this._actorId];
    var text = "not found";
    if (!list) {
      return text;
    }
    var max = 0;
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var b = list_1[_i];
      if (b[0] > this._intimacy) {
        continue;
      }
      if (max > b[0]) {
        continue;
      }
      text = b[1];
    }
    return text;
  };
  Intimacy.prototype.intimacyCount = function () {
    return Math.floor(this._intimacy / 10);
  };
  Intimacy.prototype.plusIntimacy = function (n) {
    this._intimacy += n;
    this._intimacy = Math.min(this._intimacy, 100);
    if (this._actorId == 15 && this._intimacy == 100) {
      $gameMedals.addMedal(919);
    }
  };
  Intimacy.prototype.intimacy = function () {
    return this._intimacy;
  };
  Intimacy.prototype.isMax = function () {
    return this._intimacy >= 100;
  };
  Intimacy.prototype.max = function () {
    this._intimacy = 100;
  };
  Intimacy.prototype.actorId = function () {
    return this._actorId;
  };
  return Intimacy;
})();
var LastStatus = /** @class */ (function () {
  function LastStatus() {}
  LastStatus.prototype.copy = function (actor) {
    var lastFatigue = actor.fatigue();
    actor._fatigue = 0;
    this.lv = actor._level;
    this.hp = actor.mhp;
    this.mp = actor.mmp;
    this.atk = actor.atk;
    this.def = actor.def;
    this.hit = actor.hit;
    this.eva = actor.eva;
    this.reduceDmg = actor.reduceDmg();
    this.dmgBonus = actor.dmgBonus();
    this.gold = $gameParty.gold();
    this.exp = actor.currentExp();
    this.tryCount = $gameSystem.tryCount();
    actor._fatigue = lastFatigue;
  };
  return LastStatus;
})();
var TreasureType;
(function (TreasureType) {
  TreasureType[(TreasureType["WEAPON"] = 1)] = "WEAPON";
  TreasureType[(TreasureType["ARMOR1"] = 2)] = "ARMOR1";
  TreasureType[(TreasureType["ARMOR2"] = 3)] = "ARMOR2";
  TreasureType[(TreasureType["ARMOR3"] = 4)] = "ARMOR3";
  TreasureType[(TreasureType["MONEY"] = 5)] = "MONEY";
  TreasureType[(TreasureType["SPECIAL_ITEM"] = 6)] = "SPECIAL_ITEM";
})(TreasureType || (TreasureType = {}));
var Treasure = /** @class */ (function () {
  function Treasure(_type, _id, _value) {
    this._type = _type;
    this._id = _id;
    this._value = _value;
  }
  Treasure.prototype.type = function () {
    return this._type;
  };
  Treasure.prototype.id = function () {
    return this._id;
  };
  Treasure.prototype.icon = function () {
    switch (this._type) {
      case TreasureType.WEAPON:
        return $dataWeapons[this._id].iconIndex;
      case TreasureType.ARMOR1:
      case TreasureType.ARMOR2:
      case TreasureType.ARMOR3:
        return $dataArmors[this._id].iconIndex;
      case TreasureType.SPECIAL_ITEM:
        return $dataItems[this._id].iconIndex;
      default:
        return 634;
    }
  };
  Treasure.prototype.value = function () {
    return this._value;
  };
  return Treasure;
})();
var Game_RogueSystem = /** @class */ (function (_super) {
  __extends(Game_RogueSystem, _super);
  function Game_RogueSystem() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this._treasureList = [];
    _this._lastCostumeList = [];
    _this._intimacyMap = {};
    _this._tryCount = 0;
    _this._historyList = [];
    return _this;
  }
  Game_RogueSystem.prototype.initialize = function () {
    _super.prototype.initialize.call(this);
    this._nextId = 0;
    this._gameId = this.initGameId();
  };
  Game_RogueSystem.prototype.onDungeon = function () {
    var history = this.currentHistory();
    history.onDungeon();
  };
  Game_RogueSystem.prototype.onGold = function (gold) {
    var history = this.currentHistory();
    history.onGold(gold);
  };
  Game_RogueSystem.prototype.saveEroStatus = function () {
    if ($gameSwitches.value(996)) {
      return;
    }
    var lastHistory = this.lastHistory();
    if (lastHistory) {
      lastHistory.saveEroStatus();
    }
  };
  Game_RogueSystem.prototype.nextDay = function () {
    this.saveEroStatus();
    this.currentHistory();
  };
  Game_RogueSystem.prototype.addTreasure = function (treasure) {
    this._treasureList = this._treasureList || [];
    this._treasureList.push(treasure);
  };
  Game_RogueSystem.prototype.treasureList = function () {
    this._treasureList = this._treasureList || [];
    return this._treasureList;
  };
  Game_RogueSystem.prototype.lastHistory = function () {
    if (this._historyList.length == 0) {
      return null;
    }
    return this._historyList[this._historyList.length - 1];
  };
  Game_RogueSystem.prototype.addEro = function (eroId, commonId) {
    if ($gameSwitches.value(996)) {
      return;
    }
    var history = this.currentHistory();
    history.addEro(eroId, commonId);
  };
  Game_RogueSystem.prototype.currentHistory = function () {
    var day = this.day();
    if (!this._historyList[day - 1]) {
      this._historyList[day - 1] = new DayHistory(day);
    }
    return this._historyList[day - 1];
  };
  Game_RogueSystem.prototype.historyList = function () {
    return this._historyList;
  };
  Game_RogueSystem.prototype.isAutosaveEnabled = function () {
    if ($gameSwitches.value(1)) {
      // ダンジョン
      return false;
    }
    if ($gameSwitches.value(999)) {
      // 回想中
      return false;
    }
    if ($gameSwitches.value(992)) {
      // オートセーブ禁止
      return false;
    }
    return _super.prototype.isAutosaveEnabled.call(this);
  };
  Game_RogueSystem.prototype.saveLastStatus = function () {
    this._lastStatus = new LastStatus();
    this._lastStatus.copy($gameActors.actor(4));
  };
  Game_RogueSystem.prototype.lastStatus = function () {
    return this._lastStatus;
  };
  Game_RogueSystem.prototype.lastTryCount = function () {
    if (this._lastStatus) {
      return this._lastStatus.tryCount || 0;
    }
    return 0;
  };
  Game_RogueSystem.prototype.tryCount = function () {
    return this._tryCount || 0;
  };
  Game_RogueSystem.prototype.upTryCount = function () {
    this._tryCount++;
  };
  Game_RogueSystem.prototype.lastGold = function () {
    if (this._lastStatus) {
      return this._lastStatus.gold || 0;
    }
    return 0;
  };
  Game_RogueSystem.prototype.lastExp = function () {
    if (this._lastStatus) {
      return this._lastStatus.exp || 0;
    }
    return 0;
  };
  Game_RogueSystem.prototype.initGameId = function () {
    var d = new Date();
    var yy = d.getFullYear();
    var m = d.getMonth() + 1;
    var dd = d.getDay();
    var hh = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();
    return yy + "-" + m + "-" + dd + "_" + hh + "_" + mm + "_" + ss;
  };
  Game_RogueSystem.prototype.upIntimacy = function (actorId, value) {
    var intimacy = this.intimacy(actorId);
    $gameTemp.addActorLog(
      $gameActors.actor(actorId),
      intimacy.intimacy(),
      Math.min(100, intimacy.intimacy() + value)
    );
    intimacy.plusIntimacy(value);
  };
  Game_RogueSystem.prototype.intimacy = function (actorId) {
    var intimacy = this._intimacyMap[actorId];
    if (!intimacy) {
      intimacy = new Intimacy(actorId);
      this._intimacyMap[actorId] = intimacy;
    }
    return intimacy;
  };
  Game_RogueSystem.prototype.gameId = function () {
    return this._gameId;
  };
  Game_RogueSystem.prototype.saveCostume = function (slot) {
    this._lastCostumeList[slot] = new CostumeSaver();
  };
  Game_RogueSystem.prototype.restoreCostume = function (slot) {
    if (!this._lastCostumeList[slot]) {
      console.error("costume not found:" + slot);
      return;
    }
    this._lastCostumeList[slot].restoreCostume();
  };
  Game_RogueSystem.prototype.getEro = function (actorId) {
    this.eroStatus[actorId] = this.eroStatus[actorId] || this.newEro(actorId);
    return this.eroStatus[actorId];
  };
  Game_RogueSystem.prototype.newEro = function (actorId) {
    var ero = new Erostatus(actorId);
    return ero;
  };
  Game_RogueSystem.prototype.nextId = function () {
    this._nextId = this._nextId || 0;
    this._nextId++;
    return this._nextId;
  };
  Game_RogueSystem.prototype.startDungeon = function () {
    p("startDungeon");
    this._profits = new DegeonProfits();
  };
  Game_RogueSystem.prototype.dungeonProfits = function () {
    return this._profits;
  };
  Game_RogueSystem.prototype.isEventReserved = function (actorId) {
    this._eventReservation = this._eventReservation || {};
    this._eventReservation[actorId] = this._eventReservation[actorId] || [];
    return this._eventReservation[actorId].length > 0;
  };
  Game_RogueSystem.prototype.isEroEventReserved = function (actorId) {
    this._eventReservation = this._eventReservation || {};
    this._eventReservation[actorId] = this._eventReservation[actorId] || [];
    if (this._eventReservation[actorId].length === 0) {
      return false;
    }
    return this._eventReservation[actorId][0].ero;
  };
  Game_RogueSystem.prototype.endEvent = function (file) {
    this._finishedEvents = this._finishedEvents || {};
    this._finishedEvents[file] = true;
  };
  Game_RogueSystem.prototype.restoreEvent = function (file) {
    this._finishedEvents = this._finishedEvents || {};
    p("restore:" + file + " " + this._finishedEvents[file]);
    this._finishedEvents[file] = false;
  };
  Game_RogueSystem.prototype.isEndEvent = function (file) {
    this._finishedEvents = this._finishedEvents || {};
    return this._finishedEvents[file];
  };
  Game_RogueSystem.prototype.getReservedActorEvent = function (actorId) {
    this._eventReservation = this._eventReservation || {};
    this._eventReservation[actorId] = this._eventReservation[actorId] || [];
    if (this._eventReservation[actorId][0]) {
      return this._eventReservation[actorId][0].file;
    }
    return null;
  };
  Game_RogueSystem.prototype.reserveActorEvent = function (
    actorId,
    scenarioId,
    ero,
    forEro
  ) {
    if (this.isEndEvent(scenarioId)) {
      //p('end' + scenarioId)
      return;
    }
    this._eventReservation = this._eventReservation || {};
    this._eventReservation[actorId] = this._eventReservation[actorId] || [];
    this._eventReservation[actorId].push(
      new ScenarioEvent(scenarioId, ero, forEro)
    );
  };
  Game_RogueSystem.prototype.clearReservedEvent = function () {
    this._eventReservation = {};
  };
  /*get keikenVillager() {
        p('keikenVillager')
        let n = 0;
        const checkedId = {};
        const history = this.eroHistory();
        for (const h of history) {
            if (h.eroId == 'sex') {
                if (! $gameActors.actor(h.actorId).actor().meta['villager']){
                    continue;
                }
                if (checkedId[h.actorId]) {
                    continue;
                }
                n++;
                checkedId[h.actorId] = true;
            }
        }
        return n;
    }*/
  Game_RogueSystem.prototype.nakadashiTotal = function () {
    return this.getHistoryTotal("nakadashi");
  };
  Game_RogueSystem.prototype.isKekkonTo = function (actorId) {
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.dayEroHistory().isMarriage(actorId)) {
        return true;
      }
      if (h.nightEroHistory().isMarriage(actorId)) {
        return true;
      }
    }
    return false;
  };
  Game_RogueSystem.prototype.countKekkon = function (day) {
    var n = 0;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.day() > day) {
        continue;
      }
      if (h.dayEroHistory().marriageCount() > 0) {
        n++;
      }
      if (h.nightEroHistory().marriageCount() > 0) {
        n++;
      }
    }
    return n;
  };
  Game_RogueSystem.prototype.countEro = function (label, day) {
    return this.getHistoryTotal(label, day);
  };
  Game_RogueSystem.prototype.countKeikenVillager = function (day) {
    var m = {};
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.day() > day) {
        continue;
      }
      for (
        var _b = 0, _c = h.dayEroHistory().playList();
        _b < _c.length;
        _b++
      ) {
        var play = _c[_b];
        if (play.nakadashi() > 0 || play.anal() > 0) {
          var actorId = play.actorId();
          if ($gameActors.actor(actorId).actor().meta["villager"]) {
            m[actorId] = true;
          }
        }
      }
      for (
        var _d = 0, _e = h.nightEroHistory().playList();
        _d < _e.length;
        _d++
      ) {
        var play = _e[_d];
        if (play.nakadashi() > 0 || play.anal() > 0) {
          var actorId = play.actorId();
          if ($gameActors.actor(actorId).actor().meta["villager"]) {
            m[actorId] = true;
          }
        }
      }
    }
    var n = 0;
    for (var key in m) {
      n++;
    }
    return n;
  };
  Game_RogueSystem.prototype.countFela = function () {
    return this.getHistoryTotal("fela");
  };
  Game_RogueSystem.prototype.countAnal = function () {
    return this.getHistoryTotal("anal");
  };
  Game_RogueSystem.prototype.countAcme = function () {
    return this.getHistoryTotal("acme");
  };
  Game_RogueSystem.prototype.countBaisyun = function () {
    return this.getHistoryTotal("baisyun");
  };
  Game_RogueSystem.prototype.countBukkake = function () {
    return this.getHistoryTotal("bukkake");
  };
  Game_RogueSystem.prototype.countSeiekiNomu = function () {
    return this.getHistoryTotal("seiekiNomu");
  };
  Game_RogueSystem.prototype.countKounai = function () {
    return this.getHistoryTotal("kounai");
  };
  Game_RogueSystem.prototype.countNakadashi = function (day) {
    return this.getHistoryTotal("nakadashi", day);
  };
  Game_RogueSystem.prototype.countOshikoNomu = function () {
    return this.getHistoryTotal("oshikko");
  };
  Game_RogueSystem.prototype.countActorNakadashi = function (actorId) {
    var n = 0;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      n += h.dayEroHistory().countNakadashi(actorId);
      n += h.nightEroHistory().countNakadashi(actorId);
    }
    return n;
  };
  Game_RogueSystem.prototype.countActorSeikoui = function (actorId) {
    var n = 0;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      n += h.dayEroHistory().countSeikoui(actorId);
      n += h.nightEroHistory().countSeikoui(actorId);
    }
    return n;
  };
  Game_RogueSystem.prototype.countActorNinshin = function (actorId) {
    var n = this.countActorSyusan(actorId);
    var ero = $gameSystem.getEro(5);
    if (ero.bote >= 2 && ero.taneoya == actorId) {
      n++;
    }
    return n;
  };
  Game_RogueSystem.prototype.countActorSyusan = function (actorId) {
    var n = 0;
    var babies = $gameSystem.getEro(5).baby();
    for (var _i = 0, babies_1 = babies; _i < babies_1.length; _i++) {
      var baby = babies_1[_i];
      if (baby.taneoya() == actorId) {
        n++;
      }
    }
    return n;
  };
  Game_RogueSystem.prototype.countSyusanTotal = function () {
    var n = 0;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.dayEroHistory().syusanTaneoya > 0) {
        n++;
      }
      if (h.nightEroHistory().syusanTaneoya > 0) {
        n++;
      }
    }
    return n;
  };
  Game_RogueSystem.prototype.countSyusan = function (taneoyaId) {
    var n = 0;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.dayEroHistory().syusanTaneoya == taneoyaId) {
        n++;
      }
      if (h.nightEroHistory().syusanTaneoya == taneoyaId) {
        n++;
      }
    }
    return n;
  };
  Game_RogueSystem.prototype.hasOtherSyusan = function (taneoyaId) {
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.dayEroHistory().syusanTaneoya) {
        if (h.dayEroHistory().syusanTaneoya != taneoyaId) {
          return true;
        }
      }
      if (h.nightEroHistory().syusanTaneoya) {
        if (h.nightEroHistory().syusanTaneoya != taneoyaId) {
          return true;
        }
      }
    }
    return false;
  };
  Game_RogueSystem.prototype.getMainEro = function () {
    var ero = this.getEro(5);
    ero.day = this.day();
    return ero;
  };
  Game_RogueSystem.prototype.day = function () {
    return $gameVariables.value(3);
  };
  Game_RogueSystem.prototype.getHistoryTotal = function (id, day) {
    if (day === void 0) {
      day = 9999;
    }
    var n = 0;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.day() > day) {
        continue;
      }
      if (!isNaN(h.dayEroHistory()[id])) {
        n += h.dayEroHistory()[id];
      }
      if (!isNaN(h.nightEroHistory()[id])) {
        n += h.nightEroHistory()[id];
      }
    }
    return n;
  };
  Game_RogueSystem.prototype.damageBonus = function () {
    var rate = 10;
    for (var _i = 0, _a = $gameParty.armors(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (a && a.meta["syusanDmg"]) {
        rate += parseInt(a.meta["syusanDmg"]);
      }
    }
    return this.getEro(5).baby().length * rate;
  };
  Game_RogueSystem.prototype.damageBonusStr = function () {
    return hankaku2Zenkaku(this.damageBonus());
  };
  Game_RogueSystem.prototype.onSyusan = function () {
    var ero = $gameSystem.getEro(5);
    this.getMainEro().pushBaby(new Baby(this.day(), ero.taneoya));
    ero.onSyusan();
  };
  Game_RogueSystem.prototype.calcTightening = function (type, day) {
    if (day === void 0) {
      day = 9999;
    }
    var n = 100;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.day() > day) {
        continue;
      }
      if (type == "chitsu") {
        n -= h.dayEroHistory().calcChitsuDamage();
        n -= h.nightEroHistory().calcChitsuDamage();
      } else {
        n -= h.dayEroHistory().calcAnalDamage();
        n -= h.nightEroHistory().calcAnalDamage();
      }
    }
    if (n < -100) {
      return -100;
    }
    return n;
  };
  Game_RogueSystem.prototype.countPeople = function (type, day) {
    if (day === void 0) {
      day = 9999;
    }
    var n = 0;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.day() > day) {
        continue;
      }
      if (type == "keikenSakaba") {
        n += h.dayEroHistory().countSakaba();
        n += h.nightEroHistory().countSakaba();
      } else {
        n += h.dayEroHistory().countCity();
        n += h.nightEroHistory().countCity();
      }
    }
    return n;
  };
  Game_RogueSystem.prototype.hasItem = function (day, item) {
    if (day == this.day()) {
      return $gameParty.hasItem(item);
    }
    var history = this.findHistory(day);
    return history.hasItem(item);
  };
  Game_RogueSystem.prototype.findHistory = function (day) {
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.day() == day) {
        return h;
      }
    }
    return this.currentHistory();
  };
  Game_RogueSystem.prototype.isRank10Open = function () {
    return $gameVariables.value(14) >= 7;
  };
  return Game_RogueSystem;
})(Game_System);
