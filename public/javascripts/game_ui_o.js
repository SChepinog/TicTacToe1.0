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

    //if there is no sign, place "X" here and make inactive
  $('td').click(function() {  //if there is no sign, place "X" here
    if ($(this).hasClass('active') &&  $(this).children().length == 0) {
        $(this).append(divSystemContentElement("O"));
        $('td').removeClass('active');
        theGame.sendStep( $(this).attr('id') );
    }
  });

  socket.on('message',function(result){
      console.log("Step is " + result.step);
      $('td').addClass('active');
      theGame.getStep(result.step);
      cell = '#' + result.step;
      $(cell).append(divSystemContentElement("X"));
      //$('td').addClass('active');
  });

});
