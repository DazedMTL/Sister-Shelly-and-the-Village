//=============================================================================
// RecollectionMode.js
// Copyright (c) 2015 rinne_grid
// This plugin is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc 回想モード機能を追加します。
 * @author rinne_grid
 *
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * @command reco
 * @text 回想登録
 * @des 回想登録
 * @arg id
 * @type number
 */
{
  const pluginName = "RecollectionMode";
  PluginManager.registerCommand(pluginName, "reco", function (args) {
    recoGlobal(parseInt(args.id));
  });
}
//-----------------------------------------------------------------------------
// ◆ プラグイン設定
//-----------------------------------------------------------------------------

var rngd_recollection_mode_settings = {
  //---------------------------------------------------------------------
  // ★ 回想モードで再生するBGMの設定をします
  //---------------------------------------------------------------------
  rec_mode_bgm: {
    bgm: {
      name: "omoi",
      pan: 0,
      pitch: 100,
      volume: 90,
    },
  },
  //---------------------------------------------------------------------
  // ★ 回想CG選択ウィンドウの設定を指定します
  //---------------------------------------------------------------------
  rec_mode_window: {
    x: 200,
    y: 100,
    recollection_title: "回想モード",
    str_select_recollection: "回想を見る",
    str_select_cg: "CGを見る",
    str_select_back_title: "タイトルに戻る",
  },
  //---------------------------------------------------------------------
  // ★ 回想リストウィンドウの設定を指定します
  //---------------------------------------------------------------------
  rec_list_window: {
    // 1画面に表示する縦の数
    item_height: 3,
    // 1画面に表示する横の数
    item_width: 4,
    // 1枚のCGに説明テキストを表示するかどうか
    show_title_text: true,
    // タイトルテキストの表示位置(left:左寄せ、center:中央、right:右寄せ）
    title_text_align: "center",
    // 閲覧したことのないCGの場合に表示するピクチャファイル名
    never_watch_picture_name: "never_watch_picture",
    // 閲覧したことのないCGのタイトルテキスト
    never_watch_title_text: "",
  },
  //---------------------------------------------------------------------
  // ★ 回想用のCGを指定します
  //---------------------------------------------------------------------
  rec_cg_set: [
    /*{
                'title': '冒険者２',
                'thumbnail': '01_09_01',
                'pictures': ['01', 
                {
                    pic: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                }, 
                {
                    pic: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 29, 29, 28, 28, 27, 27, 26, 26, 25, 25, 24, 24, 23, 23, 22, 22, 21],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                },
                {
                    pic: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 39, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 34, 33, 33, 32, 32, 31],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                },
                '50'
                ],
                'common_event_id': 909,
                'switch_id': 909,
            },*/

    {
      title: "レオに手コキ",
      thumbnail: "01_01",
      pictures: ["01", "02", "03"],
      common_event_id: 901,
      switch_id: 901,
      hint: "レオに手コキをする",
    },
    {
      title: "レオとキス",
      thumbnail: "01_13_201",
      pictures: ["01", "02", "03"],
      common_event_id: 758,
      switch_id: 758,
      hint: "レオとキスをする",
    },
    {
      title: "レオにフェラ",
      thumbnail: "01_63",
      pictures: ["01", "02", "03"],
      common_event_id: 963,
      switch_id: 963,
      hint: "レオにフェラをする",
    },
    {
      title: "レオとエッチ",
      thumbnail: "01_64",
      pictures: ["01", "02", "03"],
      common_event_id: 964,
      switch_id: 964,
      hint: "レオとエッチをする",
    },
    {
      title: "レオとお帰りのキス",
      thumbnail: "01_13_201",
      pictures: ["01", "02", "03"],
      common_event_id: 759,
      switch_id: 759,
      hint: "レオとキスをする",
    },
    {
      title: "処女喪失",
      thumbnail: "01_04",
      pictures: ["01", "02", "03"],
      common_event_id: 904,
      switch_id: 904,
      hint: "処女喪失する",
    },
    {
      title: "宿屋2",
      thumbnail: "01_05",
      pictures: ["01", "02", "03"],
      common_event_id: 905,
      switch_id: 905,
      hint: "宿屋のイベントを進める",
    },
    {
      title: "宿屋3",
      thumbnail: "01_07",
      pictures: ["01", "02", "03"],
      common_event_id: 907,
      switch_id: 907,
      hint: "宿屋のイベントを進める",
    },
    {
      title: "宿屋4",
      thumbnail: "01_21",
      pictures: ["01", "02", "03"],
      common_event_id: 921,
      switch_id: 921,
      hint: "宿屋のイベントを進める",
    },
    {
      title: "宿屋5",
      thumbnail: "01_02",
      pictures: ["01", "02", "03"],
      common_event_id: 902,
      switch_id: 902,
      hint: "宿屋のイベントを進める",
    },
    {
      title: "宿屋6",
      thumbnail: "01_32",
      pictures: ["01", "02", "03"],
      common_event_id: 933,
      switch_id: 933,
      hint: "宿屋のイベントを進める",
    },
    {
      title: "ノアくん1",
      thumbnail: "01_55",
      pictures: ["01", "02", "03"],
      common_event_id: 955,
      switch_id: 955,
      hint: "ノアくんのイベントを進める",
    },
    {
      title: "ノアくん2",
      thumbnail: "01_27",
      pictures: ["01", "02", "03"],
      common_event_id: 927,
      switch_id: 927,
      hint: "ノアくんのイベントを進める",
    },
    {
      title: "ノアくん3",
      thumbnail: "01_09",
      pictures: ["01", "02", "03"],
      common_event_id: 909,
      switch_id: 909,
      hint: "ノアくんのイベントを進める",
    },
    {
      title: "ノアくん4",
      thumbnail: "01_56",
      pictures: ["01", "02", "03"],
      common_event_id: 956,
      switch_id: 956,
      hint: "ノアくんのイベントを進める",
    },
    {
      title: "ノアくん5",
      thumbnail: "01_28",
      pictures: ["01", "02", "03"],
      common_event_id: 928,
      switch_id: 928,
      hint: "ノアくんのイベントを進める",
    },
    {
      title: "パン屋1",
      thumbnail: "01_01_02",
      pictures: ["01", "02", "03"],
      common_event_id: 951,
      switch_id: 951,
      hint: "パン屋のイベントを進める",
    },
    {
      title: "パン屋2",
      thumbnail: "01_24",
      pictures: ["01", "02", "03"],
      common_event_id: 924,
      switch_id: 924,
      hint: "パン屋のイベントを進める",
    },
    {
      title: "パン屋3",
      thumbnail: "01_23",
      pictures: ["01", "02", "03"],
      common_event_id: 923,
      switch_id: 923,
      hint: "パン屋のイベントを進める",
    },
    {
      title: "パン屋4",
      thumbnail: "01_52",
      pictures: ["01", "02", "03"],
      common_event_id: 952,
      switch_id: 952,
      hint: "パン屋のイベントを進める",
    },
    {
      title: "パン屋5",
      thumbnail: "01_20",
      pictures: ["01", "02", "03"],
      common_event_id: 920,
      switch_id: 920,
      hint: "パン屋のイベントを進める",
    },
    {
      title: "パン屋6",
      thumbnail: "01_32",
      pictures: ["01", "02", "03"],
      common_event_id: 932,
      switch_id: 932,
      hint: "パン屋のイベントを進める",
    },
    {
      title: "メス犬デビュー",
      thumbnail: "01_10",
      pictures: ["01", "02", "03"],
      common_event_id: 910,
      switch_id: 910,
      hint: "武器屋のイベントを進める",
    },
    {
      title: "メスブタデビュー",
      thumbnail: "01_14",
      pictures: ["01", "02", "03"],
      common_event_id: 914,
      switch_id: 914,
      hint: "武器屋のイベントを進める",
    },

    {
      title: "メスブタ散歩",
      thumbnail: "01_25",
      pictures: ["01", "02", "03"],
      common_event_id: 925,
      switch_id: 925,
      hint: "武器屋のイベントを進める",
    },
    {
      title: "三角木馬調教",
      thumbnail: "01_30",
      pictures: ["01", "02", "03"],
      common_event_id: 930,
      switch_id: 930,
      hint: "武器屋のイベントを進める",
    },
    {
      title: "メスブタ輪姦",
      thumbnail: "01_29",
      pictures: ["01", "02", "03"],
      common_event_id: 929,
      switch_id: 929,
      hint: "武器屋のイベントを進める",
    },
    {
      title: "じじいとフェラ",
      thumbnail: "01_13",
      pictures: ["01", "02", "03"],
      common_event_id: 751,
      switch_id: 751,
      hint: "浮浪者のイベントを進める",
    },
    {
      title: "じじいと体操服で",
      thumbnail: "01_08",
      pictures: ["01", "02", "03"],
      common_event_id: 908,
      switch_id: 908,
      hint: "浮浪者のイベントを進める",
    },
    {
      title: "じじいとアナルセックス",
      thumbnail: "01_60",
      pictures: ["01", "02", "03"],
      common_event_id: 960,
      switch_id: 960,
      hint: "浮浪者のイベントを進める",
    },
    {
      title: "じじいとセーラー服H",
      thumbnail: "01_11",
      pictures: ["01", "02", "03"],
      common_event_id: 911,
      switch_id: 911,
      hint: "浮浪者のイベントを進める",
    },
    {
      title: "じじいと朝までセックス",
      thumbnail: "01_53",
      pictures: ["01", "02", "03"],
      common_event_id: 953,
      switch_id: 953,
      hint: "浮浪者のイベントを進める",
    },

    {
      title: "薬草売りのお兄さんと",
      thumbnail: "01_15",
      pictures: ["01", "02", "03"],
      common_event_id: 915,
      switch_id: 915,
      hint: "薬草売りのイベントを進める",
    },
    {
      title: "お兄さんに連れられて",
      thumbnail: "01_12",
      pictures: ["01", "02", "03"],
      common_event_id: 912,
      switch_id: 912,
      hint: "薬草売りのイベントを進める",
    },
    {
      title: "お兄さんに連れられて2",
      thumbnail: "01_17",
      pictures: ["01", "02", "03"],
      common_event_id: 917,
      switch_id: 917,
      hint: "薬草売りのイベントを進める",
    },
    {
      title: "お兄さんに連れられて3",
      thumbnail: "01_19",
      pictures: ["01", "02", "03"],
      common_event_id: 919,
      switch_id: 919,
      hint: "薬草売りのイベントを進める",
    },
    {
      title: "お兄さんに連れられて4",
      thumbnail: "01_26",
      pictures: ["01", "02", "03"],
      common_event_id: 926,
      switch_id: 926,
      hint: "薬草売りのイベントを進める",
    },
    {
      title: "お兄さんに連れられて５",
      thumbnail: "01_65",
      pictures: ["01", "02", "03"],
      common_event_id: 965,
      switch_id: 965,
      hint: "薬草売りのイベントを進める",
    },
    {
      title: "酒場バイト(手コキ)",
      thumbnail: "01_16",
      pictures: ["01", "02", "03"],
      common_event_id: 761,
      switch_id: 761,
      hint: "酒場のバイトを１回行う",
    },
    {
      title: "酒場バイト(フェラ)",
      thumbnail: "01_16_2",
      pictures: ["01", "02", "03"],
      common_event_id: 766,
      switch_id: 766,
      hint: "酒場のバイトを２回行う",
    },
    {
      title: "酒場バイト(アナルなめ)",
      thumbnail: "01_16_3",
      pictures: ["01", "02", "03"],
      common_event_id: 771,
      switch_id: 771,
      hint: "酒場のバイトを３回行う",
    },
    {
      title: "酒場バイト(生本番)",
      thumbnail: "01_18",
      pictures: ["01", "02", "03"],
      common_event_id: 918,
      switch_id: 918,
      hint: "酒場のバイトを進める",
    },
    {
      title: "酒場バイト(便所）",
      thumbnail: "01_06",
      pictures: ["01", "02", "03"],
      common_event_id: 906,
      switch_id: 906,
      hint: "酒場のバイトを進める",
    },
    {
      title: "酒場バイト(オナホ）",
      thumbnail: "01_03",
      pictures: ["01", "02", "03"],
      common_event_id: 903,
      switch_id: 903,
      hint: "酒場のバイトを進める",
    },
    {
      title: "レオくんメス堕ち",
      thumbnail: "03_02",
      pictures: ["01", "02", "03"],
      common_event_id: 935,
      switch_id: 935,
      hint: "酒場のバイトを進める",
    },
    {
      title: "売春1",
      thumbnail: "01_58",
      pictures: ["01", "02", "03"],
      common_event_id: 958,
      switch_id: 958,
      hint: "街で売春する",
    },
    {
      title: "売春2",
      thumbnail: "01_59",
      pictures: ["01", "02", "03"],
      common_event_id: 959,
      switch_id: 959,
      hint: "街で売春する",
    },
    {
      title: "出産",
      thumbnail: "01_22",
      pictures: ["01", "02", "03"],
      common_event_id: 851,
      switch_id: 851,
      hint: "出産する",
    },
    {
      title: "授乳",
      thumbnail: "01_31",
      pictures: ["01", "02", "03"],
      common_event_id: 216,
      switch_id: 216,
      hint: "授乳する",
    },
    {
      title: "求婚",
      thumbnail: "01_57",
      pictures: ["01", "02", "03"],
      common_event_id: 717,
      switch_id: 717,
      hint: "求婚される",
    },
    {
      title: "結婚H",
      thumbnail: "01_61",
      pictures: ["01", "02", "03"],
      common_event_id: 718,
      switch_id: 722,
      hint: "結婚する",
    },
    {
      title: "結婚後H",
      thumbnail: "01_66",
      pictures: ["01", "02", "03"],
      common_event_id: 704,
      switch_id: 704,
      hint: "結婚後に夫とHする",
    },
    {
      title: "エンディング",
      thumbnail: "01_64_bote",
      pictures: ["01", "02", "03"],
      common_event_id: 831,
      switch_id: 831,
      hint: "ゲームをクリアする",
    },
  ],
  //---------------------------------------------------------------------
  // ★ 回想時に一時的に利用するマップIDを指定します
  //---------------------------------------------------------------------
  // 通常は何もないマップを指定します
  //---------------------------------------------------------------------
  sandbox_map_id: 28,
};

