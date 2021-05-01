const schedule = require('node-schedule');
const mailSender = require("./mailer");
const saveChart = require("./drawLine");
const apt_Info = require('./emailService');
const { User, Sensor, AptHo, AptDong } = require('../../models');

const data = [...Array(100).keys()];

const get_year = () => {
    const year = new Date();
    return year.getFullYear();
}
const get_month = () => {
	const today = new Date();

	return today.getMonth() + 1;
}

//const basename = apt_Info.aptFind(); // danji_dong_ho
// 아파트의 모든 단지 동 호 정보 가져오기
const basename = async () => {
    const aptInfo = await apt_Info.aptFind();
    for (let i = 0; i < aptInfo.length; i++){
        let fileName = aptInfo[i].AptDong.apt_complex + aptInfo[i].AptDong.apt_dong + aptInfo[i].apt_ho;
        wattChart(fileName);
        tempChart(fileName);
        humiChart(fileName);
    };
};

// 아파트 모든 세대의 전력 차트 그리기
const wattChart = (fileName) => {
    const filewatt = fileName + "watt.png";
    saveChart(get_month(), get_year(), filewatt, "Watt", data);
};

// 아파트 모든 세대 온도 차트 그리기
const tempChart = (fileName) => {
    const filetemp = fileName + "temp.png";
    saveChart(get_month(), get_year(), filetemp, "Temp", data);
};

// 아파트 모든 세대 습도 차트 그리기
const humiChart = (fileName) => {
    const filehumi = fileName + "humi.png";
    saveChart(get_month(), get_year(), filehumi, "Humi", data);
};


const rule = new schedule.RecurrenceRule();
const m = 23;
rule.minute = m;

const mailResult = async () => {
    const userinfo = await User.findAll({
        attributes: ['uemail', 'apt_ho'],
        include: {
            model: AptHo,
            include: {
                model: AptDong,
            }
        },
    });
    userinfo.map((user) => {
        let emailParam = {
            toEmail: `${user.uemail}`,
            subject: `${get_month()}월 사용량입니다.`,
            text: `${get_month()}월 사용량입니다.`,
            // ex)1단지101동101호
            name: `${user.AptHo.AptDong.apt_complex}${user.AptHo.AptDong.apt_dong}${user.AptHo.apt_ho}`,
            month: get_month()
        };
        const j = schedule.scheduleJob(rule, async function() {
            console.log("Run mail");
            await basename();
            mailSender.sendGmail(emailParam);
        });
    })
}
mailResult();