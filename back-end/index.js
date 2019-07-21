let emitter = require('socket.io-emitter')({host: 'localhost', port: '6379'});
let debug = require('debug')('back-end');

setInterval(function() {
	debug('emit time event');
	emitter.emit('time', new Date());
}, 1000);
