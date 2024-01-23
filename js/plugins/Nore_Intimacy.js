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
  var Window_ManDetail = /** @class */ (function (_super) {
    __extends(Window_ManDetail, _super);
    function Window_ManDetail() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    return Window_ManDetail;
  })(Window_Base);
  Nore.Window_ManDetail = Window_ManDetail;
  var Scene_Intimacy = /** @class */ (function (_super) {
    __extends(Scene_Intimacy, _super);
    function Scene_Intimacy() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Intimacy.prototype.create = function () {
      _super.prototype.create.call(this);
      this.refreshBg();
      this.createWindowLayer();
      this.createIntimacyWindow();
      this.createHelpWindow();
      this.onChange2();
    };
    Scene_Intimacy.prototype.refreshBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("bg");
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 0;
      sprite.y = 0;
      this.addChild(sprite);
    };
    Scene_Intimacy.prototype.createIntimacyWindow = function () {
      this._intimacyWindow = new Window_Intimacy();
      this._intimacyWindow.setHandler("change", this.onChange2.bind(this));
      this.addWindow(this._intimacyWindow);
    };
    Scene_Intimacy.prototype.onChange2 = function () {
      var item = this._intimacyWindow.currentItem();
      this._helpWindow.setActor(item);
    };
    Scene_Intimacy.prototype.update = function () {
      _super.prototype.update.call(this);
      if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
        SoundManager.playCancel();
        $gameActors.actor(5).setCacheChanged();
        SceneManager.pop();
      }
    };
    Scene_Intimacy.prototype.createHelpWindow = function () {
      var rect = this.helpWindowRect();
      this._helpWindow = new Sprite_HelpBig(rect);
      this.addWindow(this._helpWindow);
    };
    Scene_Intimacy.prototype.helpWindowRect = function () {
      var rect = _super.prototype.helpWindowRect.call(this);
      rect.x = 300;
      rect.y = -220;
      rect.width = 700;
      rect.height = 132;
      return rect;
    };
    return Scene_Intimacy;
  })(Scene_MenuBase);
  Nore.Scene_Intimacy = Scene_Intimacy;
  var Window_Intimacy = /** @class */ (function (_super) {
    __extends(Window_Intimacy, _super);
    function Window_Intimacy() {
      var _this = this;
      var x = -4;
      _this =
        _super.call(
          this,
          new Rectangle(x, -4, Graphics.width, Graphics.height)
        ) || this;
      _this.refresh();
      _this.select(0);
      _this.activate();
      _this.frameVisible = false;
      _this.backOpacity = 0;
      return _this;
    }
    Window_Intimacy.prototype.resetNormalFont = function () {
      this.changeTextColor(ColorManager.normalColor());
      this.contents.fontSize = 18;
      this.changePaintOpacity(true);
    };
    Window_Intimacy.prototype.refresh = function () {
      this.makeItems();
      _super.prototype.refresh.call(this);
      this.drawTitle();
      this.drawAllLabel();
      this.drawLines();
    };
    Window_Intimacy.prototype.makeItems = function () {
      this._data = [];
      $gameSystem.intimacy(4);
      this._data.push($gameActors.actor(4));
      for (var id = 11; id <= 20; id++) {
        var actor = $gameActors.actor(id);
        if (actor.name().length == 0) {
          continue;
        }
        if ($gameSystem.intimacy(id).intimacy() == 0) {
          continue;
        }
        this._data.push(actor);
      }
    };
    Window_Intimacy.prototype.drawTitle = function () {
      this.drawText(
        TextManager.relationshipWithVillagers,
        0,
        20,
        Graphics.width,
        "center"
      );
    };
    Window_Intimacy.prototype.drawAllLabel = function () {
      var rect = this.itemRect(0);
      var xx = 305;
      var interval = 130;
      this.drawLabel("", xx, rect.y - 40);
      this.drawLabel(
        TextManager.seikoui,
        xx + interval * 1 + 14,
        rect.y - 40,
        100
      );
      this.drawLabel(TextManager.honban, xx + interval * 2, rect.y - 40);
      this.drawLabel(TextManager.syusan2, xx + interval * 3, rect.y - 40);
      this.drawLabel(
        TextManager.relationship,
        xx + interval * 4 + 20,
        rect.y - 40,
        350
      );
    };
    Window_Intimacy.prototype.drawLabel = function (name, x, y, max) {
      if (max === void 0) {
        max = 120;
      }
      this.drawText(name, x, y, max, "center");
    };
    Window_Intimacy.prototype.drawLines = function () {
      var rect = this.itemRect(0);
      var h = 40 + this.itemHeight() * this.maxItems();
      var yy = rect.y - 40;
      this.contents.fillRect(430, yy, 1, h, "#bbbbbb");
      this.contents.fillRect(560, yy, 1, h, "#bbbbbb");
      this.contents.fillRect(690, yy, 1, h, "#bbbbbb");
      this.contents.fillRect(820, yy, 1, h, "#bbbbbb");
    };
    Window_Intimacy.prototype.drawItem = function (index) {
      var actor = this.item(index);
      var rect = this.itemRect(index);
      this.drawText(actor.name(), rect.x + 13, rect.y + 2, 190, "left");
      var intimacy = $gameSystem.intimacy(actor.actorId());
      this.drawInyimacy(intimacy, rect);
      this.drawSeikoui(intimacy, rect);
      this.drawNakadashi(intimacy, rect);
      //this.drawNinshin(intimacy, rect);
      this.drawSyusan(intimacy, rect);
      this.drawRelationship(intimacy, rect);
    };
    Window_Intimacy.prototype.drawInyimacy = function (intimacy, rect) {
      var xx = rect.x + 240;
      var interval = 11;
      var count = intimacy.intimacyCount();
      for (var i_1 = 0; i_1 < count; i_1++) {
        this.drawIcon(404, xx, rect.y);
        xx += interval;
      }
      var i = intimacy.intimacy();
      this.drawText(i, rect.x + 240 + 124, rect.y, 50, "right");
    };
    Window_Intimacy.prototype.drawSeikoui = function (intimacy, rect) {
      var xx = rect.x + 508;
      var count = $gameSystem.countActorSeikoui(intimacy.actorId());
      this.drawText(count, xx - 64, rect.y, 50, "right");
      var interval = 18;
      var nn = Math.min(5, Math.ceil(count / 10));
      for (var i = 0; i < nn; i++) {
        this.drawIcon(2085, xx, rect.y);
        xx += interval;
      }
      if (count > 50) {
        this.drawIcon(2085, xx + 10, rect.y);
      }
    };
    Window_Intimacy.prototype.drawNakadashi = function (intimacy, rect) {
      var xx = rect.x + 628;
      var count = $gameSystem.countActorNakadashi(intimacy.actorId());
      this.drawText(count, xx - 64, rect.y, 50, "right");
      var interval = 18;
      var nn = Math.min(5, Math.ceil(count / 10));
      for (var i = 0; i < nn; i++) {
        this.drawIcon(2031, xx, rect.y);
        xx += interval;
      }
      if (count > 50) {
        this.drawIcon(414, xx + 10, rect.y);
      }
    };
    Window_Intimacy.prototype.drawNinshin = function (intimacy, rect) {
      var xx = rect.x + 628;
      var count = $gameSystem.countActorNinshin(intimacy.actorId());
      this.drawText(count, xx - 56, rect.y, 50, "right");
      var interval = 18;
      var nn = Math.min(5, count);
      for (var i = 0; i < nn; i++) {
        this.drawIcon(2048, xx, rect.y);
        xx += interval;
      }
      if (count > 5) {
        this.drawIcon(414, xx + 4, rect.y);
      }
    };
    Window_Intimacy.prototype.drawSyusan = function (intimacy, rect) {
      var xx = rect.x + 758;
      var count = $gameSystem.countActorSyusan(intimacy.actorId());
      this.drawText(count, xx - 56, rect.y, 50, "right");
      var interval = 18;
      var nn = Math.min(1, count);
      for (var i = 0; i < nn; i++) {
        this.drawIcon(2055, xx, rect.y);
        xx += interval;
      }
    };
    Window_Intimacy.prototype.drawRelationship = function (intimacy, rect) {
      var xx = rect.x + 848;
      this.drawText(intimacy.findText(), xx, rect.y, 370, "left");
    };
    Window_Intimacy.prototype.itemRect = function (index) {
      var rect = _super.prototype.itemRect.call(this, index);
      rect.y += 200;
      return rect;
    };
    Window_Intimacy.prototype.maxCols = function () {
      return 1;
    };
    Window_Intimacy.prototype.item = function (index) {
      return this._data[index];
    };
    Window_Intimacy.prototype.selectedActor = function () {
      return this._data[this.index()];
    };
    Window_Intimacy.prototype.maxItems = function () {
      return this._data ? this._data.length : 1;
    };
    Window_Intimacy.prototype.currentItem = function () {
      return this.item(this.index());
    };
    return Window_Intimacy;
  })(Window_Selectable);
  Nore.Window_Intimacy = Window_Intimacy;
})(Nore || (Nore = {}));
