/*:ja
 * @target MZ
 * @author ル
 */
// menu
var ACTOR_RERLATION_MAP;
var ACTOR_RERLATION_MAP2;
var getNakadashiTarget;
var getEroParamTitle;
var getPlaceName;
var CHITSU_TIGHTENING;
var ANAL_TIGHTENING;
function vocabJp() {
  TextManager._autosave = TextManager.autosave;
  TextManager._file = TextManager.file;
  TextManager.saveMessageEn = "Please select save file.";
  TextManager.loadMessageEn = "Please select load file.";
  TextManager._alwaysDash = TextManager.alwaysDash;
  TextManager._touchUI = TextManager.touchUI;
  TextManager._bgmVolume = TextManager.bgmVolume;
  TextManager._bgsVolume = TextManager.bgsVolume;
  TextManager._meVolume = TextManager.meVolume;
  TextManager._seVolume = TextManager.seVolume;
  TextManager._equip = TextManager.equip;
  TextManager._skill = TextManager.skill;
  TextManager._status = TextManager.status;
  TextManager._options = TextManager.options;
  TextManager._save = TextManager.save;
  TextManager._gameEnd = TextManager.gameEnd;
  // status
  TextManager.atk = TextManager.param(2);
  TextManager.def = TextManager.param(3);
  TextManager.hit = TextManager.param(8);
  TextManager.eva = TextManager.param(9);
  TextManager.mmp = TextManager.param(1);
  TextManager.fatigue = "Fatigue";
  TextManager._exp = TextManager.exp;
  // eroStatus
  TextManager.peopleUnit = "%1 x";
  TextManager.countUnit = "%1 x";
  TextManager.normal = "Normal";
  TextManager.pregnant = "Pregnant";
  TextManager.father = "Seed Donor";
  // item
  TextManager.getItem = "Obtained %1!";
  // menu
  TextManager.invokeSkill = "Shelly's Traits";
  TextManager.dungeon = "Dungeon";
  TextManager.afternoon = "Afternoon";
  TextManager.night = "Night";
  TextManager.date = "Day %1";
  TextManager.language = "Language";
  TextManager.nakadashi = "Creampie Count";
  TextManager.keikenPerson = "Partners";
  TextManager.notEnoughPan = "Not enough bread";
  TextManager.notEnoughWine = "Not enough grape wine";
  TextManager.condition = "Acquisition: ";
  TextManager.gaugeCondition = "\\C[16]Gauge Increase Condition: \\C[0]";
  TextManager.gaugeUp = "Fetish Acquisition Gauge Increased‼︎";
  TextManager.anal = "Anal";
  TextManager.bukkake = "Bukkake";
  TextManager.lastStatus = "(Compared to the previous day)";
  TextManager.floor = "Floor %1";
  TextManager.selectFloor = "Please select the floor to challenge";
  TextManager.return = "Return";
  TextManager.dungeonInfo = "Adventure Information";
  TextManager.tryCount = "Number of Attempts";
  TextManager.countUnit2 = "x";
  TextManager.gold = "Gold";
  TextManager.kigae = "Change Clothes";
  TextManager.history = "Calendar";
  TextManager.confirmFloor = "Proceed to this floor?";
  TextManager.confirmReturn = "Return?";
  // shop
  TextManager.notEnoughMoney = "Not enough money";
  TextManager.shopConfirm = "Pay %1G to upgrade equipment?";
  TextManager.play = "Possible Plays";
  TextManager.kigaeError = "Exposure is not allowed";
  // Intimacy
  TextManager.relationshipWithVillagers = "Relationship with the villagers";
  TextManager.seikoui = "Sexual Acts";
  TextManager.honban = "Full Sex";
  TextManager.ninshin = "Pregnancy";
  TextManager.syusan2 = "Childbirth";
  TextManager.relationship = "Relationship with Shelly";
  TextManager.husband = "My husband";
  TextManager.acquaintance = "New Acquaintance Add";
  TextManager.plusIntimacy = "Intimacy Increased";
  // Shop
  TextManager.notEquip = "Unequipped";
  // Kigae
  TextManager.costume = "Costume";
  TextManager.face = "Expression";
  TextManager.decide = "Confirm";
  // History
  TextManager.day1 = "First Dungeon Challenge";
  TextManager.day3 = "Defeated by Fafnir";
  TextManager.shojoSoushitsu = "Virginity Lost";
  TextManager.loseBoss = "Defeated by Fafnir";
  TextManager.firstReo = "First Handjob to Lord Leo";
  TextManager.reoFela = "Fellatio to Lord Leo";
  TextManager.firstReoH = "First Sex with Lord Leo";
  TextManager.reoH = "Sex with Lord Leo";
  TextManager.firstBukiya = "First H with the Weapon Shop Uncle";
  TextManager.firstBukiya2 = "H with the Weapon Shop Uncle";
  TextManager.firstPartTimeJob = "First Part-time Job";
  TextManager.partTimeJobTekoki = "Handjob at Part-time Job";
  TextManager.partTimeJobFela = "Fellatio at Part-time Job";
  TextManager.partTimeJobFela2 = "Fellatio at Part-time Job (Swallow)";
  TextManager.partTimeJobDeepFela = "Deep Throat at Part-time Job";
  TextManager.partTimeJobDeepFela2 = "Deep Throat at Part-time Job (Swallow)";
  TextManager.partTimeJobAnal = "Anal Licking at Part-time Job";
  TextManager.partTimeJobSex = "Full Sex at Part-time Job";
  TextManager.partTimeOnaho = "Onahole at Part-time Job";
  TextManager.partTimeBoteOnaho = "Pregnant Onahole at Part-time Job";
  TextManager.partTimeJobToilet = "Toilet at Part-time Job";
  TextManager.firstShotaFela = "First Fellatio to Noah-kun";
  TextManager.shotaFela = "Fellatio to Noah-kun";
  TextManager.firstShota = "First Sex with Noah-kun";
  TextManager.shota2 = "Creampie Sex with Noah-kun";
  TextManager.shota3 = "Cowgirl Sex with Noah-kun";
  TextManager.firstOshikko = "First time drinking pee";
  TextManager.victoryHistory = "First Boss Defeat on Floor %1";
  TextManager.ninishinHistory = "Pregnant with %1's Child";
  TextManager.ninishinHypnosis = "Hypnotized by Leo";
  TextManager.ninishinReoNoKo = "Decided to have the child of Leo";
  TextManager.syusan = "Gave birth to %1's child";
  TextManager.firstHaikai = "Acquired the Vagrant Exhibitionist Fetish";
  TextManager.haikai2 = "Vagrant Exhibitionism";
  TextManager.firstGokkun = "First time drinking semen";
  TextManager.firstVagrantFela = "Helped the homeless man urinate";
  TextManager.vagrantFela2 = "Drank the homeless man's pee";
  TextManager.vagrantFela3 = "Deep Throat for the homeless man";
  TextManager.firstVagrant = "First H with the homeless old man";
  TextManager.vagrantStay = "Overnight Stay with the homeless old man";
  TextManager.vagrantAnal = "Anal H with the homeless old man";
  TextManager.vagrantH = "H with the homeless old man";
  TextManager.bukiyaHistory = "Signed a Sex Slave Contract";
  TextManager.mokubaHistory = "First Wooden Horse Experience";
  TextManager.mokubaHistory2 = "Training on the Wooden Horse";
  TextManager.rinkanHistory = "Gangbanged by People I Don't Know";
  TextManager.firstYakusou = "First H with the Herb Seller Brother";
  TextManager.firstRankou = "First Orgy in Town";
  TextManager.firstKuro = "Turned into a Black Gyaru";
  TextManager.kuro2 = "Orgy as a Black Gyaru";
  TextManager.kuro2_bote = "Pregnant Orgy as a Black Gyaru";
  TextManager.kimoOtoko = "Let the Creepy Old Man Cum";
  TextManager.kimoOtoko2 = "Sex with the Creepy Old Man";
  TextManager.kimoOtoko2_bote = "Pregnant Sex with the Creepy Old Man";
  TextManager.rankou2 = "Orgy Play in Town";
  TextManager.rankou3 = "Orgy Play";
  TextManager.rankou2_bote = "Pregnant Orgy Play";
  TextManager.kuro3 = "Begging as a Black Gyaru";
  TextManager.kuro3_bote = "Begging as a Pregnant Black Gyaru";
  TextManager.yadoya1 = "H next to Lord Leo at the Inn";
  TextManager.yadoya2 = "Cowgirl next to Lord Leo at the Inn";
  TextManager.yadoya3 = "Breeding next to Lord Leo at the Inn";
  TextManager.yadoya4 = "Sleep Assault next to Lord Leo at the Inn";
  TextManager.firstPanya = "Handjob for the Bakery Uncle";
  TextManager.pan2 = "First H with the Bakery Uncle";
  TextManager.pan3 = "Back Sex at the Bakery";
  TextManager.pan4 = "Cowgirl with the Bakery Uncle";
  TextManager.pan5 = "H with the Bakery Uncle";
  TextManager.apronHistory = "H with the Bakery Uncle";
  TextManager.apronHistory2 = "H with the Inn Uncle";
  TextManager.marriage = "Married to %1";
  TextManager.baisyun = "Prostitution with %1";
  TextManager.reoMesuHistory = "Lord Leo's Feminization";
  // Treasure
  TextManager.treasureConfirm = "Update equipment?";
  TextManager.treasureLowerGrade = [
    "Because it's a lower rank, it will become weaker.",
    "Are you sure you want to do this?",
  ];
  TextManager.treasureSameGrade = "Since it's the same rank, the enhancement value will carry over";
  TextManager.treasureUpperGrade =
    "Since it's a higher rank, half the enhancement value will carry over";
  TextManager.treasureSell = [
    "Old equipment will be sold automatically.",
    "Is this okay?",
  ];
  TextManager.treasureSell2 = "Sold the old equipment for %1G!";
  TextManager.treasureSell3 = "Sold the acquired equipment for %1G!";
  getNakadashiTarget = function (type) {
    switch (type) {
      case "keikenVillager":
        return "";
      case "keikenMachi":
        return "Town person";
      case "keikenSakaba":
        return "Bar customer";
      default:
        return "Undefined";
    }
  };
  CHITSU_TIGHTENING = {
    1: "Excellent tightness. \nPremium loli pussy",
    2: "Still very tight\nloli pussy",
    3: "Average tightening\nslightly seasoned",
    4: "Reached the realm of being called\nloose pussy",
    5: "Recognized by oneself and others as a gaping pussy\nPoor Leo",
  };
  ANAL_TIGHTENING = {
    1: "Tight anal.\nAlmost no experience",
    2: "Tight anal that's still hard to penetrate,\ngood tightening",
    3: "Slightly seasoned butthole.\nAmateur anal no more",
    4: "Loose anal.\nA few in town level",
    5: "Gaping anal.\nOne of the few in the country level",
  };
  ACTOR_RERLATION_MAP = {
    "4_1": { desc: "Lover" },
    "11_1": { desc: "The always kind uncle" },
    "11_20": { desc: "My first time partner" },
    "12_1": { desc: "The uncle who bakes bread" },
    "12_30": { desc: "The uncle who cares about me" },
    "13_1": { desc: "The uncle who makes weapons" },
    "13_30": { desc: "The uncle who gives a discount after H" },
    "13_40": { desc: "My master" },
    "14_1": { desc: "The uncle who runs the bar" },
    "15_1": { desc: "The old man with a bad leg" },
    "15_11": { desc: "The old man who has trouble peeing" },
    "15_31": { desc: "The old man I drink pee for" },
    "15_41": { desc: "The old man who treats me like a toilet" },
    "16_1": { desc: "The brother who sells herbs" },
    "16_50": { desc: "The brother who takes me to town" },
    "16_70": { desc: "The brother I play naughty games with in town" },
    "18_1": { desc: "The child playing nearby" },
    "18_30": { desc: "The kid I deflowered" },
    "-1_0": { desc: "The person who impregnated me" },
    "-2_0": { desc: "My marriage partner" },
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
        return "Anal SEX";
      case "baisyun":
        return "Prostitution";
      case "bukkake":
        return "Bukkake";
      case "seiekiNomu":
        return "Semen Swallow";
      case "oshikkoNomu":
        return "Pee Swallow";
      case "syusan":
        return "Childbirth";
      case "fela":
        return "Fellatio";
      case "acme":
        return "Climax";
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
        return "Homeless Person's Tent";
      case Destination.Herborist:
        return "In front of the Herb Seller";
    }
  };
}
