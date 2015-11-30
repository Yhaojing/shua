/**
 * Created by haojing on 15/10/27.
 */
/**
 * Created by haojing on 15/10/22.
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
console.log(userAgents[r]);
page.onConsoleMessage = function (msg) {
    console.log(msg);
};
t = Date.now();

// 设置代理
phantom.setProxy(system.args[1] , system.args[2], 'manual', '', '');
address = "http://m.app.mi.com/"

page.viewportSize = {width: 1280, height: 800};
function searchWebPage (address, appName, arg, cb) {
    page.open(address, function (status) {
        //console.log('img[alt=' + system.args[] + ']')
        if (status !== 'success') {
            console.log('FAIL to load the address');
            cb(null, status);
        } else {
            console.log('xiaomi 妙医 loading...');
            window.setTimeout(function () {
                var elemRect = page.evaluate(function () {
                    var search =  document.getElementsByClassName('search-flex9')[1];
                    if(search !== undefined && search !==0) {
                        return (search.getBoundingClientRect());

                    } else {
                        return 0;
                    }
                });

                if(elemRect === 0 || elemRect === null) {
                    console.log('miMiao exit 1');
                    phantom.exit();
                } else {
                    page.sendEvent('click', elemRect.left + elemRect.width / 2, elemRect.top + elemRect.height / 2);
                    page.sendEvent('keypress', appName);
                }
            }, 4000);

            window.setTimeout(function () {
                var rectButton = page.evaluate(function () {
                    var search = document.getElementsByClassName('search-flex2')[1]
                    if( search!== undefined && search !==null) {
                        return document.getElementsByClassName('search-flex2')[1].getBoundingClientRect();

                    } else {
                        return 0;
                    }
                })
                if(rectButton === 0 || rectButton === null) {
                    console.log('miMiao exit 2');
                    phantom.exit();
                } else {
                    page.sendEvent('click', rectButton.left + rectButton.width/2, rectButton.top + rectButton.height/2);

                }
            }, 6500);

            window.setTimeout(function () {
                //console.log('img[alt="' + arg + '"]')
                var rectButton = page.evaluate(function (name) {
                    var rect = document.querySelector('img[alt="' + name + '"]').getBoundingClientRect();
                    if(rect !== undefined && rect !== null) {
                        return document.querySelector('img[alt="' + name + '"]').getBoundingClientRect();

                    } else {
                        return 0;
                    }
                },arg);

                if(rectButton === 0 || rectButton === null) {
                    console.log('miMiao exit 3');
                    phantom.exit();
                } else if(rectButton.left  ==null) {
                    phantom.exit();
                } else {
                    page.sendEvent('click', rectButton.left + rectButton.width/2, rectButton.top + rectButton.height/2);

                }
            }, 10000);

            window.setTimeout(function () {
                console.log('xiaomi妙医加载完');
                cb(null, status);
            }, 15000)
        }
    })
}

searchWebPage(address, '妙医','妙医挂号', function (err, data) {
    phantom.exit();
});
