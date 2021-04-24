var isIE = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident') !== -1;

var temperature = 0;
var humidity = 0;
var watt = 0;

var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

function randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

function onRefresh(chart) {
    value = 0;
    chart.config.data.datasets.forEach(function (dataset) {
        if (dataset.label == "Temperature") {
            value = temperature;
        } else if (dataset.label == "Humidity") {
            value = humidity;
        } else if (dataset.label == "Watt") {
            value = watt;
        }
        dataset.data.push({
            x: Date.now(),
            y: value,
        });
    });
}

var color = Chart.helpers.color;
var config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Temperature',
            backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
            borderColor: chartColors.red,
            fill: false,
            lineTension: 0,
            borderDash: [8, 4],
            data: []
        }, {
            label: 'Humidity',
            backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            borderColor: chartColors.blue,
            fill: false,
            cubicInterpolationMode: 'monotone',
            data: []
        }, {
            label: 'Watt',
            backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
            borderColor: chartColors.yellow,
            fill: false,
            cubicInterpolationMode: 'monotone',
            data: []
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Interactions sample'
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: 20000,
                    ttl: 60000,
                    refresh: 1000,
                    delay: 2000,
                    pause: false,
                    onRefresh: onRefresh
                }
            }],
            yAxes: [{
                type: 'linear',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }
            }]
        },
        tooltips: {
            mode: 'nearest',
            intersect: false
        },
        hover: {
            mode: 'nearest',
            intersect: false
        },
        plugins: {
            streaming: {
                frameRate: 30
            }
        }
    }
};

function onConnect() {
    console.log("connected");
    // client.subscribe("sadang/data");
}

function onMessageArrived(message) {
    temperature = message.temperature;
    humidity = message.humidity;
    watt = message.watt;
}

// 소켓 연결
const socket = io.connect({ path: '/socket', transports: ['websocket'], });
socket.on('data', function (data) {
    onMessageArrived(data.message);
});