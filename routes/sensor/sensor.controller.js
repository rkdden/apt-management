// ref https://www.npmjs.com/package/dateformat
const dateFormat = require('dateformat');
const { AptDong, AptHo, Sensor, sequelize } = require('../../models');
const messageController = require('../message/message.controller');
const { Op } = require("sequelize");



exports.selectAll = async (req, res) => {
    try {
        let now = new Date();
        let { 
            year = dateFormat(now, 'yyyy'),
            month = dateFormat(now, 'mm'),
            day = dateFormat(now, 'd'),
            time, temperature, electricity, humidity, roomType} = req.body;
            const enddate = Number.parseInt(month) + 1;
        const result = await Sensor.findAll({
            where: {
                created_at: {
                    [Op.between]: [dateFormat(`${year}-${month}-01 00:00:00`, 'yyyy-mm-dd HH:MM:ss'), dateFormat(`${year}-${enddate}-01 00:00:00`, 'yyyy-mm-dd HH:MM:ss')],                 
                    },
            },
            attributes: [
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('humidity')), 2 ), 'humidityavg'],
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('temperature')), 2 ), 'temperatureavg'],
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('electricity')), 2 ), 'electricityavg'],
            ],
            order: [['created_at', 'DESC']]
        });
        result.map(Sensor => {
            console.log(Sensor.dataValues);
            res.json({Sensor});
        });
        
    } catch (error) {
        console.log(error);
    }
}