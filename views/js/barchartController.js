// 막대 차트 그리기
export const drawBarChart = (chartType, chartData, name) => {
    const newChart = new Chart(chartType, {
        type: 'bar',
        data: {
            labels: [`${name} 차트`],
            datasets: [
                {
                    label: 'Day',

                    data: [chartData[0]],
                    backgroundColor: [
                        color(chartColors.red).alpha(0.5).rgbString(),
                    ],
                    borderColor: [
                        chartColors.red,
                    ],
                    borderWidth: 0
                },
                {
                    label: 'Hour',
                    data: [chartData[1]],
                    backgroundColor: [
                        color(chartColors.blue).alpha(0.5).rgbString(),
                    ],
                    borderColor: [
                        chartColors.blue,
                    ],
                    borderWidth: 0
                },
                {
                    label: 'Month',
                    data: [chartData[2]],
                    backgroundColor: [
                        color(chartColors.yellow).alpha(0.5).rgbString(),
                    ],
                    borderColor: [
                        chartColors.yellow,
                    ],
                    borderWidth: 3
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Interactions sample'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                    },
                }]
            }
        }
    });
    return newChart;
};



