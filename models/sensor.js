const Sequelize = require('sequelize');

module.exports = class Sensor extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 온도
            temperature: {
                type: Sequelize.STRING(100),
            },
            // 습도
            humidity: {
                type: Sequelize.STRING(100),
            },
            // 방 종류
            roomType: {
                type: Sequelize.STRING(20),
            },
            // 전력량
            electricity: {
                type: Sequelize.STRING(100),
            },
        }, {
            sequelize,
            // 생성, 수정시간 추가
            timestamps: true,
            // 수정시간 삭제
            updatedAt: false,
            underscored: false,
            modelName: 'Sensor',
            tableName: 'sensors',
            // deleteAt 컬럼 추가 여부
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Sensor.belongsTo(db.AptHo)// aptHo 1 : N : Sensor
    }
};