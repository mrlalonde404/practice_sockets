// make the connection to the server at localhost and the port specified on the server side
let socket = io.connect('http://localhost:3000');

// get the server output message p tag from thr html document
let serverOutput = document.getElementById("serverOutput");

// get the client output message p tag from thr html document
let clientOutput = document.getElementById("clientOutput");

// get the input field
let chatBox = document.getElementById("chatBox");

// get the send button
let btn = document.getElementById("sendButton");

// when the client connects to the server
socket.on('connection', function(data) {
    // read messages from the server and alert the data to the client
    serverOutput.innerHTML = "Server message: " + data;
    
    // send a message to the client acknowledging that they connected
    socket.emit('join', 'Connected...');         
    console.log("sent join message to client");     
});

// when the send button is clicked on, send the message from the chat box
btn.addEventListener('click', function() {
    sendMessage();
});

// if the client presses enter, send the message from the chat box
document.addEventListener('keydown', function(event) {
    if (event.key=="Enter") {
        sendMessage();
    }
});

// send the chat box message
function sendMessage() {
    // put the text in the chat box into a data object
    let data = {
        message: chatBox.value,
    };

    // use the socket to emit the data to the server, then let the server send it to all other clients
    socket.emit('chat', data);

    // clear the chat box
    chatBox.value = "";
}

// when this client gets a chat message back from the server, display it at the client output p tag
socket.on('chat', function(data) {
    clientOutput.innerHTML = `Message from other clients: ${data.message}`;
});