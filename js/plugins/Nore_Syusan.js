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
 * @command toSyusan
 * @text 出産シーンへ
 *
 */
var Nore;
(function (Nore) {
  var ERO_SAVE_SW = 981;
  var pluginName = "Nore_Syusan";
  PluginManager.registerCommand(pluginName, "toSyusan", function (args) {
    SceneManager.push(Scene_Syusan);
  });
  PluginManager.registerCommand(pluginName, "showLayer", function (args) {
    var id = args.id;
    var file = "01_22_" + id;
    $gameTemp.ignoreFiles[file] = false;
  });
  PluginManager.registerCommand(pluginName, "hideLayer", function (args) {
    var id = args.id;
    var file = "01_22_" + id;
    $gameTemp.ignoreFiles[file] = true;
  });
  PluginManager.registerCommand(pluginName, "plusSanke", function (args) {
    var n = parseInt(args.value);
    syusanParams.plusSanke(n);
  });
  PluginManager.registerCommand(pluginName, "setTaneoya", function (args) {
    var n = parseInt(args.id);
    $gameActors.mainActor().sikyu().taneoyaId = n;
  });
  PluginManager.registerCommand(pluginName, "plusSeieki", function (args) {
    syusanParams.plusSeieki();
  });
  PluginManager.registerCommand(pluginName, "plusAnal", function (args) {
    syusanParams.plusAnal();
  });
  PluginManager.registerCommand(pluginName, "plusOshikko", function (args) {
    syusanParams.plusOshikko();
  });
  PluginManager.registerCommand(pluginName, "face", function (args) {
    var n = parseInt(args.face);
    var actor = $gameActors.actor(5);
    actor._faceId = n;
  });
  Nore.allImageList = [];
  var actorId = 0;
  var actorHoppeId = 0;
  var syusanParams;
  var SyusanParams = /** @class */ (function () {
    function SyusanParams(aid) {
      this.criPoint = 0;
      this._syusanSeieki = 0;
      this._syusanAnal = 0;
      this._syusanOshikko = 0;
      this.sanke = 0;
      this.actorId = aid;
    }
    SyusanParams.prototype.faceId = function () {
      var actor = $gameActors.actor(5);
      var id = actor.faceId;
      //p('face:' + id)
      /*if (id == actor.defaultFaceId && this.sanke >= 50) {
                return 12;
            }*/
      return id;
    };
    SyusanParams.prototype.plusSanke = function (n) {
      this.sanke += n;
      this.sanke = Math.min(this.sanke, 100);
    };
    SyusanParams.prototype.isMaxSanke = function () {
      return this.sanke >= 100;
    };
    SyusanParams.prototype.plusSeieki = function () {
      this._syusanSeieki++;
    };
    SyusanParams.prototype.plusAnal = function () {
      this._syusanAnal++;
    };
    SyusanParams.prototype.plusOshikko = function () {
      this._syusanOshikko++;
    };
    SyusanParams.prototype.seieki = function () {
      return Math.min(5, this._syusanSeieki);
    };
    SyusanParams.prototype.analSeieki = function () {
      return Math.min(1, this._syusanAnal);
    };
    SyusanParams.prototype.oshikko = function () {
      return Math.min(1, this._syusanOshikko);
    };
    return SyusanParams;
  })();
  Nore.SyusanParams = SyusanParams;
  var Scene_Syusan = /** @class */ (function (_super) {
    __extends(Scene_Syusan, _super);
    function Scene_Syusan() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._levelMap = {};
      _this._runTaneoyaOpening = false;
      return _this;
    }
    Scene_Syusan.prototype.update = function () {
      _super.prototype.update.call(this);
      $gameScreen.update();
      this._fadeSprite.opacity = 255 - $gameScreen.brightness();
    };
    Scene_Syusan.prototype.fixSyusan = function () {
      if (!$gameSystem.getEro(5).taneoya) {
        $gameSystem.getEro(5).taneoya = 15;
      }
    };
    Scene_Syusan.prototype.create = function () {
      _super.prototype.create.call(this);
      this.fixSyusan();
      actorId = 5;
      this._params = new SyusanParams(actorId);
      syusanParams = this._params;
      this.initTaneoyaName();
      this.initImages(5);
      this.createSprite();
      this.createPictures();
      this.createFadeSprite();
      this.createWindowLayer();
      this.createStatusWindow();
      this.createMenuWindow();
      this.createAllWindows();
      this.playScenario("出産_オープニング_01");
    };
    Scene_Syusan.prototype.createFadeSprite = function () {
      this._fadeSprite = new ScreenSprite();
      this.addChild(this._fadeSprite);
    };
    Scene_Syusan.prototype.createPictures = function () {
      var width = Graphics.width;
      var height = Graphics.height;
      var x = (Graphics.width - width) / 2;
      var y = (Graphics.height - height) / 2;
      this._pictureContainer = new Sprite();
      this._pictureContainer.setFrame(x, y, width, height);
      for (var i = 14; i <= $gameScreen.maxPictures(); i++) {
        this._pictureContainer.addChild(new Sprite_Picture(i));
      }
      this.addChild(this._pictureContainer);
    };
    Scene_Syusan.prototype.initTaneoyaName = function () {
      switch ($gameSystem.getEro(5).taneoya) {
        case 11:
          this._taneoyaName = "宿屋";
          return;
        case 12:
          this._taneoyaName = "パン屋";
          return;
        case 13:
          this._taneoyaName = "武器屋";
          return;
        case 15:
          this._taneoyaName = "浮浪者";
          return;
        case 16:
          this._taneoyaName = "薬草売り";
          return;
        case 18:
          this._taneoyaName = "ノア";
          return;
        default:
          this._taneoyaName = "不明";
          $gameVariables.setValue(76, 30);
      }
    };
    Scene_Syusan.prototype.playScenario = function (id) {
      _super.prototype.playScenario.call(this, id);
      $gameSwitches.setValue(69, false);
      this._menuWindow.deactivate();
    };
    Scene_Syusan.prototype.finishScenario = function () {
      $gameSwitches.setValue(69, true);
      this._menuWindow.activate();
      if (this._finished) {
        SceneManager.pop();
      } else if (this._doSyusan) {
        this._menuWindow.hide();
        this._statusWindow.hide();
        this._finished = true;
        this.playScenario("出産_01");
      } else if (this._params.isMaxSanke()) {
        this._menuWindow.hide();
        this._statusWindow.hide();
        this._doSyusan = true;
        this.playScenario("ゲージ満タンセリフ_%1".format(this._taneoyaName));
      } else {
        p("finishScenario");
        this._menuWindow._itemList = null;
        this._menuWindow.makeItemList();
        this._menuWindow.refresh();
      }
    };
    Scene_Syusan.prototype.initImages = function (actorId) {
      var actor = $gameActors.actor(actorId);
      for (var _i = 0, ero1First_1 = ero1First; _i < ero1First_1.length; _i++) {
        var f = ero1First_1[_i];
        $gameTemp.ignoreFiles[f] = true;
      }
      if (actor.hasAcce(208)) {
        $gameTemp.ignoreFiles["01_22_淫紋"] = false;
      }
      if (actor.hasAcce(210)) {
        $gameTemp.ignoreFiles["01_22_乳首ピアス"] = false;
      }
      if (actor.hasAcce(224)) {
        $gameTemp.ignoreFiles["01_22_黒乳首"] = false;
      }
      if (actor.hasAcce(214)) {
        $gameTemp.ignoreFiles["01_22_焼印1"] = false;
      }
      if (actor.hasAcce(215)) {
        $gameTemp.ignoreFiles["01_22_焼印2"] = false;
      }
      Nore.allImageList = [];
      for (var _a = 0, _b = actor1EroList.concat(); _a < _b.length; _a++) {
        var file = _b[_a];
        if (
          file == "01_22_出産1" ||
          file == "01_22_出産2" ||
          file == "01_22_出産3" ||
          file == "01_22_アナル挿入"
        ) {
          if (actor.hasAcce(299)) {
            continue;
          }
        }
        if (
          file == "01_22_出産1k" ||
          file == "01_22_出産2k" ||
          file == "01_22_出産3k" ||
          file == "01_22_アナル挿入k"
        ) {
          if (!actor.hasAcce(299)) {
            continue;
          }
        }
        Nore.allImageList.push(file);
      }
      if (actor.hasAcce(299)) {
        $gameTemp.ignoreFiles["01_22_base"] = true;
      } else {
        $gameTemp.ignoreFiles["01_22_base_k"] = true;
      }
    };
    Scene_Syusan.prototype.createMenuWindow = function () {
      this._menuWindow = new Window_ChokyoMenu(
        this._statusWindow.height - 5,
        this._params,
        this
      );
      this.addWindow(this._menuWindow);
      this._menuWindow.setHandler("ok", this.onOk.bind(this));
    };
    Scene_Syusan.prototype.createStatusWindow = function () {
      this._statusWindow = new Window_EroStatus(this._params);
      this.addWindow(this._statusWindow);
    };
    Scene_Syusan.prototype.createSprite = function () {
      this._sprite = new Sprite_Chokyo(this._params);
      this.addChild(this._sprite);
    };
    Scene_Syusan.prototype.onOk = function () {
      var id = this._menuWindow.selectedId();
      switch (id) {
        case SyusanCommad.VIBE:
          this.doVibe();
          break;
        case SyusanCommad.CHIKUBI:
          this.doChikubi();
          break;
        case SyusanCommad.CHIKUBI2:
          this.doChikubi2();
          break;
        case SyusanCommad.KUPAA:
          this.doKupaa();
          break;
        case SyusanCommad.ONAKA_BUKKAKE:
          this.doOnakaBukkake();
          break;
        case SyusanCommad.KAO_BUKKAKE:
          this.doKaoBukkake();
          break;
        case SyusanCommad.SEX:
          this.doSex();
          break;
        case SyusanCommad.MUCHI:
          this.doMuchi();
          break;
        case SyusanCommad.ANAL:
          this.doAnal();
          break;
        case SyusanCommad.TEMAN:
          this.doTeman();
          break;
        case SyusanCommad.ONAKA_NADE:
          this.doOnakaNade();
          break;
        case SyusanCommad.KISS:
          this.doKiss();
          break;
        case SyusanCommad.CHICHIMOMI:
          this.doChichimomo();
          break;
        case SyusanCommad.CHICHISUI:
          this.doChichisui();
          break;
        case SyusanCommad.AORI:
          this.doAori();
          break;
        case SyusanCommad.OSHIKKO:
          this.doOshikko();
          break;
        case SyusanCommad.HANA:
          this.doHana();
          break;
        default:
          this._menuWindow.activate();
          this._menuWindow.select(0);
          return;
      }
      this._menuWindow.makeItemList();
      this._menuWindow.refresh();
    };
    Scene_Syusan.prototype.doVibe = function () {
      this.playScenario("出産_手マン_LV" + 1);
    };
    Scene_Syusan.prototype.doSex = function () {
      $gameSystem.currentHistory().eroHistory().nakadashi++;
      this.playScenario(
        "出産_挿入_%1_LV%2".format(this._taneoyaName, this.getLevel("挿入"))
      );
    };
    Scene_Syusan.prototype.getLevel = function (str) {
      this._levelMap[str] = this._levelMap[str] || 0;
      this._levelMap[str]++;
      /*let total = 0;
            for (let i in this._levelMap) {
                total += this._levelMap[i];
            }
            if (total >= 6) {
                return 6;
            } else {*/
      return this._levelMap[str];
      //}
    };
    Scene_Syusan.prototype.isCommandExists = function (type) {
      this._levelMap[type] = this._levelMap[type] || 0;
      var nextLevel = this._levelMap[type] + 1;
      /* let total = 0;
             for (let i in this._levelMap) {
                 total += this._levelMap[i];
             }
             if (total >= 5) {
                 nextLevel = 6;
             }*/
      var scenarioId = "出産_%3_%1_LV%2".format(
        this._taneoyaName,
        nextLevel,
        type
      );
      return $dataScenario[scenarioId] != null;
    };
    Scene_Syusan.prototype.doMuchi = function () {
      this.playScenario(
        "出産_ムチ_%1_LV%2".format(this._taneoyaName, this.getLevel("ムチ"))
      );
    };
    Scene_Syusan.prototype.doKupaa = function () {
      this._params.kupaa = true;
      this.playScenario("出産_くぱぁ_%1_LV%2".format(this._taneoyaName, 1));
    };
    Scene_Syusan.prototype.doOnakaNade = function () {
      this.playScenario(
        "出産_お腹なで_%1_LV%2".format(
          this._taneoyaName,
          this.getLevel("お腹なで")
        )
      );
    };
    Scene_Syusan.prototype.doOnakaBukkake = function () {
      //$gameSystem.getEro(5).plusBukkake(1);
      this.playScenario(
        "出産_お腹ぶっかけ_%1_LV%2".format(
          this._taneoyaName,
          this.getLevel("お腹ぶっかけ")
        )
      );
    };
    Scene_Syusan.prototype.doKaoBukkake = function () {
      //$gameSystem.getEro(5).plusBukkake(1);
      this.playScenario(
        "出産_顔ぶっかけ_%1_LV%2".format(
          this._taneoyaName,
          this.getLevel("顔ぶっかけ")
        )
      );
    };
    Scene_Syusan.prototype.doChikubi = function () {
      this.playScenario(
        "出産_乳首つまみ_%1_LV%2".format(
          this._taneoyaName,
          this.getLevel("乳首つまみ")
        )
      );
    };
    Scene_Syusan.prototype.doChikubi2 = function () {
      this.playScenario(
        "出産_乳首舐め_%1_LV%2".format(
          this._taneoyaName,
          this.getLevel("乳首舐め")
        )
      );
    };
    Scene_Syusan.prototype.doTeman = function () {
      this.playScenario(
        "出産_手マン_%1_LV%2".format(this._taneoyaName, this.getLevel("手マン"))
      );
    };
    Scene_Syusan.prototype.doKiss = function () {
      this.playScenario(
        "出産_キス_%1_LV%2".format(this._taneoyaName, this.getLevel("キス"))
      );
    };
    Scene_Syusan.prototype.doChichimomo = function () {
      this.playScenario(
        "出産_乳揉み_%1_LV%2".format(this._taneoyaName, this.getLevel("乳揉み"))
      );
    };
    Scene_Syusan.prototype.doChichisui = function () {
      this.playScenario(
        "出産_乳吸い_%1_LV%2".format(this._taneoyaName, this.getLevel("乳吸い"))
      );
    };
    Scene_Syusan.prototype.doAnal = function () {
      this.playScenario(
        "出産_アナル_%1_LV%2".format(this._taneoyaName, this.getLevel("アナル"))
      );
    };
    Scene_Syusan.prototype.doAori = function () {
      this.playScenario(
        "出産_レオあおり_%1_LV%2".format(
          this._taneoyaName,
          this.getLevel("レオあおり")
        )
      );
    };
    Scene_Syusan.prototype.doOshikko = function () {
      this.playScenario(
        "出産_膣内放尿_%1_LV%2".format(
          this._taneoyaName,
          this.getLevel("膣内放尿")
        )
      );
    };
    Scene_Syusan.prototype.doHana = function () {
      this.playScenario(
        "出産_鼻フック_%1_LV%2".format(
          this._taneoyaName,
          this.getLevel("鼻フック")
        )
      );
    };
    return Scene_Syusan;
  })(Nore.Scene_Talk);
  Nore.Scene_Syusan = Scene_Syusan;
  var SyusanCommad;
  (function (SyusanCommad) {
    SyusanCommad[(SyusanCommad["VIBE"] = 1)] = "VIBE";
    SyusanCommad[(SyusanCommad["MUCHI"] = 2)] = "MUCHI";
    SyusanCommad[(SyusanCommad["SEX"] = 3)] = "SEX";
    SyusanCommad[(SyusanCommad["KUPAA"] = 4)] = "KUPAA";
    SyusanCommad[(SyusanCommad["CHIKUBI"] = 5)] = "CHIKUBI";
    SyusanCommad[(SyusanCommad["CHIKUBI2"] = 6)] = "CHIKUBI2";
    SyusanCommad[(SyusanCommad["ANAL"] = 7)] = "ANAL";
    SyusanCommad[(SyusanCommad["ONAKA_NADE"] = 8)] = "ONAKA_NADE";
    SyusanCommad[(SyusanCommad["ONAKA_BUKKAKE"] = 10)] = "ONAKA_BUKKAKE";
    SyusanCommad[(SyusanCommad["KAO_BUKKAKE"] = 11)] = "KAO_BUKKAKE";
    SyusanCommad[(SyusanCommad["TEMAN"] = 12)] = "TEMAN";
    SyusanCommad[(SyusanCommad["KISS"] = 13)] = "KISS";
    SyusanCommad[(SyusanCommad["CHICHIMOMI"] = 14)] = "CHICHIMOMI";
    SyusanCommad[(SyusanCommad["CHICHISUI"] = 15)] = "CHICHISUI";
    SyusanCommad[(SyusanCommad["AORI"] = 16)] = "AORI";
    SyusanCommad[(SyusanCommad["OSHIKKO"] = 17)] = "OSHIKKO";
    SyusanCommad[(SyusanCommad["HANA"] = 18)] = "HANA";
  })((SyusanCommad = Nore.SyusanCommad || (Nore.SyusanCommad = {})));
  var Window_ChokyoMenu = /** @class */ (function (_super) {
    __extends(Window_ChokyoMenu, _super);
    function Window_ChokyoMenu() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.isCurrentItemEnabled = function () {
        var id = this.selectedId();
        return this.isItemEnabled(id);
      };
      return _this;
    }
    Window_ChokyoMenu.prototype.initialize = function (y, params, scene) {
      this._params = params;
      this._actorId = params.actorId;
      this._scene = scene;
      _super.prototype.initialize.call(
        this,
        new Rectangle(0, y, 260, this.windowHeight())
      );
      this.select(0);
      this.deactivate();
      this.makeItemList();
      this.refresh();
    };
    Window_ChokyoMenu.prototype.makeItemList = function () {
      if (this._itemList) {
        return;
      }
      this._itemList = [];
      var d = this._itemList;
      if (this.isCommandExists("vive")) {
        d.push(SyusanCommad.VIBE);
      }
      if (this.isCommandExists("挿入")) {
        d.push(SyusanCommad.SEX);
      }
      if (this.isCommandExists("アナル")) {
        d.push(SyusanCommad.ANAL);
      }
      if (this.isCommandExists("乳首つまみ")) {
        d.push(SyusanCommad.CHIKUBI);
      }
      if (this.isCommandExists("乳首舐め")) {
        d.push(SyusanCommad.CHIKUBI2);
      }
      if (this.isCommandExists("ムチ")) {
        d.push(SyusanCommad.MUCHI);
      }
      if (this.isCommandExists("くぱぁ")) {
        d.push(SyusanCommad.KUPAA);
      }
      if (this.isCommandExists("お腹なで")) {
        d.push(SyusanCommad.ONAKA_NADE);
      }
      if (this.isCommandExists("顔ぶっかけ")) {
        d.push(SyusanCommad.KAO_BUKKAKE);
      }
      if (this.isCommandExists("お腹ぶっかけ")) {
        d.push(SyusanCommad.ONAKA_BUKKAKE);
      }
      if (this.isCommandExists("手マン")) {
        d.push(SyusanCommad.TEMAN);
      }
      if (this.isCommandExists("キス")) {
        d.push(SyusanCommad.KISS);
      }
      if (this.isCommandExists("乳揉み")) {
        d.push(SyusanCommad.CHICHIMOMI);
      }
      if (this.isCommandExists("乳吸い")) {
        d.push(SyusanCommad.CHICHISUI);
      }
      if (this.isCommandExists("膣内放尿")) {
        d.push(SyusanCommad.OSHIKKO);
      }
      if (this.isCommandExists("鼻フック")) {
        d.push(SyusanCommad.HANA);
      }
      if ($gameSwitches.value(18)) {
        if (this.isCommandExists("レオあおり")) {
          d.push(SyusanCommad.AORI);
        }
      }
      this.height = this._itemList.length * (this.lineHeight() + 8) + 30;
      if (this._itemList.length <= this.index()) {
        this.select(this._itemList.length - 1);
      }
    };
    Window_ChokyoMenu.prototype.isCommandExists = function (type) {
      return this._scene.isCommandExists(type);
    };
    Window_ChokyoMenu.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      var id = this._itemList[index];
      var enabled = this.isItemEnabled(id);
      this.changePaintOpacity(enabled);
      this.drawText(getEroName(id), 12, rect.y, 230, "left");
    };
    Window_ChokyoMenu.prototype.isItemEnabled = function (id) {
      if (id == SyusanCommad.KUPAA) {
        return !this._params.kupaa;
      }
      if (id == SyusanCommad.BUKKAKE) {
        return !this._params.bukkake;
      }
      return true;
    };
    Window_ChokyoMenu.prototype.isConditionMatches = function (params, state) {
      var ero = $gameSystem.getEro(this._actorId);
      var level = Math.floor(ero[state + "Lv"] / 10);
      for (var i = 10; i >= 0; i--) {
        if (this.conditionMatch(params[level], i, ero)) {
          return true;
        }
      }
      return false;
    };
    Window_ChokyoMenu.prototype.conditionMatch = function (params, level, ero) {
      level = Math.floor(level / 10);
      if (!params) {
        return false;
      }
      if (!params[level]) {
        return false;
      }
      var condition = params[level][0];
      for (var con in condition) {
        if (ero[con] < condition[con]) {
          return false;
        }
      }
      return true;
    };
    Window_ChokyoMenu.prototype.windowHeight = function () {
      return 9 * (this.lineHeight() + 10) + 12 * 2;
    };
    Window_ChokyoMenu.prototype.selectedId = function () {
      return this._itemList[this.index()];
    };
    Window_ChokyoMenu.prototype.maxItems = function () {
      if (!this._itemList) {
        return 0;
      }
      return this._itemList.length;
    };
    Window_ChokyoMenu.prototype.maxCols = function () {
      return 1;
    };
    return Window_ChokyoMenu;
  })(Window_Selectable);
  var temanYList = [0, 10, 18, 24, 18, 10, 0, -10, -18, -24, -18, -10];
  var Sprite_Chokyo = /** @class */ (function (_super) {
    __extends(Sprite_Chokyo, _super);
    function Sprite_Chokyo(param) {
      var _this = _super.call(this) || this;
      _this._temanIndex = 0;
      _this._param = param;
      _this._actorId = param.actorId;
      _this._flashSprite = new ScreenSprite();
      _this._fadeSprite = new ScreenSprite();
      _this._frameBase = new Sprite_Clickable();
      _this.refresh();
      return _this;
    }
    Sprite_Chokyo.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.isChanged()) {
        this.refresh();
      }
      this.moveSprite();
      var color = $gameScreen.flashColor();
      this._flashSprite.setColor(color[0], color[1], color[2]);
      this._flashSprite.opacity = color[3];
      this._fadeSprite.opacity = 255 - $gameScreen.brightness();
    };
    Sprite_Chokyo.prototype.moveSprite = function () {
      if (!this._denmaSprite) {
        return;
      }
      this._temanIndex++;
      if (temanYList.length <= this._temanIndex) {
        this._temanIndex = 0;
      }
      var y = temanYList[this._temanIndex] / 2;
      this._denmaSprite.y = y;
    };
    Sprite_Chokyo.prototype.isChanged = function () {
      if (this._lastFaceId != this._param.faceId()) {
        return true;
      }
      if (this._lastHoppeId != actorHoppeId) {
        return true;
      }
      var param = this._param;
      if (this._lastBukkake != param.bukkake) {
        return true;
      }
      if (this._lastSeieki != param.syusanSeieki) {
        return true;
      }
      if (this._lastKupaa != param.kupaa) {
        return true;
      }
      if (!this._lastIgnoreImages) {
        return true;
      }
      for (var i in this._lastIgnoreImages) {
        if ($gameTemp.ignoreFiles[i] != this._lastIgnoreImages[i]) {
          return true;
        }
      }
    };
    Sprite_Chokyo.prototype.savelastCondition = function () {
      this._lastFaceId = this._param.faceId();
      this._lastHoppeId = actorHoppeId;
      var param = this._param;
      this._lastIgnoreImages = {};
      this._lastBukkake = param.bukkake;
      this._lastSeieki = param.syusanSeieki;
      this._lastKupaa = param.kupaa;
      for (var i in $gameTemp.ignoreFiles) {
        this._lastIgnoreImages[i] = $gameTemp.ignoreFiles[i];
      }
    };
    Sprite_Chokyo.prototype.refresh = function () {
      this.savelastCondition();
      this._denmaSprite = null;
      this.removeChildren();
      var s = new PIXI.Sprite();
      var list = Nore.allImageList;
      var param = this._param;
      for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var file = list_1[_i];
        this.drawEro(file, param);
      }
      this.addChild(this._flashSprite);
      this.addChild(this._fadeSprite);
      this.addChild(this._frameBase);
    };
    Sprite_Chokyo.prototype.extractFaceId = function (file) {
      if (file.contains("01_22_base")) {
        return 0;
      }
      if (!$gameActors.actor(this._actorId).hasAcce(298)) {
        if (this.isBlack(file)) {
          return 999;
        }
        var faceId = Math.trunc(file.substr(file.length - 2, 2));
        if (faceId > 0) {
          return faceId;
        }
      } else {
        var faceId = Math.trunc(file.substr(file.length - 2, 2));
        if (faceId > 0) {
          return 999;
        }
        if (file.substr(file.length - 2, 2) == "_k") {
          var faceId_1 = Math.trunc(file.substr(file.length - 4, 2));
          if (faceId_1 > 0) {
            return faceId_1;
          }
        }
      }
      return 0;
    };
    Sprite_Chokyo.prototype.isBlack = function (file) {
      return file.substr(file.length - 2, 2) == "_k";
    };
    Sprite_Chokyo.prototype.drawEro = function (file, param) {
      if ($gameTemp.ignoreFiles[file]) {
        return;
      }
      var faceId = this.extractFaceId(file);
      if (faceId > 0) {
        if (faceId != this._lastFaceId) {
          return;
        }
      }
      if (file.indexOf("hoppe") > 0) {
        var hoppeId = parseInt(file.substr(file.length - 1, 1));
        if (hoppeId != this._lastHoppeId) {
          return;
        }
      }
      var texture = PIXI.utils.TextureCache[file + ".png"];
      if (!texture) {
        return;
      }
      if (file.indexOf("まんこ") > 0) {
        if (param.seieki() >= 1) {
          return;
        }
      }
      if (file.indexOf("中出し") > 0) {
        if (!this.isNakadashiVisible(file, param)) {
          return;
        }
      }
      if (file.indexOf("アナル出し") > 0) {
        if (!this.isAnaldashiVisible(file, param)) {
          return;
        }
      }
      if (file.indexOf("おしっこ") > 0) {
        if (!this.isOshikkoVisible(file, param)) {
          return;
        }
      }
      if (file.indexOf("精液") > 0) {
        if (file.indexOf("精液1") > 0) {
          if (param.syusanSeieki <= 1) {
            return;
          }
        }
        if (file.indexOf("精液2") > 0) {
          if (param.syusanSeieki <= 2) {
            return;
          }
        }
      }
      var sprite = new PIXI.Sprite(texture);
      this.addChild(sprite);
      if (file.indexOf("手マン") > 0) {
        this._denmaSprite = sprite;
        this._angle = 0;
      }
    };
    Sprite_Chokyo.prototype.destroy = function () {
      this.removeChildren();
      _super.prototype.destroy.call(this);
    };
    Sprite_Chokyo.prototype.isNakadashiVisible = function (file, param) {
      for (var i = 1; i <= param.seieki(); i++) {
        if (file.indexOf("中出し" + i) > 0) {
          return true;
        }
      }
      return false;
    };
    Sprite_Chokyo.prototype.isAnaldashiVisible = function (file, param) {
      for (var i = 1; i <= param.analSeieki(); i++) {
        if (file.indexOf("アナル出し" + i) > 0) {
          return true;
        }
      }
      return false;
    };
    Sprite_Chokyo.prototype.isOshikkoVisible = function (file, param) {
      for (var i = 1; i <= param.oshikko(); i++) {
        p(i);
        p(file);
        if (file.indexOf("おしっこ" + i) > 0) {
          return true;
        }
      }
      return false;
    };
    return Sprite_Chokyo;
  })(Sprite_Clickable);
  var ERO_STATUS_SKILL_IDS = [16, 13, 20, 17];
  var Window_EroStatus = /** @class */ (function (_super) {
    __extends(Window_EroStatus, _super);
    function Window_EroStatus() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_EroStatus.prototype.initialize = function (param) {
      this._param = param;
      this._actorId = param.actorId;
      _super.prototype.initialize.call(this, new Rectangle(-4, -4, 280, 70));
      this.createGauge(param);
      this.refresh();
      this.margin = 0;
      this._interval = 5;
      this._frameSprite.opacity = 0;
    };
    Window_EroStatus.prototype.createGauge = function (param) {
      this._gauge = new Nore.Sprite_GaugeNinshin(param);
      this._gauge.x = 10;
      this._gauge.y = 10;
      this.addChild(this._gauge);
    };
    Window_EroStatus.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.isChanged()) {
        this.refresh();
      }
    };
    Window_EroStatus.prototype.isChanged = function () {
      if (this._lastSanke != this._param.sanke) {
        return true;
      }
      return false;
    };
    Window_EroStatus.prototype.saveParams = function () {
      this._lastSanke = this._param.sanke;
    };
    Window_EroStatus.prototype.refresh = function () {
      //this.saveParams();
      this.contents.clear();
      this.drawIcon(404, 0, 0);
      this.drawText("産気", 35, -2, 150, "left");
    };
    Window_EroStatus.prototype.standardPadding = function () {
      return 10;
    };
    return Window_EroStatus;
  })(Window_Base);
  function setSyusanHistory() {
    if (!$gameSystem.getEro(5).taneoya) {
      return;
    }
    var taneoya = $gameSystem.getEro(5).taneoya;
    var name = $gameActors.actor(taneoya).nameJp();
    var text = TextManager.syusan.format(name);
    $gameSystem.currentHistory().setEroText(text);
  }
  Nore.setSyusanHistory = setSyusanHistory;
})(Nore || (Nore = {}));
