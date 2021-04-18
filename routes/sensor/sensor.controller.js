// ref https://www.npmjs.com/package/dateformat
const dateFormat = require('dateformat');
const messageController = require('../message/message.controller');
const { Op } = require("sequelize");
const { AptDong, AptHo, Sensor, sequelize } = require('../../models');


// 시간대별로 만들기
exports.selectAll = async (req, res) => {
    // 날짜별 쿼리
    // 올타임(99999), 1년(365), 6개월(182), 한달(30), 1주일(7), 하루(1)
    // 연도별
    try {
        let now = new Date();
        console.log(now);
        
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
            attributes: ['id' ,[sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('humidity')), 2 ), 'sensoravg'] ],
            order: [['created_at', 'DESC']]
        });
        //messageController.sendMessage({user, result});
        res.json({result});
        // let now = new Date();
        // // timeValue에 필요한 일수별로 받아오기
        // const { complex = "1단", dong= "101", ho= "101", timeValue="1"} = req.body;
        // const result = await AptDong.findOne({
        //     attributes: ['apt_complex', 'apt_dong'],
        //     where: {
        //         apt_complex: complex,
        //         apt_dong: dong,
        //     },
        //     include: {
        //         model: AptHo,
        //         attributes: ['id'],
        //         include: {
        //             model: Sensor,
        //             where: {
        //                 created_at: {
        //                     [Op.between]: [new Date(now - 86400000 * timeValue), now],
        //                 },
        //             },
        //             attributes: ['room_type', 'humidity', 'electricity'],
        //         },
        //     }
        // });
        // res.json(result);
    } catch (error) {
        console.log(error);
    }
}