const mqtt = require('mqtt');

const logger = require('../config/winston')('MqttHandler');
const { AptHo, Sensor } = require('../models');
/**
 * MqttHandler
 * ref https://medium.com/@cri.bh6/in-this-simple-example-im-going-to-show-how-to-write-a-very-simple-expressjs-api-that-uses-mqtt-to-57aa3ecdcd9e
 */
class MqttHandler {
    constructor(protocol, host, topic, qos) {
        this.mqttClient = null;
        this.host = host
        this.protocol = protocol;
        this.topic = topic;
        /** 
         * about qos 
         * https://dalkomit.tistory.com/111 
        */ 
        this.qos = qos;
        this.url = `${protocol}://${host}`;
        logger.info(this.url);
    }

    connect() {
        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        this.mqttClient = mqtt.connect(this.url, /*{ username: this.username, password: this.password }*/);

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            logger.error(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            logger.info(`mqtt client connected`);
        });

        // mqtt subscriptions
        this.mqttClient.subscribe(this.topic);

        // When a message arrives, console.log it
        this.mqttClient.on('message', async function (topic, message) {
            logger.info(message.toString());
            try {
                if (message.toString() !== 'test' || '') {
                    const value = JSON.parse(message.toString('utf-8'))
                    const hoId = await AptHo.findOne({
                        where: {apt_ho: value.number}
                    });
                    await Sensor.create({
                        temperature: value.temperature,
                        humidity: value.humidity,
                        room_type: "small",
                        electricity: value.watt,
                        AptHoId: hoId.id
                    });
                }else {
                    console.log(message.toString());
                }
            } catch (error) {
                // 에러처리를 해야함
                console.log(error);
            }
        });

        this.mqttClient.on('close', () => {
            logger.info(`mqtt client disconnected`);
        });
    }

    // Sends a mqtt message to topic: mytopic
    sendMessage(topic, message) {
        this.mqttClient.publish(topic, message);
    }
}

module.exports = MqttHandler;
