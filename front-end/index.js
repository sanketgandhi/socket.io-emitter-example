const debug = require('debug')('front-end');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const redis = require('redis');
const redisAdapter = require('socket.io-redis');
const path = require('path');

const serverPort = process.env.PORT || 6001;
const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = process.env.REDIS_PORT || 6379;

let pubClient = redis.createClient();
let subClient = redis.createClient(null, null, {detect_buffers: true});
let io = require('socket.io')(http, {
	adapter: redisAdapter({pubClient: pubClient, subClient: subClient})
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen(serverPort, function() {
	console.log(`listening on ${serverPort}`);
	debug('listening on *:6000');

	io.on('connection', function(socket) {
		debug('connected');

		socket.on('disconnect', function() {
			debug('disconnected');
		});

		socket.on('ack', function(payload) {
			debug('ack event', typeof payload, payload);
		});
	});
});