function rngd_hash_size(obj) {
  var cnt = 0;
  for (var o in obj) {
    cnt++;
  }
  return cnt;
}

//-----------------------------------------------------------------------------
// ◆ Scene関数
//-----------------------------------------------------------------------------

//=========================================================================
// ■ Scene_Recollection
//=========================================================================
// 回想用のシーン関数です
//=========================================================================
function Scene_Recollection() {
  this.initialize.apply(this, arguments);
}

Scene_Recollection.prototype = Object.create(Scene_Base.prototype);
Scene_Recollection.prototype.constructor = Scene_Recollection;

Scene_Recollection.prototype.initialize = function () {
  Scene_Base.prototype.initialize.call(this);
};

Scene_Recollection.prototype.create = function () {
  Scene_Base.prototype.create.call(this);
  this.createWindowLayer();
  this.createCommandWindow();
};

// 回想モードのカーソル
Scene_Recollection.rec_list_index = 0;

// 回想モードの再読み込み判定用 true: コマンドウィンドウを表示せず回想リストを表示 false:コマンドウィンドウを表示
Scene_Recollection.reload_rec_list = false;

Scene_Recollection.prototype.createCommandWindow = function () {
  // 回想モード選択ウィンドウ
  /*this._rec_window = new Window_RecollectionCommand();
        this._rec_window.setHandler('select_recollection', this.commandShowRecollection.bind(this));
        this._rec_window.setHandler('select_cg', this.commandShowCg.bind(this));
        this._rec_window.setHandler('select_back_title', this.commandBackTitle.bind(this));
        this._rec_window.setHandler('cancel', this.commandBackTitle.bind(this));

        this.addWindow(this._rec_window);*/

  // 回想リスト
  this._rec_list = new Window_RecList(-4, -4, Graphics.width, Graphics.height);

  // リロードの場合：回想リストを表示にする。通常はここがfalse
  if (Scene_Recollection.reload_rec_list) {
    //this._rec_window.deactivate();
    //this._rec_window.visible = false;
    this._rec_list.visible = true;
    this._rec_list.activate();
  } else {
    //this._rec_window.activate();
    //this._rec_window.visible = true;
    this._rec_list.visible = false;
    this._rec_list.deactivate();
  }
  this._rec_list.setHandler("ok", this.commandDoRecMode.bind(this));
  this._rec_list.setHandler("cancel", this.commandBackSelectMode.bind(this));
  this._mode = "recollection";
  this._rec_list.select(Scene_Recollection.rec_list_index);

  this.addWindow(this._rec_list);

  // CG参照用ダミーコマンド
  this._dummy_window = new Window_Command(new Rectangle(0, 0, 0, 0));
  this._dummy_window.isCurrentItemEnabled = function () {
    return true;
  };
  this._dummy_window.deactivate();
  this._dummy_window.visible = false;
  this._dummy_window.setHandler("ok", this.commandDummyOk.bind(this));
  this._dummy_window.setHandler("cancel", this.commandDummyCancel.bind(this));
  this._dummy_window.addCommand("next", "ok");
  this.addWindow(this._dummy_window);
  Scene_Recollection.reload_rec_list = false;

  this._dummy_window.isTouchedInsideFrame = function () {
    return true;
  };
  this._dummy_window.onTouch = function (triggered) {
    if (triggered) {
      this.processOk();
    }
  };
  this.commandShowRecollection();
};

