/*:ja
 * @target MZ
 * @author ル
 *
 * @command kounai
 * @text 口内射精アップ
 * @des 口内射精アップ
 * @arg id
 * @text アクターID　0ならvar11
 * @desc アクターID　0ならvar11
 *
 * @command oshikko
 * @text おしっこアップ
 * @des おしっこアップ
 * @arg id
 * @text アクターID　0ならvar11
 * @desc アクターID　0ならvar11
 *
 * @command addEroHistory
 * @text エロヒストリー
 * @des エロヒストリー
 * @arg id
 * @text アクターID1
 * @desc アクターID1
 * @arg eroId
 * @text エロID fela sex nakadashi anal tekoki
 * @desc エロID
 * @arg count
 * @text 回数
 * @desc 回数
 * @arg id2
 * @text アクターID2
 * @desc アクターID2
 * @arg eroId2
 * @text エロID fela sex nakadashi anal
 * @desc エロID
 * @arg id3
 * @text アクターID3
 * @desc アクターID3
 * @arg eroId3
 * @text エロID fela sex nakadashi anal
 * @desc エロID
 * @arg id4
 * @text アクターID4
 * @desc アクターID4
 * @arg eroId4
 * @text エロID fela sex nakadashi anal
 * @desc エロID
 * @arg id5
 * @text アクターID5
 * @desc アクターID5
 * @arg eroId5
 * @text エロID fela sex nakadashi anal
 * @desc エロID
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Ero";
  PluginManager.registerCommand(pluginName, "kounai", function (args) {
    if ($gameSwitches.value(996)) {
      return;
    }
    if ($gameSwitches.value(999)) {
      return;
    }
    /*let id = args.id;

        if (! id) {
            id = $gameVariables.value(11);
        }
        id = parseInt(id);
      
        const actor = $gameActors.actor(id).actor();
        const min = parseInt(actor.meta['seiekiMin']);
        const max = parseInt(actor.meta['seiekiMax']);
        if (! min) {
            console.error('口内射精 精液量が設定されていません。id:' + id);
            return;
        }*/
    var value = 1; //randomBetween(min, max);
    p("value: " + value);
    $gameSystem.currentHistory().eroHistory().kounai += value;
    $gameMedals.onSeieki(value);
  });
  PluginManager.registerCommand(pluginName, "bukkake", function (args) {
    if ($gameSwitches.value(996)) {
      return;
    }
    if ($gameSwitches.value(999)) {
      return;
    }
    $gameSystem.currentHistory().eroHistory().bukkake += 1;
    //$gameMedals.onSeieki(1);
  });
  PluginManager.registerCommand(pluginName, "oshikko", function (args) {
    if ($gameSwitches.value(996)) {
      return;
    }
    if ($gameSwitches.value(999)) {
      return;
    }
    var id = args.id;
    if (!id) {
      id = $gameVariables.value(11);
    }
    id = parseInt(id);
    var min = 200;
    var max = 300;
    var value = 1; //randomBetween(min, max);
    $gameSystem.currentHistory().eroHistory().oshikko += value;
    $gameMedals.onOshikko(value);
  });
  PluginManager.registerCommand(pluginName, "upKeiken", function (args) {
    if ($gameSwitches.value(996)) {
      return;
    }
    $gameSystem.getEro(5).upKeiken(parseInt(args.id));
  });
  PluginManager.registerCommand(pluginName, "upNakadashi", function (args) {
    if ($gameSwitches.value(996)) {
      return;
    }
    $gameSystem.getEro(5).upNakadashi(parseInt(args.id), parseInt(args.value));
  });
  PluginManager.registerCommand(pluginName, "addEroHistory", function (args) {
    if ($gameSwitches.value(996)) {
      return;
    }
    var seieki = 0;
    p(args);
    for (var i = 1; i <= 5; i++) {
      var actorId = void 0;
      var eroId = void 0;
      var count = 1;
      if (i == 1) {
        actorId = parseInt(args["id"]);
        eroId = args["eroId"];
        var n = parseInt(args["count"]);
        if (!isNaN(n)) {
          count = n;
        }
      } else {
        actorId = parseInt(args["id" + i]);
        eroId = args["eroId" + i];
      }
      if (isNaN(actorId)) {
        break;
      }
      switch (eroId) {
        case "marriage":
          $gameSystem.currentHistory().eroHistory().marriage = actorId;
          break;
        case "fela":
          $gameSystem
            .currentHistory()
            .eroHistory()
            .addPlay(actorId, PlayEnum.FELA, count);
          break;
        case "sex":
          //$gameSystem.currentHistory().eroHistory().fela++;
          break;
        case "bukkake":
          $gameSystem.currentHistory().eroHistory().bukkake++;
          //seieki++;
          break;
        case "nakadashi":
          $gameSystem
            .currentHistory()
            .eroHistory()
            .addPlay(actorId, PlayEnum.NAKADASHI, count);
          //seieki++;
          break;
        case "seiekiNomu":
          $gameSystem.currentHistory().eroHistory().seiekiNomu++;
          break;
        case "analItem":
          $gameSystem
            .currentHistory()
            .eroHistory()
            .addPlay(actorId, PlayEnum.ANAL_ITEM, count);
          break;
        case "anal":
          $gameSystem
            .currentHistory()
            .eroHistory()
            .addPlay(actorId, PlayEnum.ANAL, count);
          break;
        case "oshikkoNomu":
          if ($gameSystem.countOshikoNomu() == 0) {
            $gameSystem.currentHistory().setEroText(TextManager.firstOshikko);
          }
          $gameSystem.currentHistory().eroHistory().oshikkoNomu++;
          break;
        case "iku":
          $gameSystem.currentHistory().eroHistory().acme++;
          break;
        case "tekoki":
          $gameSystem
            .currentHistory()
            .eroHistory()
            .addPlay(actorId, PlayEnum.TEKOKI, count);
          break;
        case "kekkon":
          $gameSystem.currentHistory().eroHistory().marriageTo(actorId);
          break;
        default:
          console.error("invalid eroId:" + eroId);
          return;
      }
    }
    $gameSystem.currentHistory().saveCostume();
    if (seieki > 0) {
      $gameMedals.onSeieki(seieki);
    }
  });
})(Nore || (Nore = {}));
var Baby = /** @class */ (function () {
  function Baby(_day, _taneoya) {
    this._day = _day;
    this._taneoya = _taneoya;
  }
  Baby.prototype.day = function () {
    return this._day;
  };
  Baby.prototype.taneoya = function () {
    return this._taneoya;
  };
  return Baby;
})();
var Erostatus = /** @class */ (function () {
  function Erostatus(actorId) {
    this._nakadashi = {};
    this._keiken = {};
    this.sexCount = 0;
    this.keikenPeople = 0;
    this.keikenMonster = 0;
    this.ninshin = 0;
    this.ninshinRate = 0;
    this.bote = 0;
    this.mob = {};
    this.taneoya = 0;
    this.chitsuStatus = 0;
    this.chitsuTightening = 100;
    this.analStatus = 0;
    this.analTightening = 100;
    this.kuchiStatus = 0;
    this.chikubiStatus = 0;
    this._baby = [];
    this.seiekiNakadashi = 0;
    this.keikenMachi = 0;
    this.keikenSakaba = 0;
    this.actorId = actorId;
  }
  Erostatus.prototype.upKeikenPerson = function (value) {
    if (value === void 0) {
      value = 1;
    }
    this.keikenPeople += value;
  };
  Erostatus.prototype.upKeiken = function (key, value) {
    if (value === void 0) {
      value = 1;
    }
    this._keiken[key] = this._keiken[key] || 0;
    this._keiken[key] += value;
  };
  Erostatus.prototype.upNakadashi = function (key, value) {
    if (value === void 0) {
      value = 1;
    }
    this.upKeiken(key);
    this._nakadashi[key] = this._nakadashi[key] || 0;
    this._nakadashi[key] += value;
  };
  Erostatus.prototype.keikenTotal = function () {
    var n = 0;
    var checkedId = {};
    var history = $gameSystem.eroHistory();
    for (var _i = 0, history_1 = history; _i < history_1.length; _i++) {
      var h = history_1[_i];
      if (h.eroId == "sex") {
        if (checkedId[h.actorId]) {
          continue;
        }
        n++;
        checkedId[h.actorId] = true;
      }
    }
    return n;
  };
  Erostatus.prototype.isShojo = function () {
    return !$gameSwitches.value(2);
  };
  Erostatus.prototype.onSyusan = function () {
    this.bote = 0;
    this.taneoya = 0;
    this.ninshinRate = 0;
  };
  Object.defineProperty(Erostatus.prototype, "syusan", {
    get: function () {
      return this._baby.length;
    },
    enumerable: true,
    configurable: true,
  });
  Erostatus.prototype.pushBaby = function (baby) {
    this._baby.push(baby);
  };
  Erostatus.prototype.baby = function () {
    return this._baby;
  };
  Erostatus.prototype.faceId = function () {
    if (this._faceId) {
      return this._faceId;
    }
    return $gameActors.actor(5).getDefaultFaceId();
  };
  Erostatus.prototype.hoppeId = function () {
    if (this._hoppeId) {
      return this._hoppeId;
    }
    return $gameActors.actor(5).hoppeId;
  };
  return Erostatus;
})();
(function (Nore) {
  var _Game_System_prototype_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _Game_System_prototype_initialize.call(this);
    this.eroStatus = {};
    for (var i = 1; i <= 12; i++) {
      this.eroStatus[i] = this.newEro(i);
    }
    this.timestamp = new Date().getTime();
  };
  var pluginName = "Nore_Ero";
  PluginManager.registerCommand(pluginName, "PlusKeiken", function (args) {
    var ero = $gameSystem.getEro(1);
    ero["keiken" + args.type] += args.value;
  });
  PluginManager.registerCommand(pluginName, "PlusNakadashi", function (args) {
    $gameSystem.info().plusNakadashi(args.value);
  });
  PluginManager.registerCommand(pluginName, "PlusZasetsu", function (args) {
    $gameActors.mainActor().plusZasetsu(args.value);
    if (!$gameSwitches.value(203)) {
      $gameTemp.reserveCommonEvent(203);
    }
  });
  var UpEroInfo = /** @class */ (function () {
    function UpEroInfo() {
      this.nakadashi = 0;
      this.nakadashiMap = {};
      this.bukkake = 0;
      this.kiss = 0;
      this.iku = 0;
      this.ninshinRate = 0;
      this.gokkun = 0;
      this.kounaiSeieki = 0;
      this.fella = 0;
      this.oshikko = 0;
    }
    UpEroInfo.prototype.isChanged = function (info) {
      if (this.nakadashi != info.nakadashi) {
        return true;
      }
      if (this.bukkake != info.bukkake) {
        return true;
      }
      if (this.kiss != info.kiss) {
        return true;
      }
      if (this.iku != info.iku) {
        return true;
      }
      if (this.kounaiSeieki != info.kounaiSeieki) {
        return true;
      }
      return false;
    };
    UpEroInfo.prototype.upNakadashi = function (enemyId) {
      this.nakadashi++;
      this.nakadashiMap[enemyId] = this.nakadashiMap[enemyId] || 0;
      this.nakadashiMap[enemyId]++;
      this.ninshinRate += 6;
    };
    UpEroInfo.prototype.upKounai = function (n) {
      this.kounaiSeieki += n;
    };
    return UpEroInfo;
  })();
  Nore.UpEroInfo = UpEroInfo;
  function calcSakabaGold() {
    return 40 * $gameVariables.value(33);
  }
  Nore.calcSakabaGold = calcSakabaGold;
})(Nore || (Nore = {}));
