var http = require('http');
var express = require('express');
var mysql = require('mysql');
var app = express();
var server = http.createServer(app).listen(3000);
var io = require('socket.io').listen(server);




app.use(express.static(__dirname + '/public'));


var POLLING_INTERVAL = 3000;
var pollingTimer;
var connectionsArray = [];
var registros = [];
var partidos = [];

var db = mysql.createConnection({
    host: '189.134.49.180',
    user: 'darcus',
    database: 'db_project',
    password: 'darcus'
});

db.connect(function(err) {
    if (err) console.log(err);
});




io.sockets.on('connection', function(socket) {

    console.log('Number of connections:' + connectionsArray.length);

    if (!connectionsArray.length) {
        pollingLoop();
    }

    socket.on('disconnect', function() {
        var socketIndex = connectionsArray.indexOf(socket);
        console.log('socket = ' + socketIndex + ' disconnected');
        if (socketIndex >= 0) {
            connectionsArray.splice(socketIndex, 1);
        }
    });

    console.log('A new socket is connected!');
    connectionsArray.push(socket);


    partidos = [];
    var query = db.query('SELECT partido FROM registro group by partido');
    query.on('error', function(err) {
            console.log(err);
        })
        .on('result', function(data) {

            partidos.push(data);
            //socket.emit('partidos', data);
        })
        .on('end', function(data) {
        	socket.emit('partidos', partidos);
        });

});


var updateSockets = function(data) {
    connectionsArray.forEach(function(tmpSocket) {
        tmpSocket.volatile.emit('data', data);
    });
};

var pollingLoop = function() {

    var query = db.query('SELECT * FROM registro'),
        registros = [];
    query.on('error', function(err) {

            console.log(err);
            updateSockets(err);

        })
        .on('result', function(data) {

            registros.push(data);
        })
        .on('end', function() {

            if (connectionsArray.length) {
                pollingTimer = setTimeout(pollingLoop, POLLING_INTERVAL);

                updateSockets(registros);
            }
        });
};


 //GRANT ALL PRIVILEGES ON database.* TO 'darcus'@'%' IDENTIFIED BY 'darcus';  2706