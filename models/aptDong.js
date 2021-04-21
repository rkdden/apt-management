const Sequelize = require('sequelize');

module.exports = class AptDong extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 단지
            apt_complex: {
                type: Sequelize.STRING(30),
                allowNull: false,  
            },
            // 동
            apt_dong: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'AptDong',
            tableName: 'apt_dong',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
           db.AptDong.hasMany(db.AptHo, {foreignKey: 'apt_dong'}); // AptDong 1 : N AptHo
    }
};