const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 동
            uid: {
                type: Sequelize.STRING(100),
                
                allowNull: false,
            },
            uname: {
                type: Sequelize.STRING(30),
                allowNull: false,
            }, 
            accessToken: {
                type: Sequelize.STRING(100),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.belongsTo(db.AptHo, {foreignKey: 'apt_ho'}); // user 1 : 1 aptho
    }
};