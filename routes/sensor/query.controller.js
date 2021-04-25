// ref https://www.npmjs.com/package/date-and-time
const dateAndTime = require('date-and-time');
const { AptDong, AptHo, Sensor, sequelize } = require('../../models');
const { Op } = require("sequelize");
const now = new Date();

const parseDate = (data) => {
    return dateAndTime.format(data, 'YYYY-MM-DD HH:mm:ss');
}

// 습도 온도 받기
exports.hourQuery = async (dataType, calculateType) => {
    const result = await Sensor.findAll({
        where: {
            created_at: {
                [Op.between]: [parseDate(dateAndTime.addHours(now, -1)), parseDate(now)],
                },
        },
        attributes: [
            [sequelize.fn('ROUND', sequelize.fn(`${calculateType}`, sequelize.col(`${dataType}`)), 2 ), `hour${dataType}${calculateType}`],
        ],
        order: [['created_at', 'DESC']]
    });
    return result;
};

exports.dayQuery = async (dataType, calculateType) => {
    const result = await Sensor.findAll({
        where: {
            created_at: {
                [Op.between]: [parseDate(dateAndTime.addDays(now, -1)), parseDate(now)],
                },
        },
        attributes: [
            [sequelize.fn('ROUND', sequelize.fn(`${calculateType}`, sequelize.col(`${dataType}`)), 2 ), `day${dataType}${calculateType}`],
        ],
        order: [['created_at', 'DESC']]
    });
    return result;
};

exports.monthQuery = async (dataType, calculateType) => {
    const result = await Sensor.findAll({
        where: {
            created_at: {
                [Op.between]: [parseDate(dateAndTime.addMonths(now, -1)), parseDate(now)],
                },
        },
        attributes: [
            [sequelize.fn('ROUND', sequelize.fn(`${calculateType}`, sequelize.col(`${dataType}`)), 2 ), `month${dataType}${calculateType}`],
        ],
        order: [['created_at', 'DESC']]
    });
    return result;
};

exports.detailQuery = async ( startfilter, endfilter, calculateType, dataType ) => {
    const start = parseDate(dateAndTime.parse(startfilter, 'YYYY/MM/DD'));
    const end = parseDate(dateAndTime.parse(endfilter, 'YYYY/MM/DD'));
    const result = await Sensor.findAll({
        where: {
            created_at: {
                [Op.between]: [start, end],
                },
        },
        attributes: [
            [sequelize.fn('ROUND', sequelize.fn(`${calculateType}`, sequelize.col(`${dataType}`)), 2 ), `detail${dataType}${calculateType}`],
        ],
        order: [['created_at', 'DESC']]
    });
    return result;
};