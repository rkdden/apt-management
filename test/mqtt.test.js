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
                    roomType: "small",
                    temperature: rand(18, 38),
                    humidity: rand(30, 50),
                    watt: rand(300, 400),
                    roomtype: "small",
                }
                // console.log(`send data = ${JSON.stringify(data)}`)
                mqttClient.publish("sadang/data", JSON.stringify(data));
            }, 3000)
            

            
        } catch (e) {
            console.log(e)
        }
    })
});


const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
