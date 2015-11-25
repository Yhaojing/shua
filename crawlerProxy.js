/**
 * Created by haojing on 15/10/15.
 */
var schedule = require('node-schedule');
var Xici = require('./getXichidiali');
var exec = require('child_process').exec;
var sequelize = require('./postgreDb/db.js').sequelize;
var RightProxy = require('./postgreDb/db.js').Rightproxy;
var Proxy_t = require('./postgreDb/db.js').proxy_t;
var async = require('async');
var request = require('request');
var checkProxy = require('./testRightProxy');

var rule = new schedule.RecurrenceRule();
rule.minute = [1, 26, 47];

var schedule = schedule.scheduleJob(rule, function(){
    console.log('爬取代理...');
    checkProxy.checkUseProxy();
    sequelize.query("delete from Proxy_t")
        .then(function(proxy) {
            Xici.getXici(function (err, data) {
                console.log('筛选有用的代理');
                checkProxy.getRight(function (err, doc) {
                    console.log('*******************筛选结束******************');
                });
            });

        })
});
