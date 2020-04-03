
  $(function () {
      
var socket = io('/');
        
      const id = (location.hash).substr(1);
      console.log(id);
      
      socket.join(id);

  });

