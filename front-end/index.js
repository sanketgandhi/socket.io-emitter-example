const debug = require('debug')('front-end');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const redis = require('redis');
const redisAdapter = require('socket.io-redis');
const path = require('path');

const port = process.env.PORT || 6001;

let pub = redis.createClient();
let sub = redis.createClient(null, null, {detect_buffers: true});
let io = require('socket.io')(http, {
	adapter: redisAdapter({pubClient: pub, subClient: sub})
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen(port, function() {
	console.log('listening on 6000');
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
