const express = require('express');
const {initialize, config} = require('./initialize');
const {swaggerConfig, swaggerUIServe, swaggerUiSetup} = require('./docs/swagger');
const dotenv = require('dotenv');
const router = require('./routes');
dotenv.config();
const app = express();
const server = require('http').createServer(app);
const socket = require('./socket');


/**
 * initialize
 */
initialize();

/**
 * Set SwaggerConfig
 */
const swaggerDoc = swaggerConfig();
app.use(`/api-docs`, swaggerUIServe, swaggerUiSetup(swaggerDoc));

// 포트번호
app.set('port', config.comm.nodePort || 3000);


// json설정
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
    next();
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(`/api/v1`, router);
app.get('/', (req, res) => {
    res.render('./index.html')
});

server.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버 실행중`);
});

app.set('io', socket);
socket.listen(server);

// io.on('connection', function (socket) {
//     const serverMessage = {message: "PING"}
//     socket.emit("data", serverMessage)
// })
