/****************************************************************************
 Cocos2d-html5 show case : Moon Warriors

 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 ****************************************************************************/

var SmallLine = cc.Sprite.extend({
	xFrist:67,
	yFrist:180,
	addX:125,
	addY:125,
	ctor:function () {
		this._super(res.Smallline_png);
		//以下功能手机显示不了(2015年已改好)
		this.setScale(0.5, 0.5);
		var actionMoveDone=cc.CallFunc.create(function(node){
			node.removeFromParent();
		},this);
		this.runAction(
				cc.sequence(
						cc.scaleTo(0.1, 1.1, 1.1),
						cc.scaleTo(0.05, 0.8, 0.8),
						actionMoveDone
				)
		);
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



SmallLine.create = function () {
	var enemy = new SmallLine();
	//enemy.setScale(0.833, 0.833);
	g_sharedGameLayer.addEnemy(enemy);
	//MW.CONTAINER.ENEMIES.push(enemy);
	return enemy;
};

SmallLine.preSet = function (a,b) {
	var item = null;
	item = SmallLine.create();
	item.x=a;
	item.y=b;
			
};
