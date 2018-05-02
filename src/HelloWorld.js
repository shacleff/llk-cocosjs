var g_sharedGameLayer;
var MW = MW || {};
MW.CONTAINER = {
		ENEMIES:[],
		ENEMY_BULLETS:[],
		PLAYER_BULLETS:[],
		EXPLOSIONS:[],
		SPARKS:[],
		HITS:[],
		BACKSKYS:[],
		BACKTILEMAPS:[]
};
var mm_spChoose;
var titleSize;
var selMc;
var iBiao;
//图标数组
var mm_arr_CartNumber=[1,2,3,4,5,6,7,8,9,10,11];
//出现的图标种类
var mm_num_CarType=5;
//地图矩阵
var mm_arr_Main=[];
//图标位置矩阵
var mm_arr_XY=[];
//图标对象
var mm_arr_Iteam=[];
//寻路算法：
var iLineNum;
//结点数组
var arrJieDian;
//分享界面shareUI
var sp_shareUI;
//游戏状态
var mm_str_GameStatus="EMPTY";
var HelloWorldL=cc.Layer.extend({
	helloworldl:null,//单例
	gameTime:0,
	scaleRate:0.3,
	_texTransparentBatch:null,
	sprite:null,
	startMcNode:null,
	startMc:null,
	passMcNode:null,
	passMc:null,
	
	bombMcNode:null,
	bombMc:null,    
	bombMcNode1:null,
	bombMc1:null,  
	backImg:null,
	scoreText:null,
	timeText:null,
	scoreImg:null,
	timeImg:null,
	backButton:null,
	toplineImg:null,
	bbGameStart:false,
	spriteContainer:null,
	spriteEnd:null,
	spriteEndNode:null,
	backgroundEnd:null,
	againButton:null,
	topListButton:null,
	shareButton:null,
	endScoreText:null,
	endBestScoreText:null,
	gameScore:null,
	gameBestScore:null,
	gameOverLayout:null,
	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();
		//sys.localStorage.setItem("itemname" ,"997799");
		//cc.log("jjjjjjjjjj========================",Math.round(89 + 10 * (85-80)/20));
		//cc.log(cc.sys.localStorage.getItem("itemnames"));
		if(cc.sys.localStorage.getItem("bestScore")!="null"){
			gameBestScore=cc.sys.localStorage.getItem("bestScore");
		}else{
			gameBestScore=0;
		}
		cc.audioEngine.playEffect(res.bg_snd, true);
		helloworldl=this;
		mm_str_GameStatus=STATUS_NAME.GAMESTARTING;
		iBiao=0;
		gameScore=0;
		mm_num_CarType=GAMEITEMS;
		titleSize=cc.size(280, 88);
		//this._texTransparentBatch=new cc.Sprite();
		//this.addChild(this._texTransparentBatch);
		/////////////////////////////
		// 2. add a menu item with "X" image, which is clicked to quit the program
		//    you may modify it.
		// ask the window size
		var size = cc.winSize;
		
		var mainScene=ccs.load(res.main_json).node;
		this.addChild(mainScene);

		spriteContainer=mainScene.getChildByName("Sprite_Container");
//		spriteEnd=mainScene.getChildByName("ProjectNode_End");
		
		
		backImg=ccui.helper.seekWidgetByName(mainScene, "BackImg_1");
		backImg.setScaleY(theScaleH);

		
		
		toplineImg=ccui.helper.seekWidgetByName(mainScene, "TopImg_3");
		scoreText=ccui.helper.seekWidgetByName(mainScene, "Text_1");
		timeText=ccui.helper.seekWidgetByName(mainScene, "Text_1_0");
		scoreImg=ccui.helper.seekWidgetByName(mainScene, "TopImg_1");
		timeImg=ccui.helper.seekWidgetByName(mainScene, "TopImg_2");

		scoreText.setPositionY(960*theScaleH-43);
		timeText.setPositionY(960*theScaleH-43);
		scoreImg.setPositionY(960*theScaleH-40);
		timeImg.setPositionY(960*theScaleH-40);
		toplineImg.setPositionY(960*theScaleH-90);


//		scoreText.setString("500");
		backButton=ccui.helper.seekWidgetByName(mainScene, "DownBtn_1");
		backButton.addTouchEventListener(this.pageViewStateChanged);


		startMcNode = mainScene.getChildByName("ProjectNode_1");

		startMc=ccs.load(res.starMc_json).action;
		
		passMcNode = mainScene.getChildByName("ProjectNode_4");
		
		passMc=ccs.load(res.passMc_json).action;

		bombMcNode = mainScene.getChildByName("ProjectNode_3");

		bombMc=ccs.load(res.bombMc_json).action;

		bombMcNode1 = mainScene.getChildByName("ProjectNode_2");

		bombMc1=ccs.load(res.bbombMc_json).action;
		
		
		

		spriteEnd=ccs.load(res.endMc_json).action;

		
		passMcNode.setVisible(false);
		
		mainScene.runAction(startMc);
		mainScene.runAction(passMc);
		mainScene.runAction(bombMc1);
		mainScene.runAction(bombMc);
		mainScene.runAction(spriteEnd);
		
		
		//spriteEndNode.swallowTouches=false;
		
		backButton=ccui.helper.seekWidgetByName(mainScene, "DownBtn_1");
		backButton.addTouchEventListener(this.backClick);
		
		//结束界面元素
		
		
		//endScoreText=spriteEndNode.getChildByName("Text_Cu");
		

		//againButton.setTouchEnabled(false);
		
		this.allHide();
		startMc.gotoFrameAndPlay(0,115,false);
		
		//时间文本
		gameTime=GAMETIMES;
		timeText.setString(gameTime);
		//scoreText.setString(theScaleH);
		
		
		mm_spChoose=new cc.Sprite(res.choose_png);
		mm_spChoose.attr({
			x:-67,
			y:159
		});
		this.addChild(mm_spChoose, 1);
		
		
		
		
		
		this.scheduleUpdate();
		
		g_sharedGameLayer = this;
		bbGameStart=true;
		//Items.preSet();
		
		
		
		
//		this.schedule(this.moveTileMap, 5);
//		var moveTileMap:function () {
//			var backTileMap = BackTileMap.getOrCreate();
//			var ran = Math.random();
//			backTileMap.x = ran * 320;
//			backTileMap.y = winSize.height;
//			var move = cc.moveBy(ran * 2 + 10, cc.p(0, -winSize.height-backTileMap.height));
//			var fun = cc.callFunc(function(){
//				backTileMap.destroy();
//			},this);
//			backTileMap.runAction(cc.sequence(move,fun));
//		}
		
		
		
//		this.sprite.runAction(
//				cc.sequence(
//						cc.rotateTo(2, 0),
//						cc.scaleTo(2, 1, 1)
//				)
//		);
//		return true;
//		helloLabel.runAction(
//				cc.spawn(
//						cc.moveBy(2.5, cc.p(0, size.height - 40)),
//						cc.tintTo(2.5,255,255,255)
//				)
//		);
		return true;
	},
	winClosed:function(){
		mm_num_CarType=GAMEITEMS;
		gameScore=0;
		scoreText.setString(gameScore);
		gameTime=GAMETIMES;
		timeText.setString(gameTime);
		bbGameStart=true;
		helloworldl.resetItems(1);
		share(0);
	},
	//结束
	gameOver:function(){
		bbGameStart=false;
//		spriteEndNode.setVisible(true);
//		spriteEndNode.setOpacity(0);
//		var action=cc.FadeIn.create(0.3);
//		spriteEndNode.runAction(action);
//		this.unschedule(this.scoreCounter);
//		endScoreText.setString(gameScore);

		//有了新的历史记录。则刷新这个历史记录
		if(gameScore>gameBestScore){
			gameBestScore=gameScore;
			cc.sys.localStorage.setItem("bestScore" ,gameBestScore);
		}
		gameOverLayout=new WinGameUI(g_sharedGameLayer,gameScore,gameBestScore);
		this.addChild(gameOverLayout);
		
//		gameOverLayout.setOpacity(0);
//		var action=cc.FadeIn.create(0.3);
//		gameOverLayout.runAction(action);
		
		mm_spChoose.attr({
			x:-67,
			y:159
		});
		
		var percent=50;
		if(gameScore>75) percent=99.95;
		else if (gameScore > 60) percent = Math.round(89 + 10 * (gameScore-60)/40);
		else if (gameScore > 30) percent = Math.round(79 + 20 * (gameScore-30)/70);
		else percent = 50+gameScore;



		share(1, gameScore, percent);
		
	},
	update:function(){
		//换个角度解决问题，现在在这里处理每一帧的事件。
		//判断动画是否在播放，如果在播放，则使所有按钮处于“禁用状态”
		//从而来模仿“技能冷却”的使用。
		if(mm_str_GameStatus==STATUS_NAME.EMPTY) return;
		if(mm_str_GameStatus==STATUS_NAME.GAMESTARTING){
			if(!startMc.isPlaying()&&bbGameStart){
				//如果动画不在播放状态，则将处于禁用的技能激活。
				//cc.log("Frame Animation Event1234");
				//this.scheduleUpdate();
	//			this.unscheduleUpdate();
				mm_str_GameStatus=STATUS_NAME.EMPTY;
				bbGameStart=true;
				startMcNode.removeFromParent();
				this.startGame();
			}
		}
		if(mm_str_GameStatus==STATUS_NAME.GAMEPASS){
			if(!passMc.isPlaying()){
				//如果动画不在播放状态，则将处于禁用的技能激活。
				//cc.log("Frame Animation Event");
				mm_str_GameStatus=STATUS_NAME.EMPTY;
				helloworldl.resetItems(1);
				passMcNode.setVisible(false);
				gameTime+=5;
			}
		}
	},
	//重置Item
	resetItems:function(value){
		if(value==0){
			Items.resetItem();
		}else{
			Items.reStart();
		}
		
	},
	//开始游戏
	startGame:function(){
		Items.preSet();
		this.schedule(this.scoreCounter, 1);
		this.allShow();
	},
	//刷新按钮事件
	backClick:function(sender,type)
	{
		if(!bbGameStart) return;
		switch (type) {        
		//pageView当前所在的page的index发生了变化。
		case ccui.Widget.TOUCH_ENDED:
			//cc.log("PageView Event Turning");
//			spriteEndNode.setVisible(true);
//			spriteEndNode.setOpacity(0);
//			var action=cc.FadeIn.create(0.3);
//			spriteEndNode.runAction(action);
			
			//helloworldl.gameOver();
			helloworldl.resetItems(0);
			
			//startMc.gotoFrameAndPlay(0,115,false);
			//bombMc.gotoFrameAndPlay(0,16,false);
			//bombMc1.gotoFrameAndPlay(0,16,false);
			break;        
		default:  break;
		}
	},
	//重新开始按钮事件
	againClick:function()
	{
		
			bbGameStart=true;
			iBiao=0;
			var actionMoveDone=cc.CallFunc.create(function(node){
				cc.log("pkpkp");
				//spriteEndNode.setVisible(fasle);
				g_sharedGameLayer.winClosed();
				gameOverLayout.destroy();
			},this);

			g_sharedGameLayer.winClosed();
			gameOverLayout.destroy();
			return;
			var action=cc.FadeOut.create(0.3);
			gameOverLayout.runAction(
					cc.sequence(
							action,
							actionMoveDone
					)
			);
			
	},
	//排名按钮事件
	toplistClick:function(sender,type)
	{
		switch (type) {        
		case ccui.Widget.TOUCH_ENDED:
		//	cc.log("againClick");
			break;        
		default:  break;
		}
	},
	//分享按钮事件
	shareButtonClick:function()
	{
		//cc.log("shareButtonClick");
		sp_shareUI = new ShareUI();
		//helloworldl.addChild(layers.shareUI, 100);
		this.addChild(sp_shareUI);
		
		
		
	},
	//隐形所有UI
	allHide:function(){
		scoreText.setVisible(false);
		scoreImg.setVisible(false);
		timeText.setVisible(false);
		timeImg.setVisible(false);
		backButton.setVisible(false);
		toplineImg.setVisible(false);		
	},
	//显示所有UI
	allShow:function(){
		scoreText.setVisible(true);
		scoreImg.setVisible(true);
		timeText.setVisible(true);
		timeImg.setVisible(true);
		backButton.setVisible(true);
		toplineImg.setVisible(true);
	},
	dataLoaded:function (percent) {
		//cc.log("percent:" + percent);
	},
	
	//计时函数
	scoreCounter:function () {
		//cc.log("99Ya");
		if(!bbGameStart) return;
		if(mm_str_GameStatus==STATUS_NAME.GAMEPASS) return;
		gameTime--;
		timeText.setString(gameTime);
		if (gameTime<=0) {
			this.gameOver();
		}
	},
	onTouchBegan:function(touch, event){
		//cc.log("99Ya"); 
		if(!bbGameStart) return false;
		var target = event.getCurrentTarget();
		var PosInScreen = target.convertToNodeSpace(touch.getLocation());
		var Size = target.getContentSize();
		var rect = cc.rect(0, 0, Size.width, Size.height);
		if(cc.rectContainsPoint(rect, PosInScreen)){
			if(target.iBiao==0) return false;
			//cc.log("99Ya=",target.biao1,target.biao2); 
			iBiao++;
			if (iBiao==2) {
				iBiao=0;
				mm_spChoose.attr({
					x:target.x,
					y:-1000
				});
				var p1=cc.p( target.x,target.y);
				var p2=cc.p(selMc.x,selMc.y);
				if(target==selMc){
					return false;
				}
				fineRoad(mm_arr_Main,target.biao2,target.biao1,selMc.biao2,selMc.biao1);
				if ((arrJieDian.length>0)&&(target.iBiao==selMc.iBiao)) {
					
				} else {
					iBiao=1;
					selMc=target;
					mm_spChoose.attr({
						x:target.x,
						y:target.y
					});
					cc.audioEngine.playMusic(res.select_snd, false);
					return false;
				}
				//PointLine.preSet(p1, p2,Math.abs(target.biao1+target.biao2-selMc.biao1-selMc.biao2));
				for (var int = 0; int < arrJieDian.length-1; int++) {
					p1=cc.p( mm_arr_XY[arrJieDian[int][0]][arrJieDian[int][1]][0],mm_arr_XY[arrJieDian[int][0]][arrJieDian[int][1]][1]);
					p2=cc.p(mm_arr_XY[arrJieDian[int+1][0]][arrJieDian[int+1][1]][0],mm_arr_XY[arrJieDian[int+1][0]][arrJieDian[int+1][1]][1]);
					PointLine.preSet(p1, p2,Math.abs(arrJieDian[int][0]+arrJieDian[int][1]-arrJieDian[int+1][0]-arrJieDian[int+1][1]));
				}
				mm_arr_Main[target.biao2][target.biao1]=0;
				mm_arr_Main[selMc.biao2][selMc.biao1]=0;
				//----方块爆炸动画,在手机上显示不鸟,求改进(2015年已改好)
				bombMcNode.attr({
					x:target.x,
					y:target.y
				});
				bombMcNode1.attr({
					x:selMc.x,
					y:selMc.y
				});
				bombMc.gotoFrameAndPlay(0,16,false);
				bombMc1.gotoFrameAndPlay(0,16,false);
				
				//删除自己
//				target.removeFromParent();
//				selMc.removeFromParent();
				target.setVisible(false);
				selMc.setVisible(false);
				target.iBiao=0;
				selMc.iBiao=0;
				
				
				gameScore+=1;
				scoreText.setString(gameScore);
				if(gameScore%15==0) {
					//helloworldl.resetItems(1);
					passMcNode.setVisible(true);
					passMc.gotoFrameAndPlay(0,46,false);
					mm_str_GameStatus=STATUS_NAME.GAMEPASS;
					mm_num_CarType++;
					cc.audioEngine.playMusic(res.win_snd, false);
					return false;
				}
				cc.audioEngine.playMusic(res.score_snd, false);
			} else {
				selMc=target;
				mm_spChoose.attr({
					x:target.x,
					y:target.y
				});
				cc.audioEngine.playMusic(res.select_snd, false);
			}

		}
		return false;
	}
});
HelloWorldL.prototype.addEnemy = function (enemy) {
	//cc.log("addEnemy");
	var eventListener = cc.EventListener.create({
		event: cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches: true,
		onTouchBegan: this.onTouchBegan});
	cc.eventManager.addListener(eventListener, enemy);
	
	spriteContainer.addChild(enemy);
};



