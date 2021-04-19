// ref https://www.npmjs.com/package/date-and-time
const dateAndTime = require('date-and-time');
const { AptDong, AptHo, Sensor, sequelize } = require('../../models');
const { Op } = require("sequelize");
const now = new Date();

const parseDate = (data) => {
    return dateAndTime.format(data, 'YYYY-MM-DD HH:mm:ss');
}

// 습도 온도 전력량 받기
exports.hourQuery = async (dataType) => {
    const result = await Sensor.findAll({
        where: {
            created_at: {
                [Op.between]: [parseDate(dateAndTime.addHours(now, -1)), parseDate(now)],
                },
        },
        attributes: [
            [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col(`${dataType}`)), 2 ), `hour${dataType}avg`],
            // [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('temperature')), 2 ), 'temperatureavg'],
            // [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('electricity')), 2 ), 'electricityavg'],
        ],
        order: [['created_at', 'DESC']]
    });
    return result;
};

exports.dayQuery = async (dataType) => {
    const result = await Sensor.findAll({
        where: {
            created_at: {
                [Op.between]: [parseDate(dateAndTime.addDays(now, -1)), parseDate(now)],
                },
        },
        attributes: [
            [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col(`${dataType}`)), 2 ), `day${dataType}avg`],
        ],
        order: [['created_at', 'DESC']]
    });
    return result;
};

exports.monthQuery = async (dataType) => {
    const result = await Sensor.findAll({
        where: {
            created_at: {
                [Op.between]: [parseDate(dateAndTime.addMonths(now, -1)), parseDate(now)],
                },
        },
        attributes: [
            [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col(`${dataType}`)), 2 ), `month${dataType}avg`],
        ],
        order: [['created_at', 'DESC']]
    });
    return result;
};