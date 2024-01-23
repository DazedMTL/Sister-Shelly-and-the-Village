/*:ja
 * @target MZ
 * @author ル
 */
var CALENDAR_MAP;
function vocabEn() {
  vocabJp();
  TextManager._autosave = "Auto Save";
  TextManager._file = "File";
  TextManager.saveMessageEn = "Please select a file to save.";
  TextManager.loadMessageEn = "Please select a file to load.";
  TextManager._alwaysDash = "Always Dash";
  TextManager._touchUI = "Touch UI";
  TextManager._bgmVolume = "BGM Volume";
  TextManager._bgsVolume = "BGS Volume";
  TextManager._meVolume = "ME Volume";
  TextManager._seVolume = "SE Volume";
  TextManager._equip = "Equip";
  TextManager._skill = "Skill";
  TextManager._status = "Status";
  TextManager._options = "Options";
  TextManager._save = "Save";
  TextManager._gameEnd = "Game End";
  // status
  TextManager.atk = "ATK";
  TextManager.def = "DEF";
  TextManager.hit = "HIT";
  TextManager.eva = "EVA";
  TextManager.mmp = "MP";
  TextManager.reduceDmg = "REDUCE DMG";
  TextManager.bonusDmg = "BONUS DMG";
  TextManager.fatigue = "FATIGUE";
  TextManager._exp = "EXP";
  // eroStatus
  TextManager.peopleUnit = "%1 　";
  TextManager.countUnit = "%1 　";
  TextManager.normal = "Normal";
  TextManager.pregnant = "Pregnant";
  TextManager.father = "Father";
  // item
  TextManager.getItem = "The Hero obtained %1!";
  // menu
  TextManager.invokeSkill = "Skill Invoked!!";
  TextManager.dungeon = "Dungeon";
  TextManager.afternoon = "Daytime";
  TextManager.night = "Night";
  TextManager.date = "Day %1";
  TextManager.language = "Language";
  TextManager.nakadashi = "Creampie";
  TextManager.keikenPerson = "経験人数";
  TextManager.notEnoughPan = "Not enough bread.";
  TextManager.notEnoughWine = "Not enough wine.";
  TextManager.condition = "Acquisition conditions:";
  TextManager.gaugeCondition = "\\C[16]Acquisition conditions: \\C[0]";
  TextManager.gaugeUp = "Sex  Up!!";
  TextManager.anal = "Anal Sex";
  TextManager.bukkake = "ぶっかけ";
  TextManager.lastStatus = "（DoD）";
  TextManager.floor = "B %1";
  TextManager.selectFloor = "攻略する階層を選択してください";
  TextManager.return = "Return";
  TextManager.dungeonInfo = "Adventure Info";
  TextManager.tryCount = "Try Count";
  TextManager.countUnit2 = "";
  TextManager.gold = "Money";
  TextManager.kigae = "Dress up";
  TextManager.history = "Calendar";
  TextManager.confirmFloor = "Do you wish to go to this layer?";
  TextManager.confirmReturn = "Do you wish to return?";
  // shop
  TextManager.notEnoughMoney = "Not enough gold.";
  TextManager.shopConfirm = "Pay %1G to enhance your equipment?";
  TextManager.play = "可能なプレイ";
  TextManager.kigaeError = "露出することはできません";
  // Intimacy
  TextManager.relationshipWithVillagers = "Relationships With Villagers";
  TextManager.seikoui = "Sexual Activity";
  TextManager.honban = "Sexperience";
  TextManager.ninshin = "妊娠";
  TextManager.syusan2 = "Childbirth";
  TextManager.relationship = "Relationships With Shelly";
  TextManager.husband = "My husband";
  TextManager.acquaintance = "New acquaintance added!";
  TextManager.plusIntimacy = "Intimacy increased!";
  // Shop
  TextManager.notEquip = "未装備";
  // Kigae
  TextManager.costume = "Costume";
  TextManager.face = "Expression";
  TextManager.decide = "OK";
  // History
  CALENDAR_MAP = {};
  CALENDAR_MAP[TextManager.day1] = "First attempt at a dungeon";
  CALENDAR_MAP[TextManager.day3] = "Defeated by Fafnir";
  CALENDAR_MAP[TextManager.shojoSoushitsu] = "Lost virginity";
  CALENDAR_MAP[TextManager.loseBoss] = "Defeated by Fafnir";
  CALENDAR_MAP[TextManager.firstReo] = "Gave Leo a handjob";
  CALENDAR_MAP[TextManager.reoFela] = "Gave Leo a blowjob";
  CALENDAR_MAP[TextManager.firstReoH] = "Sex with Leo";
  CALENDAR_MAP[TextManager.reoH] = "Sex with Leo";
  CALENDAR_MAP[TextManager.firstBukiya] = "Sex with the weapon merchant";
  CALENDAR_MAP[TextManager.firstBukiya2] = "Sex with the weapon merchant";
  CALENDAR_MAP[TextManager.firstPartTimeJob] = "First part-time job";
  CALENDAR_MAP[TextManager.partTimeJobTekoki] = "Handjob at part-time job";
  CALENDAR_MAP[TextManager.partTimeJobFela] = "Blowjob at part-time job";
  CALENDAR_MAP[TextManager.partTimeJobFela2] =
    "Blowjob at part-time job (swallow)";
  CALENDAR_MAP[TextManager.partTimeJobDeepFela] = "Deepthroat at part-time job";
  CALENDAR_MAP[TextManager.partTimeJobDeepFela2] =
    "Deepthroat at part-time job (swallow)";
  CALENDAR_MAP[TextManager.partTimeJobAnal] = "Rimjob at part-time job";
  CALENDAR_MAP[TextManager.partTimeJobSex] = "Sex at part-time job";
  CALENDAR_MAP[TextManager.partTimeOnaho] =
    "Used like a fuck toy at part-time job";
  CALENDAR_MAP[TextManager.partTimeBoteOnaho] = "Used like a pregnant fuck toy";
  CALENDAR_MAP[TextManager.partTimeJobToilet] =
    "Used like a toilet at part-time job";
  CALENDAR_MAP[TextManager.firstShotaFela] = "Gave Noah a blowjob";
  CALENDAR_MAP[TextManager.shotaFela] = "Gave Noah a blowjob";
  CALENDAR_MAP[TextManager.firstShota] = "Sex with Noah";
  CALENDAR_MAP[TextManager.shota2] = "Creampie from Noah";
  CALENDAR_MAP[TextManager.shota3] = "Cowgirl sex with Noah";
  CALENDAR_MAP[TextManager.firstOshikko] = "First time drinking pee";
  for (var i = 1; i < 10; i++) {
    CALENDAR_MAP[TextManager.victoryHistory.format(i)] =
      "Defeated the layer %1 boss".format(i);
  }
  CALENDAR_MAP[TextManager.ninishinHypnosis] = "Hypnotized Leo";
  CALENDAR_MAP[TextManager.ninishinReoNoKo] =
    "Decided to raise my child as Leo's";
  CALENDAR_MAP[TextManager.firstHaikai] = "Acquired public nudity fetish";
  CALENDAR_MAP[TextManager.haikai2] = "Public nudity";
  CALENDAR_MAP[TextManager.firstGokkun] = "First time drinking cum";
  CALENDAR_MAP[TextManager.firstVagrantFela] = "Helped the homeless man pee";
  CALENDAR_MAP[TextManager.vagrantFela2] = "Drank the homeless man's pee";
  CALENDAR_MAP[TextManager.vagrantFela3] = "Deepthroated the homeless man";
  CALENDAR_MAP[TextManager.firstVagrant] = "Sex with the homeless man";
  CALENDAR_MAP[TextManager.vagrantStay] = "Stayed with the homeless man";
  CALENDAR_MAP[TextManager.vagrantAnal] = "Anal sex with the homeless man";
  CALENDAR_MAP[TextManager.bukiyaHistory] = "Signed a sex slave contract";
  CALENDAR_MAP[TextManager.mokubaHistory] = "Triangular wooden SM horse";
  CALENDAR_MAP[TextManager.mokubaHistory2] =
    "Triangular wooden SM horse training";
  CALENDAR_MAP[TextManager.rinkanHistory] =
    "Gang raped by people whose faces I don't know";
  CALENDAR_MAP[TextManager.firstYakusou] =
    "Sex with the herb seller for the first time";
  CALENDAR_MAP[TextManager.firstRankou] = "First orgy in town";
  CALENDAR_MAP[TextManager.firstKuro] = "Became a dark-gyaru";
  CALENDAR_MAP[TextManager.kuro2] = "Orgy as a dark-gyaru";
  CALENDAR_MAP[TextManager.kuro2_bote] = "Ogy as a pregnant dark-gyaru";
  CALENDAR_MAP[TextManager.kimoOtoko] = "Let the gross man cum";
  CALENDAR_MAP[TextManager.kimoOtoko2] = "Sex with the gross man";
  CALENDAR_MAP[TextManager.kimoOtoko2_bote] = "Pregnant sex with the gross man";
  CALENDAR_MAP[TextManager.rankou2] = "Orgy in town";
  CALENDAR_MAP[TextManager.rankou3] = "Orgy in town";
  CALENDAR_MAP[TextManager.rankou2_bote] = "Ogy while pregnant";
  CALENDAR_MAP[TextManager.kuro3] = "Begged as a dark-gyaru";
  CALENDAR_MAP[TextManager.kuro3_bote] = "Begged as a pregnant dark-gyaru";
  CALENDAR_MAP[TextManager.yadoya1] = "Sex next to Leo at the inn";
  CALENDAR_MAP[TextManager.yadoya2] = "Cowgirl sex next to Leo at the inn";
  CALENDAR_MAP[TextManager.yadoya3] = "Breed next to Leo at the inn";
  CALENDAR_MAP[TextManager.yadoya4] = "Sleep raped next to Leo at the inn";
  CALENDAR_MAP[TextManager.firstPanya] = "Gave a handjob to the baker";
  CALENDAR_MAP[TextManager.pan2] = "Sex with the baker for the first time";
  CALENDAR_MAP[TextManager.pan3] = "Face-to-face sex with the baker";
  CALENDAR_MAP[TextManager.pan4] = "Cowgirl sex with the baker";
  CALENDAR_MAP[TextManager.pan5] = "Had sex with the baker";
  CALENDAR_MAP[TextManager.apronHistory] = "Had sex with the baker";
  CALENDAR_MAP[TextManager.apronHistory2] = "Had sex with the Innkeeper";
  CALENDAR_MAP[TextManager.reoMesuHistory] = "Leo's Anal Sex";
  for (var i = 11; i <= 40; i++) {
    var nameJp = $gameActors.actor(i).nameJp();
    var nameEn = $gameActors.actor(i).nameEn();
    CALENDAR_MAP[TextManager.marriage.format(nameJp)] = "Married to %1".format(
      nameEn
    );
    CALENDAR_MAP[TextManager.baisyun.format(nameJp)] =
      "Prostitution with %1".format(nameEn);
    CALENDAR_MAP[TextManager.ninishinHistory.format(nameJp)] =
      "Pregnant with child %1".format(nameEn);
    CALENDAR_MAP[TextManager.syusan.format(nameJp)] =
      "Gave birth to child %1".format(nameEn);
  }
  // Treasure
  TextManager.treasureConfirm = "Update equipment?";
  TextManager.treasureUpperGrade =
    "Since this equipment is the upper rank, half of the enhancement cost will be transferred";
  TextManager.treasureLowerGrade = [
    "Since this equipment is a lower rank, it will become weaker.",
    "Is this really okay?",
  ];
  TextManager.treasureSameGrade =
    "Since this equipment is the same rank, the enhancement cost will be transferred";
  TextManager.treasureSell = [
    "Old equipment will be sold automatically.",
    "Is this okay?",
  ];
  TextManager.treasureSell2 = "Old equipment sold for %1 Ｇ";
  TextManager.treasureSell3 = "New equipment sold for %1 Ｇ";
  getNakadashiTarget = function (type) {
    switch (type) {
      case "keikenVillager":
        return "";
      case "keikenMachi":
        return "Townspeople";
      case "keikenSakaba":
        return "Tavern Customers";
      default:
        return "未定義";
    }
  };
  CHITSU_TIGHTENING = {
    1: "An outstandingly\ntight pussy.",
    2: "A fairly tight pussy.",
    3: "An averagely\ntight pussy.",
    4: "Loose. Lots of disappointment\nwhen a beautiful girl is loose.",
    5: "Absurdly loose. So loose that\nit is hard to make a man cum…….",
  };
  ANAL_TIGHTENING = {
    1: "An extremely tight asshole.\nJust like a virgin asshole.",
    2: "A considerably tight\nasshole.",
    3: "An averagely tight asshole.",
    4: "A loose asshole.\nDick can easily slide in.",
    5: "An absurdly loose asshole. Even\nduring everyday life, it remains gaped.",
  };
  ACTOR_RERLATION_MAP = {
    "4_1": { desc: "Lover" },
    "11_1": { desc: "The man who is always kind" },
    "11_20": { desc: "My first partner" },
    "12_1": { desc: "The man who cooks bread" },
    "12_30": { desc: "The man who cares for me" },
    "13_1": { desc: "The man who creates weapons" },
    "13_30": { desc: "The man who gives me discount if I have sex with him" },
    "13_40": { desc: "My master" },
    "14_1": { desc: "The man who runs a tavern" },
    "15_1": { desc: "The old man with a bad leg" },
    "15_11": { desc: "The old man with a urination problem" },
    "15_31": { desc: "The old man I drink his pee" },
    "15_41": { desc: "The old man who treats me like a toilet" },
    "16_1": { desc: "The man who sells medicinal herbs" },
    "16_50": { desc: "The man who takes me to the town" },
    "16_70": { desc: "The man who does lewd things with me in town" },
    "18_1": { desc: "The child who plays nearby" },
    "18_30": { desc: "The man who lost his virginity to me" },
    "-1_0": { desc: "The man who got me pregnant" },
    "-2_0": { desc: "My husband" },
  };
  ACTOR_RERLATION_MAP2 = {};
  for (var i in ACTOR_RERLATION_MAP) {
    var list = i.split("_");
    var id = parseInt(list[0]);
    var value = ACTOR_RERLATION_MAP[i];
    var n = parseInt(list[1]);
    ACTOR_RERLATION_MAP2[id] = ACTOR_RERLATION_MAP2[id] || [];
    ACTOR_RERLATION_MAP2[id].push([n, value["desc"]]);
  }
  getEroParamTitle = function (label) {
    switch (label) {
      case "nakadashi":
        return "Creampie";
      case "anal":
        return "Anal Sex";
      case "baisyun":
        return "Prostitution";
      case "bukkake":
        return "Prostitution";
      case "seiekiNomu":
        return "Cum Swallowing";
      case "oshikkoNomu":
        return "Pee Swallowing";
      case "syusan":
        return "Childbirth";
      case "fela":
        return "Blowjob";
    }
    return "";
  };
  getPlaceName = function (id) {
    switch (id) {
      case Destination.Church:
        return "Church";
      case Destination.Inn:
        return "Inn";
      case Destination.Bakery:
        return "Bakery";
      case Destination.Bar:
        return "Bar";
      case Destination.WeaponShop:
        return "Weapon Shop";
      case Destination.Tent:
        return "Tent";
      case Destination.Herborist:
        return "Herborist";
    }
  };
}
