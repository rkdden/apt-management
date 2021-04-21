const logger = require('../../config/winston')('auth.controller');

module.exports = {
    getUserInfo(req, res) {
        return res.render('./userinfo.html');
    }
};

