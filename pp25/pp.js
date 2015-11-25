/**
 * Created by haojing on 15/10/28.
 */
var page = require('webpage').create(),
    system = require('system'),
    address;

page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
page.onConsoleMessage = function (msg) {
    console.log('The inner msg: ' + msg + '|');
};

phantom.setProxy(system.args[1], system.args[2], 'manual', '', '');
address = 'http://ios.25pp.com/';
page.viewportSize = {width: 1280, height: 800};

function searchForwandou (address, app, cb) {
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Fail to load the ', address);
        } else {
            console.log('Loading ...');

            window.setTimeout(function () {
                var rect = page.evaluate(function () {
                    return document.getElementsByClassName('seachInput')[0].getBoundingClientRect();
                })

                page.sendEvent('click', rect.left + rect.width/2 , rect.top + rect.height/2);
                page.sendEvent('keypress','妙医');
            }, 2500);

            window.setTimeout(function () {
                console.log('第一步完成 ...');

                //page.render('1.png');
                var btnrec = page.evaluate(function () {
                    return document.getElementsByClassName('btn-seach')[0].getBoundingClientRect();
                });

                page.sendEvent('click', btnrec.left + btnrec.width/2 , btnrec.top + btnrec.height/2);

            }, 4500);

            window.setTimeout(function () {
                var zan = page.evaluate(function () {
                    return  document.querySelectorAll('span[class="good-ico voteTarget"]')[2].getBoundingClientRect();//远洋妙医
                })
                //var miaoZan = page.evaluate(function () {
                //    return  document.querySelectorAll('span[class="good-ico voteTarget"]')[0].getBoundingClientRect();//妙医
                //})
                page.sendEvent('mousemove', zan.left + zan.width/2 , zan.top + zan.height/2);
                page.sendEvent('click', zan.left + zan.width/2 , zan.top + zan.height/2);
                //page.sendEvent('mousemove', miaoZan.left + miaoZan.width/2 , miaoZan.top + miaoZan.height/2);
                //page.sendEvent('click', miaoZan.left + miaoZan.width/2 , miaoZan.top + miaoZan.height/2);
            }, 8500)

            window.setTimeout(function () {
                console.log('第二步完成 ...');
                page.render("./images/"+ new Date().getDay()+','+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+"yuanyang.png");
                //page.render('zan1.png')
                //var zan = page.evaluate(function () {
                //    return  document.querySelectorAll('span[class="good-ico voteTarget"]')[2].getBoundingClientRect();//远洋妙医
                //})
                var miaoZan = page.evaluate(function () {
                    return  document.querySelectorAll('span[class="good-ico voteTarget"]')[0].getBoundingClientRect();//妙医
                })
                page.sendEvent('mousemove', miaoZan.left + miaoZan.width/2 , miaoZan.top + miaoZan.height/2);
                page.sendEvent('click', miaoZan.left + miaoZan.width/2 , miaoZan.top + miaoZan.height/2);
                //page.sendEvent('mousemove', zan.left + zan.width/2 , zan.top + zan.height/2);
                //page.sendEvent('click', zan.left + zan.width/2 , zan.top + zan.height/2);

            }, 10000)

            window.setTimeout(function () {
                console.log('第三步完成 ...');
                page.render("./images/"+ new Date().getDay()+','+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+"miaoyi.png");
                cb(null,'');
            }, 20000)
        }
    })
}

searchForwandou(address, '妙医', function (err, data) {
    phantom.exit();
});