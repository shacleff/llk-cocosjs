var WinGameUI = BaseLayer.extend({
	listener:null,
	btnListener:null,
	num:0,
	share:null,
	playAgain:null,
	mainUI:null,
	time:null,
	desprition:null,//获胜描述

	againButton:null,
	topListButton:null,
	shareButton:null,
	endScoreText:null,
	endBestScoreText:null,
	self:null,
	ctor:function(mainUI,score,maxScore){
		this._super(cc.color(255,255,255,180),WINSIZE.width,WINSIZE.height);

		this.mainUI = mainUI;
		this.time = score;
		
		var mainScene=ccs.load(res.endMc_json).node;
		this.addChild(mainScene);
		
		var endMcs=ccs.load(res.endMc_json).action;
		endMcs.gotoFrameAndPlay(0,60,false);
		mainScene.runAction(endMcs);
		againButton=mainScene.getChildByName("Btn_Again");
		topListButton=mainScene.getChildByName("Btn_TopList");
		shareButton=mainScene.getChildByName("Btn_LowKeyShare");
		endScoreText=mainScene.getChildByName("Text_Cu");
		endBestScoreText=mainScene.getChildByName("Text_Best");
		
		endScoreText.setString(score);
		endBestScoreText.setString(maxScore);
//		
		//cc.eventManager.addListener(this.btnListener, this.againButton);
//		cc.eventManager.addListener(this.btnListener.clone(), this.playAgain);
		
		againButton.addTouchEventListener(this.agClick);
		shareButton.addTouchEventListener(this.shClick);
		//backButton.addTouchEventListener(this.backClick);

		self = this;
		this.btnListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				var target = event.getCurrentTarget();
				var locationInNode = target.convertToNodeSpace(touch.getLocation());
				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					target.opacity = 180;
					return true;
				}
				return false;
			},
			onTouchEnded: function (touch, event) {
				var target = event.getCurrentTarget();
				target.setOpacity(255);
				if(target ==  againButton){
					self.mainUI.againClick();
					//self.destroy();
				}else if (target ==  shareButton) {
					self.mainUI.shareButtonClick();
				}
				console.log("logged!:"+(++self.num));
			}
		});

//		cc.eventManager.addListener(this.btnListener, againButton);
//		cc.eventManager.addListener(this.btnListener.clone(), shareButton);
//		cc.eventManager.addListener(this.btnListener.clone(), topListButton);
		
		self.initButtonEvent();
		
		
	},
	agClick:function(sender,type)
	{
		switch (type) {        
		//pageView当前所在的page的index发生了变化。
		case ccui.Widget.TOUCH_ENDED:
			cc.log("agClick");
			self.mainUI.againClick();
			break;        
		default:  break;
		}
	},
	shClick:function(sender,type)
	{
		switch (type) {        
		//pageView当前所在的page的index发生了变化。
		case ccui.Widget.TOUCH_ENDED:
			cc.log("shClick");
			self.mainUI.shareButtonClick();
			break;        
		default:  break;
		}
	},
	initButtonEvent:function(){
		
		//cc.eventManager.addListener(this.listener, this);
	},
	destroy:function(){
		console.log("destroy!:");
		BaseLayer.prototype.destory.apply(this,arguments);
		//this.removeChild(this.desprition);
		//this.removeChild(this.playAgain);
		//this.removeChild(this.share);
		//cc.eventManager.removeListener(this.btnListener);
		this.removeFromParent();
	}
});
