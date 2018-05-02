var res = {
		bestscore_png : "res/bestscore.png",
		bg_png : "res/bg.png",
		bg_snd : "res/bg.mp3",
		select_snd : "res/select.mp3",
		score_snd : "res/score.mp3",
		win_snd : "res/win.mp3",
		bonus_png : "res/bonus.png",
		btn_png : "res/btn.png",
		choose_png : "res/choose.png",
		clock_png : "res/clock.png",
		curscore_png : "res/curscore.png",
		fcwm520logobg_png : "res/fcwm520logobg.png",
		gameover_png : "res/gameover.png",
		go_png : "res/go.png",
		lowkeysharebtn_png : "res/lowkeysharebtn.png",
		ready_png : "res/ready.png",
		replaybtn_png : "res/replaybtn.png",
		score_png : "res/score.png",
		topline_png : "res/topline.png",
		item1_png : "res/1.jpg",
		item2_png : "res/2.jpg",
		item3_png : "res/3.jpg",
		item4_png : "res/4.jpg",
		item5_png : "res/5.jpg",
		item6_png : "res/6.jpg",
		item7_png : "res/7.jpg",
		item8_png : "res/8.jpg",
		item9_png : "res/9.jpg",
		item10_png : "res/10.jpg",
		item11_png : "res/11.jpg",
		item30_png : "res/30.jpg",
		toplistbtn_png : "res/toplistbtn.png",
		Smallline_png : "res/smallline.png",
		main_json:"res/MainScene.json",
		starMc_json:"res/Layer.json",
		passMc_json:"res/passMov.json",
		endMc_json:"res/Layer1.json",
		bombMc_json:"res/Bomb.json",
		bbombMc_json:"res/bBomb.json",
		arrow:"res/arrow.png"	
};
//游戏状态名字

var STATUS_NAME = {
		GAMEFRIST:"GAMEFRIST",
		GAMESTARTING:"GAMESTARTING",
		GAMEING:"GAMEING",
		GAMEPASS:"GAMEPASS",
		GAMEENDED:"GAMEENDED",
		EMPTY:"EMPTY"
};


var theScaleH=0.1;
var WINSIZE;
var GAMETIMES=60;
var GAMEITEMS=5;
var g_resources = [
];
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}