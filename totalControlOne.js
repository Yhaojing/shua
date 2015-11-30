/**
 * Created by haojing on 15/11/25.
 * 集体控制，分时间段的 11:00~14:00一分钟7次
 * 360、小米、华为、豌豆荚
 */
var schedule = require('node-schedule');
var exec = require('child_process').exec;
var RightProxy = require('./postgreDb/db.js').Rightproxy;

var rule = new schedule.RecurrenceRule();
rule.hour =[new schedule.Range(11, 14),new schedule.Range(17, 24)];
var minutes = [];
for(var i =1; i<60; i++){
    minutes.push(i);
}//每小时4次
rule.minute = minutes;
rule.second = [ 14, 28, 42,  56 ];
var count = 0;

var schedule = schedule.scheduleJob(rule, function(){
    count++;
    console.log(count +'次 执行任务：'+ new Date().getSeconds());
    RightProxy.findOne({
        where: {
            count:{
                $lt: 5
            }
        }
    }).then(function (proxy) {
        var proxyR = proxy.dataValues;

        RightProxy.update({
            count: proxyR.count+1,
        }, {
            where: {
                proxyIp: proxyR.proxyIp,
                proxyPort: proxyR.proxyPort

            }
        });

        //360 分别搜挂号和妙医
        exec('/usr/local/bin/phantomjs ./360/zhushou360.js ' + proxyR.proxyIp + ' ' + proxyR.proxyPort, function(err, stdout,stderr) {
            if(err){   console.log('get weather api error:'+stderr);
            } else {
                console.log('360:',stdout);//stdout标准输出
            }
        })

        exec( '/usr/local/bin/phantomjs ./360/guahao360.js ' + proxyR.proxyIp + ' ' + proxyR.proxyPort, function(err, stdout,stderr) {
            if (err) {
                console.log('get weather api error:' + stderr);
            } else {
                console.log('360:',stdout);//stdout标准输出

            }

        })

        //小米  搜索挂号 妙医
        exec( '/usr/local/bin/phantomjs ./xiaomi/miPhone.js ' + proxyR.proxyIp + ' ' + proxyR.proxyPort, function(err, stdout,stderr) {
            if(err){   console.log('get weather api error:'+stderr);
            } else {
                console.log('小米：',stdout);//stdout标准输出
            }
        })

        exec('/usr/local/bin/phantomjs ./xiaomi/newMiPhone.js '+ proxyR.proxyIp + ' ' + proxyR.proxyPort, function(err, stdout,stderr) {
            if(err){   console.log('get weather api error:'+stderr);
            } else {
                console.log('小米：',stdout);//stdout标准输出
            }
        })

        //华为
        exec('/usr/local/bin/phantomjs ./huawei/getHuawei.js ' + proxyR.proxyIp + ' ' + proxyR.proxyPort, function(err, stdout,stderr) {
            if(err){
                console.log('get weather api error:'+stderr);
            } else {
                console.log('华为：',stdout);//stdout标准输出

            }

        });

        ////豌豆夹分别搜索 挂号和妙医
        //exec('/usr/local/bin/phantomjs ./wandoujia/wandoujia.js ' + proxyR.proxyIp + ' ' + proxyR.proxyPort, function(err, stdout,stderr) {
        //    if(err){   console.log('get weather api error:'+stderr);
        //    } else {
        //        console.log(stdout);//stdout标准输出
        //    }
        //})
        //
        //exec('/usr/local/bin/phantomjs ./wandoujia/guahaoWan.js ' + proxyR.proxyIp + ' ' + proxyR.proxyPort, function(err, stdout,stderr) {
        //    if(err){   console.log('get weather api error:'+stderr);
        //    } else {
        //        console.log(stdout);//stdout标准输出
        //    }
        //})
    })

});
