/**
 * 공통 Controller
 */

const logger = require('../../config/winston')('comm.controller');

module.exports = {
    alive(req, res) {
        logger.info('Alive Server.');
        return res.status(204).send('Alive Server.');
    }
};
