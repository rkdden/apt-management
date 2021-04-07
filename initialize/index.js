const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const os = require('os');
const internalIp = require('internal-ip');
const MqttHandler = require('../handler/MqttHandler');
// const {sequelize} = require('../models');
const {colorize} = require('../utils/console');
const logger = require('../config/winston')('initialize');
const commConfig = yaml.load(fs.readFileSync(path.join(__dirname, "..", "config", "config.yaml"), 'utf8'));
const config = commConfig[process.env.NODE_ENV || "development"];
const ip = internalIp.v4.sync();
const port = config.comm.nodePort || 3000;

const assertDatabaseConnectionOK = async () => {
    /**
     * sequelize 관련 설정 추가.
     */
};

const getConfig = () => {
    const commConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, "..", "config", "config.yaml"), 'utf8'));
    return commConfig[process.env.NODE_ENV || "development"];
};

const mqttMessage = async ()=>{
    const mqtt = new MqttHandler();
    mqtt.connect();
}

const initialize = async () => {
    await assertDatabaseConnectionOK();
    await getCommonInformation();
    await mqttMessage();
};

const getCommonInformation = () => {
    logger.info('========================================================================================================');
    logger.info(`node version: ${colorize(`${process.version}`, 'yellow')}`);
    logger.info(`node env: ${colorize(`${process.env.NODE_ENV || "development"}`, 'yellow')}`);
    logger.info(`cpu core: ${os.cpus().length}`);
    logger.info(`host platform: ${colorize(`${process.platform}`, 'yellow')}`);
    logger.info(`host architecture: ${colorize(`${process.arch}`, 'yellow')}`);
    logger.info(`hostname: ${colorize(`${os.hostname()}`, 'yellow')}`);
    logger.info(`user home: ${os.userInfo().username}`);
    logger.info(`user home directory: ${os.userInfo().homedir}`);
    logger.info('========================================================================================================');
    logger.info('Connection uri :');
    logger.info(`http://${ip}:${port}${commConfig.context}`);
    logger.info(`http://${ip}:${port}${commConfig.context}api-docs`);
};

module.exports = {
    initialize,
    config,
    getConfig
}
