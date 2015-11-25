/**
 * Created by haojing on 15/10/28.
 */
/**
 * Created by haojing on 15/10/23.
 */
/**
 * Created by haojing on 15/10/22.
 */
var schedule = require('node-schedule');
var exec = require('child_process').exec;
var RightProxy = require('../postgreDb/db.js').Rightproxy;

var rule = new schedule.RecurrenceRule();
rule.hour =[ new schedule.Range(9, 18)];
var minutes = [];
for(var i =1; i<60; i++){
    minutes.push(i);
}//每小时4次
rule.minute = minutes;
rule.second = Math.floor(Math.random()*60);

var zhixing = 0;
var schedule = schedule.scheduleJob(rule, function(){
    zhixing++;
    console.log(zhixing +'次 执行任务：'+ new Date().getSeconds());
    RightProxy.findOne({
        where: {
            wandou:{
                $lt: 2
            }
        }
    }).then(function (proxy) {
        var proxyR = proxy.dataValues;
        RightProxy.update({
            wandou: proxyR.wandou+1,
        }, {
            where: {
                proxyIp: proxyR.proxyIp,
                proxyPort: proxyR.proxyPort

            }
        });
        var cmdStr = '/usr/local/bin/phantomjs pp.js ' + proxyR.proxyIp + ' ' + proxyR.proxyPort;
        console.log(cmdStr);
        exec(cmdStr, function(err, stdout,stderr) {
            if(err){   console.log('get weather api error:'+stderr);
            } else {
                console.log(stdout);//stdout标准输出
            }
        })
    })

});
