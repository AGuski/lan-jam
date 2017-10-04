const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(); // <-- could reuse http server.
const wsPort = 8080;
const webSocketServer = new WebSocket.Server({ server, wsPort });

/* simple connections management*/

/* connection Model: {name, ws} */
let connections = []; // <- we could use a Map here.
let connectionCounter = 0; // <- provides unique IDs.



/* ******** Methods ******** */


/* iterates over all connections and sends them the message */
function sendAll(message) {
  connections.forEach(connection => {
    connection.ws.send(message);
  });
};

/*
  Broadcast array with only connection-names 
  as the clients don't need webSocket information about every client. 
*/
function broadcastConnections() {
    sendAll(JSON.stringify({
      connections: connections.map(connection => connection.name)
    }
  ));
}

/* Gets a connection from connections by ID */
function getConnectionById(id) {
  return connections.find(connection =>
    connection.ws.id === id
  );
}

/* ******* Listeners ******* */

/* 
  Register a listener that is called when a new client
  connects to the webSocket server 
*/
webSocketServer.on('connection', (ws) => {
  
  /* add a new connection to connections with an unique id */
  ws.id = connectionCounter++;
  connections.push({
    name: 'Anonymous'+ws.id,
    ws: ws
  });

  /* log connections state change */
  console.log('client '+ws.id+' connected to server');
  console.log('clients: ', connections.map(connection => connection.name));
  
  /* send all current connection to all clients */
  broadcastConnections();


  /* on message listener */  
  ws.on('message', (message) => {

    console.log('received from ', ws.id, ': ', message);
    msgObj = JSON.parse(message);

    if (msgObj.setName) {
      /* set name of connection */
      getConnectionById(ws.id).name = msgObj.setName;
      broadcastConnections();
    } else {
      /* share it with all connections */
      sendAll(message);
    }
  });

  /* on close listener */  
  ws.on('close', () => {
    /* remove closed connection from connections array */
    const index = connections.findIndex(connection =>
      connection.ws.id === ws.id
    );
    if (index > -1) {
      connections.splice(index, 1);
    };

    /* log and broadcast updated connections */
    console.log('connection '+ws.id+' closed.');
    console.log(connections.map(connection => connection.name));
    broadcastConnections();
  });
});

server.listen(wsPort, () => {
  console.log('Websocket listening on %d', server.address().port);
});
