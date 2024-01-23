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
 * @text コマンド表示
 * @des コマンド表示
 *
 * @command Hide
 * @text コマンド非表示
 * @des コマンド非表示
 *
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Battle";
  PluginManager.registerCommand(pluginName, "Show", function (args) {
    $gameTemp.updateBattleCommand(true);
  });
  PluginManager.registerCommand(pluginName, "Hide", function (args) {
    $gameTemp.updateBattleCommand(false);
  });
  var _Scene_Map_prototype_createDisplayObjects =
    Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function () {
    _Scene_Map_prototype_createDisplayObjects.call(this);
    this.createBattleUi();
  };
  Scene_Map.prototype.createBattleUi = function () {
    var xx = 422;
    var battleUi = new Window_BattleUi(new Rectangle(xx, 559, 434, 240));
    this._battleUi = battleUi;
    this._battleUi.setHandler("attack", function () {
      if ($gameSwitches.value(161)) {
        $gameTemp.bufferedInput = true;
      } else {
        $gameSwitches.setValue(161, true);
        battleUi.activate();
      }
    });
    this._battleUi.setHandler("skill", function () {
      if ($gameSwitches.value(162)) {
        return;
      }
      var actor = $gameActors.actor(4);
      actor.gainMp(-1);
      $gameSwitches.setValue(162, true);
      battleUi.refresh();
    });
    this._battleUi.setHandler("item", function () {
      $gameParty.loseItem($dataItems[31], 1);
      $gameSwitches.setValue(163, true);
      battleUi.refresh();
    });
    this.addWindow(battleUi);
  };
  var Window_BattleUi = /** @class */ (function (_super) {
    __extends(Window_BattleUi, _super);
    function Window_BattleUi(r) {
      var _this = _super.call(this, r) || this;
      _this.visible = false;
      _this.frameVisible = false;
      _this.backOpacity = 0;
      _this.refreshBg();
      return _this;
    }
    Window_BattleUi.prototype.refreshBg = function () {
      this._contentsBackSprite.removeChildren();
      var baseTexture = Nore.getSystemBaseTexture("ui2");
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 240, 450, 220)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -0;
      sprite.y = -0;
      this._contentsBackSprite.addChild(sprite);
    };
    Window_BattleUi.prototype.update = function () {
      _super.prototype.update.call(this);
      this.visible = $gameTemp.isBattleCommand();
      if (!this.visible) {
        return;
      }
      if (this.visible) {
        if (this._wait > 0) {
          this._wait--;
          if (this._wait == 0) {
            this._pressed = false;
            this.redraw();
          }
        }
        if ($gameSwitches.value(161)) {
          return;
        } else if ($gameSwitches.value(162)) {
          return;
        } else if ($gameSwitches.value(163)) {
          return;
        } else if ($gameTemp.bufferedInput) {
          $gameTemp.bufferedInput = false;
          this.callHandler("attack");
          return;
        }
        this.updateMouse();
        if (!this.active) {
          this.activate();
        }
      } else {
        if (this.active) {
          this.deactivate();
        }
      }
    };
    Window_BattleUi.prototype.updateMouse = function () {
      if (TouchInput.rightButton) {
        if (this.isCurrentItemEnabled()) {
          if (this.index() != 0) {
            this.select(0);
          }
          this.callOkHandler();
        }
      }
    };
    Window_BattleUi.prototype.select = function (index) {
      _super.prototype.select.call(this, index);
      this.redraw();
    };
    Window_BattleUi.prototype.redraw = function () {
      if (this._list) {
        this._windowContentsSprite.destroyAndRemoveChildren();
        this.drawAllItems();
      }
    };
    Window_BattleUi.prototype.itemRect = function (index) {
      var rect = new Rectangle(0, 0, 400, 53);
      rect.y = 20 + index * 53;
      return rect;
    };
    Window_BattleUi.prototype.drawItem = function (index) {
      var bitmap;
      if (ConfigManager.en) {
        bitmap = ImageManager.loadSystem("battleButton_en");
      } else {
        bitmap = ImageManager.loadSystem("battleButton");
      }
      var baseTexture = new PIXI.BaseTexture(bitmap._image);
      var xx = 0;
      var ww = 343;
      if (this.index() == index) {
        xx = ww;
        if (this._pressed) {
          xx = ww * 2;
        } else if (!this._list[index].enabled) {
          xx = ww * 4;
        }
      } else if (!this._list[index].enabled) {
        xx = ww * 3;
      }
      var hh = 53;
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(xx, index * hh, ww, hh)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 47;
      sprite.y = index * 52 + 31;
      this._windowContentsSprite.addChild(sprite);
      var actor = $gameActors.actor(4);
      var offset = ConfigManager.en ? 43 : 0;
      var numX = 264 + offset;
      if (index == 1) {
        if (this.index() == index) {
          if (this._pressed || actor.mp > 0) {
            this.drawNumber(actor.mp, numX, 75, 100, "left", 4);
          }
        } else if (actor.mp > 0) {
          this.drawNumber(actor.mp, numX, 75, 100, "left", 5);
        }
      }
      var item = $dataItems[31];
      if (index == 2) {
        var num = $gameParty.numItems(item);
        if (this.index() == index) {
          if (this._pressed || num > 0) {
            this.drawNumber(num, numX, 75 + 53, 100, "left", 4);
          }
        } else if (num > 0) {
          this.drawNumber(
            $gameParty.numItems(item),
            numX,
            75 + 53,
            100,
            "left",
            5
          );
        }
      }
    };
    Window_BattleUi.prototype.isOkTriggered = function () {
      if (this.index() == 0) {
        if (Input.isRepeated("ok")) {
          return true;
        }
        if (Nore.isBattleSkipKey() && Input.isPressed("ok")) {
          return true;
        }
      } else {
        return Input.isTriggered("ok");
      }
      return false;
    };
    Window_BattleUi.prototype.makeCommandList = function () {
      var actor = $gameActors.actor(4);
      var item = $dataItems[31];
      var skill = $dataSkills[81];
      this.addCommand(TextManager.attack, "attack", true);
      this.addCommand(skill.name + " ×" + actor.mp, "skill", actor.mp > 0);
      this.addCommand(
        item.name + " ×" + $gameParty.numItems(item),
        "item",
        $gameParty.numItems(item) > 0
      );
    };
    Window_BattleUi.prototype._updateCursor = function () {
      this._cursorSprite.visible = false;
    };
    Window_BattleUi.prototype.callOkHandler = function () {
      _super.prototype.callOkHandler.call(this);
      this._pressed = true;
      this.redraw();
      this._wait = 10;
    };
    Window_BattleUi.prototype.activate = function () {
      if (this.active) {
        return;
      }
      Window_Scrollable.prototype.activate.call(this);
      this.reselect();
    };
    return Window_BattleUi;
  })(Window_Command);
  function isBattleSkipKey() {
    if (Input.isPressed("control") || Input.isPressed("shift")) {
      return true;
    }
    if (TouchInput.rightButton && TouchInput._mousePressed) {
      return true;
    }
    return false;
  }
  Nore.isBattleSkipKey = isBattleSkipKey;
})(Nore || (Nore = {}));
