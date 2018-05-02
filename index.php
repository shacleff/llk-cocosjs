<?php
//require_once "jssdk.php";
//$jssdk = new JSSDK("wx215cb9f6f46d17c1", "cb67ed549c5247508aac253ac9b90a81");//这里修改成自己的配置
//$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>我拿了0分，战胜了0个汪，</title>
    <link rel="icon" type="image/GIF" href="res/favicon.ico"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="yes"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        body, canvas, div {
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            -khtml-user-select: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
    </style>
</head>
<body style="padding:0; margin: 0; background: #000;">
<canvas id="gameCanvas" width="640" height="960"></canvas>
<script src="frameworks/cocos2d-html5/CCBoot.js"></script>
<script cocos src="main.js"></script>
<script src="jweixin-1.0.0.js"></script>
<script>
  /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
   // 微信分享的数据
	window.wxData = {
		title: 'JJ连连看游戏', // 分享标题
        desc: 'JJ微信小游戏2015荣耀上市', // 分享描述
        link: 'http://html5app.kingold.com/html5/', // 分享链接
        imgUrl: 'http://html5app.kingold.com/html5/res/1.jpg', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
           alert("喵喵感谢您！");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
	}; 
  
  wx.config({
    debug: false,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
      'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
    ]
  });
	function share(m, step, percent){
		if(m == 0){
			document.title = window.wxData.desc = "跑啊，跑神马？你是我的小羊驼～～～";
		}
		if(m == 1){
			document.title = window.wxData.desc = "果纳芬连连看,连对了"+step+"对LOGO，打败"+percent+"%朋友圈的人！,获得LOGO大神称号,不服来挑一个!";
		}
		if(m == 2){
			document.title = window.wxData.desc = "我滴小羊驼呀它又跑掉了，T_T 快帮我抓回来！";
		}
	};
  wx.ready(function () {
    // 在这里调用 API
    wx.onMenuShareAppMessage(wxData);
  });
  
</script>
</body>
</html>
