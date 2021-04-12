// ref https://www.npmjs.com/package/dateformat
const dateFormat = require('dateformat');
const { Sensor } = require('../../models');
const { Op } = require("sequelize");

// 시간대별로 만들기
exports.selectAll = async (req, res) => {
    // 날짜별 작업중
    // 2021, 04, 12, 12:00~13:00, 
    try {
        let now = new Date();
        console.log(dateFormat(now, 'yy'));
        let { 
            year = dateFormat(now, 'yy'),
            month = dateFormat(now, 'm'),
            day = dateFormat(now, 'd'),
            time, temperature, electricity, humidity, roomType} = req.body;
        console.log(`year : ${year}, month : ${month}, day : ${day}`);
        res.send('ok');
        // const result = await Sensor.findAll({
        //     where: {
        //         created_at: {
        //             [Op.lt]: new Date(),
        //             [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
        //         }
        //     }
        // })
        // res.json(result);
    } catch (error) {
        console.log(error);
    }
}
// exports.selectTime = async (req, res) => {
//     const result = await Sensor.findAll
// }

// Foo.findAll({
//     where: {
//       rank: {
//         [Op.or]: {
//           [Op.lt]: 1000,
//           [Op.eq]: null
//         }
//       },
//       // rank < 1000 OR rank IS NULL
//       {
//         createdAt: {
//           [Op.lt]: new Date(),
//           [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
//         }
//       },
//       // createdAt < [timestamp] AND createdAt > [timestamp]
  
//       {
//         [Op.or]: [
//           {
//             title: {
//               [Op.like]: 'Boat%'
//             }
//           },
//           {
//             description: {
//               [Op.like]: '%boat%'
//             }
//           }
//         ]
//       }
//       // title LIKE 'Boat%' OR description LIKE '%boat%'
//     }
//   });