const schedule = require('node-schedule');
const mailSender = require("./mailer");
const saveChart = require("./drawLine");
const apt_Info = require('./service/emailService');

const data = [...Array(100).keys()];

const get_Month = () => {
	const today = new Date();

	return today.getMonth() + 1;
}

//const basename = apt_Info.aptFind(); // danji_dong_ho
// 아파트의 모든 단지 동 호 정보 가져오기
const basename = async () => {
    const aptInfo = await apt_Info.aptFind();
    for (let i = 0; i < aptInfo.length; i++){
        console.log(aptInfo[i].AptDong.apt_complex + aptInfo[i].AptDong.apt_dong + aptInfo[i].apt_ho);
        let fileName = aptInfo[i].AptDong.apt_complex + aptInfo[i].AptDong.apt_dong + aptInfo[i].apt_ho;
        wattChart(fileName);
        tempChart(fileName);
        humiChart(fileName);
    };
};

// 아파트 모든 세대의 전력 차트 그리기
const wattChart = (fileName) => {
    const filewatt = fileName + "watt.png";
    saveChart(4, 2021, filewatt, "Watt", data);
};

// 아파트 모든 세대 온도 차트 그리기
const tempChart = (fileName) => {
    const filetemp = fileName + "temp.png";
    saveChart(4, 2021, filetemp, "Temp", data);
};

// 아파트 모든 세대 습도 차트 그리기
const humiChart = (fileName) => {
    const filehumi = fileName + "humi.png";
    saveChart(4, 2021, filehumi, "Humi", data);
};

const emailParam = {
    toEmail: "12tndbs12@naver.com",
    subject: "TEST",
    text: "TEST.",
    name: "1_1_101",
    month: get_Month()
};

const rule = new schedule.RecurrenceRule();
const m = 3;
rule.minute = m;

// 스케줄러
// const j = schedule.scheduleJob(rule, function() {
//         console.log("Run mail");
//         mailSender.setFileName("bird");
//         mailSender.sendGmail(emailParam);
//         basename();
// });

// 바로 확인용
basename();