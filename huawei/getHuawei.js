/**
 * Created by haojing on 15/11/16.
 */
/**
 * Created by haojing on 15/11/4.
 */
/**
 * Created by haojing on 15/10/10.
 * 豌豆荚
 */

var page = require('webpage').create(),
    system = require('system'),
    address;

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

address = 'http://a.vmall.com/search';
page.viewportSize = {width: 1280, height: 800};
phantom.setProxy(system.args[1], system.args[2], 'manual', '', '');

page.open(address, function (status) {
    if (status !== 'success') {
        console.log('Fail to load the ', address);
    } else {
        console.log('华为 loading success');
        window.setTimeout(function () {
            var rect1 = page.evaluate(function () {
                return document.getElementsByClassName('search-txt')[0].getBoundingClientRect();
            });

            page.sendEvent("click", rect1.left + rect1.width/2 , rect1.top + rect1 .height/2);
            page.sendEvent("keypress", '挂号');
            //page.render('./2.png');
        }, 2500);

        window.setTimeout(function () {
            var rect2 = page.evaluate(function () {
                return document.getElementById("searchBtn").getBoundingClientRect();
            });
            page.sendEvent('click', rect2.left + rect2.width/2 , rect2.top + rect2 .height/2);
        }, 4500);

        phantom.injectJs('jquery.min.js');

        window.setTimeout(function () {
            var rect3 = page.evaluate(function () {
               var location = $('h3:contains("妙医挂号")')[0].getBoundingClientRect();
                window.scrollTo(location.left, location.top);
                return $('h3:contains("妙医挂号")')[0].getBoundingClientRect();
            });
            page.sendEvent('click', rect3.left + rect3.width/2 , rect3.top + rect3 .height/2);
        }, 6500);

        window.setTimeout(function () {
            console.log('华为 loading ending');
            phantom.exit();
        }, 15000)
    }
})
