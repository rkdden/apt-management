const ChartJsImage = require('chartjs-to-image');

const chart = new ChartJsImage();

const days = function(month,year) {
	return new Date(year, month, 0).getDate();
};

async function saveChart(year, month, filename, type, data) {
	const day = days(month, year);

	const labels = Array.from({length: day}, (_, i) => i + 1);

	chart.setConfig({
		type: 'line',
		data: { labels: labels, datasets: [{ label: type, data }] },

	});

	// Write file to disk
	await chart.toFile(filename);
}

module.exports = saveChart;

/* usage
const data = [...Array(100).keys()]; => data for temperature or humidity or watt
saveChart(2021, 4, "./newchart.png", "temp", data);
*/
