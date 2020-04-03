

// SOCKET I.O

  $(function () {
      
var socket = io('/');
        
      const id = (location.hash).substr(1);
      console.log(id);
      
      $("#name-room").text(id);
      
      socket.emit('joinedroom', id);
      
      
     $( "#send" ).click(function() {   
         // check if empty
         if(document.getElementById("intro-name").value == "") return;
         
         var name = $("#intro-name").val();
         console.log(name);
         
         socket.emit('newuser', id, name);
         
         $("#intro").fadeOut("slow");
                                    
    });
      
      
      
    socket.on('updateRoom', function (online){
        
        console.log("Update room");
        
        $(".player-list").empty();
        
        for(let i=0; i < online.length; i++){
            
            $(".player-list").append("<li>" + online[i] + "</li>");
            console.log(online[i]);
        }
        
    });
              
      
      

  });




$("#search-go").click(function(){
    
    if(!$("#search-song").val()){
        alert("No search!");
        return;
    }
    
    
    let link = ($("#search-song").val()).split("v=")[1].substring(0, 11);
    
    $(".karaoke-play").html(' <iframe src="https://www.youtube.com/embed/' + link + '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>')
    
    
})