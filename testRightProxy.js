/**
 * Created by haojing on 15/10/14.
 */
var proxy_t = require('./postgreDb/db').proxy_t;
var RightProxy = require('./postgreDb/db').Rightproxy;
var async = require('async');
var request = require('request');

exports.getRight = function (fn) {
    proxy_t.findAll().then(function (result) {
        async.map(result, function (item, cb) {
            cb(null, item.dataValues);
        }, function (err, results) {
            //console.log(results)
            async.map(result,function (item, cb) {
                var ip = item.proxyIp;
                var port = item.proxyPort;
                var proxy = 'http://' + ip + ':' + port;
                var option = {
                    url: 'http://zhushou.360.cn/',
                    proxy: proxy,
                    timeout: 15 * 1000
                };
                //console.log(results[i].proxyIp);
                request(option, function (err, response, body) {
                    if (err) {
                        console.log(err);
                        console.log(ip, 'fail to read');
                        RightProxy.findAll(
                            {
                                where: {
                                    proxyIp: ip,
                                    proxyPort: port
                                }
                            }).then(function (item) {
                                if (item.length !== 0) {
                                    RightProxy.destroy({
                                        where: {
                                            proxyIp: ip,
                                            proxyPort: port
                                        }
                                    });
                                }
                                cb(err,'');
                            })
                    } else {
                        console.log('可以通过');
                        RightProxy
                            .findOrCreate({where: {proxyIp: ip, proxyPort: port}, defaults: {proxyType: item.proxyType, speed: item.speed, verificationtime: item.verificationtime, count : item.count, micount: item.micount, wandou:item.wandou, haodf: item.haodf}})
                            .then(function (result) {
                                cb(null, '');
                            })
                    }
                })

            }, function (err, results) {
                    fn(null, results);
            })


        })
    })

}
//删除RightProxy不可以使用的ip
exports.checkUseProxy = function () {
    RightProxy.findAll().then(function (usablePro) {
        async.map(usablePro, function (item, cb) {
            var proxy = item.dataValues;
            var ip = proxy.proxyIp;
            var port = proxy.proxyPort;
            var option = {
                url: 'http://zhushou.360.cn',
                proxy: proxy,
                timeout: 15 * 1000
            };
            request(option, function (err, resqonse, body) {
                if(err) {
                    RightProxy.destroy({
                        where: {
                            proxyIp: ip,
                            proxyPort: port
                        }
                    }).then(function () {
                      cb(err, '');
                    })
                } else {
                    cb(null, '');
                }
            })

        }, function (err, proxys) {
            console.log('每一小时验证一次有用的IP');
        })
    })
}