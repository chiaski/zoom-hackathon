var stop = 0;

// ROOM ID

const id = ((location.hash).substr(1)) ? (location.hash).substr(1) : 'ultimate mega karaoke fun';
      console.log(id);

      $("#name-room").html(id);
      $(".room").html(id);
                           

// SOCKET I.O

var socket = io('/');

  $(function () {
      
      $("#name-room").html(id);
      
      socket.emit('joinedroom', id);
      
      
     $( "#send" ).click(function() {   
         // check if empty
         if(document.getElementById("intro-name").value == "") return;
         
         var name = $("#intro-name").val();
         $("#name-user").html(name);
         
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
        
        console.log(id + " / " + room);
        
        if(id !== room){
            console.log("Video in another room is finished.");
            return;
        }
        stop = 1;
        stopPlaying();
        
    });
      
      
    socket.on('videoplay', function (room, link){
        
        if(id !== room){
            console.log("Video in another room is finished.");
            return;
        }
        
        nowPlaying(link);
        
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
       
            stop = 1;
            stopPlaying();
            socket.emit('videodone', id);
        }
    }
        






$("#search-go").click(function(){
    
    if(!$("#search-song").val()){
        alert("No search!");
        return;
    }
    
    
    var link = ($("#search-song").val()).split("v=")[1].substring(0, 11);
    
    
    nowPlaying(link);
    
    socket.emit('videoplay', id, link);
    
    
    // create youtube player

    
    
//    $(".karaoke-play-button").html(' <iframe src="https://www.youtube.com/embed/' + link + '?rel=0;&autoplay=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>')
    
   // $(".karaoke-play").fadeTo( "slow", 0);
    
    
})


function nowPlaying(link){

    console.log(link);
    player.loadVideoById(link);
    
    setTimeout(function(){
        player.playVideo();
    }, 2000);
    
    $(".karaoke-play").fadeOut("slow");
    $(".karaoke-search").fadeOut("slow");
    
    
}




function stopPlaying(){
    
//$('the-score').countUp();
    
    if(!stop){
        return;
    }
    
    console.log("STOP");
    
    let audio = new Audio('assets/videoke-score.mp3');
    audio.play();
    
  $('#the-score').html(Math.floor((Math.random() * 100) + 1));
   
    
    $("#karaoke-score").fadeIn("slow");
    
    setTimeout(function(){
        $("#karaoke-score").fadeOut("slow");
        
        $(".karaoke-play").fadeIn("slow");
        $(".karaoke-search").fadeIn("slow");
        stop = 0;
    }, 9000);
    
    
}