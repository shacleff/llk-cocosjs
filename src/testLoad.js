var loadindLayer = cc.LayerColor.extend({//继承LayerColor，初始化的时候可以直接改背景颜色
	a:0,//记录当前加载了多少个文件
	self:null,
	ctor : function() {
		this._super(cc.color(100, 0, 0, 255));
		self=this;
		var size = cc.winSize;
		//添加一个文本框显示
		var l = new cc.LabelTTF("current percent : 0%", "Arial", 38);
		//居中
		l.x = size.width * 0.5;
		l.y = size.height * 0.5;
		this.addChild(l, 11, 120);
		//加载文件的几种方式，特别是在cc.loader里面，还有好多种加载的函数，记得把加载的资源路径和文件名改掉
//		ccs.armatureDataManager.addArmatureFileInfoAsync("res/armatures/logo.png","res/armatures/logo.plist","res/armatures/logo.xml",this.loadCall,this);
//		cc.textureCache.addImage("res/armatures/robot.png",this.loadCall,this);
		//cc.loader.load(g_resources[0], this.loadCall,this);	

		cc.loader.load(g_resources, this.loadCall, this.loadEdCall)
//		for(var i=0;i<g_resources.length;i++){
//		cc.loader.load(g_resources[i], this.loadCall,this);			
//		}

	},
	loadCall : function() {
		//每次调用进行计数
		self.a ++;
		//以tag的形式获取文本框对象
		var subTile = self.getChildByTag(120);
		//toFixed(2)意思是取小数点后两位，小数点后第三位为四舍五入
		subTile.setString("current percent :" + (self.a / g_resources.length).toFixed(2) *100 + "%");
		//加载完毕，貌似好多教程都是用百分比判断( >= 1 )
//		if (this.a == g_resources.length) {
//		//带翻页动画的场景跳转，第一个参数为动画的执行时间，第二个为跳到的场景，第三个为false时从右下角往左边翻页，true时左边往右边翻页
//		var trans = new cc.TransitionPageTurn(0.5, new HelloWorldS(), false);
//		cc.director.runScene(trans);
//		return;
//		}
//		cc.loader.load(g_resources[this.a], this.loadCall,this);	
	},
	loadEdCall:function(){
		var trans = new cc.TransitionPageTurn(0.5, new HelloWorldS(), false);
		cc.director.runScene(trans);
	},
});

var HelloSceneJJ = cc.Scene.extend({
	onEnter:function () {
		this._super();
		//加载app.js的layer
		var layer = new loadindLayer();
		this.addChild(layer);
	}
});