function Window_RecCommand() {
  this.initialize.apply(this, arguments);
}

Window_RecCommand.prototype = Object.create(Window_Command.prototype);
Window_RecCommand.prototype.constructor = Window_RecCommand;
Window_RecCommand.prototype.initialize = function () {
  Window_Command.prototype.initialize.call(this, 0, 0);
};
Window_RecCommand.prototype.playOkSound = function () {};
Window_RecCommand.prototype.processCancel = function () {
  this.updateInputData();
  this.deactivate();
  this.callCancelHandler();
};
//-------------------------------------------------------------------------
// ● 開始処理
//-------------------------------------------------------------------------
Scene_Recollection.prototype.start = function () {
  Scene_Base.prototype.start.call(this);
  // this._rec_window.refresh();
  this._rec_list.refresh();
  AudioManager.playBgm(rngd_recollection_mode_settings.rec_mode_bgm.bgm);
  Scene_Recollection._rngd_recollection_doing = false;
};

//-------------------------------------------------------------------------
// ● 更新処理
//-------------------------------------------------------------------------
Scene_Recollection.prototype.update = function () {
  Scene_Base.prototype.update.call(this);
};

//-------------------------------------------------------------------------
// ● 「回想を見る」を選択した際のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandShowRecollection = function () {
  // モードウィンドウの無効化とリストウィンドウの有効化
  this._mode = "recollection";
  this._rec_list._mode = this._mode;
  this.do_exchange_status_window(this._rec_window, this._rec_list);
};

