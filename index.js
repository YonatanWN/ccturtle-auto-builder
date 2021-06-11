var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
var turtleClients = {};
server.listen(port)




console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on('connection', function connection(ws) {
  console.log('someone connected');
  ws.on('message', function incoming(message) {
    if(message.includes("CLIENTINFORMATION")){
     var splitMessage = message.split(" ");
     if(splitMessage[1] == "TURTLE"){
       turtleClients[0] = ws;
       console.log("Webpage has been added to clients");
     }
    }
    console.log('received: %s', message);
    ws.send(message);
  });


});
