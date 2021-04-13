const logger = require('../../config/winston')('electricity.controller');
const sequelize = require('sequelize');
const axios = require('axios');
const request = require('request');
const url = require('url');
const { AptDong, AptHo, Sensor} = require('../../models');

module.exports = {
    async findAll (req, res) {
        
        const electricity = await Sensor.count({
            
        });
        logger.info(electricity);

        
    } 
};