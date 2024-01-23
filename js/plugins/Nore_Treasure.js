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
 * @command Treasure
 * @text 宝箱
 * @des 宝箱
 *
 * @command TreasureResult
 * @text 結果
 * @des 結果
 *
 * @command HideTreasureResult
 * @text 結果非表示
 * @des 結果非表示
 *
 */
var Nore;
(function (Nore) {
  var FLOOR_ID = 15;
  var MONEY_ID = 35;
  var TYPE_ID = 36;
  var NAME_ID = 37;
  var CONFIRM_ID = 122;
  var MONEY_SW_ID = 124;
  var WEAPON_SW_ID = 125;
  var ARMOR_SW_ID = 126;
  var FIRST_CLEAR_SW_ID = 127;
  var SPECIAL_SW_ID = 128;
  var newEquip;
  var beforeWeapon;
  var beforeArmor;
  function restoreTreasure() {
    if (newEquip) {
      return;
    }
    if ($gameSwitches.value(MONEY_SW_ID)) {
      return;
    }
    getItem();
  }
  Nore.restoreTreasure = restoreTreasure;
  function initRoulette() {
    newEquip = null;
    beforeWeapon = null;
    beforeArmor = null;
    $gameSwitches.setValue(MONEY_SW_ID, false);
    $gameSwitches.setValue(WEAPON_SW_ID, false);
    $gameSwitches.setValue(ARMOR_SW_ID, false);
    $gameSwitches.setValue(FIRST_CLEAR_SW_ID, false);
    $gameSwitches.setValue(SPECIAL_SW_ID, false);
  }
  function rouletteTreasure() {
    initRoulette();
    $gameSwitches.setValue(CONFIRM_ID, false);
    if (!isGetItem()) {
      if (isGetSpecialItem()) {
        getSpecialItem();
      } else {
        getMoney();
      }
    } else {
      getItem();
      if (isFirstClear() && $gameVariables.value(15) > 1) {
        getMoney();
      }
    }
  }
  Nore.rouletteTreasure = rouletteTreasure;
  function isGetSpecialItem() {
    if (Math.randomInt(22) == 0) {
      return true;
    }
    return false;
  }
  function getSpecialItem() {
    $gameVariables.setValue(MONEY_ID, 0);
    $gameVariables.setValue(TYPE_ID, 5);
    var candidates = [24, 25, 31];
    if ($gameParty.numItems($dataItems[31]) >= 5) {
      candidates = [24, 25];
    }
    var id = candidates[Math.randomInt(candidates.length)];
    var item = $dataItems[id];
    var name = item.name;
    if (ConfigManager.en) {
      name = item.meta["en"];
    }
    $gameSystem.addTreasure(new Treasure(TreasureType.SPECIAL_ITEM, id, 0));
    $gameVariables.setValue(NAME_ID, TextManager.getItem.format(name));
    $gameSwitches.setValue(SPECIAL_SW_ID, true);
    $gameParty.gainItem(item, 1);
  }
  function getMoney() {
    $gameSwitches.setValue(MONEY_SW_ID, true);
    var value = calcMoney();
    if (isFirstClear()) {
      value *= 2;
    }
    $gameVariables.setValue(MONEY_ID, value);
    $gameVariables.setValue(NAME_ID, TextManager.getItem.format(value + "G"));
    $gameSystem.addTreasure(new Treasure(TreasureType.MONEY, 0, value));
  }
  function rouletteType() {
    var type = Math.randomInt(4);
    var rank = $gameVariables.value(FLOOR_ID);
    var beforeWeapon;
    var beforeArmor;
    switch (type) {
      case 0:
        beforeWeapon = $gameActors.actor(4).equips()[0];
        var weapon = void 0;
        if (beforeWeapon.rank() < rank) {
          return [0, false];
        } else {
          return [0, true];
        }
      case 1: {
        beforeArmor = $gameActors.actor(4).getArmor(4);
        if (beforeArmor.rank() < rank) {
          return [1, false];
        } else {
          return [1, true];
        }
        break;
      }
      case 2: {
        beforeArmor = $gameActors.mainActor().getArmor(3);
        if (!beforeArmor) {
          return [2, false];
        }
        if (beforeArmor.rank() < rank) {
          return [2, false];
        } else {
          return [2, true];
        }
      }
      case 3: {
        beforeArmor = $gameActors.mainActor().getArmor(8);
        if (!beforeArmor) {
          return [3, false];
        }
        if (beforeArmor.rank() < rank) {
          return [3, false];
        } else {
          return [3, true];
        }
      }
    }
  }
  function getItem() {
    var result = rouletteType();
    if (result[1]) {
      result = rouletteType();
      if (result[1]) {
        result = rouletteType();
      }
    }
    $gameVariables.setValue(MONEY_ID, 0);
    var armor = null;
    var type = result[0]; //Math.randomInt(4);
    if (type == 0 && $gameActors.actor(4).weapon1().rank() == 10) {
      type = Math.randomInt(2) + 1;
    }
    var rank = $gameVariables.value(FLOOR_ID);
    $gameVariables.setValue(TYPE_ID, type);
    p("type:" + type);
    switch (type) {
      case 0: {
        beforeWeapon = $gameActors.actor(4).equips()[0];
        if (beforeWeapon.rank() > rank) {
          // getMoney();
          //return;
        }
        var weapon = void 0;
        if (beforeWeapon.rank() < rank) {
          var newLv = beforeWeapon.halfLv();
          weapon = new Weapon(rank, newLv, 0, 0);
        } else {
          weapon = new Weapon(rank, 0, Math.randomInt(25), Math.randomInt(25));
        }
        $gameSystem.addTreasure(
          new Treasure(TreasureType.WEAPON, weapon.id(), weapon.sellPrice())
        );
        $gameSwitches.setValue(WEAPON_SW_ID, true);
        break;
      }
      case 1: {
        beforeArmor = $gameActors.actor(4).getArmor(4);
        if (beforeArmor.rank() < rank) {
          var newLv = beforeArmor.halfLv();
          armor = new Armor(rank, newLv, 0, 0);
        } else {
          armor = new Armor(rank, 0, Math.randomInt(25), Math.randomInt(25));
        }
        if (beforeArmor.rank() > armor.rank()) {
          // getMoney();
          //return;
        }
        $gameSystem.addTreasure(
          new Treasure(TreasureType.ARMOR1, armor.id(), armor.sellPrice())
        );
        $gameSwitches.setValue(ARMOR_SW_ID, true);
        break;
      }
      case 2: {
        beforeArmor = $gameActors.mainActor().getArmor(3);
        if (beforeArmor) {
          var newLv = beforeArmor.halfLv();
          if (beforeArmor.rank() < rank) {
            armor = new Armor(rank + 10, newLv, 0, 0);
          } else {
            armor = new Armor(
              rank + 10,
              0,
              Math.randomInt(25),
              Math.randomInt(25)
            );
          }
        } else {
          armor = new Armor(rank + 10, 0, 0, 0);
        }
        if (beforeArmor && beforeArmor.rank() > armor.rank()) {
          // getMoney();
          // return;
        }
        $gameSystem.addTreasure(
          new Treasure(TreasureType.ARMOR2, armor.id(), armor.sellPrice())
        );
        $gameSwitches.setValue(ARMOR_SW_ID, true);
        break;
      }
      case 3: {
        beforeArmor = $gameActors.mainActor().getArmor(8);
        if (beforeArmor) {
          var newLv = beforeArmor.halfLv();
          if (beforeArmor.rank() < rank) {
            armor = new Armor(rank + 20, newLv, 0, 0);
          } else {
            armor = new Armor(
              rank + 20,
              newLv,
              Math.randomInt(25),
              Math.randomInt(25)
            );
          }
        } else {
          armor = new Armor($gameVariables.value(FLOOR_ID) + 20, 0, 0, 0);
        }
        if (beforeArmor && beforeArmor.rank() > armor.rank()) {
          //  getMoney();
          // return;
        }
        $gameSystem.addTreasure(
          new Treasure(TreasureType.ARMOR3, armor.id(), armor.sellPrice())
        );
        $gameSwitches.setValue(ARMOR_SW_ID, true);
        break;
      }
    }
    if (isFirstClear()) {
      $gameSwitches.setValue(FIRST_CLEAR_SW_ID, true);
    }
    newEquip = weapon || armor;
    $gameVariables.setValue(
      NAME_ID,
      TextManager.getItem.format(newEquip.name())
    );
    if (beforeWeapon || beforeArmor) {
      $gameSwitches.setValue(CONFIRM_ID, true);
    } else {
      if (armor) {
        $gameActors.mainActor().setArmor(armor);
      }
    }
  }
  function calcMoney() {
    var n = Math.floor((calcBaseMoney() * (100 + Math.randomInt(50))) / 100);
    if ($gameSwitches.value(9)) {
      n *= 2;
    }
    return n;
  }
  function calcBaseMoney() {
    switch ($gameVariables.value(FLOOR_ID)) {
      case 1:
        return 30;
      case 2:
        return 50;
      case 3:
        return 80;
      case 4:
        return 180;
      case 5:
        return 290;
      case 6:
        return 410;
      case 7:
        return 720;
      case 8:
        return 1250;
      case 9:
        return 1860;
      case 10:
        return 2200;
    }
    return 199;
  }
  function isGetItem() {
    if (isFirstClear()) {
      // 初クリア
      return true;
    }
    if ($gameParty.hasItem($dataArmors[154])) {
      if (Math.randomInt(2) == 0) {
        $gameVariables.setValue(39, 0);
        return true;
      }
    } else {
      if (Math.randomInt(3) == 0) {
        $gameVariables.setValue(39, 0);
        return true;
      }
    }
    var n = $gameVariables.value(39);
    if (n >= 3) {
      $gameVariables.setValue(39, 0);
      return true;
    }
    $gameVariables.setValue(39, n + 1);
    return false;
  }
  function isFirstClear() {
    return $gameSwitches.value(31);
    //return $gameVariables.value(14) < $gameVariables.value(15);
  }
  var pluginName = "Nore_Treasure";
  PluginManager.registerCommand(pluginName, "Treasure", function (args) {
    SceneManager.push(Scene_Treasure);
  });
  PluginManager.registerCommand(pluginName, "TreasureResult", function (args) {
    var size = $gameSystem.treasureList().length;
    var r;
    r = new Rectangle(520, 200, 300, 300);
    /*        if (size > 20) {
                } else {
                    r = new Rectangle(500, 150, 300, 340);
                }
                */
    var window = new Window_TreasureResult(r);
    SceneManager._scene._windowTreasureResult = window;
    SceneManager._scene.addChild(window);
    SoundManager.playShop();
  });
  PluginManager.registerCommand(
    pluginName,
    "HideTreasureResult",
    function (args) {
      var window = SceneManager._scene._windowTreasureResult;
      SceneManager._scene.removeChild(window);
    }
  );
  /* const _Scene_Map_update = Scene_Map.prototype.update;
     Scene_Map.prototype.update = function() {
         if (this._windowTreasureResult) {
             this._windowTreasureResult.update();
             if (Input.isTriggered('cancel') ||  Input.isTriggered('ok') || TouchInput.isTriggered()) {
                 this.removeChild(this._windowTreasureResult);
                 this._windowTreasureResult = null;
                 SoundManager.playCancel();
                 Input.clear();
             }
             return;
         }
         _Scene_Map_update.call(this);
         
     };*/
  var Scene_Treasure = /** @class */ (function (_super) {
    __extends(Scene_Treasure, _super);
    function Scene_Treasure() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Treasure.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.createTreasureWindow();
      this.createConfirmWindow();
      this.createRank10();
    };
    Scene_Treasure.prototype.start = function () {
      _super.prototype.start.call(this);
      this.initConfirmText();
      this._confirmWindow.show();
      this._confirmWindow.y = 500;
      this._confirmWindow.activate();
      $gameSwitches.setValue(44, true);
    };
    Scene_Treasure.prototype.terminate = function () {
      _super.prototype.terminate.call(this);
      $gameSwitches.setValue(44, false);
    };
    Scene_Treasure.prototype.initConfirmText = function () {
      if (this._currentWeapon) {
        if (this._newWeapon.rank() > this._currentWeapon.rank()) {
          this._confirmWindow.setTexts([
            TextManager.treasureConfirm,
            TextManager.treasureUpperGrade,
          ]);
          this._confirmWindow.select(0);
        } else if (this._newWeapon.rank() < this._currentWeapon.rank()) {
          this._confirmWindow.setTexts([TextManager.treasureConfirm]);
          this._confirmWindow.select(1);
        } else {
          this._confirmWindow.setTexts([
            TextManager.treasureConfirm,
            TextManager.treasureSameGrade,
          ]);
        }
      }
      if (this._currentArmor) {
        if (this._newArmor.rank() > this._currentArmor.rank()) {
          this._confirmWindow.setTexts([
            TextManager.treasureConfirm,
            TextManager.treasureUpperGrade,
          ]);
          this._confirmWindow.select(0);
        } else if (this._newArmor.rank() < this._currentArmor.rank()) {
          this._confirmWindow.setTexts([TextManager.treasureConfirm]);
          this._confirmWindow.select(1);
        } else {
          this._confirmWindow.setTexts([
            TextManager.treasureConfirm,
            TextManager.treasureSameGrade,
          ]);
        }
      }
    };
    Scene_Treasure.prototype.createTreasureWindow = function () {
      this._currentEquipWindow = new Nore.Window_Treasure2(350, 160, true);
      this.addWindow(this._currentEquipWindow);
      this._treasureWindow = new Nore.Window_Treasure2(650, 160, true);
      this.addWindow(this._treasureWindow);
      if ($gameSystem.isRank10Open()) {
        var last = $gameVariables.value(56);
        $gameVariables.setValue(56, last + newEquip.rank());
      }
      if (newEquip.isArmor()) {
        this._currentArmor = beforeArmor;
        this._newArmor = newEquip;
        if (this._currentArmor) {
          if (this._currentArmor.isSame(this._newArmor)) {
            this._newArmor.setLv(this._currentArmor.lv());
          }
          this._currentEquipWindow.setArmor(this._currentArmor, null);
        }
        this._treasureWindow.setArmor(this._newArmor, this._currentArmor);
      } else {
        this._currentWeapon = beforeWeapon;
        this._newWeapon = newEquip;
        if (this._currentWeapon) {
          if (this._currentWeapon.isSame(this._newWeapon)) {
            this._newWeapon.setLv(this._currentWeapon.lv());
          }
          this._currentEquipWindow.setWeapon(this._currentWeapon, null);
        }
        this._treasureWindow.setWeapon(this._newWeapon, this._currentWeapon);
      }
    };
    Scene_Treasure.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
      this._msgWindow = new Nore.Window_Msg(120);
      this._msgWindow.setHandler("ok", this.onMsgOk.bind(this));
      this._msgWindow.deactivate();
      this.addChild(this._msgWindow);
      this._msgWindow.hide();
    };
    Scene_Treasure.prototype.onConfirmOk = function () {
      if (this._inConfirm2) {
        if (this._newArmor) {
          $gameActors.actor(4).setArmor(this._newArmor);
        } else {
          $gameActors.actor(4).setWeapon(1, this._newWeapon);
        }
        this._confirmWindow.hide();
        this.gainGold();
        SoundManager.playShop();
        var equip = this._currentWeapon || this._currentArmor;
        this._msgWindow.setText(
          TextManager.treasureSell2.format(equip.sellPrice())
        );
        this._msgWindow.show();
        this._msgWindow.y = 550;
        this._msgWindow.activate();
      } else {
        this._confirmWindow.setTexts(TextManager.treasureSell);
        if (this.isLower()) {
          this._confirmWindow.setTexts(TextManager.treasureLowerGrade);
          this._confirmWindow.select(1);
        }
        this._inConfirm2 = true;
        this._confirmWindow.show();
        this._confirmWindow.y = 500;
        this._confirmWindow.activate();
      }
    };
    Scene_Treasure.prototype.onMsgOk = function () {
      this.popScene();
    };
    Scene_Treasure.prototype.isLower = function () {
      if (this._currentWeapon) {
        if (this._newWeapon.rank() < this._currentWeapon.rank()) {
          return true;
        }
      }
      if (this._currentArmor) {
        if (this._newArmor.rank() < this._currentArmor.rank()) {
          return true;
        }
      }
      return false;
    };
    Scene_Treasure.prototype.onConfirmCancel = function () {
      if (this._inConfirm2 && !this.isLower()) {
        this._inConfirm2 = false;
        this.initConfirmText();
        this._confirmWindow.show();
        this._confirmWindow.y = 500;
        this._confirmWindow.activate();
      } else {
        this._confirmWindow.hide();
        SoundManager.playShop();
        var equip = this._newWeapon || this._newArmor;
        this._msgWindow.setText(
          TextManager.treasureSell3.format(equip.sellPrice())
        );
        this._msgWindow.show();
        this._msgWindow.y = 550;
        this._msgWindow.activate();
        $gameParty.gainGold(equip.sellPrice());
      }
    };
    Scene_Treasure.prototype.gainGold = function () {
      var equip = this._currentWeapon || this._currentArmor;
      $gameParty.gainGold(equip.sellPrice());
    };
    Scene_Treasure.prototype.createRank10 = function () {
      if (!$gameSystem.isRank10Open()) {
        return;
      }
      var bar = new Nore.Rank10Bar();
      this.addChild(bar);
    };
    return Scene_Treasure;
  })(Scene_MenuBase);
  Nore.Scene_Treasure = Scene_Treasure;
})(Nore || (Nore = {}));
var Window_TreasureResult = /** @class */ (function (_super) {
  __extends(Window_TreasureResult, _super);
  function Window_TreasureResult(r) {
    var _this = _super.call(this, r) || this;
    _this.refresh();
    _this.activate();
    _this.frameVisible = false;
    _this.backOpacity = 0;
    return _this;
  }
  Window_TreasureResult.prototype._createAllParts = function () {
    this._createContainer();
    this.refreshBg();
    this._createBackSprite();
    this._createFrameSprite();
    this._createClientArea();
    this._createContentsBackSprite();
    this._createCursorSprite();
    this._createContentsSprite();
    this._createArrowSprites();
    this._createPauseSignSprites();
  };
  Window_TreasureResult.prototype.refresh = function () {
    _super.prototype.refresh.call(this);
  };
  Window_TreasureResult.prototype.refreshBg = function () {
    var baseTexture = Nore.getSystemBaseTexture("menu2");
    var texture = new PIXI.Texture(
      baseTexture,
      new Rectangle(271, 613, 400, 500)
    );
    var sprite = new PIXI.Sprite(texture);
    sprite.x = -50;
    sprite.y = -120;
    this._container.addChild(sprite);
  };
  Window_TreasureResult.prototype.drawItem = function (index) {
    var treasure = $gameSystem.treasureList()[index];
    var rect = this.itemRect(index);
    if (treasure.type() == TreasureType.MONEY) {
      this.contents.fontSize = 20;
      this.drawIcon(treasure.icon(), rect.x + 13, rect.y + 1);
      this.contents.outlineWidth = 5;
      this.drawText(
        treasure.value() + "",
        rect.x + 1,
        rect.y + 23,
        56,
        "center"
      );
    } else {
      this.drawItemBg(index);
      this.drawIcon(treasure.icon(), rect.x + 14, rect.y + 12);
    }
  };
  Window_TreasureResult.prototype.drawItemBg = function (index) {
    var image = ImageManager.loadSystem("menu2");
    var rect = this.itemRect(index);
    this.contents.blt(image, 0, 911, 60, 60, rect.x + 1, rect.y + 1);
    //this._windowContentsSprite.addChild(sprite);
  };
  /*
    itemRect(index: number): Rectangle {
        const rect = super.itemRect(index);
        rect.x += 60;
        rect.y += 140;
        return rect;
    }
    */
  Window_TreasureResult.prototype.itemWidth = function () {
    return 70;
  };
  Window_TreasureResult.prototype.maxItems = function () {
    return $gameSystem.treasureList().length;
  };
  Window_TreasureResult.prototype.maxCols = function () {
    return 4;
    //return this.width > 300 ? 8 : 4;
  };
  Window_TreasureResult.prototype.itemHeight = function () {
    return 70;
  };
  Window_TreasureResult.prototype.maxPageRows = function () {
    return 4;
  };
  Window_TreasureResult.prototype.drawItemBackground = function (index) {};
  return Window_TreasureResult;
})(Window_Selectable);
var Input_isTriggered = Input.isTriggered;
Input.isTriggered = function (keyName) {
  if ($gameSwitches.value(130) && keyName == "ok") {
    return true;
  }
  return Input_isTriggered.call(this, keyName);
};
