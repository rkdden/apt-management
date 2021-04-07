/**
 * Swagger Configuration
 * */
const internalIp = require('internal-ip');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const yaml = require('js-yaml');

const commConfig = yaml.load(fs.readFileSync(require.resolve('../config/config.yaml'), 'utf8'));

module.exports = {
    swaggerConfig: () => {
        const NODE_ENV = process.env.NODE_ENV || 'development';
        const swaggerConfig = yaml.load(fs.readFileSync(require.resolve('./swaggerDocs.yaml')));
        const port = commConfig[NODE_ENV].comm.nodePort || 8080;

        const serversList = [
            {url: `http://${internalIp.v4.sync()}:${port}/api/v1`},
            {url: `http://127.0.0.1:${port}/api/v1`}
        ];
        console.log(serversList);
        swaggerConfig.servers = serversList;
        return swaggerConfig;
    },
    swaggerUIServe: swaggerUI.serve,
    swaggerUiSetup: (value) => swaggerUI.setup(value)
};
