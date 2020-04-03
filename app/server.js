
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var usernames = {};
var rooms = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    
    socket.on('joinroom', function(room){
        this.join(room);
        
        if (typeof rooms[room] === "undefined") rooms[room] = {};
        rooms[room].count = rooms[room].count ? rooms[room].count + 1 : 1; 
        
        io.to(room).emit("new user", rooms[room].count);
        console.log(rooms);
    })
    
  console.log('a user connected');
    
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
    
});


//
//
//io.on('connection', function(socket){
//  socket.on('chat message', function(msg){
//    console.log('message: ' + msg);
//  });
//});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
