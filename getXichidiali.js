var exec = require('child_process').exec;
var cheerio = require('cheerio');
var async = require('async');
var proxy_t = require('./postgreDb/db').proxy_t;


function getEachPageIp(url, fn) {
    var cmdStr = 'curl ' + url;
    exec(cmdStr, function (err, stdout, stderr) {
        if(err){   console.log('get ip error:'+stderr);
            cb(err, stderr);
        } else {
            $ = cheerio.load(stdout);
            $('#ip_list tr[class]').each(function () {
                //console.log($(this).find('td').length);
                var num = 0;
                var proxyIp = '';
                var proxyPort = '';
                var proxyType = '';
                var speed = '';
                var verificationtime = '';
                $(this).find('td').each(function (item) {
                    num++;
                    switch  (num) {
                        case 3:
                            proxyIp = $(this).text();
                            break;
                        case 4:
                            proxyPort = $(this).text();
                            break;
                        case 7:
                            proxyType = $(this).text();
                            break;
                        case 8:
                            speed = $(this).find('div[title]').attr('title');
                            break;
                        case 10:
                            verificationtime = $(this).text();
                            break;
                        default :
                            break;

                    }

                });

                proxy_t
                    .findOrCreate({where: {proxyIp: proxyIp, proxyPort: proxyPort}, defaults: {proxyType: proxyType, speed: speed, verificationtime: verificationtime, count : 0, micount: 0, wandou: 0, haodf: 0}})
            })
        }
        fn(null,'')
    })

}

function getXici(callback) {
    exec('curl http://www.xicidaili.com/nn/', function(err, stdout,stderr) {
        if(err){
            console.log('get weather api error:'+stderr);
            callback(err, stderr);
        } else {
            $ = cheerio.load(stdout);
            //    获得页数

            var pageUrls = [];
            for(var i = 1; i <= 2 ;i++) {
                pageUrls.push('http://www.xicidaili.com/nn/'+i);
            }
            //获取每一页的proxy
            async.mapLimit(pageUrls, 2, function(item, cb) {
                setTimeout(function() {
                    getEachPageIp(item, function (err, data) {
                        cb(null, '')
                    })
                }, 1000);
            }, function(err, results) {
                callback(null, '');
            });
        }

    })

}
exports.getXici = getXici;
