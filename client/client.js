function _id(id){
    return document.getElementById(id);
}
// Initiera socket.io på client-sidan
const socket = io();

// Lägg till lyssnare
_id("message").addEventListener("keyup", sendMessage);
_id("send").addEventListener("click", sendMessage);


function sendMessage(e){
    
    if(e.keyCode === 13 || !e.keyCode)
    {
        // Läs in meddelande från html
        const name = _id("name").value;
        const val = _id('message').value;
        const data = {name,message:val}
        console.log(data);
        socket.emit('chat', JSON.stringify(data));
        socket.emit('type', '');
        setTimeout(()=>{
            _id("message").value = "";
        },500);
    }
    else{
        socket.emit('type', "user is typing");
    }
}


// Lyssna efter meddelande från servern
socket.on('chat', (msg)=>{
    msg = JSON.parse(msg);
    _id("chat").innerHTML+=`<p>${msg.name}: ${msg.message}</p>`
  });
  socket.on('type', (msg)=>{
    _id("type").innerHTML = `<p>${msg}</p>`
  });