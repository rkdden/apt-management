const express = require('express');
const request = require('request');
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
    let template_objectStr = JSON.stringify(template_objectObj);
    
    let options = {
        url: 'https://kapi.kakao.com/v2/api/talk/memo/default/send',
        method: 'POST',
     
        headers: {
            'Authorization': 'Bearer ' + req.user,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            template_object: template_objectStr,
        }
    };
    //리퀘스트 모듈로 요청 보냄
    function callback(error, response, body) {
        console.log(response.statusCode);
            if (!error && response.statusCode == 200) {
                console.log(body);
                res.send('success');
            } else {
                res.send('fail');
            }
    }
    request(options, callback);
});

module.exports = router;