//-------------------------------------------------------------------------
// ● 「CGを見る」を選択した際のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandShowCg = function () {
  this._mode = "cg";
  this._rec_list._mode = this._mode;
  this.do_exchange_status_window(this._rec_window, this._rec_list);
  Scene_Recollection.reload_rec_list = false;
};

//-------------------------------------------------------------------------
// ● 「タイトルに戻る」を選択した際のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandBackTitle = function () {
  Scene_Recollection.rec_list_index = 0;
  SceneManager.goto(Scene_Title);
};

//-------------------------------------------------------------------------
// ● 回想orCGモードから「キャンセル」して前の画面に戻った場合のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandBackSelectMode = function () {
  SceneManager.goto(Scene_Title);

  //this.do_exchange_status_window(this._rec_list, this._rec_window);
};

//-------------------------------------------------------------------------
// ● 回想orCGモードにおいて、実際の回想orCGを選択した場合のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandDoRecMode = function () {
  var target_index = this._rec_list.index();
  Scene_Recollection.rec_list_index = target_index;
  $gameTemp.ignoreFiles = {};
  $gameTemp.eroBack = null;

  if (this._rec_list.is_valid_picture(this._rec_list.index())) {
    // 回想モードの場合
    if (this._mode == "recollection") {
      Scene_Recollection._rngd_recollection_doing = true;

      DataManager.setupNewGame();
      $gamePlayer.setTransparent(255);
      this.fadeOutAll();
      // TODO: パーティを透明状態にする

      //$dataSystem.optTransparent = false;
      var commonEventId =
        rngd_recollection_mode_settings.rec_cg_set[target_index][
          "common_event_id"
        ];
      $gameTemp.reserveCommonEvent(commonEventId);
      $gamePlayer.reserveTransfer(
        rngd_recollection_mode_settings.sandbox_map_id,
        0,
        0,
        0
      );
      $gameSwitches.setValue(999, true);
      sessionStorage.setItem("noreCommonEventId", commonEventId);
      sessionStorage.setItem(
        "norePlayerMap",
        rngd_recollection_mode_settings.sandbox_map_id
      );

      SceneManager.push(Scene_Map);

      // CGモードの場合
    } else if (this._mode == "cg") {
      Scene_Recollection._rngd_recollection_doing = false;
      this._cg_sprites = [];
      this._cg_sprites_index = 0;
      var obj = rngd_recollection_mode_settings.rec_cg_set[target_index];
      $gameTemp.addIgnoreFiles(obj.ignore);
      // シーン画像をロードする
      var n = 15;
      var file = obj.thumbnail.substr(0, 5);
      var self = this;
      var texture = PIXI.utils.TextureCache[file + "_01_01.png"];
      if (texture) {
        onComp();
      } else {
        var file2 = "img/ero/ero" + file + ".json";
        if (obj.file) {
          file2 = "img/ero/ero" + obj.file + ".json";
        }
        ImageManager.loadSpriteSheet(file2, onComp);
        if (obj.file2) {
          ImageManager.loadSpriteSheet("img/ero/ero" + obj.file2 + ".json");
        }
      }
      if (obj.back) {
        $gameTemp.eroBack = obj.back;
      }

      function getFileName(id) {
        if (id == "se") {
          return "se";
        }
        if (id < 10) {
          return file + "_0" + id;
        } else {
          return file + "_" + id;
        }
      }
      function onComp() {
        obj.pictures.forEach(function (name) {
          var sp = new Sprite_Picture(n);

          if (typeof name == "string") {
            var picFile = file + "_" + name;
            $gameScreen.showPicture(
              n,
              Saba.SimpleScenario.webpPrefix + picFile,
              0,
              0,
              0,
              100,
              100,
              255,
              0
            );
          } else if (typeof name == "number") {
            $gameScreen.showPicture(
              n,
              Saba.SimpleScenario.webpPrefix + getFileName(name),
              0,
              0,
              0,
              100,
              100,
              255,
              0
            );
          } else {
            var json = JSON.parse(JSON.stringify(name));
            var names = json.pic;
            var nameList = [];
            for (var i = 0; i < names.length; i++) {
              nameList.push(getFileName(names[i]));
            }
            if (json.reverse) {
              for (var i = names.length - 1; i >= 0; i--) {
                nameList.push(getFileName(names[i]));
              }
            }
            json.pic = nameList;
            if (json.seIndex == undefined) {
              json.seIndex = -1;
            }
            p(JSON.stringify(json));
            var picFile = JSON.stringify(json);
            $gameScreen.showPicture(
              n,
              Saba.SimpleScenario.webpPrefix + picFile,
              0,
              0,
              0,
              100,
              100,
              255,
              0
            );
          }

          //var pic = $gameScreen.picture(n);
          //sp.bitmap = ImageManager.loadSabaJpeg(name);
          // 最初のSprite以外は見えないようにする
          if (self._cg_sprites.length > 0) {
            sp.invisible = true;
          }

          // TODO: 画面サイズにあわせて、拡大・縮小すべき
          self._cg_sprites.push(sp);
          self.addChild(sp);
          n++;
        }, self);
      }

      this.do_exchange_status_window(this._rec_list, this._dummy_window);
      this._dummy_window.visible = false;
      this._dummy_window.activate();
    }
  } else {
    this._rec_list.activate();
  }
  this._rec_list.refresh();
};

