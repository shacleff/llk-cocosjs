
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    startMcNode:null,
    startMc:null,
    bombMcNode:null,
    bombMc:null,  
    bombMcNode1:null,
    bombMc1:null,
    backImg:null,
    scoreText:null,
    timeText:null,
    scoreImg:null,
    timeImg:null,
    toplineImg:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
//        var size = cc.winSize;
//        var size2=cc.size(800, 480);
//        var continerw=cc.view.getFrameSize();
        // add a "close" icon to exit the progress. it's an autorelease object
        var mainScene=ccs.load(res.main_json).node;
        this.addChild(mainScene);
        
        
        backImg=ccui.helper.seekWidgetByName(mainScene, "BackImg_1");
        backImg.setScaleY(theScaleH);
        
        toplineImg=ccui.helper.seekWidgetByName(mainScene, "TopImg_3");
        scoreText=ccui.helper.seekWidgetByName(mainScene, "Text_1");
        timeText=ccui.helper.seekWidgetByName(mainScene, "Text_1_0");
        scoreImg=ccui.helper.seekWidgetByName(mainScene, "TopImg_1");
        timeImg=ccui.helper.seekWidgetByName(mainScene, "TopImg_2");
        
        scoreText.setPositionY(917*theScaleH);
        timeText.setPositionY(917*theScaleH);
        scoreImg.setPositionY(920*theScaleH);
        timeImg.setPositionY(920*theScaleH);
        toplineImg.setPositionY(870*theScaleH);
        
        
//        scoreText.setString("500");
        backButton=ccui.helper.seekWidgetByName(mainScene, "DownBtn_1");
        backButton.addTouchEventListener(this.pageViewStateChanged);
        
        
        startMcNode = mainScene.getChildByName("ProjectNode_1");
        
        startMc=ccs.load(res.starMc_json).action;
        
        bombMcNode = mainScene.getChildByName("ProjectNode_3");

        bombMc=ccs.load(res.bombMc_json).action;
        
        bombMcNode1 = mainScene.getChildByName("ProjectNode_2");

        bombMc1=ccs.load(res.bbombMc_json).action;
        
        
        mainScene.runAction(startMc);
        mainScene.runAction(bombMc);
        mainScene.runAction(bombMc1);
        
        startMc.setFrameEventCallFunc(this.frameAnimationEvent);
        
        this.scheduleUpdate();
        
        
     //   mainScene.setContentSize(continerw);
       // ccui.helper.doLayout(mainScene);
       // mainScene.setScaleX(continerw.width/640);
        //mainScene.setScaleY(continerw.height*640/continerw.width/960);
       // mainScene.setContentSize(continerw);
        //this.initSize(mainScene);
        return true;
    },
    update:function(){
    	//换个角度解决问题，现在在这里处理每一帧的事件。
    	//判断动画是否在播放，如果在播放，则使所有按钮处于“禁用状态”
    	//从而来模仿“技能冷却”的使用。
    	if(!startMc.isPlaying()){
    		//如果动画不在播放状态，则将处于禁用的技能激活。
    		cc.log("Frame Animation Event");
    	}
    },
    frameAnimationEvent:function(frame){
		//正常情况下，应该在这里处理每一帧的事件。
		cc.log("Frame Animation Event");
	},
    pageViewStateChanged:function(sender,type)
    {
    	switch (type) {        
    	//pageView当前所在的page的index发生了变化。
    	case ccui.Widget.TOUCH_ENDED:
    		cc.log("PageView Event Turning");
    		startMc.gotoFrameAndPlay(0,115,false);
    		//bombMc.gotoFrameAndPlay(0,16,false);
    		//bombMc1.gotoFrameAndPlay(0,16,false);
    		break;        
    	default:  break;
    	}
    },
    initSize:function(node){
    	var winSize = cc.director.getWinSize();
    	var scale = winSize.width / 640;
    	node.scale = scale;
    	node.x = (winSize.width - 640 * scale) / 2;
    	node.y = (winSize.height - 960 * scale) / 2;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

