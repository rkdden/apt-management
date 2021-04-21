const Sequelize = require('sequelize');

module.exports = class AptHo extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 호
            apt_ho: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            // 센서 여부
            sensor: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'AptHo',
            tableName: 'apt_ho',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.AptHo.belongsTo(db.AptDong, {foreignKey: 'apt_dong'}); // aptho N : 1 aptdong
        db.AptHo.hasMany(db.Sensor, {foreignKey: 'apt_ho'}); // aptHo 1 : N : Sensor
        db.AptHo.hasOne(db.User, {foreignKey: 'apt_ho'}); // aptho 1 : 1 user
    }
};