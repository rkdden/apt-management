const express = require('express');
const axios = require('axios');
const electricityController = require('./electricity.controller');
const router = express.Router();


router.get('/test', electricityController.findAll);

router.get('/message', (req, res) => {
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
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    
});

module.exports = router;