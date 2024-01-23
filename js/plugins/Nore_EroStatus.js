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
 * @command AddKeikenMachi
 * @text 経験人数追加(街)
 * @des 経験人数追加(街)
 * @arg num
 * @text 人数
 *
 * @command AddKeikenSakaba
 * @text 経験人数追加(酒場)
 * @des 経験人数追加(酒場)
 * @arg num
 * @text 人数
 *
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_EroStatus";
  PluginManager.registerCommand(pluginName, "AddKeikenMachi", function (args) {
    $gameSystem.getMainEro().keikenMachi += parseInt(args.num);
  });
  PluginManager.registerCommand(pluginName, "AddKeikenSakaba", function (args) {
    $gameSystem.getMainEro().keikenSakaba += parseInt(args.num);
  });
  PluginManager.registerCommand(pluginName, "onEroStatus", function (args) {
    var id = args.id;
    $gameSystem.getMainEro().keikenSakaba += parseInt(args.iod);
  });
  Nore.NINSHIN_SW = 837;
  Nore.NOT_NINSHIN_SW = 838;
  var Scene_EroStatus = /** @class */ (function (_super) {
    __extends(Scene_EroStatus, _super);
    function Scene_EroStatus() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_EroStatus.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.createWindowLayer();
      this.createStatusWindow();
      this.createHelpWindow();
      this.createAllWindows();
      this.onChange();
    };
    Scene_EroStatus.prototype.createBackground = function () {};
    Scene_EroStatus.prototype.createButtons = function () {};
    Scene_EroStatus.prototype.updateActor = function () {
      this._actor = $gameParty.menuActor();
    };
    Scene_EroStatus.prototype.createStatusWindow = function () {
      var ero = $gameTemp.eroStatus || $gameSystem.getMainEro();
      this._ero = ero;
      var costume = $gameTemp.costume;
      this._window = new Window_EroStatus(ero, costume);
      this._window.setHandler("change", this.onChange.bind(this));
      this._window.setHandler("pageup", this.onPageup.bind(this));
      this._window.setHandler("pagedown", this.onPagedown.bind(this));
      this.addWindow(this._window);
    };
    Scene_EroStatus.prototype.onChange = function () {
      var item = this._window.item();
      if (this._window.isOpened(item)) {
        this._helpWindow.setItem(item);
        this._window.updateEroItem();
      } else {
        var hint = item.meta["hint"];
        if (hint) {
          this._helpWindow.setNotOpenedItem(item);
        } else {
          this._helpWindow.setItem(null);
        }
        this._window.updateEroItem();
      }
    };
    Scene_EroStatus.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateOk();
      this.updateCancel();
    };
    Scene_EroStatus.prototype.updateOk = function () {
      if (!$gameTemp.history) {
        return;
      }
      if (!this._window.active) {
        return;
      }
      if (Input.isTriggered("ok")) {
        this._window.deactivate();
        p($gameTemp.history);
        this.addChild(this._messageWindow);
        $gameVariables.setValue(50, 0);
        var history_1 = $gameTemp.history;
        if ($gameSwitches.value(1)) {
          this.playScenario("カレンダー確認_05");
          return;
        } else if (history_1.dayCommonId() && history_1.nightCommonId()) {
          this.playScenario("カレンダー確認_01");
        } else if (history_1.dayCommonId()) {
          this.playScenario("カレンダー確認_02");
        } else if (history_1.nightCommonId()) {
          this.playScenario("カレンダー確認_03");
        } else {
          this.playScenario("カレンダー確認_04");
          return;
        }
        SoundManager.playCursor();
      }
    };
    Scene_EroStatus.prototype.saveSwitch = function () {
      for (var i = 800; i < 900; i++) {
        $gameSwitches.setValue(i - 200, $gameSwitches.value(i));
        $gameSwitches.setValue(
          i,
          $gameSystem.hasItem(this._ero.day, $dataArmors[i + 100])
        );
        /*
                if ($gameSwitches.value(i)) {
                    p(i)
                }
                */
      }
    };
    Scene_EroStatus.prototype.loadSwitch = function (map) {
      if (!map) {
        return;
      }
      for (var i = 800; i < 900; i++) {
        $gameSwitches.setValue(i, map[i]);
      }
    };
    Scene_EroStatus.prototype.finishScenario = function () {
      var index = $gameVariables.value(50);
      if (index == 0) {
        this._window.activate();
        return;
      }
      $gameSwitches.setValue(989, $gameActors.actor(5).boteId > 1);
      this.saveSwitch();
      var commonEventId;
      $gameVariables.setValue(51, $gameMap.mapId());
      $gameVariables.setValue(52, $gamePlayer.x);
      $gameVariables.setValue(53, $gamePlayer.y);
      $gameVariables.setValue(54, $gamePlayer.direction());
      $gameTemp.tone = $gameScreen.tone().clone();
      var history = $gameTemp.history;
      if ($gameSwitches.value(6)) {
        $gameSwitches.setValue(994, true);
      } else {
        $gameSwitches.setValue(994, false);
      }
      if (index == 1) {
        $gameSwitches.setValue(7, true);
        $gameSwitches.setValue(6, false);
        commonEventId = history.dayCommonId();
        if (history.dayBote()) {
          $gameSystem.getEro(5).bote = 2;
          $gameSwitches.setValue(3, true);
        } else {
          $gameSystem.getEro(5).bote = 0;
          $gameSwitches.setValue(3, false);
        }
        if (history.dayCostume()) {
          history.dayCostume().restoreCostume();
        }
        this.loadSwitch(history.daySwMap());
      } else if (index == 2) {
        $gameSwitches.setValue(7, false);
        $gameSwitches.setValue(6, true);
        commonEventId = history.nightCommonId();
        if (history.nightBote()) {
          $gameSystem.getEro(5).bote = 2;
          $gameSwitches.setValue(3, true);
        } else {
          $gameSystem.getEro(5).bote = 0;
          $gameSwitches.setValue(3, false);
        }
        if (history.nightCostume()) {
          history.nightCostume().restoreCostume();
        }
        this.loadSwitch(history.nightSwMap());
      }
      $gameSystem.saveBgm();
      $gamePlayer.setTransparent(true);
      $gameActors.actor(5).setCacheChanged();
      $gameTemp.reserveCommonEvent(commonEventId);
      $gamePlayer.reserveTransfer(
        rngd_recollection_mode_settings.sandbox_map_id,
        0,
        0,
        0
      );
      $gameSwitches.setValue(996, true);
      SceneManager.goto(Scene_Map);
    };
    Scene_EroStatus.prototype.updateCancel = function () {
      if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
        SoundManager.playCancel();
        $gameActors.actor(5).setCacheChanged();
        SceneManager.pop();
      }
    };
    Scene_EroStatus.prototype.createHelpWindow = function () {
      var rect = this.helpWindowRect();
      this._helpWindow = new Sprite_HelpBig(rect);
      this.addWindow(this._helpWindow);
    };
    Scene_EroStatus.prototype.helpWindowRect = function () {
      var rect = new Rectangle(0, 0, 0, 0);
      rect.x = 300;
      rect.y = 102;
      rect.width = 670;
      rect.height = 112;
      return rect;
    };
    Scene_EroStatus.prototype.onPageup = function () {
      var nextDay;
      if (this._ero.day == 1) {
        nextDay = $gameSystem.day();
      } else {
        nextDay = this._ero.day - 1;
      }
      this.gotoNextStatus(nextDay);
    };
    Scene_EroStatus.prototype.onPagedown = function () {
      var nextDay;
      if (this._ero.day == $gameSystem.day()) {
        nextDay = 1;
      } else {
        nextDay = this._ero.day + 1;
      }
      this.gotoNextStatus(nextDay);
    };
    Scene_EroStatus.prototype.gotoNextStatus = function (nextDay) {
      SoundManager.playCursor();
      var history = $gameSystem.findHistory(nextDay);
      $gameTemp.history = history;
      $gameTemp.costume = history.costume();
      $gameTemp.eroStatus = history.eroStatus();
      $gameTemp.eroStatus.day = history.day();
      SceneManager.goto(Scene_EroStatus);
    };
    return Scene_EroStatus;
  })(Nore.Scene_Talk);
  Nore.Scene_EroStatus = Scene_EroStatus;
  var Window_EroStatus = /** @class */ (function (_super) {
    __extends(Window_EroStatus, _super);
    function Window_EroStatus(ero, costume) {
      var _this =
        _super.call(
          this,
          new Rectangle(-4, -4, Graphics.width, Graphics.height)
        ) || this;
      _this._padding = 0;
      _this.frameVisible = false;
      _this.backOpacity = 0;
      _this.refreshBg();
      _this._ero = ero;
      _this._costume = costume;
      _this.createEroSprite();
      _this.refresh();
      _this.select(0);
      _this.activate();
      return _this;
    }
    Window_EroStatus.prototype.refreshBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("status_bg");
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -0;
      sprite.y = -0;
      this._contentsBackSprite.addChild(sprite);
    };
    Window_EroStatus.prototype.drawLabelImage = function (index, x, y) {
      var baseTexture = Nore.getSystemBaseTexture("status_item");
      var xx = 0;
      if (ConfigManager.en && index > 0) {
        xx = 300;
      }
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(xx, index * 50, 300, 50)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = x;
      sprite.y = y;
      this._contentsBackSprite.addChild(sprite);
    };
    Window_EroStatus.prototype.createEroSprite = function () {
      this._actorLayer = new Sprite();
      this._actorLayer.x = 770;
      this.addChild(this._actorLayer);
      this._tachieBackLayer = new Sprite();
      this._actorLayer.addChild(this._tachieBackLayer);
      this._tachieLayer = new Sprite();
      this._tachieLayer.y = 20;
      var filter3 = new PIXI.filters.OutlineFilter(3, 0xdeaa3d);
      this._tachieLayer.filters = [filter3];
      this._actorLayer.addChild(this._tachieLayer);
    };
    Window_EroStatus.prototype.resetNormalFont = function () {
      this.changeTextColor(ColorManager.normalColor());
      this.contents.fontSize = 18;
      this.changePaintOpacity(true);
    };
    Window_EroStatus.prototype.refresh = function () {
      if (!this._ero) {
        return;
      }
      this._windowContentsSprite.x = 0;
      this._windowContentsSprite.y = 0;
      this.makeItems();
      _super.prototype.refresh.call(this);
      this.drawActor();
      this.setupEroMarker();
      this._valueWidth = 208;
      var x = 46;
      this.drawDay();
      var yy = 295;
      this.drawKeiken(x, yy);
      this.drawKeiken2(x, yy + 94);
      this.drawCount(x, yy + 224);
      this.drawLabels();
      // this.drawStatus(x, yy + 486);
      this.drawHarami(x + 490, yy + 396);
      this.drawTightening();
      return;
    };
    Window_EroStatus.prototype.drawLabels = function () {
      this.drawLabelImage(4, 315, 210);
      this.drawLabelImage(5, 315, 310);
      this.drawLabelImage(6, 314, 500);
      this.drawLabelImage(7, 314, 715);
    };
    Window_EroStatus.prototype.updateEroItem = function () {
      if (!this._eroMarker) {
        return;
      }
      this._eroMarker.visible = false;
      var item = this.item();
      if (!item) {
        return;
      }
      if (!this.isOpened(item)) {
        return;
      }
      var armorId = parseInt(item.meta["armor"]);
      if (isNaN(armorId)) {
        return;
      }
      var armor = $dataArmors[armorId];
      var x = parseInt(armor.meta["x"]);
      var y = parseInt(armor.meta["y"]);
      if (isNaN(x) || isNaN(y)) {
        return;
      }
      this._eroMarker.x = x;
      this._eroMarker.y = y;
      this._eroMarker.visible = true;
    };
    Window_EroStatus.prototype.drawKeiken = function (x, y) {
      this.drawLabelImage(1, x - 5, y - 9);
      this.resetNormalFont();
      var xx = x;
      var yy = y;
      var max = this.calcVillagerCount();
      yy += this.lineHeight();
      var name = getNakadashiTarget("keikenVillager");
      this.drawText(name, xx, yy, 140, "left");
      var keiken = $gameSystem.countKeikenVillager(this._ero.day);
      var text = keiken + " / " + max;
      this.drawText(
        TextManager.peopleUnit.format(text),
        xx,
        yy,
        this._valueWidth,
        "right"
      );
    };
    Window_EroStatus.prototype.calcVillagerCount = function () {
      var n = 0;
      for (var i = 1; i < 50; i++) {
        if ($gameActors.actor(i).actor().meta["villager"]) {
          n += parseInt($gameActors.actor(i).actor().meta["villager"]);
        }
      }
      return n;
    };
    Window_EroStatus.prototype.drawDay = function () {
      var xx = 40;
      this.drawLabelImage(8, xx, 100);
      this.resetNormalFont();
      this.contents.fontSize = 40;
      this.drawNumber(this._ero.day, xx, 71, 100, "right", 6);
      //this.drawText('%1'.format(this._ero.day), 100, 110, 100, 'left');
    };
    Window_EroStatus.prototype.drawKeiken2 = function (x, y) {
      this.drawLabelImage(2, x - 4, y - 8);
      var list = ["keikenMachi", "keikenSakaba"];
      var xx = x;
      var yy = y;
      this.resetNormalFont();
      for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var type = list_1[_i];
        yy += this.lineHeight();
        var name_1 = getNakadashiTarget(type);
        this.drawText(name_1, xx, yy, 140, "left");
        var nakadashi = $gameSystem.countPeople(type, this._ero.day);
        this.drawText(
          TextManager.peopleUnit.format(nakadashi),
          xx,
          yy,
          this._valueWidth,
          "right"
        );
      }
    };
    Window_EroStatus.prototype.drawCount = function (x, y) {
      this.drawLabelImage(3, x - 5, y - 15);
      var list = [
        "nakadashi",
        "anal",
        "fela",
        "seiekiNomu",
        "oshikkoNomu",
        "syusan",
      ];
      var xx = x;
      var yy = y;
      this.resetNormalFont();
      for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
        var type = list_2[_i];
        yy += this.lineHeight();
        var name_2 = getEroParamTitle(type);
        this.drawText(name_2, xx, yy, 120, "left");
        var value = $gameSystem.countEro(type, this._ero.day);
        if (type == "syusan") {
          this.drawText(
            TextManager.peopleUnit.format(value),
            xx,
            yy,
            this._valueWidth,
            "right"
          );
        } else {
          this.drawText(
            TextManager.countUnit.format(value),
            xx,
            yy,
            this._valueWidth,
            "right"
          );
        }
      }
    };
    Window_EroStatus.prototype.lineHeight = function () {
      return 28;
    };
    Window_EroStatus.prototype.drawHarami = function (x, y) {
      p(this._ero);
      var actor = $gameActors.mainActor2();
      this.resetNormalFont();
      var yy = y;
      var xx = x - 50;
      yy += this.lineHeight();
      var text = TextManager.normal;
      switch (this._ero.bote) {
        case 2:
          text = TextManager.pregnant;
          break;
      }
      this.contents.fontSize = 32;
      this.drawText(text, xx, yy, 100, "left");
      if (this._ero.bote <= 1) {
        return;
      }
      this.contents.fontSize = 26;
      this.drawText(
        "(" +
          TextManager.father +
          "→" +
          getTaneoyaName(this._ero.taneoya) +
          ")",
        x + 60,
        y + 30,
        240,
        "left"
      );
      /*
            if ($gameActors.actor(taneoya)) {
                const taneoyaName = $gameActors.actor(taneoya).name();
                this.drawText('種親→' + taneoyaName + '', xx, yy + 30, this._valueWidth, 'left');
            }
    */
    };
    Window_EroStatus.prototype.drawTightening = function () {
      this.drawLabelImage(9, 290, 553);
      this.drawLabelImage(10, 290, 623);
      var list = ["chitsu", "anal"];
      this.resetNormalFont();
      var ero = this._ero;
      var xx = 420;
      var yy = 554;
      for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
        var type = list_3[_i];
        this.contents.fontSize = 22;
        var value = $gameSystem.calcTightening(type, this._ero.day);
        this.drawTighteningGauge(xx + 62, yy + 6, value);
        if (value > 0) {
          value = "+" + value;
        } else if (value == 0) {
          value = "±" + value;
        } else {
          value = Math.max(value, -99);
        }
        this.drawText(value, xx, yy, this._valueWidth, "right");
        var rank = this.calcTightenRank(value);
        if (type == "chitsu") {
          this.drawTextEx(CHITSU_TIGHTENING[rank], xx + 230, yy, 300);
        } else {
          this.drawTextEx(ANAL_TIGHTENING[rank], xx + 230, yy, 300);
        }
        yy += 71;
      }
    };
    Window_EroStatus.prototype.resetFontSettings = function () {
      this.contents.fontFace = $gameSystem.mainFontFace();
      this.contents.fontSize = 20;
      this.resetTextColor();
    };
    Window_EroStatus.prototype.drawTighteningGauge = function (x, y, value) {
      var baseTexture = Nore.getSystemBaseTexture("bar");
      var ww = Math.round((76 * Math.abs(value)) / 100);
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 60, ww, 20)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = x;
      if (value < 0) {
        sprite.x = x - ww - 1;
      }
      sprite.y = y;
      this._windowContentsSprite.addChild(sprite);
      //        this.contents.fillRect(x + xx, y, 1, 10, '#FFFFFF');
    };
    Window_EroStatus.prototype.calcTightenRank = function (value) {
      if (value >= 75) {
        return "1";
      }
      if (value >= 25) {
        return "2";
      }
      if (value <= -25) {
        return "4";
      }
      if (value <= -75) {
        return "5";
      }
      return "3";
    };
    Window_EroStatus.prototype.drawChitsu = function (x, y) {};
    Window_EroStatus.prototype.drawActor = function () {
      this._tachieLayer.destroyAndRemoveChildren();
      var actor = JsonEx.makeDeepCopy($gameActors.mainActor2());
      if (this._costume) {
        this._costume.restoreCostume(actor);
      }
      /*actor.setOuterBottomId('a');
            actor.setOuterTopId('a');
            actor.setOuterId('a');
            actor.setInnerTopId('a');
            actor.setInnerBottomId('a');
            actor.setArmId('a');
            actor.setLegId('a');*/
      actor._cacheChanged = false;
      actor._boteId = this._ero.bote || 1;
      actor.setHoppeId(this._ero.hoppeId());
      actor.setCacheChanged();
      this.drawTachieActor(
        actor,
        this._tachieLayer,
        0,
        0,
        null,
        this._ero.faceId()
      );
    };
    Window_EroStatus.prototype.setupEroMarker = function () {
      if (this._eroMarker) {
        this._tachieLayer.removeChild(this._eroMarker);
      }
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 100;
      sprite.y = 100;
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      this._eroMarker = sprite;
      this._tachieLayer.addChild(sprite);
    };
    Window_EroStatus.prototype.getBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/eroStatus"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("eroStatus");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/eroStatus";
        PIXI.utils.BaseTextureCache["system/eroStatus"] = baseTexture;
      }
      return baseTexture;
    };
    Window_EroStatus.prototype.drawLabel = function (text, x, y, iconIndex) {
      this.contents.fontSize = 22;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(text, x + 34, y, 300, "left");
      if (iconIndex > 0) {
        this.drawIcon(iconIndex, x, y - 4);
      }
    };
    Window_EroStatus.prototype.makeItems = function () {
      this._data = [];
      for (var id = 900; id <= 999; id++) {
        var armor = $dataArmors[id];
        if (!armor) {
          continue;
        }
        if (armor.atypeId == 9) {
          this._data.push(armor);
        }
      }
      for (var id = 900; id <= 999; id++) {
        var armor = $dataArmors[id];
        if (!armor) {
          continue;
        }
        if (armor.atypeId == 10 || armor.atypeId == 11) {
          if (
            armor.id == 921 &&
            $gameSystem.countNakadashi(this._ero.day) > 0
          ) {
            continue;
          }
          if (
            armor.id == 922 &&
            $gameSystem.countNakadashi(this._ero.day) == 0
          ) {
            continue;
          }
          if (armor.id == 923 && $gameSystem.countKekkon(this._ero.day) > 0) {
            continue;
          }
          if (armor.id == 924 && $gameSystem.countKekkon(this._ero.day) == 0) {
            continue;
          }
          this._data.push(armor);
        }
      }
      this._data = this._data.sort(function (a, b) {
        var orderA = a.id;
        var orderB = b.id;
        if (a.meta["order"]) {
          orderA = parseInt(a.meta["order"]);
        }
        if (b.meta["order"]) {
          orderB = parseInt(b.meta["order"]);
        }
        return orderA - orderB;
      });
    };
    Window_EroStatus.prototype.maxCols = function () {
      return 4;
    };
    Window_EroStatus.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      this.resetNormalFont();
      var item = this.itemAt(index);
      if (item) {
        this.drawLabelImage(0, rect.x, rect.y);
        var opened = this.isOpened(item);
        var enabled = this.isEnabled(item);
        var text = item.name;
        if (ConfigManager.en && item.meta["en"]) {
          text = item.meta["en"];
        }
        if (opened && enabled) {
          this.changeTextColor(ColorManager.normalColor());
        } else {
          this.changeTextColor(ColorManager.textColor(8));
        }
        if (!opened) {
          var text2 = "";
          for (var i = 0; i < text.length; i++) {
            text2 += "?";
          }
          text = text2;
        }
        this.changePaintOpacity(opened);
        this.drawText(text, rect.x + 0, rect.y + 3, 136, "center");
      }
    };
    Window_EroStatus.prototype.isEnabled = function (item) {
      if (item.meta["sw"]) {
        var sw = parseInt(item.meta["sw"]);
        return $gameSwitches.value(sw);
      }
      /*if (item.atypeId == 9) {
                const armor = parseInt(item.meta['armor']);
                if (! isNaN(armor)) {
                    return $gameActors.mainActor().hasAcce(armor);
                }
                return true;
            }
            return $gameSwitches.value(item.id - 100);*/
      return true;
    };
    Window_EroStatus.prototype.isOpened = function (item) {
      //return true
      return $gameSystem.hasItem(this._ero.day, item);
      //return $gameParty.hasItem(item);
    };
    Window_EroStatus.prototype.item = function () {
      return this.itemAt(this.index());
    };
    Window_EroStatus.prototype.itemAt = function (index) {
      return this._data[index];
    };
    Window_EroStatus.prototype.itemWidth = function () {
      return 140;
    };
    Window_EroStatus.prototype.itemHeight = function () {
      return 44;
    };
    Window_EroStatus.prototype.spacing = function () {
      return 4;
    };
    Window_EroStatus.prototype.itemRect = function (index) {
      var rect = new Rectangle(0, 0, 0, 0);
      var maxCols = this.maxCols();
      rect.width = this.itemWidth();
      rect.height = this.itemHeight();
      rect.x =
        (index % maxCols) * (rect.width + this.spacing()) - this._scrollX + 310;
      rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 250;
      if (index >= 4) {
        rect.y += 64;
      }
      if (index >= 16) {
        rect.y += 50;
      }
      if (index >= 36) {
        rect.y += 250;
      }
      return rect;
    };
    Window_EroStatus.prototype.maxItems = function () {
      return this._data ? this._data.length : 1;
    };
    Window_EroStatus.prototype._refreshCursor = function () {
      this._cursorSprite.destroyAndRemoveChildren();
      var baseTexture = Nore.getSystemBaseTexture("status_item");
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(300, 0, 150, 50)
      );
      var sprite = new PIXI.Sprite(texture);
      var drect = this._cursorRect.clone();
      sprite.x = drect.x - 310;
      sprite.y = drect.y - 248 - 1;
      this._cursorSprite.addChild(sprite);
      this._contentsBackSprite.addChild(this._cursorSprite);
    };
    return Window_EroStatus;
  })(Window_Selectable);
})(Nore || (Nore = {}));
var Sprite_MiniCharacter = /** @class */ (function (_super) {
  __extends(Sprite_MiniCharacter, _super);
  function Sprite_MiniCharacter() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Sprite_MiniCharacter.prototype.updateCharacterFrame = function () {
    var pw = this.patternWidth();
    var ph = this.patternHeight();
    var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
    var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
    this.updateHalfBodySprites();
    var offset = this.imageOffsetY();
    this.setFrame(sx, sy, pw, ph - offset);
  };
  Sprite_MiniCharacter.prototype.imageOffsetY = function () {
    if (
      this._characterName.includes("actor") ||
      this._characterName.includes("mob")
    ) {
      return 30;
    } else {
      return 0;
    }
  };
  Sprite_MiniCharacter.prototype.updatePosition = function () {
    this.x = this._character.screenX();
    this.y = this._character.screenY();
    this.z = this._character.screenZ();
  };
  return Sprite_MiniCharacter;
})(Sprite_Character);
function calcKaihatsuRank(value) {
  if (value <= 200) {
    return "G";
  }
  if (value <= 500) {
    return "F";
  }
  if (value <= 1000) {
    return "E";
  }
  if (value <= 2000) {
    return "D";
  }
  if (value <= 3500) {
    return "C";
  }
  if (value <= 5000) {
    return "B";
  }
  return "A";
}
function hankaku2Zenkaku(str) {
  return (str + "").replace(/[A-Za-z0-9]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
  });
}
var Sprite_HelpBig = /** @class */ (function (_super) {
  __extends(Sprite_HelpBig, _super);
  function Sprite_HelpBig() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Sprite_HelpBig.prototype.initialize = function (r) {
    _super.prototype.initialize.call(this);
    this.x = r.x;
    this.y = r.y - 10;
    this.bitmap = new Bitmap(r.width, r.height);
  };
  Sprite_HelpBig.prototype.setNotOpenedItem = function (item) {
    if (!item) {
      this.setText("");
      return;
    }
    this.bitmap.clear();
    this.bitmap.fontSize = 30;
    this.bitmap.textColor = "#deaa3d"; //ColorManager.systemColor();
    this.bitmap.drawText(TextManager.condition, 20, 0, 600, 40, "left");
    this.bitmap.textColor = ColorManager.normalColor();
    if (ConfigManager.en) {
      this.bitmap.drawText(item.meta["enHint"], 20, 35, 600, 40, "left");
    } else {
      this.bitmap.drawText(item.meta["hint"], 170, 0, 600, 40, "left");
    }
    this._text = null;
  };
  Sprite_HelpBig.prototype.setItem = function (item) {
    if (!item) {
      this.setText("");
      return;
    }
    var text = item.description;
    if (ConfigManager.en && item.meta["enDesc"]) {
      text = item.meta["enDesc"];
    }
    var acceId = parseInt(item.meta["armor"]);
    /* const eroItem = findEroItem(acceId);
         if (eroItem && $gameParty.hasItem(eroItem)) {
             text += '\n' + TextManager.hasItemToDisable.format(eroItem.name);
 
         } else {
             if (item.meta['hint']) {
                 text += '\n' + TextManager.condition + item.meta['hint'];
             }
         }*/
    this.setText(text);
  };
  Sprite_HelpBig.prototype.setActor = function (actor) {
    if (!actor) {
      this.setText("");
      return;
    }
    var text = "今までにしたプレイ:";
    this.setText(text);
  };
  Sprite_HelpBig.prototype.setText = function (text) {
    if (this._text !== text) {
      this._text = text;
      this.refresh();
    }
  };
  Sprite_HelpBig.prototype.refresh = function () {
    this.bitmap.clear();
    this.bitmap.fontSize = 30;
    if (this._text.contains("\\n")) {
      var texts = this._text.split("\\n");
      this.bitmap.drawText(texts[0], 0, -0, 600, 40, "center");
      this.bitmap.drawText(texts[1], 0, 35, 600, 40, "center");
    } else {
      this.bitmap.drawText(this._text, 0, 10, 600, 40, "center");
    }
  };
  return Sprite_HelpBig;
})(Sprite);