Scene_Recollection.prototype.commandDummyOk = function () {
  if (this._cg_sprites_index < this._cg_sprites.length - 1) {
    this._cg_sprites[this._cg_sprites_index].invisible = true;
    this._cg_sprites_index++;
    this._cg_sprites[this._cg_sprites_index].invisible = false;
    this._dummy_window.activate();
    SoundManager.playOk();
  } else {
    if (this._cg_sprites.length == 0) {
      this._dummy_window.activate();
      return;
    }
    SoundManager.playOk();
    this.clearCg();
    this.do_exchange_status_window(this._dummy_window, this._rec_list);
  }
};
Scene_Recollection.prototype.clearCg = function () {
  $gameScreen.clearPictures();
  for (var i = 0; i < this._cg_sprites.length; i++) {
    var sp = this._cg_sprites[i];
    sp.invisible = true;
    this.removeChild(sp);
  }
  this._cg_sprites = [];
};
Scene_Recollection.prototype.commandDummyCancel = function () {
  if (this._cg_sprites_index == 0) {
    SoundManager.playCancel();
    this.clearCg();
    this.do_exchange_status_window(this._dummy_window, this._rec_list);
  } else {
    this._cg_sprites[this._cg_sprites_index].invisible = true;
    this._cg_sprites_index--;
    this._cg_sprites[this._cg_sprites_index].invisible = false;
    this._dummy_window.activate();
    SoundManager.playOk();
  }
};

