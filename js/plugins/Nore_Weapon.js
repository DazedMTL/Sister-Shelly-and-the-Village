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
var Material = /** @class */ (function () {
  function Material(id, count) {
    this._id = id;
    this._count = count;
  }
  Material.prototype.iconIndex = function () {
    return this.item().iconIndex;
  };
  Material.prototype.item = function () {
    return $dataItems[this._id];
  };
  Material.prototype.count = function () {
    return this._count;
  };
  Material.prototype.name = function () {
    if (ConfigManager.en) {
      if (this.item().meta["en"]) {
        return this.item().meta["en"];
      }
    }
    return this.item().name;
  };
  return Material;
})();
var Equip = /** @class */ (function () {
  function Equip(id, lv, normalParamPlus, specialParamPlus) {
    this._id = id;
    this._lv = lv;
    this._normalParamPlus = normalParamPlus;
    this._specialParamPlus = specialParamPlus;
  }
  Equip.prototype.id = function () {
    return this.item().id;
  };
  Equip.prototype.lv = function () {
    return this._lv;
  };
  Equip.prototype.halfLv = function () {
    /*if (this._lv == 7) {
            return 4;
        }*/
    return Math.ceil(this._lv / 2);
  };
  Equip.prototype.lvRate = function () {
    if (this.rank() <= 5) {
      switch (this._lv) {
        case 0:
          return 1;
        case 1:
        case 2:
          return 1 + this._lv * 0.08;
        case 3:
          return 1 + this._lv * 0.1;
        case 4:
          return 1 + this._lv * 0.12;
        case 5:
          return 1 + this._lv * 0.14;
        case 6:
          return 1 + this._lv * 0.16;
        case 7:
          return 1 + this._lv * 0.2;
        case 8:
          return 1 + this._lv * 0.24;
        case 9:
          return 1 + this._lv * 0.26;
        case 10:
          return 1 + this._lv * 0.3;
      }
    } else if (this.rank() <= 7) {
      switch (this._lv) {
        case 0:
          return 1 + 0.2;
        case 1:
          return 1 + 0.3;
        case 2:
          return 1 + 0.4;
        case 3:
          return 1 + 0.55;
        case 4:
          return 1 + 0.7;
        case 5:
          return 1 + 0.9;
        case 6:
          return 1 + 1.15;
        case 7:
          return 1 + 1.4;
        case 8:
          return 1 + this._lv * 0.24;
        case 9:
          return 1 + this._lv * 0.26;
        case 10:
          return 1 + this._lv * 0.3;
      }
    } else {
      switch (this._lv) {
        case 0:
          return 1 + 0.3;
        case 1:
          return 1 + 0.45;
        case 2:
          return 1 + 0.6;
        case 3:
          return 1 + 0.75;
        case 4:
          return 1 + 0.9;
        case 5:
          return 1 + 1.05;
        case 6:
          return 1 + 1.2;
        case 7:
          return 1 + 1.4;
        case 8:
          return 1 + (this._lv / 2) * 0.24;
        case 9:
          return 1 + (this._lv / 2) * 0.26;
        case 10:
          return 1 + (this._lv / 2) * 0.3;
      }
    }
  };
  Equip.prototype.upLv = function () {
    if (this._lv == this.maxLv()) {
      console.error("すでに最大LVです");
      return;
    }
    this._lv++;
  };
  Equip.prototype.maxLv = function () {
    return 7;
  };
  Equip.prototype.atk = function () {
    if (this.rank() == 0) {
      return 0;
    }
    return Math.ceil(
      ((this.item().params[2] * this.specialRate()) / 100) * this.lvRate()
    );
  };
  Equip.prototype.def = function () {
    if (this.rank() == 0) {
      return 0;
    }
    return Math.ceil(
      ((this.item().params[3] * this.specialRate()) / 100) * this.lvRate()
    );
  };
  Equip.prototype.normalRate = function () {
    return 100 + (this._normalParamPlus || 0);
  };
  Equip.prototype.specialRate = function () {
    return 100 + (this._specialParamPlus || 0);
  };
  Equip.prototype.hp = function () {
    if (this.rank() == 0) {
      return 0;
    }
    return Math.ceil(
      ((this.item().params[0] * this.normalRate()) / 100) * this.lvRate()
    );
  };
  Equip.prototype.name = function () {
    if (ConfigManager.en) {
      if (this.item().meta["en"]) {
        return this.item().meta["en"];
      }
    }
    return this.item().name; // + ' Lv' + this._lv;
  };
  Equip.prototype.iconIndex = function () {
    return this.item().iconIndex;
  };
  Equip.prototype.sellPrice = function () {
    var n = this.item().price;
    return Math.round(n / 2);
  };
  Equip.prototype.price = function () {
    var n = this.item().price;
    /*  if (this.lv() == 1) {
              return Math.floor(n * 3 * (100 - $gameParty.discount()) / 100);
              //return n * 3;
          }*/
    for (var i = 1; i < this.lv(); i++) {
      n *= 1.24;
    }
    if (this.lv() >= 6) {
      n *= 1.3;
    }
    return Math.floor((n * (100 - $gameParty.discount())) / 100);
  };
  Equip.prototype.hit = function () {
    if (this.rank() == 0) {
      return 0;
    }
    for (var _i = 0, _a = this.item().traits; _i < _a.length; _i++) {
      var t = _a[_i];
      if (t.code == 22) {
        if (t.dataId == 0) {
          var n = Math.round(t.value * 100);
          if (this.lv() >= 2) {
            n++;
          }
          if (this.lv() >= 5) {
            n++;
          }
          if (this.lv() >= 10) {
            n++;
          }
          return n;
        }
      }
    }
    return 0;
  };
  Equip.prototype.eva = function () {
    if (this.rank() == 0) {
      return 0;
    }
    for (var _i = 0, _a = this.item().traits; _i < _a.length; _i++) {
      var t = _a[_i];
      if (t.code == 22) {
        if (t.dataId == 1) {
          var n = Math.round(t.value * 100);
          if (this.lv() >= 2) {
            n++;
          }
          if (this.lv() >= 5) {
            n++;
          }
          if (this.lv() >= 10) {
            n++;
          }
          return n;
        }
      }
    }
    return 0;
  };
  Equip.prototype.cri = function () {
    for (var _i = 0, _a = this.item().traits; _i < _a.length; _i++) {
      var t = _a[_i];
      if (t.code == 22) {
        if (t.dataId == 2) {
          return Math.round(t.value * 100);
        }
      }
    }
    return 0;
  };
  Object.defineProperty(Equip.prototype, "params", {
    get: function () {
      return [0, 0, 0, 0, 0, 0, 0, 0];
      var result = this.item().params.concat();
      for (var i = 0; i < result.length; i++) {
        if (result[i] > 0) {
          result[i] *= 1 + 0.05 * (this.lv() - 1);
        }
      }
      return result;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Equip.prototype, "traits", {
    get: function () {
      return {};
      //return this.item().traits;
      /*
            const result = JsonEx.makeDeepCopy(this.item().traits);
            for (let i = 0; i < result.length; i++) {
                if (result[i].value > 0) {
                    result[i].value += this.plus() * (this.lv() - 1) / 100;
                }
            }
            return result;
            */
    },
    enumerable: true,
    configurable: true,
  });
  Equip.prototype.isWeapon = function () {
    return false;
  };
  Equip.prototype.isArmor = function () {
    return false;
  };
  Equip.prototype.type = function () {
    return 0;
  };
  Equip.prototype.rank = function () {
    return parseInt(this.item().meta["rank"]);
  };
  Equip.prototype.isSame = function (equip) {
    if (this.isWeapon() && equip.isWeapon()) {
      return this.rank() == equip.rank();
    } else if (this.isArmor() && equip.isArmor()) {
      if (this.type() != equip.type()) {
        return false;
      }
      return this.rank() == equip.rank();
    } else {
      return false;
    }
  };
  Equip.prototype.setLv = function (lv) {
    this._lv = lv;
  };
  Equip.prototype.bigIcon = function () {
    if (this.item().meta["icon"]) {
      return parseInt(this.item().meta["icon"]);
    }
    return 0;
  };
  return Equip;
})();
var Weapon = /** @class */ (function (_super) {
  __extends(Weapon, _super);
  function Weapon(id, lv, atkPlus, hitPlus) {
    if (atkPlus === void 0) {
      atkPlus = 0;
    }
    if (hitPlus === void 0) {
      hitPlus = 0;
    }
    var _this = this;
    if (!$dataWeapons[id]) {
      console.trace();
      throw id;
    }
    _this = _super.call(this, id, lv, atkPlus, hitPlus) || this;
    return _this;
  }
  Weapon.prototype.item = function () {
    if (!$dataWeapons[this._id]) {
      console.error(this._id);
    }
    return $dataWeapons[this._id];
  };
  Weapon.prototype.iconIndex = function () {
    return this.item().iconIndex;
  };
  Weapon.prototype.weapon = function () {
    return this.item();
  };
  Weapon.prototype.materials = function () {
    var result = [];
    for (var i = 1; i <= 3; i++) {
      if (this.item().meta["material" + i]) {
        var id = parseInt(this.item().meta["material" + i]);
        var count = parseInt(this.item().meta["material" + i + "_count"]);
        result.push(new Material(id, count));
      }
    }
    return result;
  };
  Weapon.prototype.wtypeId = function () {
    return this.item().wtypeId;
  };
  Weapon.prototype.isWeapon = function () {
    return true;
  };
  return Weapon;
})(Equip);
var Armor = /** @class */ (function (_super) {
  __extends(Armor, _super);
  function Armor(id, lv, defPlus, hitPlus) {
    if (defPlus === void 0) {
      defPlus = 0;
    }
    if (hitPlus === void 0) {
      hitPlus = 0;
    }
    return _super.call(this, id, lv, defPlus, hitPlus) || this;
  }
  Armor.prototype.item = function () {
    return $dataArmors[this._id];
  };
  Armor.prototype.materials = function () {
    var result = [];
    for (var i = 1; i <= 3; i++) {
      if (this.item().meta["material" + i]) {
        var id = parseInt(this.item().meta["material" + i]);
        var count = parseInt(this.item().meta["material" + i + "_count"]);
        result.push(new Material(id, count));
      }
    }
    return result;
  };
  Armor.prototype.etypeId = function () {
    return this.item().etypeId;
  };
  Armor.prototype.isArmor = function () {
    return true;
  };
  Armor.prototype.type = function () {
    return this.item().etypeId;
  };
  return Armor;
})(Equip);
var MAX_LEVEL = 7;
var Nore;
(function (Nore) {
  var WeaponManager = /** @class */ (function () {
    function WeaponManager() {}
    /*findMax(weapon: Weapon): Weapon {
            let max = weapon;
            for (let i = weapon.id(); i < weapon.id() + 10; i++) {
                const w = $dataWeapons[i];
                if (w.name == weapon.name()) {
                    max = new Weapon(w);
                    continue;
                }
                break;
            }
            return max;
        }
        findMin(weapon: RPG.Weapon): Weapon {
            let id = weapon.id - 10;
            for (let i = id; i < id + 10; i++) {
                const w = $dataWeapons[i];
                if (w.name != weapon.name) {
                    continue;
                }
                return new Weapon(w);
            }
        }
        findCurrent() {

        }*/
    WeaponManager.prototype.getNextWeapon = function (weapon) {
      if (weapon.lv() < MAX_LEVEL) {
        return new Weapon(
          weapon.id(),
          weapon.lv() + 1,
          weapon._normalParamPlus,
          weapon._specialParamPlus
        );
      }
      /*if ($dataWeapons[weapon.id() + 1]) {
                return new Weapon(weapon.id() + 1, 1);
            } else {
                return null;
            }*/
      return null;
    };
    WeaponManager.prototype.getNextArmor = function (armor) {
      if (armor.lv() < MAX_LEVEL) {
        return new Armor(
          armor.id(),
          armor.lv() + 1,
          armor._normalParamPlus,
          armor._specialParamPlus
        );
      }
      /*if ($dataArmors[armor.id() + 1]) {
                return new Armor(armor.id() + 1, 1);

            } else {
                return null;
            }*/
      return null;
    };
    return WeaponManager;
  })();
  Nore.WeaponManager = WeaponManager;
  Nore.$weaoponManager = new WeaponManager();
})(Nore || (Nore = {}));
