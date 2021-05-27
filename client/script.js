// make the connection to the server at localhost and the port specified on the server side
let socket = io.connect('http://localhost:3000');

// get the message p tag from thr html document
let messageTag = document.getElementById("message");

// when the client connects to the server
socket.on('connection', function(data) {
    // read messages from the server and alert the data to the client
    messageTag.innerHTML = "Server message: " + data;
    // send a message to the client acknowledging that they connected
    socket.emit('join', 'Hello world from client');         
    console.log("sent join message to client");     
});