// コモンイベントから呼び出す関数
Scene_Recollection.prototype.rngd_exit_scene = function () {
  if (Scene_Recollection._rngd_recollection_doing) {
    // Window_RecListを表示する
    Scene_Recollection.reload_rec_list = true;
    SceneManager.push(Scene_Recollection);
  }
};

//-------------------------------------------------------------------------
// ● ウィンドウの無効化と有効化
//-------------------------------------------------------------------------
// win1: 無効化するウィンドウ
// win2: 有効化するウィンドウ
//-------------------------------------------------------------------------
Scene_Recollection.prototype.do_exchange_status_window = function (win1, win2) {
  if (win1) {
    win1.deactivate();
    win1.visible = false;
  }
  if (win2) {
    win2.activate();
    win2.refresh();
    win2.visible = true;
  }
};

//-----------------------------------------------------------------------------
// ◆ Window関数
//-----------------------------------------------------------------------------

//=========================================================================
// ■ Window_RecollectionCommand
//=========================================================================
// 回想モードかCGモードを選択するウィンドウです
//=========================================================================
function Window_RecollectionCommand() {
  this.initialize.apply(this, arguments);
}

Window_RecollectionCommand.prototype = Object.create(Window_Command.prototype);
Window_RecollectionCommand.prototype.constructor = Window_RecollectionCommand;

Window_RecollectionCommand.prototype.initialize = function () {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.x = rngd_recollection_mode_settings.rec_mode_window.x;
  this.y = rngd_recollection_mode_settings.rec_mode_window.y;
};

Window_RecollectionCommand.prototype.makeCommandList = function () {
  Window_Command.prototype.makeCommandList.call(this);
  this.addCommand(
    rngd_recollection_mode_settings.rec_mode_window.str_select_recollection,
    "select_recollection"
  );
  this.addCommand(
    rngd_recollection_mode_settings.rec_mode_window.str_select_cg,
    "select_cg"
  );
  this.addCommand(
    rngd_recollection_mode_settings.rec_mode_window.str_select_back_title,
    "select_back_title"
  );
};

//=========================================================================
// ■ Window_RecollectionList
//=========================================================================
// 回想またはCGを選択するウィンドウです
//=========================================================================
function Window_RecList() {
  this.initialize.apply(this, arguments);
}

Window_RecList.prototype = Object.create(Window_Selectable.prototype);
Window_RecList.prototype.constructor = Window_RecList;

//-------------------------------------------------------------------------
// ● 初期化処理
//-------------------------------------------------------------------------
Window_RecList.prototype.initialize = function (x, y, width, height) {
  Window_Selectable.prototype.initialize.call(
    this,
    new Rectangle(x, y, width, height)
  );
  this.windowWidth = width;
  this.windowHeight = height;
  this.select(0);
  this._formationMode = false;
  this.get_global_variables();
  var infos = rngd_recollection_mode_settings.rec_cg_set;
  for (var i = 0; i < infos.length; i++) {
    var info = infos[i];
    if (
      this._global_variables["switches"][info.switch_id] ||
      (Nore.SHOW_ALL && !$gameSystem.getTaikenabnFlag())
    ) {
      var bmpName = info.thumbnail;
      var bmp = ImageManager.loadEro(bmpName);
    }
  }
  ImageManager.loadEro("never_watch_picture");
  this.refresh();
};
Window_RecList.prototype.standardPadding = function () {
  return 4;
};
Window_RecList.prototype.refresh = function () {
  this._windowContentsSprite.removeChildren();
  Window_Selectable.prototype.refresh.call(this);
};

Window_RecList.prototype.maxItems = function () {
  var n = rngd_recollection_mode_settings.rec_cg_set.length;
  if (this._mode == "cg") {
    return n - 2;
  } else {
    return n;
  }
};

