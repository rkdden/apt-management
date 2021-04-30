const ChartJsImage = require('chartjs-to-image');
const fs = require('fs');

const chart = new ChartJsImage();

const days = function(month,year) {
	return new Date(year, month, 0).getDate();
};

function get_Month() {
	var today = new Date();

	return today.getMonth() + 1;
}

function makeFolder(dir) {
	try {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir)
		}
	} catch (err) {
		console.error(err)
	}
}

async function saveChart(month, year, filename, type, data) {
	const day = days(month, year);

	const labels = Array.from({length: day}, (_, i) => i + 1);

	chart.setConfig({
		type: 'line',
		data: { labels: labels, datasets: [{ label: type, data }] },

	});

    // 월별 / 데이터별 파일 구분하기
	const folderName = './data/' + get_Month();
    const monthPath = folderName + '/' + type;
	// Write file to disk
	makeFolder(folderName);
    makeFolder(monthPath);
	await chart.toFile(monthPath + "/" +  filename);
}

module.exports = saveChart;

/* usage
const data = [...Array(100).keys()]; => data for temperature or humidity or watt
saveChart(2021, 4, "./data/4/newchart.png", "temp", data);
*/
