
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


const express = require('express')

app.use(express.static('app'))
app.set('port', process.env.PORT || 3000)



http.listen(3000, function(){
  console.log('listening on *:3000');
});


var usernames = {};
var rooms = ['lobby', 'A', 'B'];



io.on('connection', function(socket){
    
    
   
    
              
    
});


//
//
//io.on('connection', function(socket){
//  socket.on('chat message', function(msg){
//    console.log('message: ' + msg);
//  });
//});

