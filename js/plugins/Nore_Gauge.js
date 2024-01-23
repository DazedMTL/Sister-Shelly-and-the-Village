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
  var HP_BAR_WIDTH = 386;
  var Sprite_GaugeEnemyHp = /** @class */ (function (_super) {
    __extends(Sprite_GaugeEnemyHp, _super);
    function Sprite_GaugeEnemyHp() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_GaugeEnemyHp.prototype.drawGaugeRect = function (
      x,
      y,
      width,
      height
    ) {
      x = 0;
      y = 0;
      width = 144;
      var rate = this.gaugeRate();
      var fillW = Math.floor(width * rate);
      var fillH = height;
      var color0 = this.gaugeBackColor();
      var color1 = this.gaugeColor1();
      var color2 = this.gaugeColor2();
      this.bitmap.fillRect(x, y, width, height, color0);
      this.bitmap.gradientFillRect(x, y, fillW, fillH, color1, color2);
    };
    Sprite_GaugeEnemyHp.prototype.label = function () {
      return "";
    };
    Sprite_GaugeEnemyHp.prototype.drawValue = function () {};
    Sprite_GaugeEnemyHp.prototype.gaugeBackColor = function () {
      return "#aa2222";
    };
    Sprite_GaugeEnemyHp.prototype.gaugeColor1 = function () {
      return ColorManager.textColor(3);
    };
    Sprite_GaugeEnemyHp.prototype.gaugeColor2 = function () {
      return "#77dd50";
    };
    return Sprite_GaugeEnemyHp;
  })(Sprite_Gauge);
  Nore.Sprite_GaugeEnemyHp = Sprite_GaugeEnemyHp;
  var Sprite_Rank10 = /** @class */ (function (_super) {
    __extends(Sprite_Rank10, _super);
    function Sprite_Rank10() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_Rank10.prototype.getBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/bar"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("bar");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/bar";
        PIXI.utils.BaseTextureCache["system/bar"] = baseTexture;
      }
      return baseTexture;
    };
    Sprite_Rank10.prototype.drawGaugeRect = function (x, y, width, height) {
      height = 20;
      var rate = this.gaugeRate();
      var fillW = Math.floor(width * rate);
      this.destroyAndRemoveChildren();
      if (fillW <= 1) {
        //return;
      }
      /*this.drawLeft(-3);
            if (fillW <= 6) {
                this.drawRight(2);
                return;
            }*/
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 0, 339 * rate, 15)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 100;
      this.addChild(sprite);
    };
    Sprite_Rank10.prototype.isValid = function () {
      return true;
    };
    Sprite_Rank10.prototype.label = function () {
      return "";
    };
    Sprite_Rank10.prototype.drawValue = function () {};
    Sprite_Rank10.prototype.currentMaxValue = function () {
      return 200;
    };
    Sprite_Rank10.prototype.currentValue = function () {
      return Math.min(200, $gameVariables.value(56));
    };
    Sprite_Rank10.prototype.gaugeBackColor = function () {
      return "#444444";
    };
    Sprite_Rank10.prototype.gaugeBackColor2 = function () {
      return "#FFFFFF";
    };
    Sprite_Rank10.prototype.gaugeColor1 = function () {
      return ColorManager.textColor(3);
    };
    Sprite_Rank10.prototype.gaugeColor2 = function () {
      return "#77dd50";
    };
    Sprite_Rank10.prototype.bitmapWidth = function () {
      return 200;
    };
    Sprite_Rank10.prototype.gaugeHeight = function () {
      return 30;
    };
    return Sprite_Rank10;
  })(Sprite_Gauge);
  Nore.Sprite_Rank10 = Sprite_Rank10;
  var EXP_BAR_WIDTH = 132;
  var Sprite_GaugeLevel = /** @class */ (function (_super) {
    __extends(Sprite_GaugeLevel, _super);
    function Sprite_GaugeLevel() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.updateTargetValue = function (value, maxValue) {
        this._targetValue = value;
        this._targetMaxValue = maxValue;
        this._value = value;
        this._maxValue = maxValue;
        this.redraw();
      };
      return _this;
    }
    Sprite_GaugeLevel.prototype.drawGaugeRect = function (x, y, width, height) {
      width = EXP_BAR_WIDTH;
      height = 8;
      var rate = this.gaugeRate();
      this.destroyAndRemoveChildren();
      if (rate <= 0) {
        return;
      }
      var baseTexture = this.getBaseTexture();
      var texture2 = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 40, EXP_BAR_WIDTH * rate, 20)
      );
      var sprite2 = new PIXI.Sprite(texture2);
      sprite2.scale.x = rate;
      this.addChild(sprite2);
    };
    Sprite_GaugeLevel.prototype.gaugeX = function () {
      return 3;
    };
    Sprite_GaugeLevel.prototype.isValid = function () {
      return true;
    };
    Sprite_GaugeLevel.prototype.getBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/bar"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("bar");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/bar";
        PIXI.utils.BaseTextureCache["system/bar"] = baseTexture;
      }
      return baseTexture;
    };
    Sprite_GaugeLevel.prototype.gaugeHeight = function () {
      return 20;
    };
    Sprite_GaugeLevel.prototype.currentValue = function () {
      if (this._battler) {
        if (this._battler.isMaxLevel()) {
          return 1;
        }
        return this._battler.currentExp() - this._battler.currentLevelExp();
      }
      return NaN;
    };
    Sprite_GaugeLevel.prototype.currentMaxValue = function () {
      if (this._battler) {
        if (this._battler.isMaxLevel()) {
          return 1;
        }
        return this._battler.nextLevelExp() - this._battler.currentLevelExp();
      }
      return NaN;
    };
    Sprite_GaugeLevel.prototype.gaugeRate = function () {
      if ($gameActors.mainActor().isMaxLevel()) {
        return 1;
      }
      return Math.min(1, _super.prototype.gaugeRate.call(this));
    };
    Sprite_GaugeLevel.prototype.label = function () {
      return "";
    };
    Sprite_GaugeLevel.prototype.drawValue = function () {};
    Sprite_GaugeLevel.prototype.gaugeBackColor = function () {
      return "#000000";
    };
    Sprite_GaugeLevel.prototype.gaugeColor1 = function () {
      return ColorManager.hpGaugeColor1();
    };
    Sprite_GaugeLevel.prototype.gaugeColor2 = function () {
      return ColorManager.hpGaugeColor2();
    };
    Sprite_GaugeLevel.prototype.bitmapWidth = function () {
      return 88;
    };
    return Sprite_GaugeLevel;
  })(Sprite_Gauge);
  Nore.Sprite_GaugeLevel = Sprite_GaugeLevel;
  var Sprite_GaugeHp2 = /** @class */ (function (_super) {
    __extends(Sprite_GaugeHp2, _super);
    function Sprite_GaugeHp2() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.updateTargetValue = function (value, maxValue) {
        this._targetValue = value;
        this._targetMaxValue = maxValue;
        this._value = value;
        this._maxValue = maxValue;
        this.redraw();
      };
      return _this;
    }
    Sprite_GaugeHp2.prototype.getBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/bar"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("bar");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/bar";
        PIXI.utils.BaseTextureCache["system/bar"] = baseTexture;
      }
      return baseTexture;
    };
    Sprite_GaugeHp2.prototype.label = function () {
      return "";
    };
    Sprite_GaugeHp2.prototype.drawValue = function () {};
    Sprite_GaugeHp2.prototype.gaugeBackColor = function () {
      return "#444444";
    };
    Sprite_GaugeHp2.prototype.gaugeBackColor2 = function () {
      return "#FFFFFF";
    };
    Sprite_GaugeHp2.prototype.gaugeColor1 = function () {
      return ColorManager.textColor(3);
    };
    Sprite_GaugeHp2.prototype.gaugeColor2 = function () {
      return "#77dd50";
    };
    Sprite_GaugeHp2.prototype.bitmapWidth = function () {
      return 550;
    };
    Sprite_GaugeHp2.prototype.gaugeHeight = function () {
      return 30;
    };
    return Sprite_GaugeHp2;
  })(Sprite_Gauge);
  Nore.Sprite_GaugeHp2 = Sprite_GaugeHp2;
  var Sprite_GaugeDamage = /** @class */ (function (_super) {
    __extends(Sprite_GaugeDamage, _super);
    function Sprite_GaugeDamage(isEnemy) {
      var _this = _super.call(this) || this;
      _this._wait = 5;
      _this._isEnemy = isEnemy;
      _this.y = 56;
      if (isEnemy) {
        _this.x = 173;
      } else {
        _this.x = 667;
      }
      return _this;
    }
    Sprite_GaugeDamage.prototype.getBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/bar"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("bar");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/bar";
        PIXI.utils.BaseTextureCache["system/bar"] = baseTexture;
      }
      return baseTexture;
    };
    Sprite_GaugeDamage.prototype.showDamage = function (battler, last, damage) {
      if (damage <= 0) {
        return;
      }
      var current = battler.hp;
      var mhp = battler.mhp;
      var rate1 = current / mhp;
      var rate2 = damage / mhp;
      var rate3 = (mhp - last) / mhp;
      var baseTexture = this.getBaseTexture();
      var x;
      if (this._isEnemy) {
        x = HP_BAR_WIDTH * rate3;
      } else {
        x = HP_BAR_WIDTH * rate1;
      }
      /*
            p(battler)
            p(mhp + ' ' + current + ' ' + battler.hp)
            p(rate1 + ' ' + rate2 + ' ' + rate3)
            p(x)
            */
      var w = HP_BAR_WIDTH * rate2;
      if (HP_BAR_WIDTH * rate3 + w > HP_BAR_WIDTH) {
        w = HP_BAR_WIDTH - HP_BAR_WIDTH * rate3 + 1;
      }
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(x, 20, w, 15)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = x;
      this.addChild(sprite);
    };
    Sprite_GaugeDamage.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this._wait > 0) {
        this._wait--;
      } else {
        this.opacity -= 70;
        if (this.opacity <= 0) {
          if (this.parent) {
            this.parent.removeChild(this);
            this.destroy();
          }
        }
      }
    };
    return Sprite_GaugeDamage;
  })(Sprite);
  Nore.Sprite_GaugeDamage = Sprite_GaugeDamage;
  var Sprite_GaugeActorHp = /** @class */ (function (_super) {
    __extends(Sprite_GaugeActorHp, _super);
    function Sprite_GaugeActorHp() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_GaugeActorHp.prototype.drawGaugeRect = function (
      x,
      y,
      width,
      height
    ) {
      height = 20;
      var rate = this.gaugeRate();
      var fillW = Math.floor(width * rate);
      this.destroyAndRemoveChildren();
      if (fillW <= 1) {
        //return;
      }
      /*this.drawLeft(-3);
            if (fillW <= 6) {
                this.drawRight(2);
                return;
            }*/
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 0, HP_BAR_WIDTH * rate, 15)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 100;
      this.addChild(sprite);
      //this.bitmap.fillRect(x, y, width * rate, height, ColorManager.textColor(3));
      /*var baseTexture: PIXI.BaseTexture = this.getBaseTexture();
            var texture2 = new PIXI.Texture(baseTexture,  new PIXI.Rectangle(10, 40, 10, 10));
            var sprite2 = new PIXI.Sprite(texture2);
            sprite2.x = 2;
            sprite2.y = 2;
            sprite2.scale.x = w / 10;
            this.addChild(sprite2);*/
      //this.drawRight(fillW - 6);
    };
    Sprite_GaugeActorHp.prototype.drawLeft = function (xx) {
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 40, 5, 10)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = xx;
      this.addChild(sprite);
    };
    Sprite_GaugeActorHp.prototype.drawRight = function (xx) {
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(226, 40, 3, 10)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = xx;
      this.addChild(sprite);
    };
    Sprite_GaugeActorHp.prototype.currentValue = function () {
      return $gameActors.mainActor().hp;
    };
    Sprite_GaugeActorHp.prototype.currentMaxValue = function () {
      return $gameActors.mainActor().mhp;
    };
    return Sprite_GaugeActorHp;
  })(Sprite_GaugeHp2);
  Nore.Sprite_GaugeActorHp = Sprite_GaugeActorHp;
  var Sprite_GaugeEnemyHp2 = /** @class */ (function (_super) {
    __extends(Sprite_GaugeEnemyHp2, _super);
    function Sprite_GaugeEnemyHp2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_GaugeEnemyHp2.prototype.drawGaugeRect = function (
      x,
      y,
      width,
      height
    ) {
      width = HP_BAR_WIDTH;
      height = 20;
      var rate = this.gaugeRate();
      var fillW = Math.floor(width * rate);
      this.destroyAndRemoveChildren();
      if (fillW <= 1) {
        //return;
      }
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 0, HP_BAR_WIDTH * rate, 15)
      );
      var sprite = new PIXI.Sprite(texture);
      var xx = x + width * (1 - rate);
      sprite.x = xx;
      this.addChild(sprite);
      //this.bitmap.fillRect(x + (width * (1 - rate)), y, width * rate, height, ColorManager.textColor(3));
    };
    Sprite_GaugeEnemyHp2.prototype.currentValue = function () {
      return this._battler.hp;
    };
    Sprite_GaugeEnemyHp2.prototype.currentMaxValue = function () {
      return this._battler.mhp;
    };
    return Sprite_GaugeEnemyHp2;
  })(Sprite_GaugeHp2);
  Nore.Sprite_GaugeEnemyHp2 = Sprite_GaugeEnemyHp2;
  var Sprite_GaugeMp = /** @class */ (function (_super) {
    __extends(Sprite_GaugeMp, _super);
    function Sprite_GaugeMp() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_GaugeMp.prototype.drawGaugeRect = function (x, y, width, height) {
      y--;
      width = 77;
      var rate = this.gaugeRate();
      var fillW = Math.floor(width * rate);
      this.destroyAndRemoveChildren();
      if (fillW <= 1) {
        return;
      }
      this.drawLeft(-3);
      if (fillW <= 6) {
        this.drawRight(2);
        return;
      }
      var w = fillW - 6;
      var baseTexture = this.getBaseTexture();
      var texture2 = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(10, 0, 10, 10)
      );
      var sprite2 = new PIXI.Sprite(texture2);
      sprite2.x = 1;
      sprite2.scale.x = w / 10;
      this.addChild(sprite2);
      this.drawRight(fillW - 6);
      /*const color3 = this.gaugeBackColor2();
            const color0 = this.gaugeBackColor();
            const color1 = this.gaugeColor1();
            const color2 = this.gaugeColor2();
            this.bitmap.fillRect(x - 1, y - 1, width + 2, height + 2, color3);
            this.bitmap.fillRect(x, y, width, height, color0);
            this.bitmap.gradientFillRect(x, y, fillW, fillH, color1, color2);*/
    };
    Sprite_GaugeMp.prototype.drawLeft = function (xx) {
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 0, 5, 10)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = xx;
      this.addChild(sprite);
    };
    Sprite_GaugeMp.prototype.drawRight = function (xx) {
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(75, 0, 2, 10)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = xx;
      this.addChild(sprite);
    };
    Sprite_GaugeMp.prototype.getBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/bar"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("bar");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/bar";
        PIXI.utils.BaseTextureCache["system/bar"] = baseTexture;
      }
      return baseTexture;
    };
    Sprite_GaugeMp.prototype.gaugeHeight = function () {
      return 20;
    };
    Sprite_GaugeMp.prototype.label = function () {
      return "";
    };
    Sprite_GaugeMp.prototype.drawValue = function () {};
    Sprite_GaugeMp.prototype.gaugeBackColor = function () {
      return "#442222";
    };
    Sprite_GaugeMp.prototype.gaugeBackColor2 = function () {
      return "#FFFFFF";
    };
    Sprite_GaugeMp.prototype.gaugeColor1 = function () {
      return "#cc00a0";
    };
    Sprite_GaugeMp.prototype.gaugeColor2 = function () {
      return "#dd44a0";
    };
    return Sprite_GaugeMp;
  })(Sprite_Gauge);
  Nore.Sprite_GaugeMp = Sprite_GaugeMp;
  var Sprite_GaugeStatus = /** @class */ (function (_super) {
    __extends(Sprite_GaugeStatus, _super);
    function Sprite_GaugeStatus() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_GaugeStatus.prototype.drawGaugeRect = function (
      x,
      y,
      width,
      height
    ) {
      if (this.currentMaxValue() == 0) {
        return;
      }
      x = 0;
      y = 0;
      width = this.gaugeWidth();
      var rate = this.gaugeRate();
      var fillW = Math.floor(width * rate);
      var fillH = height;
      var color0 = this.gaugeBackColor();
      var color1 = this.gaugeColor1();
      var color2 = this.gaugeColor2();
      this.bitmap.fillRect(x, y, width + 2, height + 2, "#222222");
      this.bitmap.fillRect(x + 1, y + 1, width, height, color0);
      if (isNaN(fillW)) {
        return;
      }
      this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color1, color2);
    };
    Sprite_GaugeStatus.prototype.gaugeWidth = function () {
      return this.currentMaxValue() * 4;
    };
    Sprite_GaugeStatus.prototype.gaugeBackColor = function () {
      return "#666666";
    };
    Sprite_GaugeStatus.prototype.label = function () {
      return "";
    };
    Sprite_GaugeStatus.prototype.drawValue = function () {};
    return Sprite_GaugeStatus;
  })(Sprite_Gauge);
  Nore.Sprite_GaugeStatus = Sprite_GaugeStatus;
  var Sprite_GaugeHp = /** @class */ (function (_super) {
    __extends(Sprite_GaugeHp, _super);
    function Sprite_GaugeHp(equip) {
      var _this = _super.call(this) || this;
      _this._equip = equip;
      if (equip.isWeapon()) {
        _this._max = new Weapon(_this._equip.id(), 10);
      } else {
        _this._max = new Armor(_this._equip.id(), 10);
      }
      return _this;
    }
    Sprite_GaugeHp.prototype.gaugeWidth = function () {
      return this.currentMaxValue() * 1;
    };
    Sprite_GaugeHp.prototype.gaugeColor1 = function () {
      return ColorManager.textColor(3);
    };
    Sprite_GaugeHp.prototype.gaugeColor2 = function () {
      return this.gaugeColor1();
    };
    Sprite_GaugeHp.prototype.currentValue = function () {
      return this._equip.hp();
    };
    Sprite_GaugeHp.prototype.currentMaxValue = function () {
      return this._max.hp();
    };
    Sprite_GaugeHp.prototype.isValid = function () {
      return this._max != null;
    };
    return Sprite_GaugeHp;
  })(Sprite_GaugeStatus);
  Nore.Sprite_GaugeHp = Sprite_GaugeHp;
  var Sprite_GaugeAttack = /** @class */ (function (_super) {
    __extends(Sprite_GaugeAttack, _super);
    function Sprite_GaugeAttack(equip) {
      var _this = _super.call(this) || this;
      _this._equip = equip;
      if (equip.isWeapon()) {
        _this._max = new Weapon(_this._equip.id(), 10);
      } else {
        _this._max = new Armor(_this._equip.id(), 10);
      }
      return _this;
    }
    Sprite_GaugeAttack.prototype.gaugeWidth = function () {
      return this.currentMaxValue() * 1;
    };
    Sprite_GaugeAttack.prototype.gaugeColor1 = function () {
      return ColorManager.textColor(2);
    };
    Sprite_GaugeAttack.prototype.gaugeColor2 = function () {
      return this.gaugeColor1();
    };
    Sprite_GaugeAttack.prototype.currentValue = function () {
      return this._equip.atk();
    };
    Sprite_GaugeAttack.prototype.currentMaxValue = function () {
      return this._max.atk();
    };
    Sprite_GaugeAttack.prototype.isValid = function () {
      return this._max != null;
    };
    return Sprite_GaugeAttack;
  })(Sprite_GaugeStatus);
  Nore.Sprite_GaugeAttack = Sprite_GaugeAttack;
  var Sprite_GaugeDef = /** @class */ (function (_super) {
    __extends(Sprite_GaugeDef, _super);
    function Sprite_GaugeDef(equip) {
      var _this = _super.call(this) || this;
      _this._equip = equip;
      if (equip.isWeapon()) {
        _this._max = new Weapon(_this._equip.id(), 10);
      } else {
        _this._max = new Armor(_this._equip.id(), 10);
      }
      return _this;
    }
    Sprite_GaugeDef.prototype.gaugeWidth = function () {
      return this.currentMaxValue() * 1;
    };
    Sprite_GaugeDef.prototype.gaugeColor1 = function () {
      return ColorManager.textColor(2);
    };
    Sprite_GaugeDef.prototype.gaugeColor2 = function () {
      return this.gaugeColor1();
    };
    Sprite_GaugeDef.prototype.currentValue = function () {
      return this._equip.def();
    };
    Sprite_GaugeDef.prototype.currentMaxValue = function () {
      return this._max.def();
    };
    Sprite_GaugeDef.prototype.isValid = function () {
      return this._max != null;
    };
    return Sprite_GaugeDef;
  })(Sprite_GaugeStatus);
  Nore.Sprite_GaugeDef = Sprite_GaugeDef;
  var Sprite_GaugeHit = /** @class */ (function (_super) {
    __extends(Sprite_GaugeHit, _super);
    function Sprite_GaugeHit(equip) {
      var _this = _super.call(this) || this;
      _this._equip = equip;
      if (equip.isWeapon()) {
        _this._max = new Weapon(_this._equip.id(), 10);
      } else {
        _this._max = new Armor(_this._equip.id(), 10);
      }
      return _this;
    }
    Sprite_GaugeHit.prototype.gaugeColor1 = function () {
      return ColorManager.textColor(4);
    };
    Sprite_GaugeHit.prototype.gaugeColor2 = function () {
      return this.gaugeColor1();
    };
    Sprite_GaugeHit.prototype.currentValue = function () {
      return this._equip.hit();
    };
    Sprite_GaugeHit.prototype.currentMaxValue = function () {
      return this._max.hit();
    };
    Sprite_GaugeHit.prototype.isValid = function () {
      return this._max != null;
    };
    return Sprite_GaugeHit;
  })(Sprite_GaugeStatus);
  Nore.Sprite_GaugeHit = Sprite_GaugeHit;
  var Sprite_GaugeCri = /** @class */ (function (_super) {
    __extends(Sprite_GaugeCri, _super);
    function Sprite_GaugeCri(equip) {
      var _this = _super.call(this) || this;
      _this._equip = equip;
      if (equip.isWeapon()) {
        _this._max = new Weapon(_this._equip.id(), 10);
      } else {
        _this._max = new Armor(_this._equip.id(), 10);
      }
      return _this;
    }
    Sprite_GaugeCri.prototype.gaugeColor1 = function () {
      return ColorManager.textColor(8);
    };
    Sprite_GaugeCri.prototype.gaugeColor2 = function () {
      return this.gaugeColor1();
    };
    Sprite_GaugeCri.prototype.currentValue = function () {
      return this._equip.cri();
    };
    Sprite_GaugeCri.prototype.currentMaxValue = function () {
      return this._max.cri();
    };
    Sprite_GaugeCri.prototype.isValid = function () {
      return this._max != null;
    };
    return Sprite_GaugeCri;
  })(Sprite_GaugeStatus);
  Nore.Sprite_GaugeCri = Sprite_GaugeCri;
  var Sprite_GaugeProgress = /** @class */ (function (_super) {
    __extends(Sprite_GaugeProgress, _super);
    function Sprite_GaugeProgress(b, _current, _max) {
      var _this = _super.call(this, b) || this;
      _this._current = _current;
      _this._max = _max;
      return _this;
    }
    Sprite_GaugeProgress.prototype.drawGaugeRect = function (
      x,
      y,
      width,
      height
    ) {
      y--;
      width = 180;
      height = 20;
      var rate = this.gaugeRate();
      var fillW = Math.floor(width * rate);
      var fillH = height;
      var color3 = this.gaugeBackColor2();
      var color0 = this.gaugeBackColor();
      var color1 = this.gaugeColor1();
      var color2 = this.gaugeColor2();
      //this.bitmap.fillRect(x - 1, y - 1, width + 2, height + 2, color3);
      //this.bitmap.fillRect(x, y, width, height, color0);
      this.bitmap.gradientFillRect(x, y, fillW, fillH, color1, color2);
    };
    Sprite_GaugeProgress.prototype.label = function () {
      return "";
    };
    Sprite_GaugeProgress.prototype.drawValue = function () {};
    Sprite_GaugeProgress.prototype.bitmapHeight = function () {
      return 30;
    };
    Sprite_GaugeProgress.prototype.gaugeHeight = function () {
      return 20;
    };
    Sprite_GaugeProgress.prototype.gaugeRate = function () {
      var r = _super.prototype.gaugeRate.call(this);
      if (r > 1) {
        return 1;
      }
      return r;
    };
    Sprite_GaugeProgress.prototype.currentValue = function () {
      return this._current;
    };
    Sprite_GaugeProgress.prototype.currentMaxValue = function () {
      return this._max;
    };
    Sprite_GaugeProgress.prototype.isValid = function () {
      return true;
    };
    Sprite_GaugeProgress.prototype.gaugeBackColor = function () {
      return "#442222";
    };
    Sprite_GaugeProgress.prototype.gaugeBackColor2 = function () {
      return "#FFFFFF";
    };
    Sprite_GaugeProgress.prototype.gaugeColor1 = function () {
      if (this.gaugeRate() >= 1) {
        return ColorManager.textColor(6);
      }
      return ColorManager.hpGaugeColor1();
    };
    Sprite_GaugeProgress.prototype.gaugeColor2 = function () {
      if (this.gaugeRate() >= 1) {
        return ColorManager.textColor(6);
      }
      return ColorManager.hpGaugeColor2();
    };
    Sprite_GaugeProgress.prototype.bitmapWidth = function () {
      return 300;
    };
    return Sprite_GaugeProgress;
  })(Sprite_Gauge);
  Nore.Sprite_GaugeProgress = Sprite_GaugeProgress;
  var Sprite_GaugeMedal = /** @class */ (function (_super) {
    __extends(Sprite_GaugeMedal, _super);
    function Sprite_GaugeMedal(b, _current, _max) {
      var _this = _super.call(this, b) || this;
      _this._current = _current;
      _this._max = _max;
      _this._targetValue = _this._current;
      _this._value = _this._current;
      _this._maxTargetValue = _this._max;
      _this._maxValue = _this._max;
      return _this;
    }
    Sprite_GaugeMedal.prototype.drawGaugeRect = function (x, y, width, height) {
      y--;
      width = 180;
      var rate = this.gaugeRate();
      var fillW = Math.floor(width * rate);
      var fillH = height;
      var color3 = this.gaugeBackColor2();
      var color0 = this.gaugeBackColor();
      var color1 = this.gaugeColor1();
      var color2 = this.gaugeColor2();
      this.bitmap.fillRect(x - 1, y - 1, width + 2, height + 2, color3);
      this.bitmap.fillRect(x, y, width, height, color0);
      this.bitmap.gradientFillRect(x, y, fillW, fillH, color1, color2);
    };
    Sprite_GaugeMedal.prototype.label = function () {
      return "";
    };
    Sprite_GaugeMedal.prototype.drawValue = function () {};
    Sprite_GaugeMedal.prototype.smoothness = function () {
      return 60;
    };
    Sprite_GaugeMedal.prototype.gaugeRate = function () {
      var r = _super.prototype.gaugeRate.call(this);
      if (r > 1) {
        return 1;
      }
      return r;
    };
    Sprite_GaugeMedal.prototype.currentValue = function () {
      return this._targetValue;
    };
    Sprite_GaugeMedal.prototype.currentMaxValue = function () {
      return this._max;
    };
    Sprite_GaugeMedal.prototype.isValid = function () {
      return true;
    };
    Sprite_GaugeMedal.prototype.gaugeBackColor = function () {
      return "#442222";
    };
    Sprite_GaugeMedal.prototype.gaugeBackColor2 = function () {
      return "#FFFFFF";
    };
    Sprite_GaugeMedal.prototype.gaugeColor1 = function () {
      if (this.gaugeRate() >= 1) {
        return ColorManager.textColor(24);
      }
      return ColorManager.textColor(3);
    };
    Sprite_GaugeMedal.prototype.gaugeColor2 = function () {
      if (this.gaugeRate() >= 1) {
        return ColorManager.textColor(24);
      }
      return "#77dd50";
    };
    Sprite_GaugeMedal.prototype.bitmapWidth = function () {
      return 300;
    };
    return Sprite_GaugeMedal;
  })(Sprite_Gauge);
  Nore.Sprite_GaugeMedal = Sprite_GaugeMedal;
  var Sprite_GaugeNinshin = /** @class */ (function (_super) {
    __extends(Sprite_GaugeNinshin, _super);
    function Sprite_GaugeNinshin(_param) {
      var _this = _super.call(this) || this;
      _this._param = _param;
      return _this;
    }
    Sprite_GaugeNinshin.prototype.label = function () {
      return "";
    };
    Sprite_GaugeNinshin.prototype.drawValue = function () {};
    Sprite_GaugeNinshin.prototype.currentValue = function () {
      return this._param.sanke;
    };
    Sprite_GaugeNinshin.prototype.currentMaxValue = function () {
      return 100;
    };
    Sprite_GaugeNinshin.prototype.gaugeBackColor = function () {
      return "#442222";
    };
    Sprite_GaugeNinshin.prototype.gaugeBackColor2 = function () {
      return "#FFFFFF";
    };
    Sprite_GaugeNinshin.prototype.gaugeColor1 = function () {
      return ColorManager.textColor(3);
    };
    Sprite_GaugeNinshin.prototype.gaugeColor2 = function () {
      return "#77dd50";
    };
    Sprite_GaugeNinshin.prototype.bitmapWidth = function () {
      return 260;
    };
    Sprite_GaugeNinshin.prototype.isValid = function () {
      return true;
    };
    return Sprite_GaugeNinshin;
  })(Sprite_Gauge);
  Nore.Sprite_GaugeNinshin = Sprite_GaugeNinshin;
})(Nore || (Nore = {}));
