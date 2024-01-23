var Nore;
(function (Nore) {
  Window_ChoiceList.prototype.windowX = function () {
    var offset = 728;
    switch ($gameVariables.value(18)) {
      case 0:
        return 120 + offset - this.windowWidth();
      case 1:
        return 330 + offset - this.windowWidth();
      case 2:
        return 630 + offset - this.windowWidth();
      case 3:
        return 0 + offset - this.windowWidth() - 200;
    }
    var positionType = $gameMessage.choicePositionType();
    if (positionType === 1) {
      return (Graphics.boxWidth - this.windowWidth()) / 2;
    } else if (positionType === 2) {
      return Graphics.boxWidth - this.windowWidth() - 300;
    } else {
      return 0;
    }
  };
  Game_Screen.prototype.maxPictures = function () {
    return 30;
  };
  Window_StatusBase.prototype.drawActorSimpleStatus = function (actor, x, y) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var x3 = x2 + 180;
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorNickname(actor, x, y - lineHeight, 270);
    this.drawActorClass(actor, x2, y);
    this.placeBasicGauges(actor, x2, y + lineHeight);
  };
  Scene_Message.prototype.messageWindowRect = function () {
    var ww = Graphics.boxWidth - 300;
    var wh = 140;
    var wx = 200;
    var wy = 0;
    return new Rectangle(wx, wy, ww, wh);
  };
  Window_ChoiceList.prototype.windowY = function () {
    var messageY = this._messageWindow.y;
    if (messageY >= Graphics.boxHeight / 2) {
      return messageY - this.windowHeight() - 14;
    } else {
      return messageY + this._messageWindow.height - 14;
    }
  };
})(Nore || (Nore = {}));
