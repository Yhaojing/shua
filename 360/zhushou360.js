/**
 * Created by haojing on 15/10/22.
 * 手机版本
 */

var page = require('webpage').create(),
    system = require('system'),
    t, address, button_id;

// 设置浏览器
var userAgents = [
    'Mozilla/5.0 (Linux; U; Android 4.4.4; zh-cn; HTC_D820u Build/KTU84P) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'Mozilla/5.0 (Linux; Android 4.4.4; HTC D820u Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.89 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; U; Android 4.4.4; zh-cn; HTC_D820u Build/KTU84P) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'Mozilla/5.0 (Linux; Android 4.4.4; HTC D820u Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 ACHEETAHI/2100501044',
    'Mozilla/5.0 (Linux; Android 4.4.4; HTC D820u Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 bdbrowser_i18n/4.6.0.7',
    'Mozilla/5.0 (Linux; U; Android 4.4.4; zh-CN; HTC D820u Build/KTU84P) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/10.1.0.527 U3/0.8.0 Mobile Safari/534.30',
    'Mozilla/5.0 (Android; Mobile; rv:35.0) Gecko/35.0 Firefox/35.0',
    'Mozilla/5.0 (Linux; U; Android 4.4.4; zh-cn; HTC D820u Build/KTU84P) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 SogouMSE,SogouMobileBrowser/3.5.1',
    'Mozilla/5.0 (Linux; U; Android 4.4.4; zh-CN; HTC D820u Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Oupeng/10.2.3.88150 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; U; Android 4.4.4; zh-cn; HTC D820u Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko)Version/4.0 MQQBrowser/5.6 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; U; Android 4.4.4; zh-cn; HTC D820u Build/KTU84P) AppleWebKit/534.24 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.24 T5/2.0 baidubrowser/5.3.4.0 (Baidu; P1 4.4.4)',
    'Mozilla/5.0 (Linux; U; Android 4.4.4; zh-cn; HTC D820u Build/KTU84P) AppleWebKit/535.19 (KHTML, like Gecko) Version/4.0 LieBaoFast/2.28.1 Mobile Safari/535.19',
];
var r = Math.floor(Math.random() * (userAgents.length));
page.settings.userAgent= userAgents[r];
page.onConsoleMessage = function (msg) {
    console.log(msg);
};
t = Date.now();
// 设置代理
//phantom.setProxy(system.args[1], system.args[2], 'manual', '', '');
address = "http://m.app.haosou.com/";

page.viewportSize = {width: 1280, height: 800};

function searchWebPage (address, appName, cb) {

    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
            phantom.exit();
        } else {
            t = Date.now() - t;
            console.log('Loading time ' + t + ' msec');
            window.setTimeout(function () {
                var elemRect = page.evaluate(function () {
                    var search = document.getElementById('q');
                    return (search.getBoundingClientRect());
                })
                page.sendEvent('click', elemRect.left + elemRect.width / 2, elemRect.top + elemRect.height / 2);
                page.sendEvent('keypress', appName);
            }, 2500);

            window.setTimeout(function () {
                var elemRectButton = page.evaluate(function () {
                    return document.getElementsByClassName('search-button')[0].getBoundingClientRect();
                })
                page.sendEvent('click', elemRectButton.left + elemRectButton.width / 2, elemRectButton.top + elemRectButton.height / 2);
            }, 4500);

            window.setTimeout(function () {
                var appRect = page.evaluate(function () {
                    return document.querySelector('div.lists ul li').getBoundingClientRect();
                })
                page.sendEvent('click', appRect.left + appRect.width / 2, appRect.top + appRect.height / 2);
            }, 8500)

            window.setTimeout(function () {
                //page.render("./images/"+ new Date().getDay()+','+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+"miaoyi.png");
               console.log('360 OK')
                cb(null,'');
            }, 15000);
        }
    });
}
//phantom.exit();
searchWebPage(address, '妙医挂号', function (err, data) {
    phantom.exit();
});
