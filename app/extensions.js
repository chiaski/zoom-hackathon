import { CountUp } from './js/CountUp.min.js';


function stopPlaying(){
    
  var countUp = new CountUp('the-score', Math.floor((Math.random() * 100) + 1));
   
    $("#karaoke-score").fadeIn("slow");
    
countUp.start();
    
    setTimeout(function(){
        
        $("#karaoke-score").fadeOut("slow");
        
        $(".karaoke-play").fadeIn("slow");
        $(".karaoke-search").fadeIn("slow");
    }, 5000);
    
    
}