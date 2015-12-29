var socketio = require('socket.io');
var io;
//var guestNumber = 1;
//var currentRoom = {};

exports.listen = function (server) {
	io = socketio.listen(server);
	io.sockets.on('connection', function(socket) {
		//guestNumber++; //assignGuestName(socket, guestNumber, nickNames, namesUsed);
		//joinRoom(socket, guestNumber);
		handleStep (socket);
		//socket.on('rooms', function() {
		//	socket.emit('rooms',io.sockets.manager.rooms);
		//});
	});
}

/*
function joinRoom (socket, room) {
	socket.join(room);
	currentRoom[socket.id] = room;
	socket.emit('joinResult',{room:room});
	//socket.broadcast.to(room).emit('message', {
	//	text: nickNames[socket.id] + ' has joined ' + room + '.'
	//});
	var usersInRoom = io.sockets.clients(room);
	if(usersInRoom.length > 1) {
		var usersInRoomSummary = 'Users currently in ' + room + ': ';
		for (var index in usersInRoom) {
			var userSocketId = usersInRoom[index].id;
			if (userSocketId != socket.id) {
				if (index > 0) {
					usersInRoomSummary += ', ';
				}
				//usersInRoomSummary += nickNames[userSocketId];
			}
		}
		usersInRoomSummary += '.';
		socket.emit('message', {text: usersInRoomSummary});
	}
}
*/

function handleStep (socket) {
	socket.on('message', function (result) {
		socket.broadcast.emit('message', {  //.to(result.room)
			//text: nickNames[socket.id] + ': ' + step.text
			//room: room,
			step: result
		});
	});
}

