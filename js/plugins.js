// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins = [
  { name: "Nore_Talk", status: true, description: "", parameters: {} },
  { name: "Nore_Party", status: true, description: "", parameters: {} },
  { name: "Nore_Player", status: true, description: "", parameters: {} },
  { name: "Nore_Cos", status: true, description: "", parameters: {} },
  { name: "Nore_Actor", status: true, description: "", parameters: {} },
  { name: "Nore_Temp", status: true, description: "", parameters: {} },
  { name: "Nore_System", status: true, description: "", parameters: {} },
  {
    name: "Nore_p",
    status: true,
    description: "console.log の別名として p を定義します",
    parameters: {},
  },
  { name: "Nore_Lib", status: true, description: "", parameters: {} },
  {
    name: "Nore_AutoNewGame",
    status: true,
    description: "F6を押した時、自動で NewGame またはゲームロードを行います",
    parameters: { reloadKey: "122", showDevTools: "true", autoConvert: "true" },
  },
  {
    name: "Nore_Tes",
    status: true,
    description:
      "テキストファイルでツクールのイベントを記述するプラグインです。\r\n「睡工房」さんの TES の不完全移植版です。",
    parameters: {
      scenarioFolder: "/../scenario/",
      conversionKey: "117",
      customFadeInOut: "true",
      actor1: "ナナ",
      actor2: "",
      actor3: "",
      actor4: "レオ",
      actor5: "シェリー",
      actor6: "ミヤビ",
      actor7: "客",
      actor8: "客A",
      actor9: "客B",
      actor10: "客C",
      actor11: "宿屋のおじさん",
      actor12: "パン屋のおじさん",
      actor13: "武器屋のおじさん",
      actor14: "酒場のマスター",
      actor15: "浮浪者",
      actor16: "薬草売り",
      actor17: "",
      actor18: "ノア",
      actor19: "ノアの父",
      actor20: "商人",
      actor21: "使用人",
      actor22: "占い師",
      actor23: "チャラい男A",
      actor24: "チャラい男B",
      actor25: "チャラい男C",
      actor26: "酒場の客",
      actor27: "",
      actor28: "",
      actor29: "",
      actor30: "冒険者",
      actor31: "キモいおじさん",
      actor32: "いかつい冒険者",
      actor33: "筋肉質な冒険者",
      actor34: "赤ちゃん",
      actor35: "名も知らぬ男",
      actor36: "おっさんA",
      actor37: "おっさんB",
      actor38: "おっさんC",
      actor39: "村人A",
      actor40: "村人B",
      actor41: "村人C",
      actor42: "村人D",
      actor43: "冒険者A",
      actor44: "冒険者B",
      actor45: "冒険者C",
      actor46: "冒険者D",
      actor47: "ファフニール",
    },
  },
  { name: "Nore_TesValidator", status: true, description: "", parameters: {} },
  {
    name: "Nore_Tachie",
    status: true,
    description: "立ち絵を簡単に表示するプラグインです。別途画像が必要です",
    parameters: {
      disablesTachieActorIdList: "1,2",
      leftPosX: "0",
      rightPosX: "700",
      centerPosX: "200",
      posY: "30",
      actor1offset: "0, 0",
      actor2offset: "0, 0",
      actor3offset: "0, 0",
      actor4offset: "0, 0",
      actor5offset: "0, 0",
      actor6offset: "0, 0",
      actor7offset: "0, 0",
      actor8offset: "0, 0",
      actor9offset: "0, -100",
      actor10offset: "0, 0",
      skipKey: "control",
      windowHideKey: "shift",
      inactiveActorTone: "-80, -80, -80, 0",
      toneChangeDuration: "25",
      windowMargin: "0, 0, 0, 0",
      windowPadding: "0, 0, 0, 0",
    },
  },
  {
    name: "Nore_EventPosition",
    status: true,
    description:
      "イベントの座標を1ピクセル単位で調整します。\r\n張り紙の座標とか、テーブルの上のアイテム座標を調整したいときにどうぞ。",
    parameters: {},
  },
  { name: "Nore_Boot", status: true, description: "", parameters: {} },
  { name: "Nore_Ero", status: true, description: "", parameters: {} },
  { name: "Nore_Performance", status: true, description: "", parameters: {} },
  { name: "Nore_Sprite", status: true, description: "", parameters: {} },
  { name: "Nore_TesPlus", status: true, description: "", parameters: {} },
  { name: "Nore_Window", status: true, description: "", parameters: {} },
  { name: "Nore_EventChar", status: true, description: "", parameters: {} },
  { name: "Nore_Vocab", status: true, description: "", parameters: {} },
  { name: "Nore_Messsage2", status: true, description: "", parameters: {} },
  { name: "Nore_Rogue", status: true, description: "", parameters: {} },
  { name: "Nore_Selectable", status: true, description: "", parameters: {} },
  { name: "Nore_Layout", status: true, description: "", parameters: {} },
  { name: "Nore_Option", status: true, description: "", parameters: {} },
  { name: "Nore_EroImg", status: true, description: "", parameters: {} },
  { name: "Nore_Dialog", status: true, description: "", parameters: {} },
  { name: "RecollectionMode", status: true, description: "", parameters: {} },
  { name: "Nore_EroAnime", status: true, description: "", parameters: {} },
  { name: "Nore_Kigae", status: true, description: "", parameters: {} },
  { name: "Nore_Fukidashi", status: true, description: "", parameters: {} },
  { name: "Nore_Dungeon", status: true, description: "", parameters: {} },
  { name: "Nore_Gauge", status: true, description: "", parameters: {} },
  { name: "Nore_Spriteset", status: true, description: "", parameters: {} },
  { name: "Nore_Ui", status: true, description: "", parameters: {} },
  { name: "Nore_ImageFont", status: true, description: "", parameters: {} },
  { name: "Nore_Map", status: true, description: "", parameters: {} },
  { name: "Nore_Result", status: true, description: "", parameters: {} },
  { name: "Nore_ItemLogWindow", status: true, description: "", parameters: {} },
  { name: "Nore_SikyuSprite", status: true, description: "", parameters: {} },
  { name: "Nore_Shop", status: true, description: "", parameters: {} },
  { name: "Nore_Weapon", status: true, description: "", parameters: {} },
  { name: "Nore_Upgrade", status: true, description: "", parameters: {} },
  { name: "Nore_UpgradeMegami", status: true, description: "", parameters: {} },
  { name: "Nore_Event", status: true, description: "", parameters: {} },
  { name: "Nore_Title", status: true, description: "", parameters: {} },
  { name: "Nore_EroStatus", status: true, description: "", parameters: {} },
  { name: "Nore_RightTachie", status: true, description: "", parameters: {} },
  { name: "Nore_Menu", status: true, description: "", parameters: {} },
  { name: "Nore_VocabEro", status: true, description: "", parameters: {} },
  { name: "Nore_Intimacy", status: true, description: "", parameters: {} },
  { name: "Nore_Medal", status: true, description: "", parameters: {} },
  {
    name: "Nore_BackLog",
    status: true,
    description: "バックログを表示するプラグインです。",
    parameters: {
      backLogButton: "tab",
      marginLeft: "70",
      marginRight: "30",
      nameLeft: "20",
      fontSize: "24",
      scrollSpeed: "5",
      windowHeight: "2000",
      maxLogCount: "50",
      bottmMargin: "50",
      logMargin: "34",
      windowSkin: "WindowBacklog",
      backOpacity: "230",
    },
  },
  { name: "Nore_SeihekiWindow", status: true, description: "", parameters: {} },
  { name: "Nore_GaugeWindow", status: true, description: "", parameters: {} },
  {
    name: "Nore_LayeredCharacter",
    status: true,
    description: "",
    parameters: {},
  },
  { name: "Nore_Ninshin", status: true, description: "", parameters: {} },
  { name: "Nore_DungeonSelect", status: true, description: "", parameters: {} },
  { name: "Nore_Save", status: true, description: "", parameters: {} },
  { name: "Nore_Syusan", status: true, description: "", parameters: {} },
  { name: "Nore_SyusanImage", status: true, description: "", parameters: {} },
  { name: "Nore_Battle", status: true, description: "", parameters: {} },
  { name: "Nore_Damage", status: true, description: "", parameters: {} },
  { name: "Nore_History", status: true, description: "", parameters: {} },
  { name: "Nore_Treasure", status: true, description: "", parameters: {} },
  { name: "Nore_Equip", status: true, description: "", parameters: {} },
  {
    name: "TMAnimeLight",
    status: true,
    description: "イベントにアニメーション付きの明かりを表示します。",
    parameters: { range: "0.1", defaultZ: "4", frames: "30" },
  },
  { name: "Nore_Taikenban", status: true, description: "", parameters: {} },
  { name: "Nore_VocabEn", status: true, description: "", parameters: {} },
  { name: "Nore_Button", status: true, description: "", parameters: {} },
  { name: "Nore_Warp", status: true, description: "", parameters: {} },
  { name: "Nore_Jusei", status: true, description: "", parameters: {} },
  {
    name: "Mano_InputConfig",
    status: true,
    description:
      "ゲームの操作に関する機能をまとめて管理します。\r\nユーザーによる拡張も支援します。",
    parameters: {
      color: '{"normal":"#880000","mandatory":"#22e488","move":"#22e488"}',
      basicOk:
        '{"name":"{\\"jp\\":\\"決定\\",\\"en\\":\\"OK\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      basicCancel:
        '{"name":"{\\"jp\\":\\"キャンセル\\",\\"en\\":\\"cancel\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      basicShift:
        '{"name":"{\\"jp\\":\\"ダッシュ\\",\\"en\\":\\"dash\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      basicMenu:
        '{"name":"{\\"jp\\":\\"メニュー\\",\\"en\\":\\"menu\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      basicEscape:
        '{"name":"{\\"jp\\":\\"メニュー/キャンセル\\",\\"en\\":\\"menu/cancel\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      basicPageup:
        '{"name":"{\\"jp\\":\\"次\\",\\"en\\":\\"next\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      basicPagedown:
        '{"name":"{\\"jp\\":\\"前\\",\\"en\\":\\"prev\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      mapperDelete: '{"en":"delete","jp":"設定を消去"}',
      extendsMapper: "[]",
      GamepadIsNotConnectedText:
        '{"jp":"\\"ゲームパッドが接続されていません\\\\nボタンを押して再度試してください\\"","en":"\\"The gamepad is not connected.\\\\nPress the button and try again.\\""}',
      needButtonDetouchText:
        '{"jp":"\\"コンフィグを終了するために、\\\\nボタンから手を放してください。\\"","en":"\\"Release the button to exit the config.\\""}',
      apply:
        '{"width":"4","text":"{\\"jp\\":\\"設定を保存\\",\\"en\\":\\"save settings\\"}"}',
      rollback:
        '{"width":"4","text":"{\\"jp\\":\\"変更前に戻す\\",\\"en\\":\\"rollback\\"}"}',
      reset:
        '{"width":"4","text":"{\\"jp\\":\\"初期設定に戻す\\",\\"en\\":\\"reset\\"}"}',
      WASD: '{"width":"3","text":"{\\"jp\\":\\"WASD\\",\\"en\\":\\"WASD\\"}"}',
      style:
        '{"width":"3","text":"{\\"jp\\":\\"設定方法変更\\",\\"en\\":\\"Change setting style\\"}"}',
      changeLayout:
        '{"width":"3","text":"{\\"jp\\":\\"JIS/US\\",\\"en\\":\\"JIS/US\\"}"}',
      exit: '{"width":"3","text":"{\\"jp\\":\\"やめる\\",\\"en\\":\\"exit\\"}"}',
      gamepadConfigCommandText:
        '{"en":"gamepad config","jp":"ゲームパッドコンフィグ"}',
      keyConfigCommandText: '{"en":"keyboard config","jp":"キーコンフィグ"}',
      gamepadBackground: "",
      keyBackground: "",
      SettingsForYEP_OptionsCore: '{"gamepad":"true","Keyboard":"true"}',
    },
  },
  { name: "Nore_Omake", status: true, description: "", parameters: {} },
  {
    name: "Mano_InputConfig",
    status: true,
    description:
      "ゲームの操作に関する機能をまとめて管理します。\r\nユーザーによる拡張も支援します。",
    parameters: {
      color: '{"normal":"#880000","mandatory":"#22e488","move":"#22e488"}',
      basicOk:
        '{"name":"{\\"jp\\":\\"決定\\",\\"en\\":\\"OK\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      basicCancel:
        '{"name":"{\\"jp\\":\\"キャンセル\\",\\"en\\":\\"cancel\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      basicShift:
        '{"name":"{\\"jp\\":\\"ダッシュ\\",\\"en\\":\\"dash\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      basicMenu:
        '{"name":"{\\"jp\\":\\"メニュー\\",\\"en\\":\\"menu\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      basicEscape:
        '{"name":"{\\"jp\\":\\"メニュー/キャンセル\\",\\"en\\":\\"menu/cancel\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      basicPageup:
        '{"name":"{\\"jp\\":\\"次\\",\\"en\\":\\"next\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      basicPagedown:
        '{"name":"{\\"jp\\":\\"前\\",\\"en\\":\\"prev\\"}","keyText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}","helpText":"{\\"jp\\":\\"\\",\\"en\\":\\"\\"}"}',
      mapperDelete: '{"en":"delete","jp":"設定を消去"}',
      extendsMapper: "[]",
      GamepadIsNotConnectedText:
        '{"jp":"\\"ゲームパッドが接続されていません\\\\nボタンを押して再度試してください\\"","en":"\\"The gamepad is not connected.\\\\nPress the button and try again.\\""}',
      needButtonDetouchText:
        '{"jp":"\\"コンフィグを終了するために、\\\\nボタンから手を放してください。\\"","en":"\\"Release the button to exit the config.\\""}',
      apply:
        '{"width":"4","text":"{\\"jp\\":\\"設定を保存\\",\\"en\\":\\"save settings\\"}"}',
      rollback:
        '{"width":"4","text":"{\\"jp\\":\\"変更前に戻す\\",\\"en\\":\\"rollback\\"}"}',
      reset:
        '{"width":"4","text":"{\\"jp\\":\\"初期設定に戻す\\",\\"en\\":\\"reset\\"}"}',
      WASD: '{"width":"3","text":"{\\"jp\\":\\"WASD\\",\\"en\\":\\"WASD\\"}"}',
      style:
        '{"width":"3","text":"{\\"jp\\":\\"設定方法変更\\",\\"en\\":\\"Change setting style\\"}"}',
      changeLayout:
        '{"width":"3","text":"{\\"jp\\":\\"JIS/US\\",\\"en\\":\\"JIS/US\\"}"}',
      exit: '{"width":"3","text":"{\\"jp\\":\\"やめる\\",\\"en\\":\\"exit\\"}"}',
      gamepadConfigCommandText:
        '{"en":"gamepad config","jp":"ゲームパッドコンフィグ"}',
      keyConfigCommandText: '{"en":"keyboard config","jp":"キーコンフィグ"}',
      gamepadBackground: "",
      keyBackground: "",
      SettingsForYEP_OptionsCore: '{"gamepad":"true","Keyboard":"true"}',
    },
  },
];
