const express = require('express');
const http = require('http');

const app = express();

/* use express app as requestListener */
const server = http.createServer(app);
const port = 4200 // <---- Same port as angular CLI dev server because we are lazy.

/* just use a base route */
app.use('/', express.static(__dirname+'/app'));

server.listen(port, function listening() {
  console.log('HTTP-server listening on %d', server.address().port);
});