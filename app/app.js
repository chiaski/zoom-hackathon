


// SOCKET I.O

var socket = io('/');


  $(function () {
      
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
          
      
      
      
      
    socket.on('videodone', function (room){
        
        if(id !== room){
            console.log("Video in another room is finished.");
            return;
        }
        
        stopPlaying();
        
        
    });
      
      


  });




// YOUTUBE


var player;


    function onYouTubePlayerAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
    }

    // autoplay video
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // when video ends
    function onPlayerStateChange(event) {        
        if(event.data === 0) {            
            alert('done');
            
              const id = (location.hash).substr(1);
              console.log(id);

            socket.emit('videodone', id);
        }
    }
          
      
      




$("#search-go").click(function(){
    
    if(!$("#search-song").val()){
        alert("No search!");
        return;
    }
    
    
    let link = ($("#search-song").val()).split("v=")[1].substring(0, 11);
    
    player.loadVideoById(link);
    player.playVideo();
    
    
    
    
    // create youtube player
   
    
    
//    $(".karaoke-play-button").html(' <iframe src="https://www.youtube.com/embed/' + link + '?rel=0;&autoplay=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>')
    
   // $(".karaoke-play").fadeTo( "slow", 0);
    
    
})


function nowPlaying(){

    

    $(".karaoke-play").css("opacity", "0");
    $(".karaoke-play-button").fadeOut("slow");
    
    
}

function stopPlaying(){
    
    $(".karaoke-play").fadeOut("slow");
    
}