Window_RecList.prototype.itemHeight = function () {
  return 258;
};

//Window_RecList.prototype.maxRows = function() {
//    return rngd_recollection_mode_settings.rec_list_window.item_height;
//};

Window_RecList.prototype.maxCols = function () {
  return 4;
};

Window_RecList.prototype.colSpacing = function () {
  return 0;
};
Window_RecList.prototype.maxPageRows = function () {
  var pageHeight = this.height; // - this.padding * 2;
  return Math.floor(pageHeight / this.itemHeight());
};
Window_RecList.prototype.itemRect = function (index) {
  const maxCols = this.maxCols();
  const itemWidth = this.itemWidth();
  const itemHeight = this.itemHeight();
  const colSpacing = this.colSpacing();
  const rowSpacing = this.rowSpacing();
  const col = index % maxCols;
  const row = Math.floor(index / maxCols);
  const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
  const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
  const width = itemWidth - colSpacing + 2;
  const height = itemHeight - rowSpacing;
  return new Rectangle(x, y, width, height);
};
Window_RecList.prototype.drawItem = function (index) {
  // 1番目のCGセットを取得
  var rec_cg = rngd_recollection_mode_settings.rec_cg_set[index];
  var rect = this.itemRect(index);
  var text_height = 0;
  //SHOW_ALL = $gameTemp.isPlaytest();
  if (rngd_recollection_mode_settings.rec_list_window.show_title_text) {
    this.contents.fontSize = 20;
    if (this._global_variables["switches"][rec_cg.switch_id] || Nore.SHOW_ALL) {
      this.changeTextColor(ColorManager.normalColor());

      this.contents.drawText(
        rec_cg.title,
        rect.x + 4,
        rect.y + this.itemHeight() - 34,
        this.itemWidth(),
        32,
        rngd_recollection_mode_settings.rec_list_window.title_text_align
      );
    } else {
      this.contents.drawText(
        rngd_recollection_mode_settings.rec_list_window.never_watch_title_text,
        rect.x + 4,
        rect.y + 4,
        this.itemWidth(),
        32,
        rngd_recollection_mode_settings.rec_list_window.title_text_align
      );

      this.changeTextColor(ColorManager.textColor(7));
      if (rec_cg.hint) {
        this.contents.drawText(
          rec_cg.hint,
          rect.x + 4,
          rect.y + this.itemHeight() - 42,
          this.itemWidth(),
          32,
          rngd_recollection_mode_settings.rec_list_window.title_text_align
        );
      }
    }
    text_height = 32;
  }

  // CGセットのスイッチ番号が、全てのセーブデータを走査した後にTrueであればピクチャ表示
  if (this._global_variables["switches"][rec_cg.switch_id] || Nore.SHOW_ALL) {
    var thumbnail_file_name = rec_cg.pictures[0];
    if (rec_cg.thumbnail !== undefined && rec_cg.thumbnail !== null) {
      thumbnail_file_name = rec_cg.thumbnail;
    }

    this.drawRecollection(
      thumbnail_file_name,
      0,
      0,
      300,
      188,
      rect.x - 10,
      rect.y - 5 + text_height,
      rec_cg.paso
    );
  } else {
    this.drawRecollection(
      rngd_recollection_mode_settings.rec_list_window.never_watch_picture_name,
      0,
      0,
      300,
      188,
      rect.x - 10,
      rect.y - 5 + text_height,
      rec_cg.paso
    );
  }
};

//-------------------------------------------------------------------------
// ● 全てのセーブデータを走査し、対象のシーンスイッチ情報を取得する
//-------------------------------------------------------------------------
Window_RecList.prototype.get_global_variables = function () {
  this._global_variables = {
    switches: {},
  };
  var info = DataManager._globalInfo;
  p(info);
  info[99] = info[99] || {};
  var rec_cg_max = rngd_recollection_mode_settings.rec_cg_set.length;
  for (var j = 0; j < rec_cg_max; j++) {
    var cg = rngd_recollection_mode_settings.rec_cg_set[j];
    if (info[99][cg.switch_id]) {
      this._global_variables["switches"][cg.switch_id] = true;
    }
  }
};
//-------------------------------------------------------------------------
// ● index番目に表示された回想orCGが有効かどうか判断する
//-------------------------------------------------------------------------
Window_RecList.prototype.is_valid_picture = function (index) {
  // CG情報の取得と対象スイッチの取得
  var _rec_cg_obj = rngd_recollection_mode_settings.rec_cg_set[index];
  return (
    this._global_variables["switches"][_rec_cg_obj.switch_id] == true ||
    Nore.SHOW_ALL
  );
};

