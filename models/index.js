const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

// 모델들
const AptDong = require('./aptDong');
const AptHo = require('./aptHo');
const Sensor = require('./sensor');

const db = {};

const sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    config, 
);

db.sequelize = sequelize;
db.AptDong = AptDong;
db.AptHo = AptHo;
db.Sensor = Sensor;

AptDong.init(sequelize);
AptHo.init(sequelize);
Sensor.init(sequelize);

AptDong.associate(db);
AptHo.associate(db);
Sensor.associate(db);

module.exports = db;
