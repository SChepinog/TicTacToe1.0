var mySteps = [];
var hisSteps = [];

var win1 = [1,2,3];
var win2 = [4,5,6];
var win3 = [7,8,9];
var win4 = [1,4,7];
var win5 = [2,5,8];
var win6 = [3,6,9];
var win7 = [1,5,9];
var win8 = [3,5,7];
var winner = [win1, win2, win3, win4, win5, win6, win7, win8];

var Game = function (socket) {
    this.socket = socket;
};

//function for make a step and check for a win
Game.prototype.sendStep = function(step) {
    console.log("sendStep function is called");
    var myStep = {
        step: step
    };
    //this.socket.emit('step', step);
    this.socket.emit('message', myStep.step);
    mySteps.push(step);
    console.log("mySteps is "+ mySteps);
    for (var i =0; i <= winner.length - 1; i++) {
        if (didWin(mySteps, winner[i])) {
            myWin();
        }
    }
};

//function for getting step of the opponent and check for his win
Game.prototype.getStep = function(step) {
    console.log("getStep function is called");
	//this.socket.on(step); ???
    hisSteps.push(step);
    console.log("hisSteps is "+ hisSteps);
    for (var i =0; i <= winner.length - 1; i++) {
        if (didWin(hisSteps, winner[i])) {
            hisWin();
        }
    }
};

//function finds the array with winner combination of steps
function didWin(userArray, winnerArray){
    var on = 0;
    for( var i = 0; i < userArray.length; i++ ){
        for( var j = 0; j < winnerArray.length; j++ ){
            if(userArray[i] == winnerArray[j]){
                on++;
            }
        }
    }
    return on==winnerArray.length?true:false;
}

//function with reaction to user's win
function myWin() {
    $('td').removeClass('active');
    alert ("Congratulation, you are winner!");
};

//function with reaction to user's losing
 function hisWin() {
     $('td').removeClass('active');
     alert ("Sorry, you lose");
 };