//import {barChart} from './barchartController';
import {drawBarChart} from './barchartController.js';

// 막대 차트 온도, 습도, 전력량 데이터와 차트 위치 구하기
const drawbar = (data) => {
    
    // 전력 온도 습도 별 데이터 구분
    const humidityData = [data.day.humidity[0].dayhumidityAVG, data.hour.humidity[0].hourhumidityAVG, data.month.humidity[0].monthhumidityAVG]
    // const humidityData = [30, 45, 36]
    const temperatureData = [data.day.temperature[0].daytemperatureAVG, data.hour.temperature[0].hourtemperatureAVG, data.month.temperature[0].monthtemperatureAVG]
    // const temperatureData = [22, 33, 27]
    const wattData = [data.day.electricity[0].dayelectricitySUM, data.hour.electricity[0].hourelectricitySUM, data.month.electricity[0].monthelectricitySUM]
    // const wattData = [144, 200, 325]
    
    // 각각의 차트 
    const humidity = document.getElementById('humiditybarChart');
    const temperature = document.getElementById('temperaturebarChart');
    const watt = document.getElementById('wattbarChart');
    
    // 차트 그리기 모듈로 차트 타입과 차트 데이터 넘기기
    drawBarChart(humidity, humidityData, "온도");
    drawBarChart(temperature, temperatureData, "습도");
    drawBarChart(watt, wattData, "전력량");
};


export function bar(data) {
    //axios 요청으로 받아온 데이터 drawbar 함수로 전달
    drawbar(data);
}