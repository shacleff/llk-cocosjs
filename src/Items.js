/****************************************************************************
 Cocos2d-html5 show case : Moon Warriors

 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 ****************************************************************************/

var Items = cc.Sprite.extend({
	xFrist:67,
	yFrist:145,
	yMore:35,
	addX:125,
	addY:125,
	biao1:0,
	biao2:0,
	iBiao:1,
	ctor:function (a,time) {
		this._super(res["item"+a+"_png"]);
		this.setOpacity(0);
		var action=cc.FadeIn.create(0.1);
		var cctionDelay=cc.delayTime(time*0.12);
		this.runAction(
				cc.sequence(
						cctionDelay,
						action
						)
		);
		//this._super(res.item30_png);
	},
	changePic:function (a,time){
//		var texture = new Texture2D();
//		texture.initWithElement(res["item"+a+"_png"]);//img 是cc.loader.loadImg的 img
//		texture.handleLoadedTexture();
		cc.log("item.iBiao="+a);
		this.setTexture(res["item"+a+"_png"]);
		this.setOpacity(0);
		var action=cc.FadeIn.create(0.06);
		var cctionDelay=cc.delayTime(time*0.1);
		this.runAction(
				cc.sequence(
						cctionDelay,
						action
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

//所有item消完,重新生成
Items.reStart= function(){	
	var arrTemp1=math_ranArrAtNum(mm_arr_CartNumber, mm_num_CarType);
	arrTemp1=arrTemp1.concat(arrTemp1,arrTemp1);
	arrTemp1=math_ranArrAtNum(arrTemp1, 15);
	arrTemp1=arrTemp1.concat(arrTemp1);
	arrTemp1=math_ranArrAtNum(arrTemp1, 30);
	var item = null;
	var num=0;
	for(var i = 0; i < arrTemp1.length; i++){
		num=arrTemp1[i];
		item=MW.CONTAINER.ENEMIES[i];
		item.iBiao=num;
		item.changePic(num,5-item.biao1+item.biao2);
		item.setVisible(true);
		mm_arr_Main[item.biao2][item.biao1]=num;
	}
};
//把现有未消完图形重新生成
Items.resetItem= function(){	
	var item = null;
	var num=0;
	var number=0;
	for(var i = 0; i < MW.CONTAINER.ENEMIES.length; i++){
		item=MW.CONTAINER.ENEMIES[i];
		if(item.iBiao!=0) num++;
	}
	num=num/2;
	var arrTemp1=math_ranArrAtNum(mm_arr_CartNumber, mm_num_CarType);
	arrTemp1=arrTemp1.concat(arrTemp1,arrTemp1);
	arrTemp1=math_ranArrAtNum(arrTemp1, num);
	arrTemp1=arrTemp1.concat(arrTemp1);
	arrTemp1=math_ranArrAtNum(arrTemp1, num*2);
	num=num*2;
	for(var i = 0; i < MW.CONTAINER.ENEMIES.length; i++){
		item=MW.CONTAINER.ENEMIES[i];
		if(item.iBiao==0) continue;
		num--;
		number=arrTemp1[num];
		item.iBiao=number;
		item.changePic(number,5-item.biao1+item.biao2);
		item.setVisible(true);
		mm_arr_Main[item.biao2][item.biao1]=number;
	}
};


Items.create = function (a,time) {
	var enemy = new Items(a,time);
	enemy.setScale(0.833, 0.833);
	g_sharedGameLayer.addEnemy(enemy);
	MW.CONTAINER.ENEMIES.push(enemy);
	return enemy;
};

Items.preSet = function () {
	
//	var arrTemp1=randomsor(1,11,11);
//	var arrTemp2=randomsor(1,11,11);
//	var arrTemp3=randomsor(1,11,8);
//	arrTemp1=arrTemp1.concat(arrTemp2,arrTemp3);
	
	var arrTemp1=math_ranArrAtNum(mm_arr_CartNumber, 5);
	arrTemp1=arrTemp1.concat(arrTemp1,arrTemp1,arrTemp1,arrTemp1,arrTemp1);
	arrTemp1=math_ranArrAtNum(arrTemp1, 30);
	
	
	var num=2;
	var item = null;
	var continerw=cc.view.getFrameSize();
	var yFrist=(960*theScaleH-725)/2+50;
	//yFrist=0;
	for (var i = 0; i < 5; i++) {
		var _projectiles=[];
		var _projectxy=[];
		for (var j = 0; j < 6; j++) {
			item = Items.create(arrTemp1[i*6+j],5-j);
			item.x=item.xFrist+i*item.addX;
			item.y=yFrist+j*item.addY;
			item.biao1=j;
			item.biao2=i;
			item.iBiao=arrTemp1[i*6+j];
//			item.createThis();
			cc.log("item.iBiao="+item.iBiao);
			//item.setScale(0.833f, 0.833f);
			_projectiles.push(arrTemp1[i*6+j]);
			_projectxy.push([item.x,item.y])
		}
		//cc.arrayRemoveArray(arr, minusArr)
		mm_arr_Main.push(_projectiles);
		mm_arr_XY.push(_projectxy);
	}
	cc.log("mm_arr_Main="+mm_arr_Main[1][2]);
		
};
function randomsor(start,end,count){
	var total=end-start+1;
	var numberArry=new Array();
	for(var i=0;i<total;i++,start++){
		numberArry[i]=start;
	}
	for (var i=0;i<10;i++){numberArry.sort(function(){return 0.5-Math.random();});}
	
	for(var i=0;i<total-count;i++){
		numberArry.pop();
	}
	return numberArry;
}
