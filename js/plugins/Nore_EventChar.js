/*:ja
 * @target MZ
 */
var Nore;
(function (Nore) {
  var _Game_CharacterBase_prototype_characterName =
    Game_CharacterBase.prototype.characterName;
  Game_CharacterBase.prototype.characterName = function () {
    if (this._characterName == "!event") {
      return "";
    }
    return _Game_CharacterBase_prototype_characterName.call(this);
  };
})(Nore || (Nore = {}));
