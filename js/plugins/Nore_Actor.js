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
 * @command AddEroAction
 * @text エロアクションの追加
 * @des エロアクションの追加
 * @arg id
 * @text エロアクションID
 * @desc エロアクションID
 *
 * @command AddSexAction
 * @text SEXアクションの追加
 * @des SEXアクションの追加
 * @arg id
 * @text SEXアクションID
 * @desc SEXアクションID
 *
 * @command RemoveEroAction
 * @text エロアクションの削除
 * @des エロアクションの削除
 * @arg id
 * @text エロアクションID
 * @desc エロアクションID
 *
 * @command Syasei
 * @text 射精
 * @des 射精
 * @arg enemyId
 * @text エネミーID
 * @desc エネミーID
 *
 * @command Estrus
 * @text 発情
 * @des 発情
 * @arg value
 * @text 値
 * @desc 値
 *
 * @command Face
 * @text 表情
 * @des 表情
 * @arg value
 * @text faceId
 * @desc faceId
 *
 * @command SexAnime
 * @text セックスアニメ
 * @des セックスアニメ
 * @arg id
 * @text エネミーID
 * @desc エネミーID
 * @arg inFrame
 * @text inFrame
 * @desc inFrame
 * @arg outFrame
 * @text outFrame
 * @desc outFrame
 * @arg outStart
 * @text outStart
 * @desc outStart
 *
 * @command RecoverFatigue
 * @text 披露回復
 * @des 披露回復
 *

 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Actor";
  PluginManager.registerCommand(pluginName, "AddEroAction", function (args) {
    var id = args.id;
    var skill = null;
    var parts;
    switch (id) {
      case "teman":
        skill = $dataSkills[103];
        parts = Parts.manko;
        break;
      case "vibe":
        skill = $dataSkills[119];
        parts = Parts.manko;
        break;
    }
    if (!skill) {
      console.error("skill not found." + id);
    }
    $gameActors.mainActor().addEroAction(skill, parts, new Game_Enemy(1, 1, 1));
  });
  PluginManager.registerCommand(pluginName, "AddSexAction", function (args) {
    var id = args.id;
    var enemyId;
    for (var i = 1; i < 500; i++) {
      var enemyData = $dataEnemies[i];
      if (enemyData && enemyData.meta["chinpo"]) {
        var chinpo = enemyData.meta["chinpo"];
        if (chinpo == id) {
          enemyId = i;
          break;
        }
      }
    }
    if (!enemyId) {
      console.error("enemy not found." + id);
      enemyId = 1;
    }
    $gameActors.mainActor().startSex(new Game_Enemy(enemyId, 1, 1));
  });
  PluginManager.registerCommand(pluginName, "RemoveEroAction", function (args) {
    var id = args.id;
    var parts;
    switch (id) {
      case "teman":
        parts = Parts.manko;
        break;
    }
    if (!parts) {
      console.error("parts not found." + id);
    }
    $gameActors.mainActor().removePartsEroAction(parts, null);
  });
  PluginManager.registerCommand(pluginName, "SexAnime", function (args) {
    var enemyId = args.id;
    var outFrame = args.outFrame;
    var inFrame = args.inFrame;
    var outStart = args.outStart;
    $gameActors
      .mainActor()
      .startSex(new Game_Enemy(enemyId, 1, 1), inFrame, outFrame, outStart);
  });
  PluginManager.registerCommand(pluginName, "RecoverFatigue", function (args) {
    $gameActors.mainActor().recoverFatigue();
  });
  PluginManager.registerCommand(pluginName, "Syasei", function (args) {
    var enemyId = args.enemyId;
    var value = args.value;
    $gameActors.mainActor().syasei(new Game_Enemy(enemyId, 0, 0), value);
  });
  PluginManager.registerCommand(pluginName, "Estrus", function (args) {
    var value = args.value;
    $gameActors.mainActor().setEstrus(value);
  });
  PluginManager.registerCommand(pluginName, "FaceId", function (args) {
    var value = args.value;
    $gameActors.mainActor().setFaceId(value);
  });
  PluginManager.registerCommand(pluginName, "EndSex", function (args) {
    $gameActors.mainActor().endSex();
  });
  PluginManager.registerCommand(pluginName, "StartKunni", function (args) {
    $gameActors.mainActor().startKunni();
  });
  PluginManager.registerCommand(pluginName, "EndKunni", function (args) {
    $gameActors.mainActor().endKunni();
  });
  PluginManager.registerCommand(pluginName, "ChinpoNuku", function (args) {
    $gameActors.mainActor().endSex();
  });
  PluginManager.registerCommand(pluginName, "PlusSeieki", function (args) {
    var enemyId = args.enemyId;
    var value = args.value;
    $gameActors.mainActor().plusSeieki(new Game_Enemy(enemyId, 0, 0), value);
  });
})(Nore || (Nore = {}));
Game_Battler.prototype.dmgPlus2 = function () {
  if (this.isActor()) {
    return 0;
  }
  var bonus = this.enemy().meta["dmgPlus"];
  if (bonus) {
    return Math.trunc(bonus);
  }
  return 0;
};
Game_Actors.prototype.actor = function (actorId) {
  if ($dataActors[actorId]) {
    if (!this._data[actorId]) {
      if (actorId == 4) {
        this._data[actorId] = new Game_MainActor(actorId);
      } else {
        this._data[actorId] = new Game_CostumeActor(actorId);
      }
    }
    return this._data[actorId];
  }
  return null;
};
Game_Actors.prototype.mainActor = function () {
  return this.actor(4);
};
Game_Actors.prototype.mainActor2 = function () {
  return this.actor(5);
};
var Game_MainActor = /** @class */ (function (_super) {
  __extends(Game_MainActor, _super);
  function Game_MainActor(actorId) {
    var _this = _super.call(this, actorId) || this;
    _this._fatigue = -1;
    return _this;
  }
  Game_MainActor.prototype.equips = function () {
    //p('equips')
    return [
      this._weapon1,
      this._weapon2,
      this._armor1,
      this._armor2,
      this._armor3,
      this._armor4,
    ];
  };
  Game_MainActor.prototype.weapon1 = function () {
    return this._weapon1;
  };
  Game_MainActor.prototype.weapon2 = function () {
    return this._weapon2;
  };
  Game_MainActor.prototype.armor1 = function () {
    return this._armor1;
  };
  Game_MainActor.prototype.armor2 = function () {
    return this._armor2;
  };
  Game_MainActor.prototype.armor3 = function () {
    return this._armor3;
  };
  Game_MainActor.prototype.armor4 = function () {
    return this._armor4;
  };
  Game_MainActor.prototype.setWeapon = function (type, weapon) {
    switch (type) {
      case 1:
      case 2:
        break;
      default:
        console.error("error setWeapon: " + type);
        return;
    }
    this["_weapon" + type] = weapon;
  };
  Game_MainActor.prototype.setArmor = function (armor) {
    this["_armor" + this.slotId(armor.etypeId())] = armor;
  };
  Game_MainActor.prototype.slotId = function (etypeId) {
    switch (etypeId) {
      case 4: // 鎧
        return 1;
      case 3: // 帽子
        return 2;
      case 8: // 靴
        return 3;
      case 6: // 盾
        return 4;
    }
    return 1;
  };
  Game_MainActor.prototype.getArmor = function (etypeId) {
    return this["_armor" + this.slotId(etypeId)];
  };
  Game_MainActor.prototype.releaseUnequippableItems = function () {};
  Game_MainActor.prototype.traitObjects = function () {
    var objects = Game_Battler.prototype.traitObjects.call(this);
    objects.push(this.actor(), this.currentClass());
    return objects;
  };
  Object.defineProperty(Game_MainActor.prototype, "mhp", {
    get: function () {
      var n = Math.min(this.param(0), 999);
      for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
        var e = _a[_i];
        if (e) {
          n += e.hp();
        }
      }
      return n;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_MainActor.prototype, "atk", {
    get: function () {
      var n = this.param(2);
      for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
        var e = _a[_i];
        if (e) {
          n += e.atk();
        }
      }
      return Math.max(Math.round(n * this.fatigueRate()), 1);
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_MainActor.prototype, "def", {
    get: function () {
      var n = this.param(3);
      for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
        var e = _a[_i];
        if (e) {
          n += e.def();
        }
      }
      return Math.max(Math.round(n * this.fatigueRate()), 1);
    },
    enumerable: true,
    configurable: true,
  });
  Game_MainActor.prototype.fatigueRate = function () {
    return (100 - this.fatigue()) / 100;
  };
  Object.defineProperty(Game_MainActor.prototype, "hit", {
    get: function () {
      var n = this.xparam(0);
      for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
        var e = _a[_i];
        if (!e) {
          continue;
        }
        n += e.hit() / 100;
      }
      for (var _b = 0, _c = $gameParty.armors(); _b < _c.length; _b++) {
        var armor = _c[_b];
        if (!armor) {
          continue;
        }
        for (var _d = 0, _e = armor.traits; _d < _e.length; _d++) {
          var t = _e[_d];
          if (t.code == 22) {
            if (t.dataId == 0) {
              n += t.value;
            }
          }
        }
      }
      if ($gameSwitches.value(9)) {
        n += 0.25;
      }
      return n;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_MainActor.prototype, "eva", {
    get: function () {
      var n = this.xparam(1);
      for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
        var e = _a[_i];
        if (!e) {
          continue;
        }
        n += e.eva() / 100;
      }
      for (var _b = 0, _c = $gameParty.armors(); _b < _c.length; _b++) {
        var armor = _c[_b];
        if (!armor) {
          continue;
        }
        for (var _d = 0, _e = armor.traits; _d < _e.length; _d++) {
          var t = _e[_d];
          if (t.code == 22) {
            if (t.dataId == 1) {
              n += t.value;
            }
          }
        }
      }
      return n * this.fatigueRate();
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_MainActor.prototype, "pha", {
    get: function () {
      var pha = _super.prototype.pha;
      for (var _i = 0, _a = $gameParty.armors(); _i < _a.length; _i++) {
        var armor = _a[_i];
        if (!armor) {
          continue;
        }
        var up = parseInt(armor.meta["yakusouPlus"]);
        if (!isNaN(up)) {
          pha += up / 100;
        }
      }
      return pha;
    },
    enumerable: true,
    configurable: true,
  });
  Game_MainActor.prototype.onNextDay = function () {
    this._fatigue = 0;
  };
  Game_MainActor.prototype.fatigue = function () {
    return Math.min(Math.max(this._fatigue, 0), 100);
  };
  Game_MainActor.prototype.onDungeonEnd = function () {
    if ($gameSwitches.value(12)) {
      this._fatigue += 1;
    } else {
      this._fatigue += 2;
    }
  };
  Game_MainActor.prototype.recoverFatigue = function () {
    this._fatigue = 0;
  };
  Game_MainActor.prototype.skillRate = function () {
    var n = 100;
    for (var _i = 0, _a = $gameParty.armors(); _i < _a.length; _i++) {
      var armor = _a[_i];
      if (!armor) {
        continue;
      }
      var up = parseInt(armor.meta["waza"]);
      if (!isNaN(up)) {
        n += up;
      }
    }
    return n / 100;
  };
  Game_MainActor.prototype.expPlusRate = function () {
    var n = 100;
    for (var _i = 0, _a = $gameParty.armors(); _i < _a.length; _i++) {
      var armor = _a[_i];
      if (!armor) {
        continue;
      }
      var up = parseInt(armor.meta["exp"]);
      if (!isNaN(up)) {
        n += up;
      }
    }
    return n / 100;
  };
  Game_MainActor.prototype.goldPlusRate = function () {
    var n = 100;
    for (var _i = 0, _a = $gameParty.armors(); _i < _a.length; _i++) {
      var armor = _a[_i];
      if (!armor) {
        continue;
      }
      var up = parseInt(armor.meta["gold"]);
      if (!isNaN(up)) {
        n += up;
      }
    }
    return n / 100;
  };
  return Game_MainActor;
})(Game_CostumeActor);
