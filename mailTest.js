const schedule = require('node-schedule');
const mail = require("./mailer");
const drawChart = require("./drawLine");

const data = [...Array(100).keys()];

function get_Month() {
	var today = new Date();

	return today.getMonth() + 1;
}

const basename = "1_1_101_"; // danji_dong_ho

const filewatt = basename + "watt.png";
drawChart(4, 2021, filewatt, "Watt", data);

const filetemp = basename + "temp.png";
drawChart(4, 2021, filetemp, "Temp", data);

const filehumi = basename + "humi.png";
drawChart(4, 2021, filehumi, "Humi", data);

var emailParam = {
  toEmail: "juren52@naver.com",
  subject: "TEST",
  text: "TEST.",
  name: "1_1_101",
  month: get_Month()
};

var rule = new schedule.RecurrenceRule();
var m = 20;
rule.minute = m;


var j = schedule.scheduleJob(rule, function() {
        console.log("Run mail");
        mail.setFileName("bird");
        mail.sendGmail(emailParam);
});


