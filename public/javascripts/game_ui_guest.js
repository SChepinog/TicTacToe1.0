function divEscapedContentElement (message) {
    return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '<i>');
}


var socket = io.connect();

$(document).ready(  function() {
    var theGame = new Game(socket);


  $('td').mouseenter(function() {
       $(this).css( 'background-color','#E27022' );
   });

  $('td').mouseleave(function() {
       $(this).css('background-color','#E2BE22'); 
   });


  socket.on('message',function(result){
      console.log("Step is " + result.step);
      $('td').addClass('active');
      theGame.getStep(result.step);
      cell = '#' + result.step;
      $(cell).append(divSystemContentElement("O"));
      //$('td').addClass('active');
  });

});
