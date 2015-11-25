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

phantom.setProxy(system.args[1], system.args[2], 'manual', '', '');
address = 'http://www.wandoujia.com/apps';
page.viewportSize = {width: 1280, height: 800};

function searchForwandou (address, app, cb) {
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Fail to load the ', address);
        } else {
            console.log('wandoujia Loading ...');
            window.setTimeout(function () {
                var elemRect = page.evaluate(function () {
                    var searchInput = document.getElementById('j-search-input');
                    return searchInput.getBoundingClientRect();
                });
                page.sendEvent("click", elemRect.left + elemRect.width / 2, elemRect.top + elemRect.height / 2);
                page.sendEvent("keypress", app);
            },1500)

            window.setTimeout(function () {
                var elemRect2 = page.evaluate(function () {
                    return document.querySelector('input[value="搜索"]').getBoundingClientRect();
                })
                page.sendEvent('click', elemRect2.left + elemRect2.width / 2, elemRect2.top + elemRect2.height / 2);
            }, 2500)

            window.setTimeout(function () {
                var elemRect2 = page.evaluate(function (s) {
                    document.querySelector('a[title="妙医挂号"]').target = null;
                    return document.querySelector('a[title="妙医挂号"]').getBoundingClientRect();
                }, app)
                page.sendEvent('click', elemRect2.left + elemRect2.width / 2, elemRect2.top + elemRect2.height / 2);
            }, 4500)

            window.setTimeout(function () {
                console.log(" 豌豆荚 ending");
                cb(null,'');
            }, 8500)
        }
    })
}

searchForwandou(address, '妙医', function (err, data) {
    phantom.exit();
});