const Sequelize = require('sequelize');

module.exports = class Sensor extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 온도
            temperature: {
                type: Sequelize.STRING(30),
            },
            // 습도
            humidity: {
                type: Sequelize.STRING(30),
            },
            // 방 종류
            room_type: {
                type: Sequelize.STRING(20),
            },
            // 전력량
            electricity: {
                type: Sequelize.STRING(50),
            },
        }, {
            sequelize,
            // 생성, 수정시간 추가
            timestamps: true,
            // 수정시간 삭제
            updatedAt: false,
            underscored: true,
            modelName: 'Sensor',
            tableName: 'sensor',
            // deleteAt 컬럼 추가 여부
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Sensor.belongsTo(db.AptHo, {foreignKey: 'apt_ho'})// aptHo 1 : N : Sensor
    }
};