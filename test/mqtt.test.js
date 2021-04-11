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
                    number: 101,
                    humidity: rand(30, 50),
                    temperature: rand(18, 38),
                    watt: rand(300, 400),
                    roomtype: "small",
                }
                
                mqttClient.publish("sadang/data", data);
            }, 2000)

        } catch (e) {
            console.log(e)
        }
    })
});


const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
