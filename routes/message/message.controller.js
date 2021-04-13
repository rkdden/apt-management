const logger = require('../../config/winston')('electricity.controller');
const sequelize = require('sequelize');
const axios = require('axios');
const { AptDong, AptHo, Sensor} = require('../../models');

module.exports = {
    async findAll (req, res) {
        
        const electricity = await Sensor.count({
            
        });
        logger.info(electricity);
   
    },

    sendMessage (req, res) {
        // 텍스트 메시지 형식
        const template_objectObj = {
            "object_type": 'text',
            "text": '메시지 보내기',
            'link': {
            web_url: 'https://stackoverflow.com/questions/31186241/node-js-request-invalid-uri',
            mobile_web_url: 'https://stackoverflow.com/questions/31186241/node-js-request-invalid-uri'
            }
        };
    
        // Javascript -> JSON 타입으로 변경
        const template_objectStr = JSON.stringify(template_objectObj);
    
        // axios 로 요청보냄
        const accessToken = `Bearer ${req.user}`;
        
        axios.post('https://kapi.kakao.com/v2/api/talk/memo/default/send', `template_object= ${template_objectStr}`, {
                headers: {
                    Authorization: accessToken,
                }, 
            })
            .then((response)=> {
                logger.info(response.data);
                return res.status(200).send('ok');
            })
            .catch((error) => {
                console.log(error);
                return res.status(500).send('fail');
            });
        
    }
};