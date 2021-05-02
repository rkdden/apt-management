const schedule = require('node-schedule');
const mailSender = require("./mailer");
const saveChart = require("./drawLine");
const apt_Info = require('./emailService');
const dateAndTime = require('date-and-time');
const { User, Sensor, AptHo, AptDong } = require('../../models');

//const data = [...Array(100).keys()];

const get_year = () => {
    const year = new Date();
    return year.getFullYear();
}
const get_month = () => {
	const today = new Date();

	return today.getMonth() + 1;
}

// 아파트 단지, 동, 호 일별 데이터 가져오기
const sensorData = async (Complex, Dong, Ho) => {
    let exData = await apt_Info.sensorFind(Complex, Dong, Ho);
    return exData;
};

//const basename = apt_Info.aptFind(); // danji_dong_ho
// 아파트의 모든 단지 동 호 정보 가져오기
const basename = async () => {
    const aptInfo = await apt_Info.aptFind();
    
    for(let i=0; i < aptInfo.length; i++) {
        // 파일 이름 지정  => ex) 단지 동 호.png
        let fileName = `${aptInfo[i].AptDong.apt_complex}${aptInfo[i].AptDong.apt_dong}${aptInfo[i].apt_ho}`; 
        // 단지, 동, 호의 센서 데이터 받아오기.
        let data = await sensorData(aptInfo[i].AptDong.apt_complex, aptInfo[i].AptDong.apt_dong, aptInfo[i].apt_ho);

        // 차트를 그리기위한 날짜, 데이터 별 배얄 분리
        let dateArray = []; 
        let humiArray = [];
        let tempArray = [];
        let wattArray = [];
        data.map((sensor) => {
            let newDate = new Date(sensor.dataValues.date);
            dateArray.push(dateAndTime.format(newDate, 'MM-DD'));
            tempArray.push(sensor.dataValues.humidityAVG);
            humiArray.push(sensor.dataValues.temperatureAVG);
            wattArray.push(sensor.dataValues.electricitySUM);
        });
        
        // 차트 그리기 함수로 파일 이름과 데이터 배열 전달
        humiChart(fileName, humiArray, dateArray);
        tempChart(fileName, tempArray, dateArray);
        wattChart(fileName, wattArray, dateArray);
    };
};

// 아파트 모든 세대의 전력 차트 그리기
const wattChart = (fileName, data, date) => {
    const filewatt = fileName + "watt.png";
    saveChart(get_month(), get_year(), filewatt, "Watt", date);
};

// 아파트 모든 세대 온도 차트 그리기
const tempChart = (fileName, data, date) => {
    const filetemp = fileName + "temp.png";
    saveChart(get_month(), get_year(), filetemp, "Temp", data, date);
};

// 아파트 모든 세대 습도 차트 그리기
const humiChart = (fileName, data, date) => {
    const filehumi = fileName + "humi.png";
    saveChart(get_month(), get_year(), filehumi, "Humi", data, date);
};


const rule = new schedule.RecurrenceRule();
const m = 15;
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
            subject: `${get_month() -1}월 사용량입니다.`,
            text: `${get_month() - 1}월 사용량입니다.`,
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