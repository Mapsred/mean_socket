/**
 * Created by Maps_red on 21/06/2016.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var horseman = require('./controllers/horseman');
var history = [];

app.use(express.static('client'));

io.on('connection', function (socket) {
    console.info('New socket');
    socket.emit('history', history);

    socket.on('sending url', function (data) {
        history.push(data);
        socket.emit('history', history);

        horseman(data.url, function (err, image) {
            socket.emit('image', {buffer: image.buffer, width: image.width, height: image.height});
        });
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});


http.listen(8080, function () {
    console.log('Started on port 8080');
});
