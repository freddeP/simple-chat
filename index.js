const express = require('express');
const app = express();
// variabel som håller koll på vår http-uppkoppling.
const http = require('http').createServer(app);
// Initiera socket.io och skicka med vår server.
const io = require('socket.io')(http);

//app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname+"/client"));


io.on('connection', function(socket){

    socket.on('chat', msg=>{
      console.log('message: ' + msg);
      io.emit('chat', msg);
    });
    socket.on('type', msg=>{
        console.log('message: ' + msg);
        io.emit('type', msg);
      });
    

});
  

http.listen(3000, ()=>{
  console.log('listening on *:3000');
});