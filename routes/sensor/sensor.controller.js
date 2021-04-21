// const messageController = require('../message/message.controller');
const query = require('./query.controller');


exports.selectAll = async (req, res) => {
    try {
        let result = {};
        result.hour = {};
        result.day = {};
        result.month = {};
        
        // 시간 평균
        result.hour.humidity = await query.hourQuery("humidity");
        result.hour.temperature = await query.hourQuery("temperature");
        // result.hour.electricity = await query.hourQuery("electricity");
        // 하루 평균
        result.day.humidity = await query.dayQuery("humidity");
        result.day.temperature = await query.dayQuery("temperature");
        // result.day.electricity = await query.dayQuery("electricity");
        // 월 평균
        result.month.humidity = await query.monthQuery("humidity");
        result.month.temperature = await query.monthQuery("temperature");
        // result.month.electricity = await query.monthQuery("electricity");
        
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}