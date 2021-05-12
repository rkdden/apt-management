const dateAndTime = require('date-and-time');
const { AptDong, AptHo, Sensor, sequelize } = require('../../models');
const { Op } = require("sequelize");

const now = new Date('2021-05-01 00:00:00'); // 여기서 날짜는 저시간에 실행됬다는 가정임
// 날짜 파싱

// 매달 1일 0시 0분 0초 return
const startDate = (data) => {
  return dateAndTime.format(data, 'YYYY-MM-DD 00:00:00');
}
// 매달 말일 23시 59분 59초 return
const endDate = (data) => {
  return dateAndTime.format(data, 'YYYY-MM-DD 23:59:59');
}

exports.aptFind = async () => {
  const apt = await AptHo.findAll({
    include: {
      model: AptDong
    }
  })
  return apt;
};

exports.sensorFind = async (Complex, Dong, Ho) => {
  const Hoid = await AptHo.findOne({
    where : {
      apt_ho: Ho
    },
    attributes: ['id'],
    include: {
      model: AptDong,
      where: {
        apt_complex: Complex,
        apt_dong: Dong,
      },
    },
  });
    
  const exData = await Sensor.findAll({
    where: {
      created_at: { // 한달 전 데이터 
        [Op.between]: [startDate(dateAndTime.addMonths(now, -1)), endDate(dateAndTime.addDays(now, -1))],
        },
      apt_ho: Hoid.id,
    },
    attributes: [
      [sequelize.fn('DATE', sequelize.col('created_at')), 'date'],
      [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('temperature')), 2 ), 'temperatureAVG'],
      [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('humidity')), 2 ), 'humidityAVG'],
      [sequelize.fn('SUM', sequelize.col('electricity')), 'electricitySUM'],
    ],
    group: 'date',
    include: {
      model: AptHo,
      attributes: ['apt_ho'],
      include: {
        model: AptDong,
        attributes: ['apt_complex', 'apt_dong'],
      },
    },
  });
  return exData;
};
