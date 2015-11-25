
//    修改一下数据库信息
//    'baike_doc', 'root', '123456',
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

var Proxy_t = sequelize.define('proxy_t', {
    proxyIp: Sequelize.STRING,
    proxyPort: Sequelize.STRING,
    proxyType: Sequelize.STRING,
    speed: Sequelize.STRING,
    verificationtime:Sequelize.STRING,
    count: Sequelize.INTEGER,
    micount: Sequelize.INTEGER,
    wandou: Sequelize.INTEGER,
    haodf: Sequelize.INTEGER,
    //id: Sequelize.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
})

var Rightproxy = sequelize.define('rightproxy', {
    proxyIp: Sequelize.STRING,
    proxyPort: Sequelize.STRING,
    proxyType: Sequelize.STRING,
    speed: Sequelize.STRING,
    verificationtime:Sequelize.STRING,
    count: Sequelize.INTEGER,
    micount: Sequelize.INTEGER,
    wandou: Sequelize.INTEGER,
    haodf: Sequelize.INTEGER,
    //id: Sequelize.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
})

exports.Rightproxy = Rightproxy;
exports.proxy_t = Proxy_t;
exports.sequelize = sequelize;


