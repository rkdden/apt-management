const dateAndTime = require('date-and-time');

const now = new Date();
// 날짜 파싱
const parseDate = (data) => {
    return dateAndTime.format(data, 'YYYY-MM-DD HH:mm:ss');
};

const ddd = parseDate(dateAndTime.addDays(now, -1))


console.log(ddd);