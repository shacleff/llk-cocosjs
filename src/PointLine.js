/****************************************************************************
 Cocos2d-html5 show case : Moon Warriors

 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 ****************************************************************************/

var PointLine = cc.Sprite.extend({
	xFrist:67,
	yFrist:180,
	addX:125,
	addY:125,
	ctor:function () {
		this._super(res.PointLine_png);
	},
	_timeTick:0,
	update:function (dt) {
		

	},
	destroy:function () {
	},
	shoot:function () {
	},
	hurt:function () {
	},
	collideRect:function (x, y) {
		var w = this.width, h = this.height;
		return cc.rect(x - w / 2, y - h / 4, w, h / 2+20);
	}
});



PointLine.create = function () {
	var enemy = new PointLine();
	//enemy.setScale(0.833, 0.833);
	g_sharedGameLayer.addEnemy(enemy);
	//MW.CONTAINER.ENEMIES.push(enemy);
	return enemy;
};

PointLine.preSet = function (a,b,length) {
	var num;
	if(a.x==b.x){
		if (a.y!=b.y) {
			num=(a.y-b.y)/(length*3);
//			SmallLine.preSet(a.x, a.y);
//			SmallLine.preSet(a.x, a.y-(a.y-b.y)/3);
//			SmallLine.preSet(a.x, a.y-(a.y-b.y)*2/3);
//			SmallLine.preSet(a.x, b.y);
			for (var i = 0; i <= length*3; i++) {
				SmallLine.preSet(a.x, a.y-num*i);
			}
		}
	}else if (a.y==b.y) 		
	{
		if (a.x!=b.x) {
			num=(a.x-b.x)/(length*3);
//			SmallLine.preSet(a.x, a.y);
//			SmallLine.preSet(a.x-(a.x-b.x)/3, a.y);
//			SmallLine.preSet(a.x-(a.x-b.x)*2/3, a.y);
//			SmallLine.preSet(b.x, a.y);
			for (var i = 0; i <= length*3; i++) {
				SmallLine.preSet(a.x-num*i, a.y);
			}
		}
	}
			
};
