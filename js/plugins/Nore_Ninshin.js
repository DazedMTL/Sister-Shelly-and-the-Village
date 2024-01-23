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
 * @command Show
 * @text 妊娠表示
 * @des 妊娠表示
 *
 * @command Damage
 * @text 妊娠ダメージ
 * @des 妊娠ダメージ
 * @arg actorId
 * @text actorId
 * @desc actorId
 * @arg damage
 * @text damage
 * @desc damage
 *
 * @command SetTaneoyaName
 * @arg count
 * @type number
 * @text 種親の名前をV21に設定
 * @desc 種親の名前をV21に設定
 *
 * @command Taneoya
 * @arg id
 * @type number
 * @text id
 * @desc id
 *
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Ninshin";
  PluginManager.registerCommand(pluginName, "SetTaneoyaName", function (args) {
    var count = parseInt(args.count);
    var taneoyaId = selectTaneoyaId(count);
    p("taneoyaId:" + taneoyaId);
    var name = $gameActors.actor(taneoyaId).name();
    if (!ConfigManager.en && name == "ノア") {
      name = name + "くん";
    }
    $gameVariables.setValue(21, name);
    $gameVariables.setValue(28, taneoyaId);
  });
  function selectTaneoyaId(count) {
    var n = 0;
    for (var _i = 0, _a = $gameSystem.historyList(); _i < _a.length; _i++) {
      var history_1 = _a[_i];
      if (history_1.dayEroHistory().syusanTaneoya) {
        n++;
        if (count == n) {
          return history_1.dayEroHistory().syusanTaneoya;
        }
      }
      if (history_1.nightEroHistory().syusanTaneoya) {
        n++;
        if (count == n) {
          return history_1.nightEroHistory().syusanTaneoya;
        }
      }
    }
    return 0;
  }
  PluginManager.registerCommand(pluginName, "Taneoya", function (args) {
    $gameSystem.getEro(5).taneoya = args.id;
  });
  PluginManager.registerCommand(pluginName, "Show", function (args) {
    if ($gameSwitches.value(999)) {
      //return;
    }
    if ($gameSwitches.value(996)) {
      return;
    }
    if ($gameSwitches.value(3)) {
      return;
    }
    SceneManager._scene.showNinshinGauge();
  });
  PluginManager.registerCommand(pluginName, "Hide", function (args) {
    SceneManager._scene.hideNinshinGauge();
  });
  PluginManager.registerCommand(pluginName, "DamageTotal", function (args) {
    var ero = $gameSystem.getEro(5);
    $gameTemp.ninshinDamage = parseInt(args.value) * $gameParty.ninshinRate();
    if ($gameActors.actor(5).hasAcce(227) || $gameSwitches.value(999)) {
      $gameTemp.ninshinDamage = 110 - ero.ninshinRate;
    } else if ($gameActors.actor(5).hasAcce(226)) {
      $gameTemp.ninshinDamage = 0;
    }
    if ($gameSwitches.value(993)) {
      // 妊娠しないフラグ
      if (ero.ninshinRate + $gameTemp.ninshinDamage >= 100) {
        $gameTemp.ninshinDamage = 100 - ero.ninshinRate - 1;
      }
    }
    if ($gameSwitches.value(996)) {
      $gameTemp.ninshinDamage = 0;
    }
    if ($gameSwitches.value(990)) {
      // 体験版
      var ero = $gameSystem.getEro(5);
      if (ero.ninshinRate + $gameTemp.ninshinDamage >= 100) {
        $gameTemp.ninshinDamage = 100 - ero.ninshinRate - 1;
      }
    }
    var taneoya = parseInt(args.taneoya);
    if (taneoya > 0) {
      $gameTemp.taneoya = taneoya;
    }
  });
  PluginManager.registerCommand(pluginName, "Damage", function (args) {
    var actorId = parseInt(args.actorId);
    var ninshinDamage = parseInt(args.damage);
    var total = $gameTemp.ninshinTotal;
    var realDamage = ninshinDamage;
    var ero = $gameSystem.getEro(actorId);
    if (ero.ninshinRate >= 100) {
      return;
    }
    if ($gameSwitches.value(Nore.NOT_NINSHIN_SW)) {
      total = 0;
      realDamage = 0;
    }
    realDamage = Math.round((ninshinDamage / total) * $gameTemp.ninshinDamage);
    p(
      "ninshinTotal:" +
        actorId +
        " " +
        total +
        " " +
        ninshinDamage +
        " " +
        realDamage +
        " " +
        $gameTemp.ninshinDamage
    );
    ero.ninshinRate += realDamage;
    if (ero.ninshinRate >= 100) {
      $gameVariables.setValue(22, $gameTemp.taneoya);
      $gameSystem.getEro(5).taneoya = $gameTemp.taneoya;
      var actor = $gameActors.actor($gameTemp.taneoya);
      $gameSystem.currentHistory().setTaneoya($gameTemp.taneoya);
    }
  });
  var Sprite_NinshinBar = /** @class */ (function (_super) {
    __extends(Sprite_NinshinBar, _super);
    function Sprite_NinshinBar() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_NinshinBar.prototype.initialize = function () {
      _super.prototype.initialize.call(this);
      this.x = 10;
      this.y = -18;
      this._actorId = 5;
      var ero = $gameSystem.getEro(this._actorId);
      this._lastActorNinshin = ero.ninshinRate;
      this.createBitmap();
      this.redraw();
    };
    Sprite_NinshinBar.prototype.createBitmap = function () {
      this.bitmap = new Bitmap(1006, 78);
      this.bitmap.fontSize = 24;
    };
    Sprite_NinshinBar.prototype.update = function () {
      _super.prototype.update.call(this);
      var ero = $gameSystem.getEro(this._actorId);
      if (this._lastActorNinshin != ero.ninshinRate) {
        this.redraw();
      }
    };
    Sprite_NinshinBar.prototype.redraw = function () {
      var lastNinshin = this._lastActorNinshin >= 100;
      this.destroyAndRemoveChildren();
      this.bitmap.clear();
      var ero = $gameSystem.getEro(this._actorId);
      if (Math.abs(ero.ninshinRate - this._lastActorNinshin) < 1) {
        this._lastActorNinshin = ero.ninshinRate;
      } else {
        this._lastActorNinshin += 0.5;
      }
      var x = 258;
      var y = 33;
      var width = 459;
      var height = 21;
      var hpGaugeColor1 = ColorManager.textColor(20);
      var hpGaugeColor2 = ColorManager.textColor(21);
      if (this._lastActorNinshin >= 100) {
        var hpGaugeColor1 = ColorManager.textColor(27);
        var hpGaugeColor2 = ColorManager.textColor(27);
      }
      var gaugeBackColor = ColorManager.textColor(19);
      this.bitmap.fillRect(x, y, width, height, gaugeBackColor);
      var fillW = Math.floor(((100 - this._lastActorNinshin) * width) / 100);
      var ninshin = ImageManager.loadSystem("ninshin");
      if (ConfigManager.en) {
        this.bitmap.blt(ninshin, 0, 164, 760, 50, 116, 20);
      } else {
        this.bitmap.blt(ninshin, 0, 0, 660, 50, 116, 20);
      }
      if (fillW > 0) {
        var offset = 0;
        if (ConfigManager.en) {
          offset = 92;
        }
        this.bitmap.gradientFillRect(
          x + 1 + offset,
          y + 1,
          fillW - 2,
          height - 2,
          hpGaugeColor1,
          hpGaugeColor2
        );
      }
      var xx = 60;
      var yy = 18;
      if (this._lastActorNinshin >= 100) {
        this.bitmap.blt(ninshin, 0, 110, 70, 50, xx, yy);
      } else {
        this.bitmap.blt(ninshin, 0, 60, 70, 50, xx, yy);
      }
      var num =
        Math.max(0, Math.floor(100 - this._lastActorNinshin)) + "/" + 100;
      this.drawNumber(num, ConfigManager.en ? 707 : 618, 18, 100, "right", 8);
      if (!lastNinshin && this._lastActorNinshin >= 100) {
        $gameSwitches.setValue(46, true);
      }
    };
    return Sprite_NinshinBar;
  })(Sprite);
  Nore.Sprite_NinshinBar = Sprite_NinshinBar;
  var Sprite_MiniNinshinBar = /** @class */ (function (_super) {
    __extends(Sprite_MiniNinshinBar, _super);
    function Sprite_MiniNinshinBar(ninshinRate) {
      var _this = _super.call(this) || this;
      _this._ninshinRate = ninshinRate;
      _this.createBitmap();
      _this.redraw();
      return _this;
    }
    Sprite_MiniNinshinBar.prototype.initialize = function () {
      _super.prototype.initialize.call(this);
      this.x = 10;
      this.y = 4;
    };
    Sprite_MiniNinshinBar.prototype.createBitmap = function () {
      this.bitmap = new Bitmap(106, 38);
      this.bitmap.fontSize = 24;
    };
    Sprite_MiniNinshinBar.prototype.redraw = function () {
      this.bitmap.clear();
      var x = 12;
      var y = 16;
      var width = 70;
      var height = 8;
      var hpGaugeColor1 = ColorManager.textColor(20);
      var hpGaugeColor2 = ColorManager.textColor(21);
      if (this._ninshinRate >= 100) {
        var hpGaugeColor1 = ColorManager.textColor(27);
        var hpGaugeColor2 = ColorManager.textColor(27);
      }
      var gaugeBackColor = ColorManager.textColor(19);
      this.bitmap.fillRect(x, y, width, height, gaugeBackColor);
      var fillW = Math.floor(((100 - this._ninshinRate) * width) / 100);
      if (fillW > 0) {
        this.bitmap.gradientFillRect(
          x + 1,
          y + 1,
          fillW - 2,
          height - 2,
          hpGaugeColor1,
          hpGaugeColor2
        );
      }
      /*var ninshin = ImageManager.loadSystem('ninshin');
            this.bitmap.blt(ninshin, 0, 0, 160, 50, 20, 0);
            var xx = 170;
            if (this._ninshinRate >= 100) {
                this.bitmap.blt(ninshin, 0, 110, 70, 50, xx, -1);
            } else {
                this.bitmap.blt(ninshin, 0, 60, 70, 50, xx, -1);
            }*/
    };
    return Sprite_MiniNinshinBar;
  })(Sprite);
  Nore.Sprite_MiniNinshinBar = Sprite_MiniNinshinBar;
  Scene_Map.prototype.showNinshinGauge = function () {
    this._ninshinBar = new Sprite_NinshinBar();
    this.addChild(this._ninshinBar);
  };
  Scene_Map.prototype.hideNinshinGauge = function () {
    if (this._ninshinBar) {
      this.removeChild(this._ninshinBar);
      this._ninshinBar = null;
    }
  };
  function setTaneoyaName() {
    var taneoyaId = $gameVariables.value(76);
    if (!taneoyaId) {
      console.error("種親がみつかりません");
      return;
    }
    var name = $gameActors.actor(taneoyaId).name();
    if (!ConfigManager.en && name == "ノア") {
      name = name + "くん";
    }
    $gameVariables.setValue(21, name);
  }
  Nore.setTaneoyaName = setTaneoyaName;
  function countSyusan() {
    var taneoya = $gameSystem.getEro(5).taneoya;
    return $gameSystem.countSyusan(taneoya);
  }
  Nore.countSyusan = countSyusan;
  function countSyusan2(taneoyaId) {
    return $gameSystem.countSyusan(taneoyaId);
  }
  Nore.countSyusan2 = countSyusan2;
  function upSyusan() {
    var taneoya = $gameSystem.getEro(5).taneoya;
    $gameSystem.currentHistory().eroHistory().syusan = 1;
    $gameSystem.currentHistory().eroHistory().syusanTaneoya = taneoya;
  }
  Nore.upSyusan = upSyusan;
  function hasOtherSyusan(taneoyaId) {
    return $gameSystem.hasOtherSyusan(taneoyaId);
  }
  Nore.hasOtherSyusan = hasOtherSyusan;
})(Nore || (Nore = {}));
