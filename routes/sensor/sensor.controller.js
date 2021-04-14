// ref https://www.npmjs.com/package/dateformat
const dateFormat = require('dateformat');
const { AptDong, AptHo, Sensor } = require('../../models');
const { Op } = require("sequelize");

// 시간대별로 만들기
exports.selectAll = async (req, res) => {
    // 날짜별 쿼리
    // 올타임(99999), 1년(365), 6개월(182), 한달(30), 1주일(7), 하루(1)
    // 연도별
    try {
        let now = new Date();
        // timeValue에 필요한 일수별로 받아오기
        const { complex = "1단지", dong= "1동", ho= "101", timeValue="1"} = req.body;
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
                    where: {
                        created_at: {
                            [Op.between]: [new Date(now - 86400000 * timeValue), now],
                        }
                    }
                }
            }
        });
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}