/*:ja
 * @target MZ
 * @author ル
 */
var Nore;
(function (Nore) {
  Nore.IMAGE_PATH = (function () {
    var p = window.location.pathname.replace(
      /(\/www|)\/[^\/]*$/,
      "/img/ero/ero04_01_1.webp"
    );
    if (p.match(/^\/([A-Z]\:)/)) {
      p = p.slice(1);
    }
    var result = decodeURIComponent(p);
    if (result[0] == "/") {
      return "." + result;
    }
    return result;
  })();
  var _Scene_Boot_prototype_loadSystemImages =
    Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function () {
    _Scene_Boot_prototype_loadSystemImages.call(this);
    //ImageManager.loadSystem('sample');
    ImageManager.loadSystem("jusei_1");
    ImageManager.loadSystem("damage_bonus");
    ImageManager.loadSystem("text_window");
    ImageManager.loadSystem("name_window");
    ImageManager.loadSystem("menu");
    ImageManager.loadSystem("menu_en");
    ImageManager.loadSystem("menu2");
    ImageManager.loadSystem("Window2");
    ImageManager.loadSystem("big_icon");
    ImageManager.loadSystem("bg");
    ImageManager.loadSystem("bg2");
    ImageManager.loadSystem("enemy");
    ImageManager.loadSystem("skill_item");
    ImageManager.loadSystem("calendar_bar");
    ImageManager.loadSystem("calendar_bg");
    ImageManager.loadSystem("shop_bg");
    ImageManager.loadSystem("shop_item");
    ImageManager.loadSystem("calendar_item");
    ImageManager.loadSystem("dungeon_bg");
    ImageManager.loadSystem("dungeon_bg_en");
    ImageManager.loadSystem("dungeon_item");
    ImageManager.loadSystem("dungeon_item_en");
    ImageManager.loadSystem("status_bg");
    ImageManager.loadSystem("status_item");
    ImageManager.loadSystem("battleButton");
    ImageManager.loadSystem("battleButton_en");
    ImageManager.loadSystem("gold");
    ImageManager.loadSystem("gradient");
    ImageManager.loadSystem("ui2");
    ImageManager.loadSystem("title01");
    ImageManager.loadSystem("title01_en");
    ImageManager.loadSystem("title02");
    ImageManager.loadSystem("title02_en");
    ImageManager.loadSystem("bar");
    ImageManager.loadSystem("eroStatus");
    ImageManager.loadSystem("skill_tree");
    ImageManager.loadSystem("ninshin");
    ImageManager.loadSpriteSheet("img/tachie/actor04.json");
    ImageManager.loadSpriteSheet("img/tachie/actor05.json");
    ImageManager.loadSpriteSheet("img/tachie/actor06.json");
    ImageManager.loadSpriteSheet("img/tachie/actor14.json");
    ImageManager.loadSpriteSheet("img/tachie/sikyu.json");
    ImageManager.loadSpriteSheet("img/ero/gion_1.json");
    ImageManager.loadCharacter("actor05_base");
    ImageManager.loadCharacter("actor05_head_b");
    var fs;
    if (Utils.isNwjs()) {
      var url = "img/ero/" + Utils.encodeURI("ero04_01_1") + ".webp";
      p(url);
      fs = require("fs");
      //p(fs.existsSync(IMAGE_PATH));
      if (fs.existsSync(url)) {
      }
    }
  };
  function hasScenario1() {
    var fs;
    if (Utils.isNwjs()) {
      var url = "img/ero/" + Utils.encodeURI("ero04_01_1") + ".webp";
      fs = require("fs");
      if (fs.existsSync(url)) {
        return true;
      }
    }
    return false;
  }
  Nore.hasScenario1 = hasScenario1;
  function hasScenario2() {
    var fs;
    if (Utils.isNwjs()) {
      var url = "img/ero/" + Utils.encodeURI("ero04_05_1") + ".webp";
      fs = require("fs");
      if (fs.existsSync(url)) {
        return true;
      }
    }
    return false;
  }
  Nore.hasScenario2 = hasScenario2;
  function hasScenario3() {
    var fs;
    if (Utils.isNwjs()) {
      var url = "img/ero/" + Utils.encodeURI("ero04_07_1") + ".webp";
      fs = require("fs");
      if (fs.existsSync(url)) {
        return true;
      }
    }
    return false;
  }
  Nore.hasScenario3 = hasScenario3;
  function hasScenario4() {
    var fs;
    if (Utils.isNwjs()) {
      var url = "img/ero/" + Utils.encodeURI("ero04_08_1") + ".webp";
      fs = require("fs");
      if (fs.existsSync(url)) {
        return true;
      }
    }
    return false;
  }
  Nore.hasScenario4 = hasScenario4;
  function hasScenario5() {
    var fs;
    if (Utils.isNwjs()) {
      var url = "img/ero/" + Utils.encodeURI("ero04_09_1") + ".webp";
      fs = require("fs");
      if (fs.existsSync(url)) {
        return true;
      }
    }
    return false;
  }
  Nore.hasScenario5 = hasScenario5;
})(Nore || (Nore = {}));
var _DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function () {
  _DataManager_createGameObjects.call(this);
  Nore.Tachie.actorCashedSprites = {};
  if (ConfigManager.en) {
    vocabEn();
  } else {
    vocabJp();
  }
};