(function () {
  //-----------------------------------------------------------------------------
  // ◆ 組み込み関数Fix
  //-----------------------------------------------------------------------------
  /*
    Window_Base.prototype.drawRecollection = function(bmp_name, x, y, width, height, dx, dy) {
        var bmp = ImageManager.loadPicture(bmp_name);

        var _width = width;
        var _height = height;
        if(_width > bmp.width) {
            _width = bmp.width - 1;
        }

        if(_height > bmp.height) {
            _height = bmp.height - 1;
        }
        this.contents.blt(bmp, x, y, _width, _height, dx, dy);
    };
*/
  var Window_TitleCommand_makeCommandList =
    Window_TitleCommand.prototype.makeCommandList;

  Window_TitleCommand.prototype.makeCommandList = function () {
    Window_TitleCommand_makeCommandList.call(this);
    this.clearCommandList();
    this.addCommand(TextManager.newGame, "newGame");
    this.addCommand(
      TextManager.continue_,
      "continue",
      this.isContinueEnabled()
    );
    this.addCommand(
      rngd_recollection_mode_settings.rec_mode_window.recollection_title,
      "recollection"
    );
    this.addCommand(TextManager.options, "options");
    this.addCommand(TextManager.gameEnd, "gameEnd");
  };

  Scene_Title.prototype.commandRecollection = function () {
    SceneManager.push(Scene_Recollection);
  };

  var Scene_Title_createCommandWindow =
    Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function () {
    Scene_Title_createCommandWindow.call(this);
    this._commandWindow.setHandler(
      "recollection",
      this.commandRecollection.bind(this)
    );
    this._commandWindow.setHandler("gameEnd", this.popScene.bind(this));
  };

  Window_Base.prototype.drawRecollection = function (
    bmp_name,
    x,
    y,
    width,
    height,
    dx,
    dy,
    paso
  ) {
    var _width = width;
    var _height = height;
    var bitmap = ImageManager.loadEro(bmp_name);
    if (!bitmap.isReady()) {
      return;
    }
    /*
        var baseTexture = bitmap._baseTexture;
            /*new PIXI.BaseTexture(bitmap._image, PIXI.SCALE_MODES.DEFAULT);
            baseTexture.imageUrl = 'jpg/' + bmp_name;
            PIXI.utils.BaseTextureCache['jpg/' + bmp_name] = baseTexture;*/
    /*
        if(_width > baseTexture.width) {
            _width = baseTexture.width - 1;
        }

        if(_height > baseTexture.height) {
            _height = baseTexture.height - 1;
        }
        var texture = new PIXI.Texture(baseTexture);
        // texture.frame = new PIXI.Rectangle(sx, sy, pw, ph);
        var sprite = new PIXI.Sprite(texture);
        sprite.position.x = dx+20-5;
        sprite.position.y = dy - 12-10;
        sprite.width = width;
        sprite.height = height;
        this._windowContentsSprite.addChild(sprite);

        p(sprite)*/
    this.contents.blt(
      bitmap,
      x,
      y,
      bitmap.width,
      bitmap.height,
      dx + 18,
      dy - 20,
      width,
      height
    );
  };

  Game_Interpreter.prototype.recoAll = function () {
    var info = DataManager._globalInfo;
    if (!info) {
      return;
    }
    info[99] = info[99] || {};
    for (var i = 200; i < 300; i++) {
      info[99][i] = true;
    }
    for (var i = 700; i < 1090; i++) {
      info[99][i] = true;
    }
    DataManager.saveGlobalInfo(info);
  };

  Game_Interpreter.prototype.reco = function (switch_id) {
    p("回想登録:" + switch_id);
    var info = DataManager._globalInfo;
    if (!info) {
      p("失敗");
      return;
    }
    info[99] = info[99] || {};
    if (info[99][switch_id]) {
      return;
    }
    info[99][switch_id] = true;
    DataManager.saveGlobalInfo();
  };
})();

function recoGlobal(switch_id) {
  p("回想登録:" + switch_id);

  var info = DataManager._globalInfo;
  info[99] = info[99] || {};
  if (info[99][switch_id]) {
    return;
  }
  info[99][switch_id] = true;
  DataManager.saveGlobalInfo();
}
function hasFreeHFlah() {
  var info = DataManager._globalInfo;
  info[99] = info[99] || {};
  return info[99][998];
}

DataManager.selectSavefileForNewGame = function () {
  var globalInfo = this._globalInfo;
  this._lastAccessedId = 1;
  if (globalInfo) {
    var numSavefiles = 0;
    for (var i = 1; i <= globalInfo.length; i++) {
      if (i > 20) {
        break;
      }
      if (globalInfo[i]) {
        numSavefiles = i;
      }
    }
    if (numSavefiles < this.maxSavefiles()) {
      this._lastAccessedId = numSavefiles + 1;
    } else {
      var timestamp = Number.MAX_VALUE;
      for (var i = 1; i < globalInfo.length; i++) {
        if (!globalInfo[i]) {
          this._lastAccessedId = i;
          break;
        }
        if (i > 20) {
          break;
        }
        if (globalInfo[i].timestamp < timestamp) {
          timestamp = globalInfo[i].timestamp;
          this._lastAccessedId = i;
        }
      }
    }
  }
};
