const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, './.env') });
const EchoServer = require('laravel-echo-server');

const options = {
	"authHost": process.env.LARAVEL_ECHO_AUTH_HOST,
	"authEndpoint": "/broadcasting/auth",
	"clients": [
		{
			"appId": "ee40e98029ca14df",
			"key": "137f6e3b51e3c14553f0b4dc52396370"
		}
	],
	"database": "redis",
	"databaseConfig": {
		"redis": {
			"port": "6379",
      "host": "localhost"
		}
	},
	"devMode": true,
	"host": "0.0.0.0",
	"port": "6001",
	"protocol": "https",
	"socketio": {},
	"secureOptions": 67108864,
	"sslCertPath": process.env.LARAVEL_ECHO_SSL_CERT_PATH,
	"sslKeyPath": process.env.LARAVEL_ECHO_SSL_KEY_PATH,
	"sslCertChainPath": process.env.LARAVEL_ECHO_SSL_CERT_CHAIN_PATH,
	"sslPassphrase": "",
	"apiOriginAllow": {
		"allowCors": false,
    "allowOrigin": "*",
    "allowMethods": "",
    "allowHeaders": ""
	}
}

EchoServer.run(options);
