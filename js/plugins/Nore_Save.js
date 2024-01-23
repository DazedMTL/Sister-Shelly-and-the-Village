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
  DataManager.maxSavefiles = function () {
    return 40;
  };
  Scene_File.prototype.createListWindow = function () {
    var rect = this.listWindowRect();
    this._listWindow = new Window_SavefileList2(rect);
    this._listWindow.setHandler("ok", this.onSavefileOk.bind(this));
    this._listWindow.setHandler("cancel", this.popScene.bind(this));
    this._listWindow.setMode(this.mode(), this.needsAutosave());
    this._listWindow.selectSavefile(this.firstSavefileId());
    this._listWindow.refresh();
    this.addWindow(this._listWindow);
  };
  Scene_File.prototype.needsAutosave = function () {
    return true;
  };
  Scene_Save.prototype.helpWindowText = function () {
    if (ConfigManager.en) {
      return TextManager.saveMessageEn;
    }
    return TextManager.saveMessage;
  };
  Scene_Load.prototype.helpWindowText = function () {
    if (ConfigManager.en) {
      return TextManager.loadMessageEn;
    }
    return TextManager.loadMessage;
  };
  Window_GameEnd.prototype.makeCommandList = function () {
    if (ConfigManager.en) {
      this.addCommand("to Title", "toTitle");
      this.addCommand("Cancel", "cancel");
    } else {
      this.addCommand(TextManager.toTitle, "toTitle");
      this.addCommand(TextManager.cancel, "cancel");
    }
  };
  var Window_SavefileList2 = /** @class */ (function (_super) {
    __extends(Window_SavefileList2, _super);
    function Window_SavefileList2() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._playerMap = {};
      return _this;
    }
    Window_SavefileList2.prototype.maxCols = function () {
      return 4;
    };
    Window_SavefileList2.prototype.drawAllItems = function () {
      this._windowContentsSprite.removeChildren();
      _super.prototype.drawAllItems.call(this);
    };
    Window_SavefileList2.prototype.selectSavefile = function (savefileId) {
      var index = Math.max(0, this.savefileIdToIndex(savefileId));
      this.select(index);
      this.setTopRow(index / 4 - 2);
    };
    Window_SavefileList2.prototype.drawItem = function (index) {
      var savefileId = this.indexToSavefileId(index);
      var info = DataManager.savefileInfo(savefileId);
      var rect = this.itemRectWithPadding(index);
      this.resetTextColor();
      this.changePaintOpacity(this.isEnabled(savefileId));
      this.drawTitle(savefileId, rect.x, rect.y + 4);
      if (info) {
        this.drawContents2(index, info, rect);
      }
    };
    Window_SavefileList2.prototype.destroy = function () {
      _super.prototype.destroy.call(this);
      for (var a in this._playerMap) {
        var sprite = this._playerMap[a];
        if (sprite.texture) {
          sprite.destroy();
        }
      }
    };
    Window_SavefileList2.prototype.drawContents2 = function (
      index,
      info,
      rect
    ) {
      var bottom = rect.y + rect.height;
      this.drawPartyCharacters2(index, info, rect.x + 20, bottom - 8);
      var lineHeight = this.lineHeight();
      var y2 = bottom - lineHeight - 4;
      this.drawText(
        TextManager.date.format(info.day),
        rect.x,
        rect.y + 4,
        rect.width,
        "right"
      );
      this.drawText(
        "LV " + info.level,
        rect.x,
        rect.y + 36,
        rect.width,
        "right"
      );
      if (info.dungeon === true) {
        this.drawText(
          TextManager.dungeon,
          rect.x + 60,
          rect.y + 36,
          140,
          "right"
        );
      } else {
        if (info.night === true) {
          this.drawText(
            TextManager.night,
            rect.x + 100,
            rect.y + 36,
            100,
            "right"
          );
        }
        if (info.night == false) {
          this.drawText(
            TextManager.afternoon,
            rect.x + 100,
            rect.y + 36,
            100,
            "right"
          );
        }
      }
      if (y2 >= lineHeight) {
        this.drawPlaytime(info, rect.x, y2, rect.width);
      }
    };
    Window_SavefileList2.prototype.drawPartyCharacters2 = function (
      index,
      info,
      x,
      y
    ) {
      if (!info.cos) {
        return;
      }
      if (this._playerMap[index]) {
        var player = this._playerMap[index];
        player.x = x + 10;
        player.y = y;
        player.z = 0;
        this._windowContentsSprite.addChild(player);
      } else {
        info.cos.inSave = true;
        var player = new Sprite_Player($gamePlayer, info.cos, true);
        player.x = x + 10;
        player.y = y;
        player.z = 0;
        this._windowContentsSprite.addChild(player);
        this._playerMap[index] = player;
      }
    };
    return Window_SavefileList2;
  })(Window_SavefileList);
  var DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function () {
    var info = DataManager_makeSavefileInfo.call(this);
    info.day = $gameVariables.value(3);
    info.cos = $gameActors.actor(5).exportCosInfo();
    info.level = $gameActors.actor(4)._level;
    info.night = $gameSwitches.value(6);
    info.dungeon = $gameSwitches.value(1);
    return info;
  };
})(Nore || (Nore = {}));
DataManager.saveGame = function (savefileId) {
  var _this = this;
  var contents = this.makeSaveContents();
  var saveName = this.makeSavename(savefileId);
  return StorageManager.saveObject(saveName, contents).then(function () {
    _this._globalInfo[savefileId] = _this.makeSavefileInfo();
    _this._globalInfo[98] = $gameActors.actor(5).exportCosInfo();
    _this.saveGlobalInfo();
    return 0;
  });
};
DataManager.removeInvalidGlobalInfo = function () {
  var globalInfo = this._globalInfo;
  for (var _i = 0, globalInfo_1 = globalInfo; _i < globalInfo_1.length; _i++) {
    var info = globalInfo_1[_i];
    var savefileId = globalInfo.indexOf(info);
    if (savefileId >= 90) {
      return;
    }
    if (!this.savefileExists(savefileId)) {
      delete globalInfo[savefileId];
    }
  }
};
var Game_CosInfo = /** @class */ (function () {
  function Game_CosInfo() {
    this.faceId = 1;
    this.hoppeId = 1;
  }
  Game_CosInfo.prototype.hasAcce = function (id) {
    return this.acceMap[id];
  };
  Object.defineProperty(Game_CosInfo.prototype, "headId", {
    get: function () {
      if (this.hasAcce(212)) {
        return "g";
      }
      if (this.hasAcce(210)) {
        return "h";
      }
      if (this.hasAcce(209)) {
        return "b";
      }
      if (this.hasAcce(211)) {
        return "c";
      }
      if (this.hasAcce(205)) {
        return "d";
      }
      return "a";
    },
    enumerable: true,
    configurable: true,
  });
  Game_CosInfo.prototype.restore = function () {
    var actor = $gameActors.actor(5);
    actor.setOuterId(this.outerId);
    actor.setOuterTopId(this.outerTopId);
    actor.setOuterBottomId(this.outerBottomId);
    actor.setInnerTopId(this.innerTopId);
    actor.setInnerBottomId(this.innerBottomId);
    actor.setLegId(this.legId);
    actor.setHoppeId(this.hoppeId);
    actor.setDefaultFaceId(this.faceId || 1);
    $gameSystem.getEro(5).bote = this.boteId;
    for (var key in this.acceMap) {
      if (this.acceMap[key]) {
        actor.addAcce(key);
      }
    }
  };
  return Game_CosInfo;
})();
DataManager.latestSavefileId = function () {
  var globalInfo = this._globalInfo;
  var validInfo = globalInfo.slice(1).filter(function (x) {
    return x;
  });
  var infos = [];
  for (var _i = 0, validInfo_1 = validInfo; _i < validInfo_1.length; _i++) {
    var v = validInfo_1[_i];
    if (v.timestamp) {
      infos.push(v);
    }
  }
  var latest = Math.max.apply(
    Math,
    infos.map(function (x) {
      return x.timestamp;
    })
  );
  var index = globalInfo.findIndex(function (x) {
    return x && x.timestamp === latest;
  });
  return index > 0 ? index : 0;
};
