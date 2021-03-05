const express = require('express');
const socket = require('socket.io');

const app = express();
app.use(express.static('dist'));

const server = app.listen(8000, () => console.log('Listening for request...'));

const io = socket(server);

io.on('connection', socket => {

    socket.on('enter_username', data => {
        socket.username = data.username;
    });

    socket.on('user_joined', () => {
        console.log('user joined')
        socket.broadcast.emit('user_joined', {
            username: socket.username,
        });
    });

    socket.on('new_message', (data) => {
        io.emit('new_message', {
            message: data,
            username: socket.username
        });
    });

    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        socket.broadcast.emit('user_left', {
            username: socket.username,
        });
    });
})