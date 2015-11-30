/**
 * Created by haojing on 15/11/25.
 */
/**
 * Created by haojing on 15/10/22.
 * 手机版本
 */

var page = require('webpage').create(),
    system = require('system'),
    t, address, button_id;

// 设置浏览器
page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36"
page.onConsoleMessage = function (msg) {
    console.log(msg);
};
t = Date.now();
// 设置代理
phantom.setProxy(system.args[1], system.args[2], 'manual', '', '');
address = "http://zhushou.360.cn/";

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
                    var search = document.getElementById('kwd');
                    if(search !==undefined && search !==null) {
                        return (search.getBoundingClientRect());

                    } else {
                        return 0;
                    }
                });

                if(elemRect === 0 || elemRect === null)  {
                    console.log('360 Exit 1');

                    phantom.exit();
                } else {
                    page.sendEvent('click', elemRect.left + elemRect.width / 2, elemRect.top + elemRect.height / 2);
                    page.sendEvent('keypress', appName);
                }
            }, 2500);

            window.setTimeout(function () {
                var elemRectButton = page.evaluate(function () {
                    var search = document.querySelector('button[title="软件搜索"]');
                    if(search !==undefined  && search !==null) {
                        return (search.getBoundingClientRect());

                    } else {
                        return 0;
                    }
                });

                if(elemRectButton === 0 || elemRectButton === null) {
                    console.log('360 Exit 2');

                    phantom.exit();

                } else {
                    page.sendEvent('click', elemRectButton.left + elemRectButton.width / 2, elemRectButton.top + elemRectButton.height / 2);
                }
            }, 4500);

            window.setTimeout(function () {
                var appRect = page.evaluate(function () {
                    var search = document.querySelector('a[title="妙医挂号"]');
                    if(search !==undefined  && search !==null) {
                        return (search.getBoundingClientRect());

                    } else {
                        return 0;
                    }
                });
                if(appRect === 0 || appRect === null) {
                    console.log('360 Exit 3');
                    phantom.exit();
                } else {
                    page.sendEvent('click', appRect.left + appRect.width / 2, appRect.top + appRect.height / 2);
                }
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
searchWebPage(address, '挂号', function (err, data) {
    phantom.exit();
});
