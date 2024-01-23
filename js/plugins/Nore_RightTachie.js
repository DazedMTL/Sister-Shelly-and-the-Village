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
  var Sprite_RightTachie = /** @class */ (function (_super) {
    __extends(Sprite_RightTachie, _super);
    function Sprite_RightTachie() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_RightTachie.prototype.initialize = function (inTitle) {
      if (inTitle === void 0) {
        inTitle = false;
      }
      this._inTitle = inTitle;
      var x = 520;
      _super.prototype.initialize.call(
        this,
        new Rectangle(x, 0, this.contentsWidth(), this.contentsHeight())
      );
      this.frameVisible = false;
      this.backOpacity = 0;
      this.margin = 0;
      this.padding = 0;
      this._actorLayer = new Sprite();
      this.addChild(this._actorLayer);
      if (
        PIXI.utils.BaseTextureCache["img/tachie/actor05.webp"] &&
        DataManager.isGlobalInfoLoaded()
      ) {
        $gameActors.actor(5).setCacheChanged();
        Nore.Tachie.actorCashedSprites[5] = false;
        this.redraw();
      } else {
        this._waitRedraw = true;
      }
    };
    Sprite_RightTachie.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this._waitRedraw) {
        if (
          PIXI.utils.BaseTextureCache["img/tachie/actor05.webp"] &&
          DataManager.isGlobalInfoLoaded()
        ) {
          $gameActors.actor(5).setCacheChanged();
          Nore.Tachie.actorCashedSprites[5] = false;
          this.redraw();
          this._waitRedraw = false;
        }
      }
    };
    Sprite_RightTachie.prototype.redraw = function () {
      this.contents.clear();
      this.contentsBack.clear();
      if (!this._actorLayer) {
        return;
      }
      this.drawActor();
    };
    Sprite_RightTachie.prototype.drawActor = function () {
      var actor = $gameActors.actor(5);
      var hMinus = 0;
      if ($gameSwitches.value(4)) {
        hMinus = 0;
      }
      var rect = new Rectangle(120, -100, 600, 1000);
      var x = 10;
      var y = 10;
      if (this._inTitle) {
        $gameActors.actor(5).setCacheChanged();
        Nore.Tachie.actorCashedSprites[5] = false;
        actor.acceMap = {};
        var cos = DataManager._globalInfo[98];
        if (cos) {
          cos.restore();
        } else {
          actor.setOuterId("b");
          actor.addAcce(209);
        }
      }
      this.drawTachie(
        actor.actorId(),
        this._actorLayer,
        x,
        y,
        rect,
        actor.getDefaultFaceId()
      );
    };
    Sprite_RightTachie.prototype.contentsWidth = function () {
      return 378;
    };
    Sprite_RightTachie.prototype.contentsHeight = function () {
      return Graphics.height;
    };
    return Sprite_RightTachie;
  })(Window_Base);
  Nore.Sprite_RightTachie = Sprite_RightTachie;
})(Nore || (Nore = {}));
