const axios = require('axios');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
const commConfig = yaml.load(fs.readFileSync(path.join(__dirname, "..", "..", "config", "config.yaml"), 'utf8'));
const config = commConfig[process.env.NODE_ENV || "development"];
const logger = require('../../config/winston')('initialize');
module.exports = {
    async getWeatherInCity(city) {
        try {
            //const {city} = req.params;
            console.log(city);
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.api.openweathermap}`;
            logger.info(url);
            const response = await axios.get(url);
            if(response.status===200){
              const temp = response.data.main.temp - 273;
              return temp.toFixed(1);
              // console.log(temp.);  
              // res.send(response.data.main);
            }else{
                throw new Error(response.statusText);
            }
        } catch (e) {
            logger.info(e.message);
            res.status(500).send();
        }
    }
}
