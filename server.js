
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


const express = require('express')

app.use(express.static('app'))
app.set('port', process.env.PORT || 3000)



http.listen(process.env.PORT || 3000)


var rooms = {};


io.on('connection', function(socket){
    

    
    socket.on('newuser', function(room, name){
        
       console.log(name + " joined room " + room);
        
        
       if(rooms[room] === undefined){
           
           rooms[room] = {};
           rooms[room].users = [];
           (rooms[room].users).push(name);
           
       } else{
           (rooms[room].users).push(name);
           
       }
        
        console.log(rooms[room].users);
        
        updateRoom(room);
        
//         io.emit('disconnection', name + ' disconnected from ' + room);
//       });
        
    });
    
    
    
    // submit video req
    socket.on('videoplay', function(id, link){
    
        console.log(link);
        socket.broadcast.emit('videoplay', id, link);
        
    });
    
    
    // video is done
    socket.on('videodone', function(room){
    
        socket.broadcast.emit('videodone', room);
        
    });
   
        

    function updateRoom(id){
        socket.emit('updateRoom', rooms[id].users);
    }

    
              
    
});




//
//
//io.on('connection', function(socket){
//  socket.on('chat message', function(msg){
//    console.log('message: ' + msg);
//  });
//});

