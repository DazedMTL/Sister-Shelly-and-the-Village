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
var Sprite_Player = /** @class */ (function (_super) {
  __extends(Sprite_Player, _super);
  function Sprite_Player(player, argInfo, inSave) {
    if (inSave === void 0) {
      inSave = false;
    }
    var _this = _super.call(this, player) || this;
    _this._inSave = inSave;
    var actor = $gameParty.leader();
    if (inSave || argInfo) {
      actor = $gameActors.actor(5);
    }
    _this._actor = actor;
    if (argInfo) {
      _this._fixedPos = true;
    }
    var info = argInfo || actor.exportCosInfo();
    _this._info = info;
    _this._outerLayer = new Sprite_LayeredCharacter(
      actor,
      info,
      EquipType.outer,
      inSave
    );
    _this._outerTopLayer = new Sprite_LayeredCharacter(
      actor,
      info,
      EquipType.outerTop,
      inSave
    );
    _this._outerBottomLayer = new Sprite_LayeredCharacter(
      actor,
      info,
      EquipType.outerBottom,
      inSave
    );
    _this._innerBottomLayer = new Sprite_LayeredCharacter(
      actor,
      info,
      EquipType.innerBottom,
      inSave
    );
    _this._innerTopLayer = new Sprite_LayeredCharacter(
      actor,
      info,
      EquipType.innerTop,
      inSave
    );
    _this._headLayer = new Sprite_LayeredCharacter(
      actor,
      info,
      EquipType.head,
      inSave
    );
    _this._legLayer = new Sprite_LayeredCharacter(
      actor,
      info,
      EquipType.leg,
      inSave
    );
    _this._hairLayer = new Sprite_LayeredCharacter(
      actor,
      info,
      EquipType.hair,
      inSave
    );
    _this._necklaceLayer = new Sprite_LayeredCharacter(
      actor,
      info,
      EquipType.necklace,
      inSave
    );
    _this._noseHookLayer = new Sprite_LayeredCharacter(
      actor,
      info,
      EquipType.noseHook,
      inSave
    );
    _this.addChild(_this._legLayer);
    _this.addChild(_this._hairLayer);
    _this.addChild(_this._innerBottomLayer);
    _this.addChild(_this._innerTopLayer);
    _this.addChild(_this._outerTopLayer);
    _this.addChild(_this._outerBottomLayer);
    _this.addChild(_this._outerLayer);
    _this.addChild(_this._headLayer);
    _this.addChild(_this._necklaceLayer);
    _this.addChild(_this._noseHookLayer);
    _this.updateBitmap();
    _this.updateFrame();
    return _this;
  }
  Sprite_Player.prototype.updateBitmap = function () {
    if (this.isImageChanged()) {
      this._initialized = true;
      this._characterName = this.characterName();
      //this._characterName = 'actor01';
      this._characterIndex = 0;
      this.setCharacterBitmap();
    }
  };
  Sprite_Player.prototype.onChange = function () {
    this._initialized = false;
    this.updateBitmap();
  };
  Sprite_Player.prototype.characterPatternX = function () {
    if (this._fixedPos || !$dataMap) {
      return 1;
    }
    return _super.prototype.characterPatternX.call(this);
  };
  Sprite_Player.prototype.characterPatternY = function () {
    if (this._fixedPos || !$dataMap) {
      return 0;
    }
    return _super.prototype.characterPatternY.call(this);
  };
  Sprite_Player.prototype.isImageChanged = function () {
    if (this._initialized) {
      return this._characterName != this.characterName();
    }
    return true;
  };
  Sprite_Player.prototype.characterName = function () {
    var actor = this._actor;
    var cos = actor;
    if (this._inSave || this._fixedPos) {
      actor = $gameActors.actor(5);
      cos = this._info;
    }
    var actorId = actor.actorId();
    if (cos.hasAcce(299)) {
      if (actor.boteId > 1) {
        return "actor0" + actorId + "_base_g-bote";
      } else {
        return "actor0" + actorId + "_base_g";
      }
    } else {
      if (actor.boteId > 1) {
        return "actor0" + actorId + "_base-bote";
      } else {
        return "actor0" + actorId + "_base";
      }
    }
  };
  Sprite_Player.prototype.updateOther = function () {
    this.opacity = this._character.opacity();
    this.blendMode = this._character.blendMode();
    //this._bushDepth = this._character.bushDepth();
  };
  Sprite_Player.prototype.updatePosition = function () {
    if (this._fixedPos || !$dataMap) {
      return;
    }
    _super.prototype.updatePosition.call(this);
  };
  Sprite_Player.prototype.updateVisibility = function () {
    if (this._fixedPos || !$dataMap) {
      this.visible = true;
      return;
    }
    _super.prototype.updateVisibility.call(this);
  };
  return Sprite_Player;
})(Sprite_Character);
var EquipType;
(function (EquipType) {
  EquipType[(EquipType["outer"] = 0)] = "outer";
  EquipType[(EquipType["outerTop"] = 1)] = "outerTop";
  EquipType[(EquipType["outerBottom"] = 2)] = "outerBottom";
  EquipType[(EquipType["head"] = 3)] = "head";
  EquipType[(EquipType["leg"] = 4)] = "leg";
  EquipType[(EquipType["hair"] = 5)] = "hair";
  EquipType[(EquipType["innerBottom"] = 6)] = "innerBottom";
  EquipType[(EquipType["innerTop"] = 7)] = "innerTop";
  EquipType[(EquipType["necklace"] = 8)] = "necklace";
  EquipType[(EquipType["noseHook"] = 9)] = "noseHook";
})(EquipType || (EquipType = {}));
var Sprite_LayeredCharacter = /** @class */ (function (_super) {
  __extends(Sprite_LayeredCharacter, _super);
  function Sprite_LayeredCharacter(actor, info, _type, inSave) {
    var _this = _super.call(this, $gamePlayer) || this;
    _this._type = _type;
    _this._actor = actor;
    _this._info = info;
    _this._inSave = inSave;
    _this.updateBitmap();
    return _this;
  }
  Sprite_LayeredCharacter.prototype.updateBitmap = function () {
    if (this.isImageChanged()) {
      this._fileName = this.fileName();
      this._characterName = this._fileName;
      this._characterIndex = 0;
      this.setCharacterBitmap();
      this.updateFrame();
    }
  };
  Sprite_LayeredCharacter.prototype.updatePosition = function () {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  };
  Sprite_LayeredCharacter.prototype.updateVisibility = function () {
    if (this._info.inSave) {
      this.visible = true;
    } else {
      _super.prototype.updateVisibility.call(this);
    }
  };
  Sprite_LayeredCharacter.prototype.characterPatternX = function () {
    if (this._info.inSave) {
      return 1;
    }
    return _super.prototype.characterPatternX.call(this);
  };
  Sprite_LayeredCharacter.prototype.characterPatternY = function () {
    if (this._info.inSave) {
      return 0;
    }
    return _super.prototype.characterPatternY.call(this);
  };
  Sprite_LayeredCharacter.prototype.isImageChanged = function () {
    return this._fileName != this.fileName();
  };
  Sprite_LayeredCharacter.prototype.fileName = function () {
    var leader = this._actor;
    var actorId = leader.actorId();
    if (this._inSave) {
      actorId = 5;
    }
    if (actorId != 5) {
      return "";
    }
    var actor;
    if (this._inSave) {
      actor = this._info;
    } else {
      actor = leader;
    }
    switch (this._type) {
      case EquipType.outer:
        if (actor.outerId == "a") {
          return "";
        }
        if (actor.boteId > 1) {
          return "actor0%1_outer_%2-bote".format(actorId, actor.outerId);
        } else {
          return "actor0%1_outer_%2".format(actorId, actor.outerId);
        }
      case EquipType.outerTop:
        if (actor.outerTopId == "a") {
          return "";
        }
        if (actor.boteId > 1) {
          return "actor0%1_outerTop_%2-bote".format(actorId, actor.outerTopId);
        } else {
          return "actor0%1_outerTop_%2".format(actorId, actor.outerTopId);
        }
      case EquipType.outerBottom:
        if (actor.outerBottomId == "a") {
          return "";
        }
        return "actor0%1_outerBottom_%2".format(actorId, actor.outerBottomId);
      case EquipType.head:
        if (actor.headId == "a") {
          return "";
        }
        return "actor0%1_head_%2".format(actorId, actor.headId);
      case EquipType.leg:
        switch (actor.legId) {
          case "a":
          case "c":
          case "d":
          case "e":
          case "f":
            return "";
        }
        return "actor0%1_leg_%2".format(actorId, actor.legId);
      case EquipType.hair:
        if (actor.hasAcce(209)) {
          return "";
        }
        if (actor.hasAcce(299)) {
          return "actor0%1_hair%2".format(actorId, 2);
        } else {
          return "actor0%1_hair%2".format(actorId, 1);
        }
      case EquipType.necklace:
        if (actor.hasAcce(203) || actor.hasAcce(207)) {
          return "actor0%1_necklace".format(actorId, 2);
        }
        return "";
      case EquipType.noseHook:
        if (actor.hasAcce(213)) {
          return "actor0%1_nosehook".format(actorId, 2);
        }
        return "";
      case EquipType.innerBottom:
        if (actor.innerBottomId == "a") {
          return "";
        }
        if (actor.breakId >= 2) {
          return "";
        }
        return "actor0%1_innerBottom_%2".format(actorId, actor.innerBottomId);
      case EquipType.innerTop:
        if (actor.innerBottomId == "a") {
          return "";
        }
        if (actor.breakId >= 3) {
          return "";
        }
        return "actor0%1_innerTop_%2".format(actorId, actor.innerTopId);
    }
  };
  return Sprite_LayeredCharacter;
})(Sprite_Character);
Spriteset_Map.prototype.createCharacters = function () {
  this._characterSprites = [];
  for (var _i = 0, _a = $gameMap.events(); _i < _a.length; _i++) {
    var event_1 = _a[_i];
    this._characterSprites.push(new Sprite_Character(event_1));
  }
  for (var _b = 0, _c = $gameMap.vehicles(); _b < _c.length; _b++) {
    var vehicle = _c[_b];
    this._characterSprites.push(new Sprite_Character(vehicle));
  }
  for (
    var _d = 0, _e = $gamePlayer.followers().reverseData();
    _d < _e.length;
    _d++
  ) {
    var follower = _e[_d];
    this._characterSprites.push(new Sprite_Character(follower));
  }
  this._characterSprites.push(new Sprite_Player($gamePlayer));
  for (var _f = 0, _g = this._characterSprites; _f < _g.length; _f++) {
    var sprite = _g[_f];
    this._tilemap.addChild(sprite);
  }
};