//以下是分享部分share函数及微信接口,在index.php里定义
var layers = {};
var ShareUI = cc.LayerColor.extend({
	ctor: function () {
		this._super(cc.color(0, 0, 0, 188), cc.winSize.width, cc.winSize.height);

		var arrow = new cc.Sprite(res.arrow);
		arrow.anchorX = 1;
		arrow.anchorY = 1;
		arrow.x = cc.winSize.width - 15;
		arrow.y = cc.winSize.height - 5;
		arrow.setScale(2.3, 2.3);
		this.addChild(arrow);

		var label = new cc.LabelTTF("请点击右上角的菜单按钮\n再点\"分享到朋友圈\"\n让好友们挑战你的分数！", "宋体", 35, cc.size(cc.winSize.width*0.7, 250), cc.TEXT_ALIGNMENT_CENTER);
		label.x = cc.winSize.width/2;
		label.y = cc.winSize.height - 200;
		label.anchorY = 1;
		this.addChild(label);
	},
	onEnter: function () {
		this._super();
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: function (touch, event) {
				cc.eventManager.removeListener(this);
				//cc.log("onTouchBegan")
				sp_shareUI.removeFromParent();
				gameOverLayout.initButtonEvent();
				return false;
			}
		}, this);
	}
});
var HelloWorldS = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new HelloWorldL();
		this.addChild(layer);
		//sp_shareUI = new ShareUI();
		//this.addChild(layers.shareUI);
	}
});















