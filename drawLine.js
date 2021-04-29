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

async function saveChart(year, month, filename, type, data) {
	const day = days(month, year);

	const labels = Array.from({length: day}, (_, i) => i + 1);

	chart.setConfig({
		type: 'line',
		data: { labels: labels, datasets: [{ label: type, data }] },

	});

	const folderName = './data/' + get_Month();

	// Write file to disk
	makeFolder(folderName);
	await chart.toFile(folderName + "/" +  filename);
}

module.exports = saveChart;

/* usage
const data = [...Array(100).keys()]; => data for temperature or humidity or watt
saveChart(2021, 4, "./data/4/newchart.png", "temp", data);
*/
