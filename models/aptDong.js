const Sequelize = require('sequelize');

module.exports = class AptDong extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 동
            aptDong: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            // 단지
            aptComplex: {
                type: Sequelize.STRING(30),
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'AptDong',
            tableName: 'aptDongs',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.AptDong.hasMany(db.AptHo);   // aptDong 1 : N aptHo
    }
};