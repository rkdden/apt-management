// ref https://www.npmjs.com/package/dateformat
const dateFormat = require('dateformat');
const messageController = require('../message/message.controller');
const { Sensor } = require('../../models');
const { Op, NUMBER } = require("sequelize");

// 시간대별로 만들기
exports.selectAll = async (req, res) => {
    // 날짜별 작업중
    // 2021, 04, 12, 12:00~13:00, 
    try {
        let now = new Date('2021-02-01');
        console.log(now);
        
        let { 
            year = dateFormat(now, 'yyyy'),
            month = dateFormat(now, 'mm'),
            day = dateFormat(now, 'd'),
            time, temperature, electricity, humidity, roomType} = req.body;
            const enddate = Number.parseInt(month) + 1;
            console.log(enddate);
        
        const result = await Sensor.findAll({
            where: {
                created_at: {
                    [Op.between]: [dateFormat(`${year}-${month}-01 00:00:00`, 'yyyy-mm-dd HH:MM:ss'), dateFormat(`${year}-${enddate}-01 00:00:00`, 'yyyy-mm-dd HH:MM:ss')],                 
                    },
            },
            order: [['created_at', 'DESC']]
        });
        //const user = req.user;
        //messageController.sendMessage({user, result});
        res.json({result});
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