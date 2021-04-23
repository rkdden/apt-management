// const messageController = require('../message/message.controller');
const query = require('./query.controller');


exports.mainData = async (req, res) => {
    try {
        let result = {};
        result.hour = {};
        result.day = {};
        result.month = {};
        
        // 시간 평균
        result.hour.humidity = await query.hourQuery("humidity", "AVG");
        result.hour.temperature = await query.hourQuery("temperature", "AVG");
        result.hour.electricity = await query.hourQuery("electricity", "SUM");
        // 하루 평균
        result.day.humidity = await query.dayQuery("humidity", "AVG");
        result.day.temperature = await query.dayQuery("temperature", "AVG");
        result.day.electricity = await query.dayQuery("electricity", "SUM");
        // 월 평균
        result.month.humidity = await query.monthQuery("humidity", "AVG");
        result.month.temperature = await query.monthQuery("temperature", "AVG");
        result.month.electricity = await query.monthQuery("electricity", "SUM");
        
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}
exports.detailData = async (req, res) => {
    // 달력 눌러서
}