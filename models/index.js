const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const yaml = require('js-yaml');
const commConfig = yaml.load(fs.readFileSync(path.join(__dirname, "..", "config", "config.yaml"), 'utf8'));
const config = commConfig[process.env.NODE_ENV || "development"];



// 모델들
const AptDong = require('./aptDong');
const AptHo = require('./aptHo');
const Sensor = require('./sensor');
const User = require('./user');

const db = {};

const sequelize = new Sequelize(
    config.db.database,
    config.db.username, 
    config.db.password, 
    config.db,
);

db.sequelize = sequelize;
db.AptDong = AptDong;
db.AptHo = AptHo;
db.Sensor = Sensor;
db.User = User;


AptDong.init(sequelize);
AptHo.init(sequelize);
Sensor.init(sequelize);
User.init(sequelize);

AptDong.associate(db);
AptHo.associate(db);
Sensor.associate(db);
User.associate(db);

module.exports = db;
