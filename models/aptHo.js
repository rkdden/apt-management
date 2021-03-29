const Sequelize = require('sequelize');

module.exports = class AptHo extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 호
            aptHo: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            // 센서 여부
            sensor: {
                type: Sequelize.STRING(30),
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'AptHo',
            tableName: 'aptHos',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.AptHo.belongsTo(db.AptDong); // aptDong 1 : N aptHo
        db.AptHo.hasMany(db.Sensor); // aptHo 1 : N : Sensor
    }
};