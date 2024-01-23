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
 * @command SaveEroHistory
 * @text エロ履歴追加
 * @des エロ履歴追加
 * @arg actorId
 * @text ActorId
 * @desc ActorId
 *
 * @command AddText
 * @text テキスト追加
 * @des テキスト追加
 * @arg text
 * @text text
 * @desc text
 */
var PlayEnum;
(function (PlayEnum) {
  PlayEnum["NAKADASHI"] = "nakadashi";
  PlayEnum["FELA"] = "fela";
  PlayEnum["ANAL"] = "anal";
  PlayEnum["ANAL_ITEM"] = "anal_item";
  PlayEnum["TEKOKI"] = "tekoki";
})(PlayEnum || (PlayEnum = {}));
var Play = /** @class */ (function () {
  function Play(_actorId, _type, _count) {
    this._actorId = _actorId;
    this._type = _type;
    this._count = _count;
  }
  Play.prototype.actorId = function () {
    return this._actorId;
  };
  Play.prototype.type = function () {
    return this._type;
  };
  Play.prototype.nakadashi = function () {
    if (this._type == PlayEnum.NAKADASHI) {
      return this.count();
    }
    return 0;
  };
  Play.prototype.seikoui = function () {
    var n = 0;
    if (this._type == PlayEnum.ANAL) {
      n += this.count();
    }
    if (this._type == PlayEnum.FELA) {
      n += this.count();
    }
    if (this._type == PlayEnum.TEKOKI) {
      n += this.count();
    }
    if (this._type == PlayEnum.NAKADASHI) {
      n += this.count();
    }
    return n;
  };
  Play.prototype.fela = function () {
    if (this._type == PlayEnum.FELA) {
      return this.count();
    }
    return 0;
  };
  Play.prototype.anal = function () {
    if (this._type == PlayEnum.ANAL) {
      return this.count();
    }
    return 0;
  };
  Play.prototype.chitsuDamage = function () {
    if (this._type == PlayEnum.NAKADASHI) {
      var chimpo = parseInt(
        $gameActors.actor(this._actorId).actor().meta["chimpo"]
      );
      if (isNaN(chimpo)) {
        chimpo = 3;
      }
      return chimpo * this.count();
    }
    return 0;
  };
  Play.prototype.analDamage = function () {
    if (this._type == PlayEnum.ANAL_ITEM) {
      return 4 * this.count();
    }
    if (this._type == PlayEnum.ANAL) {
      var chimpo = parseInt(
        $gameActors.actor(this._actorId).actor().meta["chimpo"]
      );
      if (isNaN(chimpo)) {
        chimpo = 3;
      }
      return chimpo * this.count() * 4;
    }
    return 0;
  };
  Play.prototype.sakabaCount = function () {
    if (this._type != PlayEnum.NAKADASHI) {
      return 0;
    }
    var actor = $gameActors.actor(this._actorId).actor();
    var count = parseInt(actor.meta["sakaba"]);
    if (isNaN(count)) {
      return 0;
    }
    return count * this.count();
  };
  Play.prototype.count = function () {
    return this._count || 1;
  };
  Play.prototype.cityCount = function () {
    if (this._type != PlayEnum.NAKADASHI) {
      return 0;
    }
    var actor = $gameActors.actor(this._actorId).actor();
    var count = parseInt(actor.meta["city"]);
    if (isNaN(count)) {
      return 0;
    }
    return count * this.count();
  };
  return Play;
})();
var EroHistory = /** @class */ (function () {
  function EroHistory() {
    //actorId: number;
    this._playList = [];
    this.acme = 0;
    this.baisyun = 0;
    this.bukkake = 0;
    this.kounai = 0;
    this.seiekiNomu = 0;
    this.seiekiNakadashi = 0;
    this.syusan = 0;
    this.syusanTaneoya = 0;
    this.oshikko = 0;
    this.oshikkoNomu = 0;
    this._marriage = 0;
    this._marriageTo = 0;
  }
  EroHistory.prototype.addPlay = function (actorId, type, count) {
    this._playList.push(new Play(actorId, type, count));
  };
  EroHistory.prototype.playList = function () {
    return this._playList;
  };
  Object.defineProperty(EroHistory.prototype, "nakadashi", {
    get: function () {
      var n = 0;
      for (var _i = 0, _a = this._playList; _i < _a.length; _i++) {
        var play = _a[_i];
        n += play.nakadashi();
      }
      return n;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(EroHistory.prototype, "anal", {
    get: function () {
      var n = 0;
      for (var _i = 0, _a = this._playList; _i < _a.length; _i++) {
        var play = _a[_i];
        n += play.anal();
      }
      return n;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(EroHistory.prototype, "fela", {
    get: function () {
      var n = 0;
      for (var _i = 0, _a = this._playList; _i < _a.length; _i++) {
        var play = _a[_i];
        n += play.fela();
      }
      return n;
    },
    enumerable: true,
    configurable: true,
  });
  EroHistory.prototype.calcChitsuDamage = function () {
    if (this.nakadashi == 0) {
      return 0;
    }
    var n = 0;
    for (var _i = 0, _a = this._playList; _i < _a.length; _i++) {
      var play = _a[_i];
      n += play.chitsuDamage();
    }
    return n;
  };
  EroHistory.prototype.calcAnalDamage = function () {
    var n = 0;
    for (var _i = 0, _a = this._playList; _i < _a.length; _i++) {
      var play = _a[_i];
      n += play.analDamage();
    }
    return n;
  };
  EroHistory.prototype.countSakaba = function () {
    var n = 0;
    for (var _i = 0, _a = this._playList; _i < _a.length; _i++) {
      var play = _a[_i];
      n += play.sakabaCount();
    }
    return n;
  };
  EroHistory.prototype.countCity = function () {
    var n = 0;
    for (var _i = 0, _a = this._playList; _i < _a.length; _i++) {
      var play = _a[_i];
      n += play.cityCount();
    }
    return n;
  };
  EroHistory.prototype.countNakadashi = function (actorId) {
    var n = 0;
    for (var _i = 0, _a = this._playList; _i < _a.length; _i++) {
      var play = _a[_i];
      if (play.actorId() == actorId) {
        n += play.nakadashi();
      }
    }
    return n;
  };
  EroHistory.prototype.countSeikoui = function (actorId) {
    var n = 0;
    for (var _i = 0, _a = this._playList; _i < _a.length; _i++) {
      var play = _a[_i];
      if (play.actorId() == actorId) {
        n += play.seikoui();
      }
    }
    return n;
  };
  EroHistory.prototype.marriageCount = function () {
    return this._marriage;
  };
  EroHistory.prototype.marriageTo = function (actorId) {
    this._marriage++;
    this._marriageTo = actorId;
  };
  EroHistory.prototype.isMarriage = function (actorId) {
    return this._marriageTo == actorId;
  };
  return EroHistory;
})();
var DayHistory = /** @class */ (function () {
  //_bote: number;
  function DayHistory(_day) {
    this._day = _day;
    this._gold = 0;
    this._dungeon = 0;
    this._dayEroHistory = new EroHistory();
    this._nightEroHistory = new EroHistory();
    this._text = "";
    this._nightEroText = "";
    this._dayEroText = "";
    this._taneoya = 0;
    this._armors = [];
    this._leoStatus = new LastStatus();
    this._leoStatus.copy($gameActors.actor(4));
    this._eroStatus = JsonEx.makeDeepCopy($gameSystem.getMainEro());
    this._costume = new CostumeSaver();
  }
  DayHistory.prototype.hasItem = function (item) {
    if (!this._armors) {
      return;
    }
    for (var _i = 0, _a = this._armors; _i < _a.length; _i++) {
      var id = _a[_i];
      if (item.id == id) {
        return true;
      }
    }
    return false;
  };
  DayHistory.prototype.saveEroStatus = function () {
    this._eroStatus = JsonEx.makeDeepCopy($gameSystem.getMainEro());
    this._eroStatus._faceId = $gameTemp.historyFaceId;
    this._eroStatus._hoppeId = $gameTemp.historyHoppeId;
    this._eroStatus.bote = $gameSystem.getEro(5).bote;
    this._eroStatus.taneoya = $gameSystem.getEro(5).taneoya;
    if (!this._nightEro && !this._dayEro) {
      this.saveCostume();
    }
  };
  DayHistory.prototype.saveCostume = function () {
    this._costume.saveCostume();
    this._armors = [];
    this._eroStatus.bote = $gameSystem.getEro(5).bote;
    for (var _i = 0, _a = $gameParty.armors(); _i < _a.length; _i++) {
      var armor = _a[_i];
      this._armors.push(armor.id);
    }
    //this._bote = ;
  };
  DayHistory.prototype.costume = function () {
    return this._costume;
  };
  DayHistory.prototype.day = function () {
    return this._day;
  };
  DayHistory.prototype.onDungeon = function () {
    this._dungeon++;
  };
  DayHistory.prototype.onGold = function (gold) {
    this._gold += gold;
  };
  DayHistory.prototype.gold = function () {
    return this._gold;
  };
  DayHistory.prototype.eroHistory = function () {
    if ($gameSwitches.value(6)) {
      return this._nightEroHistory;
    } else {
      return this._dayEroHistory;
    }
  };
  DayHistory.prototype.dayEroHistory = function () {
    return this._dayEroHistory;
  };
  DayHistory.prototype.nightEroHistory = function () {
    return this._nightEroHistory;
  };
  DayHistory.prototype.addEro = function (eroId, commonId) {
    if ($gameSwitches.value(6)) {
      this._nightEro = eroId;
      this._nightCommonId = commonId;
      this._nightBote = $gameActors.actor(5).boteId > 1;
      this._nightCostume = new CostumeSaver();
      this._nightSwMap = this.createSwitchMap();
    } else {
      this._dayEro = eroId;
      this._dayCommonId = commonId;
      this._dayBote = $gameActors.actor(5).boteId > 1;
      this._dayCostume = new CostumeSaver();
      this._daySwMap = this.createSwitchMap();
    }
    this.saveCostume();
  };
  DayHistory.prototype.nightEro = function () {
    if (ConfigManager.en && this._nightEro == "0_1") {
      return "0_1_en";
    }
    return this._nightEro;
  };
  DayHistory.prototype.dayEro = function () {
    if (ConfigManager.en && this._dayEro == "0_1") {
      return "0_1_en";
    }
    return this._dayEro;
  };
  DayHistory.prototype.eroStatus = function () {
    return this._eroStatus;
  };
  DayHistory.prototype.setText = function (text) {
    if (this._text == "") {
      this._text = text;
    }
  };
  DayHistory.prototype.setEroText = function (text) {
    if ($gameSwitches.value(996)) {
      return;
    }
    if ($gameSwitches.value(6)) {
      this._nightEroText = text;
    } else {
      this._dayEroText = text;
    }
  };
  DayHistory.prototype.text = function () {
    var text = this._text;
    if (this.dayEroHistory().marriageCount() > 0) {
      var actor = $gameActors.actor(this.dayEroHistory()._marriageTo);
      var text2 = TextManager.marriage.format(actor.name());
      if (this._nightEroText != text2 && this._dayEroText != text2) {
        text = text2;
      }
    }
    if (this.nightEroHistory().marriageCount() > 0) {
      var actor = $gameActors.actor(this.nightEroHistory()._marriageTo);
      var text2 = TextManager.marriage.format(actor.name());
      p(this._nightEroText + " " + text2 + " " + this._dayEroText);
      if (this._nightEroText != text2 && this._dayEroText != text2) {
        text = text2;
      }
    }
    if (ConfigManager.en) {
      if (CALENDAR_MAP[text]) {
        return CALENDAR_MAP[text];
      }
    }
    return text;
  };
  DayHistory.prototype.nightEroText = function () {
    if (ConfigManager.en) {
      if (CALENDAR_MAP[this._nightEroText]) {
        return CALENDAR_MAP[this._nightEroText];
      }
    }
    return this._nightEroText;
  };
  DayHistory.prototype.dayEroText = function () {
    if (ConfigManager.en) {
      if (CALENDAR_MAP[this._dayEroText]) {
        return CALENDAR_MAP[this._dayEroText];
      }
    }
    return this._dayEroText;
  };
  DayHistory.prototype.createSwitchMap = function () {
    var map = {};
    for (var i = 800; i < 900; i++) {
      map[i] = $gameSwitches.value(i);
    }
    return map;
  };
  DayHistory.prototype.dungeonCount = function () {
    return this._dungeon;
  };
  DayHistory.prototype.setTaneoya = function (id) {
    this._taneoya = id;
  };
  DayHistory.prototype.isNinshin = function () {
    return this._taneoya > 0;
  };
  DayHistory.prototype.nightCommonId = function () {
    return this._nightCommonId;
  };
  DayHistory.prototype.dayCommonId = function () {
    return this._dayCommonId;
  };
  DayHistory.prototype.dayBote = function () {
    return this._dayBote;
  };
  DayHistory.prototype.nightBote = function () {
    return this._nightBote;
  };
  DayHistory.prototype.dayCostume = function () {
    return this._dayCostume;
  };
  DayHistory.prototype.nightCostume = function () {
    return this._nightCostume;
  };
  DayHistory.prototype.daySwMap = function () {
    return this._daySwMap;
  };
  DayHistory.prototype.nightSwMap = function () {
    return this._nightSwMap;
  };
  return DayHistory;
})();
var Nore;
(function (Nore) {
  var pluginName = "Nore_History";
  PluginManager.registerCommand(pluginName, "AddText", function (args) {
    var id = args.id;
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
  var Scene_History = /** @class */ (function (_super) {
    __extends(Scene_History, _super);
    function Scene_History() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_History.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.refreshBg();
      this.createHistoryWindow();
      //this.createToday();
    };
    Scene_History.prototype.refreshBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("calendar_bg");
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -0;
      sprite.y = -0;
      this.addChild(sprite);
    };
    Scene_History.prototype.createToday = function () {
      this._sprite = new Sprite();
      this._sprite.bitmap = new Bitmap(200, 48);
      var day = $gameVariables.value(3);
      this._sprite.bitmap.drawText(
        TextManager.date.format(day),
        20,
        0,
        100,
        48
      );
      var text;
      if ($gameSwitches.value(6)) {
        text = TextManager.night;
      } else {
        text = TextManager.afternoon;
      }
      this._sprite.bitmap.drawText(text, 90, 0, 100, 48);
      this.addChild(this._sprite);
    };
    Scene_History.prototype.createHistoryWindow = function () {
      this._historyWindow = new Window_History();
      this._historyWindow.setHandler("ok", this.onOk.bind(this));
      this._historyWindow.setHandler("cancel", this.onCancel.bind(this));
      //this._historyWindow.activate();
      this.addChild(this._historyWindow);
    };
    Scene_History.prototype.start = function () {
      _super.prototype.start.call(this);
      this._historyWindow.refresh();
    };
    Scene_History.prototype.onCancel = function () {
      $gameTemp.history = null;
      $gameTemp.eroStatus = null;
      $gameActors.actor(5).setCacheChanged();
      $gameTemp.costume = null;
      $gameSwitches.setValue(996, false);
      this.popScene();
    };
    Scene_History.prototype.onOk = function () {
      var item = this._historyWindow.item();
      if (!item) {
        SoundManager.playBuzzer();
        this._historyWindow.activate();
        return;
      }
      $gameTemp.lastHistoryIndex = this._historyWindow.index();
      //p(item)
      $gameTemp.history = item;
      $gameTemp.costume = item.costume();
      $gameTemp.eroStatus = item.eroStatus();
      $gameTemp.eroStatus.day = item.day();
      $gameTemp.lastCostume = new CostumeSaver();
      $gameTemp.lastCostume.saveCostume();
      SceneManager.push(Nore.Scene_EroStatus);
    };
    return Scene_History;
  })(Scene_MenuBase);
  Nore.Scene_History = Scene_History;
  var top = 4;
  var Window_History = /** @class */ (function (_super) {
    __extends(Window_History, _super);
    function Window_History() {
      var _this =
        _super.call(
          this,
          new Rectangle(0, 60, Graphics.width, Graphics.height - 70)
        ) || this;
      _this._padding = 0;
      return _this;
    }
    Window_History.prototype.initialize = function (rect) {
      _super.prototype.initialize.call(this, rect);
      this.loadEroList();
      var day = $gameVariables.value(3);
      if (!$gameTemp.lastHistoryIndex) {
        $gameTemp.lastHistoryIndex = day - 1;
      }
      this.select($gameTemp.lastHistoryIndex);
      this.activate();
      this._scrollY = this._scrollTargetY;
      this.updateOrigin();
      this.frameVisible = false;
      this.backOpacity = 0;
    };
    Window_History.prototype.ensureCursorVisible = function (smooth) {
      if (this._cursorAll) {
        this.scrollTo(0, 0);
      } else if (this.innerHeight > 0 && this.row() >= 0) {
        var scrollY_1 = this.scrollY();
        var itemTop = this.row() * this.itemHeight();
        if (this.row() > 0) {
          itemTop += top;
        }
        var itemBottom = itemTop + this.itemHeight();
        var scrollMin = itemBottom - this.innerHeight;
        if (scrollY_1 > itemTop) {
          if (smooth) {
            this.smoothScrollTo(0, itemTop);
          } else {
            this.scrollTo(0, itemTop);
          }
        } else if (scrollY_1 < scrollMin) {
          if (smooth) {
            this.smoothScrollTo(0, scrollMin);
          } else {
            this.scrollTo(0, scrollMin);
          }
        }
      }
    };
    Window_History.prototype.loadEroList = function () {
      for (var _i = 0, _a = $gameSystem.historyList(); _i < _a.length; _i++) {
        var history = _a[_i];
        if (history.nightEro()) {
          ImageManager.loadEro(history.nightEro());
        }
        if (history.dayEro()) {
          ImageManager.loadEro(history.dayEro());
        }
      }
    };
    Window_History.prototype.maxItems = function () {
      return $gameSystem.historyList().length;
    };
    Window_History.prototype.item = function () {
      return $gameSystem.historyList()[this.index()];
    };
    Window_History.prototype.update = function () {
      _super.prototype.update.call(this);
    };
    Window_History.prototype.itemHeight = function () {
      return 326;
    };
    Window_History.prototype.maxCols = function () {
      return 7;
    };
    Window_History.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
    };
    Window_History.prototype.drawAllItems = function () {
      this._windowContentsSprite.destroyAndRemoveChildren();
      this.changeOutlineColor(ColorManager.outlineColor());
      this.resetFontSettings();
      _super.prototype.drawAllItems.call(this);
      //this.drawTitles();
      this.drawLines();
    };
    Window_History.prototype.drawTitles = function () {
      for (var i = 0; i < 7; i++) {
        this.drawTitle(i);
      }
      this.changeOutlineColor(ColorManager.normalColor());
      this.drawRect(0, 37, this.width, 2);
    };
    Window_History.prototype.drawLines = function () {
      for (var i = 0; i < Math.ceil(this.maxItems() / 7); i++) {
        var baseTexture = Nore.getSystemBaseTexture("calendar_bar");
        var texture = new PIXI.Texture(baseTexture);
        var sprite = new PIXI.Sprite(texture);
        sprite.x = 23;
        sprite.y = 10 + (i + 1) * this.itemHeight();
        this._windowContentsSprite.addChild(sprite);
      }
    };
    Window_History.prototype.drawTitle = function (index) {
      var rect = this.itemRect(index);
      var icon = 0;
      switch (index) {
        case 0:
          icon = 390;
          break;
        case 1:
          icon = 391;
          break;
        case 2:
          icon = 384;
          break;
        case 3:
          icon = 387;
          break;
        case 4:
          icon = 389;
          break;
        case 5:
          icon = 633;
          break;
        case 6:
          icon = 388;
          break;
      }
      this.drawIcon(icon, rect.x + rect.width / 2, rect.y - 40);
    };
    Window_History.prototype.itemRect = function (index) {
      var maxCols = this.maxCols();
      var itemWidth = this.itemWidth();
      var itemHeight = this.itemHeight();
      var colSpacing = this.colSpacing();
      var rowSpacing = this.rowSpacing();
      var col = index % maxCols;
      var row = Math.floor(index / maxCols);
      var x = col * itemWidth + colSpacing / 2 - this.scrollBaseX() + 12;
      var y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY() + top;
      var width = itemWidth - colSpacing;
      var height = itemHeight - rowSpacing;
      return new Rectangle(x, y, width, height);
    };
    Window_History.prototype.itemWidth = function () {
      return 180;
    };
    Window_History.prototype.drawItemBackground = function (index) {};
    Window_History.prototype.drawItem = function (index) {
      this.drawCurrent(index);
      var history = $gameSystem.historyList()[index];
      var rect = this.itemRect(index);
      this.drawDay(index);
      this.contents.fontSize = 13;
      this.drawText(history.text(), rect.x + 7, rect.y + 28, 150, "left");
      if (index == $gameVariables.value(3) - 1) {
        var baseTexture = Nore.getSystemBaseTexture("calendar_item");
        var texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(0, 50, 200, 312)
        );
        var sprite = new PIXI.Sprite(texture);
        sprite.x = rect.x - 4;
        sprite.y = rect.y + 2;
        this._contentsBackSprite.addChild(sprite);
      }
      this.changeOutlineColor(ColorManager.outlineColor());
      var rate = 2.4;
      var hh = 125;
      var yy = rect.y + 52;
      this.contents.fontSize = 12;
      if (history.dayEro()) {
        this.drawText(history.dayEroText(), rect.x + 7, yy, 150, "left");
        var bitmap = ImageManager.loadEro(history.dayEro());
        this.contents.blt(
          bitmap,
          0,
          0,
          bitmap.width,
          bitmap.height,
          rect.x + 10,
          yy + 28,
          bitmap.width / rate,
          bitmap.height / rate
        );
      }
      if (history.nightEro()) {
        this.drawText(history.nightEroText(), rect.x + 7, yy + hh, 150, "left");
        var bitmap = ImageManager.loadEro(history.nightEro());
        this.contents.blt(
          bitmap,
          0,
          0,
          bitmap.width,
          bitmap.height,
          rect.x + 10,
          yy + hh + 28,
          bitmap.width / rate,
          bitmap.height / rate
        );
      }
      if (history.isNinshin()) {
        //this.drawText('妊娠♥', rect.x, rect.y + 0, 155, 'right');
        var baseTexture = Nore.getSystemBaseTexture("calendar_item");
        var texture_1 = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(200 + (ConfigManager.en ? 100 : 0), 50, 100, 50)
        );
        var sprite = new PIXI.Sprite(texture_1);
        sprite.x = rect.x + 94;
        sprite.y = rect.y + 20;
        this._windowContentsSprite.addChild(sprite);
        this.changeTextColor(ColorManager.normalColor());
      }
      this.drawDebug(index, history);
    };
    Window_History.prototype.drawDay = function (index) {
      var rect = this.itemRect(index);
      var baseTexture = Nore.getSystemBaseTexture("calendar_item");
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(ConfigManager.en ? 200 : 0, 0, 50, 50)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = rect.x + 26;
      sprite.y = rect.y + 18;
      this._windowContentsSprite.addChild(sprite);
      var day = index + 1;
      this.contents.fontSize = 22;
      this.drawNumber(
        day,
        rect.x + 26 + (ConfigManager.en ? 50 : 0),
        rect.y - 4,
        20,
        "right",
        7
      );
    };
    Window_History.prototype.drawCurrent = function (index) {
      if (index != this.index()) {
        return;
      }
      this._windowContentsBackSprite.removeChildren();
      var rect = this.itemRect(index);
      var baseTexture = Nore.getSystemBaseTexture("calendar_item");
      //var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 50, 200, 320));
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 364, 190, 316)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -5;
      sprite.y = -0;
      //sprite.x = rect.x + 0;
      //sprite.y = rect.y + 0;
      this._windowContentsBackSprite.addChild(sprite);
    };
    Window_History.prototype._updateCursor = function () {
      this._windowContentsBackSprite.x = this._cursorRect.x;
      this._windowContentsBackSprite.y = this._cursorRect.y;
    };
    Window_History.prototype.drawNinshin = function (rect, history) {};
    Window_History.prototype.drawDebug = function (index, history) {
      var rect = this.itemRect(index);
      var hh = 130;
      var yy = rect.y + 72;
      var icon = 2145;
      var interval = 7;
      if (history.dayEro()) {
        for (var i = 0; i < history.dayEroHistory().nakadashi; i++) {
          this.drawIcon(icon, rect.x + 10 + i * interval, yy + 5);
          break;
        }
        //this.drawText(history.dayEroHistory().nakadashi, rect.x + 5, yy, 155, 'left');
      }
      if (history.nightEro()) {
        for (var i = 0; i < history.nightEroHistory().nakadashi; i++) {
          this.drawIcon(icon, rect.x + 10 + i * interval, yy + hh);
          break;
        }
        //this.drawText(history.nightEroHistory().nakadashi, rect.x + 5, yy + hh, 155, 'left');
      }
    };
    Window_History.prototype._refreshCursor = function () {};
    return Window_History;
  })(Window_Selectable);
})(Nore || (Nore = {}));
