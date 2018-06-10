/**
 * 说明:
 * 1.这里存储游戏中用到的图片资源.
 * 2.这个resource.js也只不过是project.json中枚举的一个js文件
 * 3.最终在CCBoot.js中加载prooject.json,从而把所有的json文件加载进去
 */

var res = {
    HelloWorld_png : "res/HelloWorld.png",
};


/**
 * 有趣的是:虽然看着是一个文件内的局部变量，但是由于统一由CCBoot负责加载，
 * 从而在main.js中就像全局变量一样可以直接使用
 */
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
