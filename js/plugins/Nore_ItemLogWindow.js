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
 */
var Nore;
(function (Nore) {
  var ItemLogWindow;
  (function (ItemLogWindow) {
    /*
    const Window_prototype__createContentsSprite = Window.prototype._createContentsSprite;
    Window.prototype._createContentsSprite = function() {
        Window_prototype__createContentsSprite.call(this);
        this._windowContentsSprite = new Sprite();
        this.addChild(this._windowContentsSprite)
    
    };*/
    var pluginName = "Nore_ItemLogWindow";
    PluginManager.registerCommand(pluginName, "Show", function (args) {
      var id = args.id;
      $gameTemp.addSkillLog($dataSkills[id]);
    });
    Window_Base.prototype.addIcon = function (iconIndex, x, y) {
      var baseTexture = PIXI.utils.BaseTextureCache["system/IconSet"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("IconSet");
        baseTexture = new PIXI.BaseTexture(
          bitmap._image,
          PIXI.settings.SCALE_MODE
        );
        baseTexture.imageUrl = "system/IconSet";
        PIXI.utils.BaseTextureCache["system/IconSet"] = baseTexture;
      }
      var pw = ImageManager.iconWidth;
      var ph = ImageManager.iconHeight;
      var sx = (iconIndex % 16) * pw;
      var sy = Math.floor(iconIndex / 16) * ph;
      var texture = new PIXI.Texture(baseTexture);
      texture.frame = new PIXI.Rectangle(sx, sy, pw, ph);
      var sprite = new PIXI.Sprite(texture);
      sprite.position.x = x;
      sprite.position.y = y;
      this._windowContentsSprite.addChild(sprite);
    };
    var Window_ItemLog = /** @class */ (function (_super) {
      __extends(Window_ItemLog, _super);
      function Window_ItemLog(item, yIndex, callback, yPlus) {
        if (yPlus === void 0) {
          yPlus = 0;
        }
        var _this =
          _super.call(
            this,
            new Rectangle(
              0,
              yIndex * 80 + 4 + yPlus,
              Graphics.boxWidth - 380,
              90
            )
          ) || this;
        _this.padding = 3;
        _this._updateContents();
        _this._item = item;
        _this.yIndex = yIndex;
        _this.callback = callback;
        //this._contentsBackSprite.setFrame(0, 30, Graphics.boxWidth, 90 - 53)
        //this._contentsBackSprite.y = 28;
        _this.backOpacity = 255;
        _this.opacity = 0;
        _this.contentsOpacity = 0;
        _this.refresh();
        _this.appearFrame = 12;
        _this.waitFrame = 120;
        _this.eraseFrame = 30;
        _this.frameVisible = false;
        var self = _this;
        return _this;
        /*self.off('removed');
        
                this.on('removed', function () {
                    Saba.putContentsCache(self.contents, self.contents.width, self.contents.height);
                    self.destroyAndRemoveChildren();
                    self.off('removed');
                });*/
      }
      Window_ItemLog.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem("Window2");
      };
      /*_refreshBack() {
                var m = this.margin;
                if (this._windowskin.height > 192) {
                    m += 2;
                }
                var w = this.width - m * 2;
                var h = this.height - m * 2 - 53;
                this._contentsBackSprite.setFrame(0, 30, w, 90 - 53);
                this._contentsBackSprite.move(m, m);
        
                //this._contentsBackSprite._toneFilter = new ToneFilter();
        
                if (w > 0 && h > 0 && this._windowskin) {
                    this._contentsBackSprite.destroyAndRemoveChildren();
                    var baseTexture = this.getBaseTexture();
        
                    if (this._windowskin.height <= 192) {
        
                        var p = 96;
                        var texture = new PIXI.Texture(baseTexture);
                        texture.frame = new PIXI.Rectangle(0, 0, p, p);
                        var backSprite = new PIXI.Sprite(texture);
                        backSprite.y = 30;
                        backSprite.width = w;
                        backSprite.height = h;
                        this._contentsBackSprite.addChild(backSprite);
                        // bitmap.blt(this._windowskin, 0, 0, p, p, 0, 0, w, h);
        
                        var tileTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, p, p, p));
                        var tilingSprite = new PIXI.extras.TilingSprite(tileTexture, w, h);
                        tilingSprite.y = 30;
                        this._contentsBackSprite.addChild(tilingSprite);
        
                        var tone = this._colorTone;
                        this._contentsBackSprite._toneFilter.reset();
                        this._contentsBackSprite._toneFilter.adjustTone(tone[0], tone[1], tone[2]);
                    }
                }
            }*/
      Window_ItemLog.prototype.refresh = function () {
        this.contents.clear();
        var item = this._item;
        var xx = 40;
        var yy = 30;
        this.contents.textColor = "#ff88aa";
        this.contents.fontSize = 24;
        var name = item.name;
        if (item.exp2) {
          this.contents.drawText("経験値ゲット‼︎", xx - 20, 0, 300, 30, "left");
          AudioManager.playSe({
            name: "Item2",
            volume: 80,
            pitch: 100,
            pan: 0,
          });
        } else if (item.ero) {
          this.contents.drawText("淫欲Ｐゲット‼︎", xx - 20, 0, 300, 30, "left");
          AudioManager.playSe({
            name: "Item2",
            volume: 80,
            pitch: 100,
            pan: 0,
          });
        } else if (item.id == 12) {
          name = $gameVariables.value(20) + " EXP";
          this.contents.drawText(
            "宝箱経験値ゲット‼︎",
            xx - 20,
            0,
            300,
            30,
            "left"
          );
          AudioManager.playSe({
            name: "Chime2",
            volume: 90,
            pitch: 100,
            pan: 0,
          });
        } else if (item.weaponId) {
          var weapon = $dataWeapons[item.weaponId];
          var weaponName = weapon.name;
          if (!weapon.identified) {
            switch (weapon.wtypeId) {
              case 2:
                name = "？剣";
                break;
              case 1:
                name = "？爪";
                break;
              case 7:
                name = "？弓";
                break;
              case 3:
                name = "？杖";
                break;
              default:
                name = weapon.name;
                break;
            }
          } else if (item.plus > 0) {
            name = weapon.name + " +" + item.plus;
          } else {
            name = weapon.name;
          }
          item = weapon;
          this.contents.drawText("武器ゲット‼︎", xx - 20, 0, 300, 30, "left");
          if (weapon.wtypeId == 2) {
            AudioManager.playSe({
              name: "Sword5",
              volume: 80,
              pitch: 100,
              pan: 0,
            });
          } else {
            AudioManager.playSe({
              name: "put2",
              volume: 85,
              pitch: 100,
              pan: 0,
            });
          }
        } else if (item.etypeId > 0) {
          if (item.atypeId == 9) {
            AudioManager.playSe({
              name: "put2",
              volume: 80,
              pitch: 100,
              pan: 0,
            });
            this.contents.drawText("性技能獲得‼︎", xx - 20, 0, 300, 30, "left");
          } else if (item.atypeId == 10) {
            AudioManager.playSe({
              name: "put2",
              volume: 80,
              pitch: 100,
              pan: 0,
            });
            this.contents.drawText("性癖ゲット‼︎", xx - 20, 0, 300, 30, "left");
          } else {
            AudioManager.playSe({
              name: "put2",
              volume: 80,
              pitch: 100,
              pan: 0,
            });
            this.contents.drawText("防具ゲット‼︎", xx - 20, 0, 300, 30, "left");
          }
        } else {
          if (item.id == 11 || item.id == 19) {
            name = $gameVariables.value(20) + " Ｇ";
            this.contents.drawText("お金ゲット‼︎", xx - 20, 0, 300, 30, "left");
          } else {
            this.contents.drawText(
              "アイテムゲット‼︎",
              xx - 20,
              5,
              300,
              30,
              "left"
            );
          }
        }
        this.contents.textColor = "#ffffff";
        this.contents.fontSize = 30;
        this.drawIcon(item.iconIndex, 2 + xx, 1 + yy);
        this.drawTextEx(name, 43 + xx, 1 + yy, 280);
        var text = item.description;
        if (item.meta && item.meta.get) {
          text = item.meta.get;
        }
        this.drawTextEx(text, 273 + xx, 1 + yy, 600);
      };
      Window_ItemLog.prototype.update = function () {
        _super.prototype.update.call(this);
        this.appearFrame--;
        if (this.appearFrame > 0) {
          this.opacity += 25;
          this.contentsOpacity += 25;
          return;
        }
        this.waitFrame--;
        if (this.waitFrame > 0) {
          return;
        }
        this.eraseFrame--;
        this.opacity -= 25;
        this.contentsOpacity -= 25;
        this.y -= 3;
        if (this.eraseFrame === 0) {
          this.callback();
        }
      };
      return Window_ItemLog;
    })(Window_Base);
    var Window_ActorLog = /** @class */ (function (_super) {
      __extends(Window_ActorLog, _super);
      function Window_ActorLog(list, callback) {
        var _this =
          _super.call(
            this,
            new Rectangle(0, 4 + 0, Graphics.boxWidth - 380, 95)
          ) || this;
        _this.padding = 3;
        _this._updateContents();
        _this._actor = list[0];
        _this.before = list[1];
        _this.after = list[2];
        _this.callback = callback;
        _this.backOpacity = 255;
        _this.opacity = 0;
        _this.contentsOpacity = 0;
        _this.refresh();
        _this.appearFrame = 12;
        _this.waitFrame = 220;
        _this.eraseFrame = 30;
        _this.frameVisible = false;
        var self = _this;
        AudioManager.playSe({
          name: "Chime2",
          volume: 100,
          pitch: 100,
          pan: 0,
        });
        return _this;
      }
      Window_ActorLog.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem("Window");
      };
      Window_ActorLog.prototype.refresh = function () {
        this.contents.clear();
        var xx = 40;
        var yy = 30;
        this.contents.textColor = "#ffaadd";
        this.contents.fontSize = 24;
        var name = this._actor.name();
        //p(this.before)
        if (this.before == 0) {
          this.contents.drawText(
            TextManager.acquaintance,
            xx - 20,
            10,
            500,
            30,
            "left"
          );
          this.contents.textColor = "#ff88aa";
          this.contents.drawText(name, xx, 40, 230, 30, "left");
          this.contents.textColor = "#ffffff";
          var desc = $gameSystem.intimacy(this._actor.actorId()).findText();
          this.contents.drawText(desc, xx + 230, 40, 500, 30, "left");
        } else {
          this.contents.drawText(
            TextManager.plusIntimacy,
            xx - 20,
            0,
            500,
            30,
            "left"
          );
          this.contents.textColor = "#ff88aa";
          this.contents.drawText(name, xx, 30, 230, 30, "left");
          var desc = "\\I[404]" + this.before + "→" + this.after;
          this.drawTextEx(desc, xx + 230, 30, 500);
        }
        this.contents.textColor = "#ffffff";
        this.contents.fontSize = 30;
        //this.drawIcon(item.iconIndex, 2 + xx, 1 + yy);
        //this.drawTextEx(text, 3 + xx, 1 + yy, 600);
      };
      Window_ActorLog.prototype.update = function () {
        _super.prototype.update.call(this);
        this.appearFrame--;
        if (this.appearFrame > 0) {
          this.opacity += 25;
          this.contentsOpacity += 25;
          return;
        }
        this.waitFrame--;
        if (this.waitFrame > 0) {
          return;
        }
        this.eraseFrame--;
        this.opacity -= 25;
        this.contentsOpacity -= 25;
        this.y -= 3;
        if (this.eraseFrame === 0) {
          this.callback();
        }
      };
      return Window_ActorLog;
    })(Window_Base);
    /*
        class Window_EroLog extends Window_Base {
            _item: RPG.BaseItem;
            yIndex: number;
            eraseFrame: number;
            waitFrame: number;
            appearFrame: number;
            callback: Function;
            constructor(type: number, value: number, lastLv: number, lv: number, yIndex: number, callback) {
                super(new Rectangle(0, yIndex * 80 + 4, Graphics.boxWidth, 100));
                this.margin = 0;
                this.padding = 0;
                this._updateContents();
                this._type = type;
                this._value = value;
                this.lastLv = lastLv;
                this.lv = lv;
                this.yIndex = yIndex;
                this.callback = callback;
                this._windowFrameSprite.visible = false;
                this._contentsBackSprite.setFrame(0, 30, Graphics.boxWidth, 90 - 53)
                this._contentsBackSprite.y = 28;
                this.backOpacity = 255;
                this.opacity = 0;
                this.contentsOpacity = 0;
                this.refresh();
                this.appearFrame = 12;
                this.waitFrame = 220;
                this.eraseFrame = 30;
                var self = this;
                self.off('removed');
                this.on('removed', function () {
                    Saba.putContentsCache(self.contents, self.contents.width, self.contents.height);
                    self.destroyAndRemoveChildren();
                })
            }
            createContents() {
                var w = this.contentsWidth();
                var h = this.contentsHeight();
                if (this.contents != null && this.contents.width == w && this.contents.height == h) {
                    this.contents.clear();
                    return;
                }
                var c = Saba.getContentsCache(w, h);
                if (c) {
                    this.contents = c;
                } else {
                    this.contents = new Bitmap(w, h);
                }
                this.resetFontSettings();
                this.contents.setClearHandler(this.onClearContents.bind(this));
                this.contents.clear();
            }
            refresh(): void {
                AudioManager.playSe({ name: 'Chime2', volume: 90, pitch: 100, pan: 0 });
                
                this.contents.clear();
                var item = this._item;
                var xx = 40;
                var yy = 30;
                this.contents.textColor = '#ff88aa';
                this.contents.fontSize = 24;
                var text;
                var icon = 84;
                switch(this._type) {
                case 0: text = '淫LVゲージアップ!!'; break;
                case 1: text = 'おまんこガバ具合アップ!!'; break;
                case 2: text = 'アナル感度アップ!!'; break;
                case 3: text = 'Ｈの名声アップ!!'; icon=156; break;
                case 4: text = '従順度アップ!!'; icon = 100; break;
                case 6: text = '中出し回数アップ!!'; break;
                case 7: text = '経験人数アップ!!'; break;
                case 8: text = '転送装置の予算アップ!!'; icon = 1602; break;
                case 20: text = '屈服度アップ!!'; icon = 100; break;
                case 30: text = '穢れ度アップ!!'; break;
                case 50: text = 'ゲラルドへの愛情度アップ!!'; break;
                }
                this.contents.drawText(text, xx - 20, 0, 300, 30, 'left');
                
                this.contents.textColor = '#ffffff';
                this.contents.fontSize = 30;
                this.drawIcon(icon, 2 + xx, 1 + yy);
                
                if (this._type === 8) {
                    text = this._value + 'ポイントアップ!!  ';
                }
                else if (this._type === 6) {
                    text = this._value + '回アップ!!  ';
                }
                else if (this._type === 7) {
                    text = this._value + '人アップ!!  ';
                } else {
                    text = this._value + 'ポイントアップ!!  ';
                }
                if (this.lastLv) {
                    switch(this._type) {
                    case 0: text += '感度アップ!!'; break;
                    case 1: text += 'おまんこガバ具合LVアップ!!'; break;
                    case 2: text += 'アナル感度アップ!!'; break;
                    case 3: text += 'Ｈの名声LVアップ!!'; break;
                    case 4: text += '従順度LVアップ!!'; break;
                    case 20: text += '屈服度LVアップ!!'; break;
                    case 50: text += 'ゲラルドへの愛情度LVアップ!!'; break;
                    }
                    
                    text += ' \\C[0]Lv \\C[2]' + this.lastLv + ' \\C[0]→\\C[2] ' + this.lv;
                }
                this.drawTextEx(text, 43 + xx, 1 + yy);
            }
            loadWindowskin(): void {
                this.windowskin = ImageManager.loadSystem('Window');
            }
            _refreshBack() {
                var m = this._margin;
                if (this._windowskin.height > 192) {
                    m += 2;
                }
                var w = this._width - m * 2;
                var h = this._height - m * 2 - 53;
                this._contentsBackSprite.setFrame(0, 30, w, 90 - 53);
                this._contentsBackSprite.move(m, m);
        
                this._contentsBackSprite._toneFilter = new ToneFilter();
        
                if (w > 0 && h > 0 && this._windowskin) {
                    this._contentsBackSprite.destroyAndRemoveChildren();
                    var baseTexture = this.getBaseTexture();
        
                    if (this._windowskin.height <= 192) {
        
                        var p = 96;
                        var texture = new PIXI.Texture(baseTexture);
                        texture.frame = new PIXI.Rectangle(0, 0, p, p);
                        var backSprite = new PIXI.Sprite(texture);
                        backSprite.y = 30;
                        backSprite.width = w;
                        backSprite.height = h;
                        this._contentsBackSprite.addChild(backSprite);
                        // bitmap.blt(this._windowskin, 0, 0, p, p, 0, 0, w, h);
        
                        var tileTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, p, p, p));
                        var tilingSprite = new PIXI.extras.TilingSprite(tileTexture, w, h);
                        tilingSprite.y = 30;
                        this._contentsBackSprite.addChild(tilingSprite);
        
                        var tone = this._colorTone;
                        this._contentsBackSprite._toneFilter.reset();
                        this._contentsBackSprite._toneFilter.adjustTone(tone[0], tone[1], tone[2]);
                    }
                }
            }
            update(): void {
                super.update();
                
                this.appearFrame--;
                if (this.appearFrame > 0) {
                    this.opacity += 25;
                    this.contentsOpacity += 25;
                    return;
                }
                
                
                this.waitFrame--;
                if (this.waitFrame > 0) {
                    return;
                }
                this.eraseFrame--;
                this.opacity -= 25;
                this.contentsOpacity -= 25;
                this.y -= 3;
                if (this.eraseFrame === 0) {
                    this.callback();
                }
            }
        }
        */
    Game_Temp.prototype.addSkillLog = function (skill) {
      this._skillLog = this._skillLog || [];
      this._skillLog.push(skill);
    };
    Game_Temp.prototype.addEroLog = function (item) {
      if ($gameSwitches.value(999)) {
        // 回想中
        return;
      }
      this._eroLog = this._eroLog || [];
      this._eroLog.push(item);
    };
    Game_Temp.prototype.nextSkillLog = function () {
      this._skillLog = this._skillLog || [];
      if (this._skillLog.length === 0) {
        return null;
      }
      return this._skillLog.shift();
    };
    Game_Temp.prototype.addActorLog = function (actor, before, after) {
      if ($gameSwitches.value(999)) {
        // 回想中
        return;
      }
      if (before == after) {
        return;
      }
      this._actorLog = this._actorLog || [];
      this._actorLog.push([actor, before, after]);
    };
    Game_Temp.prototype.nextActorLog = function () {
      this._actorLog = this._actorLog || [];
      if (this._actorLog.length === 0) {
        return null;
      }
      return this._actorLog.shift();
    };
    Game_Temp.prototype.nextEroLog = function () {
      this._eroLog = this._eroLog || [];
      if (this._eroLog.length === 0) {
        return null;
      }
      return this._eroLog.shift();
    };
    Game_Temp.prototype.addItemLog = function (item) {
      if ($gameSwitches.value(999)) {
        // 回想中
        return;
      }
      this._itemLog = this._itemLog || [];
      this._itemLog.push(item);
    };
    Game_Temp.prototype.nextItemLog = function () {
      this._itemLog = this._itemLog || [];
      if (this._itemLog.length === 0) {
        return null;
      }
      return this._itemLog.shift();
    };
    var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
    Scene_Map.prototype.updateMain = function () {
      _Scene_Map_updateMain.call(this);
      if (this._waitLog > 0) {
        this._waitLog--;
        return;
      }
      var window;
      var logItem = $gameTemp.nextItemLog();
      if (logItem) {
        this._logWindowList = this._logWindowList || [];
        var yIndex = this.getLogWindowY();
        var yPlus = 0;
        if (SceneManager._scene._spriteset) {
          if (SceneManager._scene._spriteset._medalUpdateSprite) {
            yPlus =
              SceneManager._scene._spriteset._medalUpdateSprite.getBottom();
          }
        }
        var onFinish = function () {
          //window.returnCanvas();
          self._windowLayer.removeChild(window);
          self._logWindowList.splice(self._logWindowList.indexOf(window), 1);
          window.destroy({ texture: true, children: true });
        };
        window = new Window_ItemLog(logItem, yIndex, onFinish, yPlus);
        this._logWindowList.push(window);
        this.addWindow(window);
        var self = this;
      } else {
        /* var logItem = $gameTemp.nextEroLog();
                 if (logItem) {
                     this._logWindowList = this._logWindowList || [];
                     var yIndex = this.getLogWindowY();
                     window = new Window_EroLog(logItem[0], logItem[1], logItem[2], logItem[3], yIndex, onFinish2);
                     this._logWindowList.push(window);
                     this.addWindow(window);
                     var self = this;
                     function onFinish2() {
                         //window.returnCanvas();
                         self._windowLayer.removeChild(window);
                         self._logWindowList.splice(self._logWindowList.indexOf(window), 1);
                         window.destroy({texture: true, children: true});
                     };
                     this._waitLog = 40;
                 }*/
      }
      var actor = $gameTemp.nextActorLog();
      if (actor) {
        this._logWindowList = this._logWindowList || [];
        var yIndex = this.getLogWindowY();
        var yPlus = 0;
        if (SceneManager._scene._spriteset) {
          if (SceneManager._scene._spriteset._medalUpdateSprite) {
            yPlus =
              SceneManager._scene._spriteset._medalUpdateSprite.getBottom();
          }
        }
        var onFinish = function () {
          //window.returnCanvas();
          self._windowLayer.removeChild(window);
          self._logWindowList.splice(self._logWindowList.indexOf(window), 1);
          window.destroy({ texture: true, children: true });
        };
        window = new Window_ActorLog(actor, onFinish);
        this._logWindowList.push(window);
        this.addWindow(window);
        var self = this;
      }
    };
    Scene_Map.prototype.hideAllItemLogs = function () {
      this._logWindowList = this._logWindowList || [];
      for (var _i = 0, _a = this._logWindowList; _i < _a.length; _i++) {
        var window_1 = _a[_i];
        window_1.hide();
      }
      for (var _b = 0, _c = this._windowLayer.children; _b < _c.length; _b++) {
        var child = _c[_b];
        if (child instanceof Nore.Window_GaugeProgress) {
          child.hide();
        }
        if (child instanceof Nore.Window_Seiheki) {
          child.hide();
        }
      }
    };
    Scene_Map.prototype.getLogWindowY = function () {
      for (var i = 0; i < 6; i++) {
        var found = false;
        for (var _i = 0, _a = this._logWindowList; _i < _a.length; _i++) {
          var log = _a[_i];
          if (log.yIndex === i) {
            found = true;
            break;
          }
        }
        if (!found) {
          return i;
        }
      }
      return 0;
    };
  })(ItemLogWindow || (ItemLogWindow = {}));
})(Nore || (Nore = {}));
