const ChartJsImage = require('chartjs-to-image');

const lineChart = new ChartJsImage();

lineChart.setConfig({
	type: "line",
	data: {
		labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
			"20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
		datasets: [{
			"backgroundColor": "rgba(255,150,150,0.5)",
			"borderColor": "rgb(255,150,150)",
			"data": [-23, 64, 21, 53, -39, -30, 28, -10],
			"label": "Dataset",
			"fill": "origin"
		}]
	},
});

module.exports = lineChart;
