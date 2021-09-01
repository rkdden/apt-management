const logger = require('../../config/winston')('message.controller');
const axios = require('axios');

module.exports = {
    sendMessage (req, res, param) {
        //const messageTitle = req.result.Sensor.sensoravg;
        
       // 텍스트 메시지 형식
        const template_objectObj = {
            "object_type": 'text',
            "text": `현재 정보 입니다.`,
            'link': {
            web_url: 'https://stackoverflow.com/questions/31186241/node-js-request-invalid-uri',
            mobile_web_url: 'https://stackoverflow.com/questions/31186241/node-js-request-invalid-uri'
            }
        };
    
        // Javascript -> JSON 타입으로 변경
        const template_objectStr = JSON.stringify(template_objectObj);
    
        // axios 로 요청보냄
        const accessToken = `Bearer ${req.user.accessToken}`;
        
        axios.post('https://kapi.kakao.com/v2/api/talk/memo/default/send', `template_object= ${template_objectStr}`, {
                headers: {
                    Authorization: accessToken,
                }, 
            })
            .then((response)=> {
                if(response.data.result_code !== 0) {
                    logger.info("전송 실패");
                    return res.status(400).send('전송 실패');
                }else {
                    logger.info('전송 성공')
                    return res.status(204).send('ok');
                }
            })
            .catch((error) => {
                logger.error("카카오톡 에러" + error);
                return console.log(error);
            }); 
    }
};