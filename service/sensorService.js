const { AptHo, Sensor, AptDong } = require('../models');
const logger = require('../config/winston')('sensorService');

module.exports = {
    save(param){
        AptHo.findOne({
            where: {
                apt_ho: param.number
            },
            include: {
                model: AptDong,
                where: {
                    apt_complex: param.aptComplex,
                    apt_dong: param.aptDong,
                }
            }
        }).then((value => {
            Sensor.create({
                temperature: param.temperature,
                humidity: param.humidity,
                room_type: param.roomType,
                electricity: param.watt,
                apt_ho: value.id
            });
        })).catch(e=>{
            logger.info(e);
        });
    }
}
