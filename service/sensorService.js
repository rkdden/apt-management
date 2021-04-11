const { AptHo, Sensor } = require('../models');
const logger = require('../config/winston')('sensorService');

module.exports = {
    save(param){
        AptHo.findOne({
            where: {apt_ho: param.number}
        }).then((value => {
            Sensor.create({
                temperature: param.temperature,
                humidity: param.humidity,
                room_type: "small",
                electricity: param.watt,
                AptHoId: value //fk
            });
        })).catch(e=>{

        });
    }
}
