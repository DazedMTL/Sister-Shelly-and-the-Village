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
  TextManager.fatigue = "疲労度";
  TextManager._exp = TextManager.exp;
  // eroStatus
  TextManager.peopleUnit = "%1 人";
  TextManager.countUnit = "%1 回";
  TextManager.normal = "通常";
  TextManager.pregnant = "妊娠中";
  TextManager.father = "種親";
  // item
  TextManager.getItem = "%1 を手に入れた！";
  // menu
  TextManager.invokeSkill = "シェリーの特性";
  TextManager.dungeon = "ダンジョン";
  TextManager.afternoon = "昼";
  TextManager.night = "夜";
  TextManager.date = "%1日目";
  TextManager.language = "Language";
  TextManager.nakadashi = "中出し回数";
  TextManager.keikenPerson = "経験人数";
  TextManager.notEnoughPan = "パンが足りません";
  TextManager.notEnoughWine = "ふどう酒が足りません";
  TextManager.condition = "獲得条件: ";
  TextManager.gaugeCondition = "\\C[16]ゲージ増加条件: \\C[0]";
  TextManager.gaugeUp = "性癖習得ゲージ上昇‼︎";
  TextManager.anal = "アナル";
  TextManager.bukkake = "ぶっかけ";
  TextManager.lastStatus = "（前日比）";
  TextManager.floor = "%1 層";
  TextManager.selectFloor = "攻略する階層を選択してください";
  TextManager.return = "帰還する";
  TextManager.dungeonInfo = "冒険情報";
  TextManager.tryCount = "挑戦回数";
  TextManager.countUnit2 = "回";
  TextManager.gold = "お金";
  TextManager.kigae = "着替え";
  TextManager.history = "カレンダー";
  TextManager.confirmFloor = "この階層に行きますか？";
  TextManager.confirmReturn = "帰還しますか？";
  // shop
  TextManager.notEnoughMoney = "お金が足りません";
  TextManager.shopConfirm = "%1G を払って武具を強化しますか？";
  TextManager.play = "可能なプレイ";
  TextManager.kigaeError = "露出することはできません";
  // Intimacy
  TextManager.relationshipWithVillagers = "村の人たちとの関係性";
  TextManager.seikoui = "性行為回数";
  TextManager.honban = "本番回数";
  TextManager.ninshin = "妊娠";
  TextManager.syusan2 = "出産";
  TextManager.relationship = "シェリーとの関係";
  TextManager.husband = "私の夫";
  TextManager.acquaintance = "新規知り合い追加";
  TextManager.plusIntimacy = "親密度上昇";
  // Shop
  TextManager.notEquip = "未装備";
  // Kigae
  TextManager.costume = "コスチューム";
  TextManager.face = "表情";
  TextManager.decide = "確定";
  // History
  TextManager.day1 = "ダンジョンに初挑戦";
  TextManager.day3 = "ファフニールに敗北";
  TextManager.shojoSoushitsu = "処女喪失";
  TextManager.loseBoss = "ファフニールに敗北";
  TextManager.firstReo = "レオ様に手コキ";
  TextManager.reoFela = "レオ様にフェラ";
  TextManager.firstReoH = "レオ様と初エッチ";
  TextManager.reoH = "レオ様とエッチ";
  TextManager.firstBukiya = "武器屋のおじさんと初H";
  TextManager.firstBukiya2 = "武器屋のおじさんとH";
  TextManager.firstPartTimeJob = "初バイト";
  TextManager.partTimeJobTekoki = "バイトで手コキ";
  TextManager.partTimeJobFela = "バイトでフェラ";
  TextManager.partTimeJobFela2 = "バイトでフェラ(ごっくん)";
  TextManager.partTimeJobDeepFela = "バイトでディープフェラ";
  TextManager.partTimeJobDeepFela2 = "バイトでディープフェラ(ごっくん)";
  TextManager.partTimeJobAnal = "バイトでアナル舐め";
  TextManager.partTimeJobSex = "バイトで本番H";
  TextManager.partTimeOnaho = "バイトでオナホ";
  TextManager.partTimeBoteOnaho = "バイトでボテ腹オナホ";
  TextManager.partTimeJobToilet = "バイトで便器";
  TextManager.firstShotaFela = "ノアくんに初フェラ";
  TextManager.shotaFela = "ノアくんにフェラ";
  TextManager.firstShota = "ノアくんと初H";
  TextManager.shota2 = "ノアくんと中出しH";
  TextManager.shota3 = "ノアくんと騎乗位H";
  TextManager.firstOshikko = "初めておしっこを飲む";
  TextManager.victoryHistory = "%1層のボスを初撃破";
  TextManager.ninishinHistory = "%1の子を妊娠";
  TextManager.ninishinHypnosis = "レオに催眠をかけた";
  TextManager.ninishinReoNoKo = "レオの子供ということにした";
  TextManager.syusan = "%1の子を出産";
  TextManager.firstHaikai = "裸徘徊の性癖獲得";
  TextManager.haikai2 = "裸徘徊";
  TextManager.firstGokkun = "初めて精液を飲む";
  TextManager.firstVagrantFela = "浮浪者さんの排尿手伝い";
  TextManager.vagrantFela2 = "浮浪者さんのおしっこ飲み";
  TextManager.vagrantFela3 = "浮浪者さんにディープフェラ";
  TextManager.firstVagrant = "浮浪者のおじいさんと初H";
  TextManager.vagrantStay = "浮浪者のおじいさんとお泊り";
  TextManager.vagrantAnal = "浮浪者のおじいさんとアナルH";
  TextManager.vagrantH = "浮浪者のおじいさんとH";
  TextManager.bukiyaHistory = "性奴隷契約をした";
  TextManager.mokubaHistory = "三角木馬を初体験";
  TextManager.mokubaHistory2 = "三角木馬で調教";
  TextManager.rinkanHistory = "顔もわからない人たちに輪姦される";
  TextManager.firstYakusou = "薬草売りのお兄さんと初H";
  TextManager.firstRankou = "街で初乱交";
  TextManager.firstKuro = "黒ギャル化";
  TextManager.kuro2 = "黒ギャル化して乱交";
  TextManager.kuro2_bote = "黒ギャルボテ腹で乱交";
  TextManager.kimoOtoko = "キモいおじさんに出させてあげた";
  TextManager.kimoOtoko2 = "キモいおじさんとセックス";
  TextManager.kimoOtoko2_bote = "キモいおじさんとボテ腹H";
  TextManager.rankou2 = "街で乱交プレイ";
  TextManager.rankou3 = "乱交プレイ";
  TextManager.rankou2_bote = "ボテ腹で乱交プレイ";
  TextManager.kuro3 = "黒ギャル化しておねだり";
  TextManager.kuro3_bote = "黒ギャルボテ腹でおねだり";
  TextManager.yadoya1 = "宿屋でレオ様の隣でH";
  TextManager.yadoya2 = "宿屋でレオ様の隣で騎乗位";
  TextManager.yadoya3 = "宿屋でレオ様の隣で種付け";
  TextManager.yadoya4 = "宿屋でレオ様の隣で睡眠姦";
  TextManager.firstPanya = "パン屋のおじさんに手コキ";
  TextManager.pan2 = "パン屋のおじさんと初H";
  TextManager.pan3 = "パン屋でバックでH";
  TextManager.pan4 = "パン屋のおじさんに騎乗位";
  TextManager.pan5 = "パン屋のおじさんとH";
  TextManager.apronHistory = "パン屋のおじさんとH";
  TextManager.apronHistory2 = "宿屋のおじさんとH";
  TextManager.marriage = "%1と結婚";
  TextManager.baisyun = "%1と売春";
  TextManager.reoMesuHistory = "レオくんメス堕ち";
  // Treasure
  TextManager.treasureConfirm = "装備を更新しますか？";
  TextManager.treasureLowerGrade = [
    "下のランクのため、弱くなります。",
    "本当によろしいですか？",
  ];
  TextManager.treasureSameGrade = "同じランクのため、強化値が引き継がれます";
  TextManager.treasureUpperGrade =
    "上のランクのため、強化値の半分が引き継がれます";
  TextManager.treasureSell = [
    "古い装備は自動で売却されます。",
    "よろしいですか？",
  ];
  TextManager.treasureSell2 = "古い装備を%1Ｇで売却しました！";
  TextManager.treasureSell3 = "獲得した装備を%1Ｇで売却しました！";
  getNakadashiTarget = function (type) {
    switch (type) {
      case "keikenVillager":
        return "";
      case "keikenMachi":
        return "街の人";
      case "keikenSakaba":
        return "酒場の客";
      default:
        return "未定義";
    }
  };
  CHITSU_TIGHTENING = {
    1: "締まり抜群、最高の\n極上ロリまんこ",
    2: "まだまだキツキツな\nロリまんこ",
    3: "平均的な締まり具合\n少しこなれてきた感",
    4: "ユルマンといわれる領域に\n達した",
    5: "自他ともに認めるガバガバまんこ\nレオがかわいそう",
  };
  ANAL_TIGHTENING = {
    1: "キツキツアナル。\nほぼ経験なし",
    2: "挿れるのにまだ苦労する、\n締まり良きアナル",
    3: "少しこなれてきた尻穴。\n脱初心者アナル",
    4: "ゆるゆるになったアナル。\n街に数人レベル",
    5: "ガバガバなアナル。\n国に数人いるかレベル",
  };
  ACTOR_RERLATION_MAP = {
    "4_1": { desc: "恋人" },
    "11_1": { desc: "いつもやさしいおじさん" },
    "11_20": { desc: "私の初めての相手" },
    "12_1": { desc: "パンを焼いているおじさん" },
    "12_30": { desc: "私のことを想ってくれるおじさん" },
    "13_1": { desc: "武器を作成してくれるおじさん" },
    "13_30": { desc: "Ｈすると割引してくれるおじさん" },
    "13_40": { desc: "私のご主人さま" },
    "14_1": { desc: "酒場を経営しているおじさん" },
    "15_1": { desc: "足を悪くしたおじいさん" },
    "15_11": { desc: "排尿がうまくいかないおじいさん" },
    "15_31": { desc: "おしっこを飲んであげているおじいさん" },
    "15_41": { desc: "私を便器扱いするおじいさん" },
    "16_1": { desc: "薬草を売りにきているお兄さん" },
    "16_50": { desc: "街に連れて行ってくれるお兄さん" },
    "16_70": { desc: "街で一緒にエッチな遊びをするお兄さん" },
    "18_1": { desc: "近くで遊んでいる子ども" },
    "18_30": { desc: "私が筆おろししてあげた子" },
    "-1_0": { desc: "私を妊娠させた人" },
    "-2_0": { desc: "私の結婚相手" },
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
        return "中出し";
      case "anal":
        return "アナルSEX";
      case "baisyun":
        return "売春";
      case "bukkake":
        return "ぶっかけ";
      case "seiekiNomu":
        return "精液ごっくん";
      case "oshikkoNomu":
        return "おしっこごっくん";
      case "syusan":
        return "出産";
      case "fela":
        return "フェラ";
      case "acme":
        return "絶頂";
    }
    return "";
  };
  getPlaceName = function (id) {
    switch (id) {
      case Destination.Church:
        return "教会";
      case Destination.Inn:
        return "宿屋";
      case Destination.Bakery:
        return "パン屋";
      case Destination.Bar:
        return "酒場";
      case Destination.WeaponShop:
        return "武器屋";
      case Destination.Tent:
        return "浮浪者のテント";
      case Destination.Herborist:
        return "薬草売りの前";
    }
  };
}