//------------下面是寻路算法-----------------------------------------------------------------//
function fineRoad(arr,i1,j1,i2,j2){
	//cc.log("addEnemy",arr[1][2]);
	iLineNum=0;
	arrJieDian=new Array();
	var di=i1 - i2;
	var dj=j1 - j2;
	var iBiao=0;
	//循环的中间变量:
	var k;
	var t;
	var ar;
	//同一行
	if (i1 == i2) {
		for (k=1; k < Math.abs(dj); k++) {
			if (arr[i1][j1 - dj / Math.abs(dj) * k] != 0) {
				iBiao=1;
				//trace(1111);
				break;
			}
		}
		if (iBiao == 0) {
			iLineNum=1;
			ar=[i1,j1];
			arrJieDian.push(ar);
			ar=[i2,j2];
			arrJieDian.push(ar);
			return 0;
		} else {

			for (k=1; k <= arr.length-1 - i1; k++) {
				iBiao=0;
				if (arr[i1 + k][j1] == 0 && arr[i2 + k][j2] == 0) {
					//trace(222);
					for (t=1; t < Math.abs(dj); t++) {
						if (arr[i1 + k][j1 - dj / Math.abs(dj) * t] != 0) {
							iBiao=1;
							break;
						}
					}
					if (iBiao == 0) {
						iLineNum=3;
						ar=[i1,j1];
						arrJieDian.push(ar);
						ar=[i1 + k,j1];
						arrJieDian.push(ar);
						ar=[i2 + k,j2];
						arrJieDian.push(ar);
						ar=[i2,j2];
						arrJieDian.push(ar);
						return 0;
					}
				} else {
					break;
				}
			}
			for (k=1; k <= i1; k++) {
				iBiao=0;
				if (arr[i1 - k][j1] == 0 && arr[i2 - k][j2] == 0) {
					for (t=1; t < Math.abs(dj); t++) {
						if (arr[i1 - k][j1 - dj / Math.abs(dj) * t] != 0) {
							iBiao=1;
							break;
						}
					}
					if (iBiao == 0) {
						iLineNum=3;
						ar=[i1,j1];
						arrJieDian.push(ar);
						ar=[i1 - k,j1];
						arrJieDian.push(ar);
						ar=[i2 - k,j2];
						arrJieDian.push(ar);
						ar=[i2,j2];
						arrJieDian.push(ar);
						return 0;
					}
				} else {
					break;
				}
			}
		}
	} else {
		//同一列
		if (j1 == j2) {
			iBiao=0;
			for (k=1; k < Math.abs(di); k++) {
				//cc.log("addEnemyssss",i1,di,k,i1 - di / Math.abs(di) * k);
				if (arr[i1 - di / Math.abs(di) * k][j1] != 0) {
					iBiao=1;
					//trace(1111);
					break;
				}
			}
			if (iBiao == 0) {
				iLineNum=1;
				ar=[i1,j1];
				arrJieDian.push(ar);
				ar=[i2,j2];
				arrJieDian.push(ar);
				return 0;
			} else {

				for (k=1; k <= arr[0].length-1 - j1; k++) {
					iBiao=0;
					if (arr[i1][j1 + k] == 0 && arr[i2][j2 + k] == 0) {
						//trace(222);
						for (t=1; t < Math.abs(di); t++) {
							if (arr[i1 - di / Math.abs(di) * t][j1 + k] != 0) {
								iBiao=1;
								break;
							}
						}
						if (iBiao == 0) {
							iLineNum=3;
							ar=[i1,j1];
							arrJieDian.push(ar);
							ar=[i1,j1 + k];
							arrJieDian.push(ar);
							ar=[i2,j2 + k];
							arrJieDian.push(ar);
							ar=[i2,j2];
							arrJieDian.push(ar);
							return 0;
						}
					} else {
						break;
					}
				}
				for (k=1; k <= j1; k++) {
					iBiao=0;
					if (arr[i1][j1 - k] == 0 && arr[i2][j2 - k] == 0) {
						for (t=1; t < Math.abs(di); t++) {
							if (arr[i1 - di / Math.abs(di) * t][j1 - k] != 0) {
								iBiao=1;
								break;
							}
						}
						if (iBiao == 0) {
							iLineNum=3;
							ar=[i1,j1];
							arrJieDian.push(ar);
							ar=[i1,j1 - k];
							arrJieDian.push(ar);
							ar=[i2,j2 - k];
							arrJieDian.push(ar);
							ar=[i2,j2];
							arrJieDian.push(ar);
							return 0;
						}
					} else {
						break;
					}
				}
			}
		} else {
			//不同行不同列先I后J
			for (k=j1; k <= arr[0].length-1; k++) {
				if (moveToRight(arr,i1,j1,i1,k) && moveToRight(arr,i2,j2,i2,k)) {
					//trace(moveToRight(arr,i1,k,i2,k));
					if (moveToRight2(arr,i1,k,i2,k)) {
						iLineNum=3;
						ar=[i1,j1];
						arrJieDian.push(ar);
						ar=[i1,k];
						arrJieDian.push(ar);
						ar=[i2,k];
						arrJieDian.push(ar);
						ar=[i2,j2];
						arrJieDian.push(ar);
						return 0;
					}
				}
			}
			for (k=j1; k >=0; k--) {
				if (moveToRight(arr,i1,j1,i1,k) && moveToRight(arr,i2,j2,i2,k)) {
					//trace(moveToRight(arr,i1,k,i2,k));
					if (moveToRight2(arr,i1,k,i2,k)) {
						iLineNum=3;
						ar=[i1,j1];
						arrJieDian.push(ar);
						ar=[i1,k];
						arrJieDian.push(ar);
						ar=[i2,k];
						arrJieDian.push(ar);
						ar=[i2,j2];
						arrJieDian.push(ar);
						return 0;
					}
				}
			}
			//I
			for (k=i1; k <= arr.length-1; k++) {
				if (moveToRight(arr,i1,j1,k,j1) && moveToRight(arr,i2,j2,k,j2)) {
					// trace(k)
					if (moveToRight2(arr,k,j1,k,j2)) {

						iLineNum=3;
						ar=[i1,j1];
						arrJieDian.push(ar);
						ar=[k,j1];
						arrJieDian.push(ar);
						ar=[k,j2];
						arrJieDian.push(ar);
						ar=[i2,j2];
						arrJieDian.push(ar);
						return 0;
					}
				}
			}
			for (k=i1; k >=0; k--) {
				//trace(k)
				if (moveToRight(arr,i1,j1,k,j1) && moveToRight(arr,i2,j2,k,j2)) {
					//trace(moveToRight(arr,i1,j1,k,j1));
					//trace(moveToRight(arr,i2,j2,k,j2));
					if (moveToRight2(arr,k,j1,k,j2)) {
						//trace(k)
						//trace(moveToRight(arr,k,j1,k,j2));
						iLineNum=3;
						ar=[i1,j1];
						arrJieDian.push(ar);
						ar=[k,j1];
						arrJieDian.push(ar);
						ar=[k,j2];
						arrJieDian.push(ar);
						ar=[i2,j2];
						arrJieDian.push(ar);
						return 0;
					}
				}
			}
			//J

		}
	}
}
//检测二唯数组中的结点从A点到B点之间是否全为O
var itoBiao=0;
function moveToRight(arr1,Num1,Num2,Num3,Num4) {
	var di=Num1 - Num3;
	var dj=Num2 - Num4;
	var k=1;
	itoBiao=0;
	if (Num1 == Num3) {
		for (var pk=1; pk <= Math.abs(dj); pk++) {
			if (arr1[Num1][Num2 - dj / Math.abs(dj) * pk] != 0) {
				itoBiao=1;
				return 0;
			}
		}
	} else {
		//trace("pk")
		if (Num2 == Num4) {
			for (k=1; k <= Math.abs(di); k++) {
				itoBiao=1;
				if (arr1[Num1 - di / Math.abs(di) * k][Num2] != 0) {
					itoBiao=1;
					return 0;
				}
			}
		}
	}
	return 1;
//}
}
function moveToRight2(arr1,Num1,Num2,Num3,Num4) {
	var di=Num1 - Num3;
	var dj=Num2 - Num4;
	var k=1;
	itoBiao=0;
	if (Num1 == Num3) {
		for (k=1; k < Math.abs(dj); k++) {
			if (arr1[Num1][Num2 - dj / Math.abs(dj) * k] != 0) {
				itoBiao=1;
				return 0;
			}
		}
	} else {
		if (Num2 == Num4) {
			itoBiao=0;
			for (k=1; k < Math.abs(di); k++) {
				if (arr1[Num1 - di / Math.abs(di) * k][Num2] != 0) {
					itoBiao=1;
					return 0;
				}
			}
		}
	}
	return 1;
}