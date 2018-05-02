var BaseLayer = cc.LayerColor.extend({
    listener:null,
    ctor:function(){
    	this._super(cc.color(255,255,255,180),WINSIZE.width,WINSIZE.height);
        //使得下层的点击事情无效
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchEnded: function (touch, event) {
            }
        });

       // cc.eventManager.addListener(this.listener, this);

    },

    destory:function(){
        console.log("baselayer.");
      //  cc.eventManager.removeListener(this.listener);
    }
});/**
 * Created by Administrator on 2014/9/29.
 */
