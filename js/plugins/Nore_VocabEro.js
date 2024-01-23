function getTaneoyaName(taneoya) {
  switch (taneoya || $gameSystem.getEro(5).taneoya) {
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 18:
      var name_1 = $gameActors
        .actor(taneoya || $gameSystem.getEro(5).taneoya)
        .name();
      if (!ConfigManager.en && name_1 == "ノア") {
        name_1 = name_1 + "くん";
      }
      return name_1;
  }
  return $gameActors.actor(61).name();
}
function getKekkonName() {
  if ($gameSwitches.value(301)) {
    // ノア
    return $gameActors.actor(18).name();
  }
  if ($gameSwitches.value(302)) {
    // パン屋
    return $gameActors.actor(12).name();
  }
  if ($gameSwitches.value(303)) {
    // 宿屋
    return $gameActors.actor(11).name();
  }
  if ($gameSwitches.value(304)) {
    // 浮浪者
    return $gameActors.actor(15).name();
  }
  if ($gameSwitches.value(305)) {
    // 武器屋
    return $gameActors.actor(13).name();
  }
  if ($gameSwitches.value(306)) {
    // 薬草売り
    return $gameActors.actor(16).name();
  }
  return 0;
}
function getEroStatusTitle(label) {
  switch (label) {
    case "chitsu":
      return "膣";
    case "anal":
      return "アナル";
    case "chikubi":
      return "乳首";
    case "fela":
      return "フェラ";
  }
  return "";
}
function getEroName(itemId) {
  switch (itemId) {
    case Nore.SyusanCommad.VIBE:
      return "手マン";
    case Nore.SyusanCommad.MUCHI:
      return "ムチ";
    case Nore.SyusanCommad.SEX:
      return "セックス";
    case Nore.SyusanCommad.KUPAA:
      return "まんこを開く";
    case Nore.SyusanCommad.ONAKA_NADE:
      return "お腹なで";
    case Nore.SyusanCommad.ONAKA_BUKKAKE:
      return "ぶっかけ(お腹)";
    case Nore.SyusanCommad.KAO_BUKKAKE:
      return "ぶっかけ(顔)";
    case Nore.SyusanCommad.ANAL:
      return TextManager.anal;
    case Nore.SyusanCommad.CHICHIMOMI:
      return "乳首つまみ";
    case Nore.SyusanCommad.CHICHISUI:
      return "乳舐め";
    case Nore.SyusanCommad.AORI:
      return "レオくんあおり";
    case Nore.SyusanCommad.TEMAN:
      return "手マン";
    case Nore.SyusanCommad.KISS:
      return "キス";
    case Nore.SyusanCommad.OSHIKKO:
      return "膣内放尿";
    case Nore.SyusanCommad.HANA:
      return "鼻フック";
    default:
      p(itemId);
      return "";
  }
}
