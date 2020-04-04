
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


const express = require('express')

app.use(express.static('app'))
app.set('port', process.env.PORT || 3000)



http.listen(process.env.PORT || 3000)


var rooms = {};
var clients = {};

io.on('connection', function(socket){
    
    var curr_room;
    var curr_client;
    
    socket.on('newuser', function(room, name){
        
       console.log(name + " joined room " + room);
        
        
       if(rooms[room] === undefined){
           rooms[room] = {};
           rooms[room].users = [];
           (rooms[room].users).push(name);
           
       } else{
           (rooms[room].users).push(name);
           
       }
        
        curr_room = room;
        curr_client = name;
        
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
    
    // Disconnect    
    
   socket.on('disconnect', function() {
       
       console.log(curr_client + " " + curr_room);
       
       let indx = (rooms[curr_room].users).indexOf(curr_client);
       
       if(indx > -1){
           (rooms[curr_room].users).splice(indx, 1);
       }
       
        socket.emit('updateRoom', rooms[curr_room].users);
       
   });
    
              
    
});




//
//
//io.on('connection', function(socket){
//  socket.on('chat message', function(msg){
//    console.log('message: ' + msg);
//  });
//});

