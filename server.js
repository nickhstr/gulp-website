let StaticServer = require('static-server');

let server = new StaticServer({
	rootPath: './public/',
	port: '3000'
});

server.start(function() {
	console.log('server started on port ' + server.port);
});