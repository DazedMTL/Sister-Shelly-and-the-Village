/*:ja
 * @target MZ
 * @author ル
 *
 * @command PreloadJpg
 * @text JPGロード
 * @des JPGロード
 * @arg file
 * @type string
 * @text file
 * @desc file
 *
 * @command PreloadWebp
 * @text webpロード
 * @des webpロード
 * @arg file
 * @type string
 * @text file
 * @desc file
 *
 * @command ReleaseWebp
 * @text webpリリース
 * @des webpリリース
 * @arg file
 * @type string
 * @text file
 * @desc file
 * @arg file2
 * @type string
 * @text file2
 * @desc file2
 * @arg file3
 * @type string
 * @text file3
 * @desc file3
 *
 * @command IgnoreFile
 * @text 画像無視
 * @des 画像無視
 * @arg file
 * @type string
 * @text 無視するファイルID
 * @desc 無視するファイルID(01_02)
 * @arg index
 * @type number
 * @text インデックス
 * @desc インデックス
 */
var Nore;
(function (Nore) {
  Nore.GION_PIC_ID = 17;
  Nore.spriteSheetCache = {};
  function isCached(id) {
    if (!PIXI.utils.BaseTextureCache) {
      return false;
    }
    return PIXI.utils.BaseTextureCache["img/ero/ero%1_1.webp".format(id)];
  }
  Nore.isCached = isCached;
  var cgFolder = "ero";
  var jpegPrefix = "__CG_JPG__";
  Nore.gionPrefix = "0gion_";
  Nore.webpPrefix = "__CG_WEBP__";
  var pluginName = "Nore_EroImg";
  PluginManager.registerCommand(pluginName, "PreloadJpg", function (args) {
    ImageManager.loadJpeg(args.file);
  });
  PluginManager.registerCommand(pluginName, "PreloadWebp", function (args) {
    var file = "img/ero/ero" + args.file + ".json";
    ImageManager.loadSpriteSheet(file);
    this.setWaitMode("image");
  });
  PluginManager.registerCommand(pluginName, "ReleaseWebp", function (args) {
    var file = "img/ero/ero" + args.file + ".json";
    ImageManager.releaseSpriteSheetPath(file);
    if (args.file2) {
      var file2 = "img/ero/ero" + args.file2 + ".json";
      ImageManager.releaseSpriteSheetPath(file2);
    }
    if (args.file3) {
      var file3 = "img/ero/ero" + args.file3 + ".json";
      ImageManager.releaseSpriteSheetPath(file3);
    }
  });
  PluginManager.registerCommand(pluginName, "IgnoreFile", function (args) {
    var index = args.index;
    var file = args.file;
    $gameTemp.addIgnoreFileSet(file, index);
  });
  PluginManager.registerCommand(pluginName, "showGion", function (args) {
    var file = args.id;
    $gameTemp.showGion(file);
  });
  PluginManager.registerCommand(pluginName, "hideGion", function (args) {
    $gameTemp.hideGion();
  });
  ImageManager.preloadEro = function (filename, hue, smooth) {
    var folder = "img/ero/";
    if (filename) {
      var path = folder + encodeURIComponent(filename) + ".jpg";
      var key = path + ":" + hue;
      this.cache2 = this.cache2 || {};
      if (!this._cache2[key]) {
        this.loadNormalBitmap2(path, hue || 0);
      }
    }
  };
  ImageManager.loadEro = function (filename, hue, smooth) {
    return this.loadBitmap("img/" + cgFolder + "/", filename, hue, true);
  };
  ImageManager.loadWebp = function (filename, hue) {
    return this._loadWebp("img/" + cgFolder + "/", filename, hue, true);
  };
  ImageManager._loadWebp = function (folder, filename, hue, smooth) {
    if (filename) {
      var path = folder + encodeURIComponent(filename) + ".webp";
      var bitmap = this.loadNormalBitmap2(path, hue || 0);
      bitmap.smooth = smooth;
      return bitmap;
    } else {
      return this.loadEmptyBitmap();
    }
  };
  ImageManager.loadJpeg = function (filename, hue) {
    return this._loadJpeg("img/" + cgFolder + "/", filename, hue, true);
  };
  ImageManager._loadJpeg = function (folder, filename, hue, smooth) {
    if (filename) {
      var path = folder + encodeURIComponent(filename) + ".jpg";
      var bitmap = this.loadNormalBitmap2(path, hue || 0);
      bitmap.smooth = smooth;
      return bitmap;
    } else {
      return this.loadEmptyBitmap();
    }
  };
  ImageManager.loadNormalBitmap2 = function (path, hue) {
    var key = path + ":" + hue;
    this.cache2 = this.cache2 || {};
    var bitmap = this.cache2[key];
    if (!bitmap) {
      bitmap = Bitmap.load(path);
      bitmap.addLoadListener(function () {
        bitmap.rotateHue(hue);
      });
      this.cache2[key] = bitmap;
    }
    return bitmap;
  };
  ImageManager.clearEro = function () {
    p("clearEro");
    this.cache2 = this.cache2 || {};
    for (var key in this.cache2) {
      this.cache2[key].destroy();
    }
    this.cache2 = {};
  };
  ImageManager.releaseSpriteSheet = function (file) {
    var path = "img/ero/" + file + ".json";
    this.releaseSpriteSheetPath(path);
  };
  ImageManager.releaseSpriteSheetPath = function (path) {
    var sheet = Nore.spriteSheetCache[path];
    if (!sheet) {
      console.error(path);
      return;
    }
    delete Nore.spriteSheetCache[path];
    p("release:" + path);
    var baseTex = null;
    for (var key in sheet.textures) {
      sheet.textures[key].destroy(true);
      baseTex = sheet.textures[key].baseTexture;
    }
    PIXI.Texture.removeFromCache(PIXI.utils.TextureCache[path]);
    PIXI.Texture.removeFromCache(PIXI.utils.TextureCache[path + "_image"]);
    if (baseTex) {
      baseTex.destroy(true);
      Graphics.callGC();
    }
  };
  Sprite_Picture.prototype.clear = function () {
    this.eroAnime = null;
    this._pictureName = "";
    if (this._gionSprite) {
      this.removeChildren();
      this._gionSprite = null;
    }
    this.update();
  };
  var _Sprite_Picture_loadBitmap = Sprite_Picture.prototype.loadBitmap;
  Sprite_Picture.prototype.loadBitmap = function () {
    if (this._pictureName instanceof Array) {
      $gameTemp.ignoreFiles = {};
      this.drawEroList(this._pictureName);
    } else if (this._pictureName.indexOf(Nore.gionPrefix) === 0) {
      var gionId_1 = this._pictureName;
      this.eroGionFrame = 100;
      this.drawGionPicture(gionId_1);
    } else if (this._pictureName.indexOf(jpegPrefix) === 0) {
      this.eroAnime = null;
      this.bitmap = ImageManager.loadJpeg(
        this._pictureName.substr(jpegPrefix.length)
      );
    } else if (this._pictureName.indexOf(Nore.webpPrefix) === 0) {
      var file = this._pictureName.substr(Nore.webpPrefix.length);
      if (file.length <= 15) {
        this.eroAnime = null;
        this.drawEro(file);
      } else {
        try {
          var json = JSON.parse(file);
          var wait = Math.floor(json.wait);
          this.eroAnime = json.pic;
          this.eroAnimeIndex = 0;
          this.eroAnimeWait = wait;
          this.eroAnimeFrameIndex = 0;
          this.eroSeIndex = json.seIndex;
          this.eroGionIndex = json.gionIndex;
          this.eroOnce = json.once;
          this.eroSeList = json.se;
          this.eroGionList = json.gion;
          this.drawEro(this.eroAnime[this.eroAnimeIndex]);
        } catch (e) {
          p(file);
          throw e;
        }
      }
    } else {
      _Sprite_Picture_loadBitmap.call(this);
    }
  };
  Sprite_Picture.prototype.drawGionPicture = function (filename) {
    var texture = PIXI.utils.TextureCache[filename + ".png"];
    if (!texture) {
      p("gion が見つかりません:" + filename);
      return;
    }
    if (this._gionSprite) {
      this.removeChildren();
      this._gionSprite = null;
    }
    if (this._gionSprite) {
      return;
    }
    var sprite = new PIXI.Sprite(texture);
    sprite.x = -(texture.trim.width / 2);
    sprite.y = -(texture.trim.height / 2);
    this.removeChildren();
    this.addChild(sprite);
    this._gionSprite = sprite;
  };
  var _ImageManager_loadPicture = ImageManager.loadPicture;
  ImageManager.loadPicture = function (filename) {
    if (filename.indexOf(Nore.webpPrefix) === 0) {
      return;
    }
    return _ImageManager_loadPicture.call(this, filename);
  };
  Sprite_Picture.prototype.drawEro = function (file) {
    var renderTexture = $gameTemp.getActorBitmapBodyCache(this._pictureId);
    var s = new PIXI.Sprite();
    switch ($gameVariables.value(10)) {
      case 1:
        this.drawEro2(s, file.substr(0, 6) + "back1");
        break;
      case 2:
        this.drawEro2(s, file.substr(0, 6) + "back2");
        break;
      case 3:
        this.drawEro2(s, file.substr(0, 6) + "back3");
        break;
      case 4:
        this.drawEro2(s, file.substr(0, 6) + "back4");
        break;
    }
    for (var i = 1; i <= 12; i++) {
      if (i < 10) {
        this.drawEro2(s, file + "_0" + i);
      } else {
        this.drawEro2(s, file + "_" + i);
      }
    }
    var renderer = Graphics.app.renderer;
    renderer.render(s, renderTexture);
    var sprite = new PIXI.Sprite(renderTexture);
    this.removeChildren();
    this._eroSprite = sprite;
    this.addChild(sprite);
  };
  Sprite_Picture.prototype.drawEroList = function (fileList) {
    var renderTexture = $gameTemp.getActorBitmapBodyCache(this._pictureId);
    var s = new PIXI.Sprite();
    this.drawEro2(s, "01_50_back");
    for (var i = 0; i < fileList.length; i++) {
      this.drawEro2(s, fileList[i]);
    }
    var renderer = Graphics.app.renderer;
    renderer.render(s, renderTexture);
    var sprite = new PIXI.Sprite(renderTexture);
    this.removeChildren();
    this._eroSprite = sprite;
    this.addChild(sprite);
  };
  var _Sprite_Picture_prototype_destroy = Sprite_Picture.prototype.destroy;
  Sprite_Picture.prototype.destroy = function () {
    if (this._eroSprite) {
      this.removeChild(this._eroSprite);
      this._eroSprite = null;
    }
    _Sprite_Picture_prototype_destroy.call(this);
  };
  Sprite_Picture.prototype.drawEro2 = function (s, file) {
    if ($gameTemp.ignoreFiles[file]) {
      return;
    }
    var texture = PIXI.utils.TextureCache[file + ".png"];
    if (!texture) {
      return;
    }
    var sprite = new PIXI.Sprite(texture);
    sprite.x = $gameVariables.value(5);
    sprite.y = $gameVariables.value(6);
    s.addChild(sprite);
  };
  Sprite_Picture.prototype.updateGion = function () {
    if (this.eroGionFrame > 0) {
    } else {
      return;
    }
    if (!this._gionSprite) {
      return;
    }
    if (
      $gameTemp.gionId &&
      Nore.gionPrefix + $gameTemp.gionId == this._pictureName
    ) {
      return;
    }
    this.eroGionFrame--;
    this.eroGionFrame--;
    this.eroGionFrame--;
    this.eroGionFrame--;
    //p(this.eroGionFrame)
    var f = this.eroGionFrame;
    var opacity = 255;
    if (f > 70) {
      opacity = 255 - (f - 70) * 5;
    } else if (f < 40) {
      opacity = f * 6;
    } else {
      opacity = 255;
    }
    this._gionSprite.alpha = opacity / 255;
    if (this.eroGionFrame <= 0) {
      this.removeChildren();
      this._gionSprite = null;
      this.eroGionFrame = 0;
      this._pictureName = "";
      var picture = this.picture();
      picture.initBasic();
    }
  };
  var Sprite_Picture_prototype_updateOther =
    Sprite_Picture.prototype.updateOther;
  Sprite_Picture.prototype.updateOther = function () {
    Sprite_Picture_prototype_updateOther.call(this);
    this.updateGion();
    var picture = this.picture();
    this.opacity = picture.opacity();
    this.blendMode = picture.blendMode();
    this.alpha = this.opacity / 255;
    this.rotation = (picture.angle() * Math.PI) / 180;
    if (this.opacity == 0 || !this.visible) {
      return;
    }
    if (this.eroAnime) {
      this.alpha = 1;
      this.eroAnimeFrameIndex++;
      if (this.eroAnimeFrameIndex >= this.eroAnimeWait) {
        this.eroAnimeFrameIndex = 0;
        this.eroAnimeIndex++;
        if (this.eroAnimeIndex >= this.eroAnime.length) {
          this.eroAnimeIndex = 0;
          if (this.eroOnce) {
            this.eroAnimeIndex = this.eroAnime.length - 1;
          }
        }
        this.drawEro(this.eroAnime[this.eroAnimeIndex]);
        if (this.eroSeIndex == this.eroAnimeIndex) {
          var dice = Math.floor(this.eroSeList.length * Math.random());
          var se = this.eroSeList[dice];
          if (typeof se == "object") {
            for (var i = 0; i < se.length; i++) {
              AudioManager.playSe({
                name: se[i],
                volume: 100,
                pitch: 100,
                pan: 0,
              });
            }
          } else {
            AudioManager.playSe({ name: se, volume: 100, pitch: 100, pan: 0 });
          }
        }
        if (this.eroGionIndex == this.eroAnimeIndex) {
          var dice = Math.floor(this.eroGionList.length * Math.random());
          var gion = this.eroGionList[dice];
          var xx = $gameVariables.value(41);
          var yy = $gameVariables.value(42);
          var scale = $gameVariables.value(43) || 100;
          if (typeof gion == "object") {
            for (var i = 0; i < se.length; i++) {
              //AudioManager.playSe({ name: se[i], volume: 100, pitch: 100, pan: 0 });
            }
          } else {
            var opacity = 255;
            xx += Math.randomInt(30) - 15;
            yy += Math.randomInt(30) - 15;
            var nextGion = nextGionId();
            $gameScreen.showPicture(
              nextGion,
              Nore.gionPrefix + gion,
              0,
              xx,
              yy,
              scale,
              scale,
              opacity,
              PIXI.BLEND_MODES.NORMAL
            );
            //AudioManager.playSe({ name: se, volume: 100, pitch: 100, pan: 0 });
          }
        }
      }
    }
  };
  var gionId = 0;
  function nextGionId() {
    if (gionId == 0) {
      gionId++;
    } else {
      gionId = 0;
    }
    return Nore.GION_PIC_ID + gionId;
  }
})(Nore || (Nore = {}));
