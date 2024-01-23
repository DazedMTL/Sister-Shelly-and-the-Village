Window_Options.prototype.volumeOffset = function () {
  return 5;
};
Window_Options.prototype.addGeneralOptions = function () {
  this.addCommand(TextManager._alwaysDash, "alwaysDash");
  //this.addCommand(TextManager.commandRemember, "commandRemember");
  this.addCommand(TextManager._touchUI, "touchUI");
  this.addCommand(TextManager.language, "en");
};
Scene_Options.prototype.optionsWindowRect = function () {
  var n = Math.min(9);
  var ww = 400;
  var wh = this.calcWindowHeight(n, true);
  var wx = (Graphics.boxWidth - ww) / 2;
  var wy = (Graphics.boxHeight - wh) / 2;
  return new Rectangle(wx, wy, ww, wh);
};
Window_Options.prototype.statusText = function (index) {
  var symbol = this.commandSymbol(index);
  var value = this.getConfigValue(symbol);
  if (this.isLanguageSymbol(symbol)) {
    return this.languageStatusText(value);
  } else if (this.isVolumeSymbol(symbol)) {
    return this.volumeStatusText(value);
  } else {
    return this.booleanStatusText(value);
  }
};
Window_Options.prototype.languageStatusText = function (value) {
  return value ? "En(Partial)" : "Japanese";
};
Window_Options.prototype.isLanguageSymbol = function (symbol) {
  return symbol == "en";
};
Window_Options.prototype.changeValue = function (symbol, value) {
  var lastValue = this.getConfigValue(symbol);
  if (lastValue !== value) {
    this.setConfigValue(symbol, value);
    this.redrawItem(this.findSymbol(symbol));
    this.playCursorSound();
    if (symbol == "en") {
      if (value) {
        ConfigManager.en = true;
      } else {
        ConfigManager.en = false;
      }
      this.callHandler("language");
    }
  }
};
var _Scene_Options_prototype_createOptionsWindow =
  Scene_Options.prototype.createOptionsWindow;
Scene_Options.prototype.createOptionsWindow = function () {
  _Scene_Options_prototype_createOptionsWindow.call(this);
  this._optionsWindow.setHandler("language", this.onLanguage.bind(this));
};
Scene_Options.prototype.onLanguage = function () {
  if (ConfigManager.en) {
    vocabEn();
  } else {
    vocabJp();
  }
  this._optionsWindow.makeCommandList();
  this._optionsWindow.refresh();
};
var _ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
  var config = _ConfigManager_makeData.call(this);
  config.en = this.en;
  return config;
};
var _ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
  _ConfigManager_applyData.call(this, config);
  this.en = this.readFlag(config, "en", false);
};
AudioManager._bgmVolume = 30;
AudioManager._bgsVolume = 30;
AudioManager._meVolume = 30;
AudioManager._seVolume = 30;
ConfigManager.en = false;
