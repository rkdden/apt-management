const { Server } = require('socket.io');
const logger = require('./config/winston')('socket');
const io = new Server({path: '/socket'});
io.on('connection', ()=>{
    logger.info("connection webSocket....");
});
module.exports = io;


