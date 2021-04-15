// ref https://www.npmjs.com/package/dateformat
const dateFormat = require('dateformat');
const { AptDong, AptHo, Sensor, sequelize } = require('../../models');
const { Op } = require("sequelize");

// 시간대별로 만들기
exports.selectAll = async (req, res) => {
    // 날짜별 쿼리
    // 올타임(99999), 1년(365), 6개월(182), 한달(30), 1주일(7), 하루(1)
    // 연도별
    try {
        let now = new Date();
        // timeValue에 필요한 일수별로 받아오기
        const { complex = "1단지", dong= "1동", ho= "101", timeValue="10"} = req.body;
        const result = await AptDong.findOne({
            attributes: ['apt_complex', 'apt_dong'],
            where: {
                apt_complex: complex,
                apt_dong: dong,
            },
            include: {
                model: AptHo,
                attributes: ['id'],
                include: {
                    model: Sensor,
                    attributes: ['room_type','temperature', 'humidity', 'electricity'],
                    where: {
                        created_at: {
                            [Op.between]: [new Date(now - 86400000 * timeValue), now],
                        }
                    },
                }
            }
        });
        
        // 달 별 습도 평균
        // let now = new Date();
        // console.log(now);
        
        // let { 
        //     year = dateFormat(now, 'yyyy'),
        //     month = dateFormat(now, 'mm'),
        //     day = dateFormat(now, 'd'),
        //     time, temperature, electricity, humidity, roomType} = req.body;
        //     const enddate = Number.parseInt(month) + 1;
        // const result = await Sensor.findAll({
        //     where: {
        //         created_at: {
        //             [Op.between]: [dateFormat(`${year}-${month}-01 00:00:00`, 'yyyy-mm-dd HH:MM:ss'), dateFormat(`${year}-${enddate}-01 00:00:00`, 'yyyy-mm-dd HH:MM:ss')],                 
        //             },
        //     },
        //     attributes: [ [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('humidity')), 2 ), 'sensoravg'] ],
        //     order: [['created_at', 'DESC']]
        // });

        // 결과값 받아오기
        // result.map(Sensor => {
        //     console.log(Sensor.dataValues.sensoravg);
        // });
        
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}