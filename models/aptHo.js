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
        db.AptHo.belongsTo(db.AptDong); // aptDong 1 : N aptHo
        db.AptHo.hasMany(db.Sensor); // aptHo 1 : N : Sensor
    }
};