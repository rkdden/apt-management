const mqtt = require('mqtt');

describe("Mqtt Test", () => {

    before("connection", () => {
        console.log("connection Success");
    });

    it("public topic", () => {
        try {
            const mqttClient = mqtt.connect("mqtt://mqtt-dashboard.com");
            
            setInterval(() => {
                const data = {
                    aptComplex: "1단지", // 아파트 단지
                    aptDong: "101동", // 아파트 동
                    number: "101호", // 아파트 호수
                    temperature: rand(18, 38),
                    humidity: rand(30, 50),
                    watt: rand(1, 2)/10,
                    roomtype: "small",
                }
                // console.log(`send data = ${JSON.stringify(data)}`)
                mqttClient.publish("sadang/data", JSON.stringify(data));
            }, 2000)
            
        } catch (e) {
            console.log(e)
        }
    })
});


const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
