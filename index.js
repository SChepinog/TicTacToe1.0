/*var server = require("./lib/server");
var router = require("./lib/router");
var requestHandlers = require("./lib/requestHandlers");
var gameServer = require("./lib/game_server");
var io = require('socket.io');


var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;

server.start(router.route, handle);
//gameServer.listen(server);
*/

var http = require('http');
var fs = require ('fs');
var path = require('path');
var mime = require('mime');
var io = require('socket.io');
var cache = {};
var gameIndex = 1;

//send error if file not found
function send404(response, filePath, fileContents) {
    response.writeHead(404, {'Content0Type':'text/plain'});
    //response.write('Error 404: resourse file not found');
    response.end('Error 404: resourse file not found');
}

//send file to client
function sendFile(response, filePath, fileContents) {
    response.writeHead(
        200,
        {"content-type":mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}

//handle request for a file
function serveStatic(response, cache, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath,function(exists) {
            if (exists) {
                fs.readFile(absPath,function(err,data) {
                    if(err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: '+add);
    var addr = add.toString();
    console.log(addr);
})


//server creation
var server = http.createServer(function(request, response) {
    var filePath = false;
    if (request.url == '/') {  //show a link for new users
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Please, go here and send this link to the second player: \n \n http://localhost:3000/game=" + gameIndex);  //" + addr + "/game=" + gameIndex);  //
        gameIndex ++;
        response.end();
    } else if (request.url.indexOf("/game=") == 0 ) {
        filePath = 'public/TicTacToe.html';  //show the game for users
    }else {
        filePath = 'public' + request.url;  //handle requests for site's files
    }
    var absPath = './' + filePath;
    serveStatic (response, cache, absPath)
});

server.listen(3000, function() {
    console.log("Server listening on port 3000.");
});

//socket.io server
var gameServer = require('./lib/game_server');
gameServer.listen(server);