import './style.css';
const {
    io
} = require('socket.io-client');

const socket = io.connect('http://localhost:8000');

const loginPage = document.querySelector('.login__page');
const loginInput = document.querySelector('.login__input');
const messageForm = document.querySelector('.message__form');
const messageInput = document.querySelector('.message__input');
const messages = document.querySelector('.messages');
const typing = document.querySelector('.typing');

loginInput.addEventListener('keypress', (e) => {
    if (e.code === 'Enter') {
        loginPage.classList.add('login__page_hide');
        socket.emit('enter_username', {
            username: loginInput.value
        });
        socket.emit('user_joined', messageInput.value);
        loginInput.removeAttribute('autofocus');
        loginInput.blur();
        messageInput.focus();
    }
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    socket.emit('new_message', messageInput.value);
    messageInput.value = '';
})

messageInput.addEventListener('keydown', () => {
    socket.emit('typing');
});

function addChatMessage(data) {
    const li = document.createElement('li');
    li.classList.add('message');
    li.textContent = `${data.username}: ${data.message}`;
    messages.appendChild(li);
}

function addTypingNote(data) {
    if (typing.classList.contains('typing_off')) typing.classList.remove('typing_off');
    setTimeout(() => {
        typing.classList.add('typing_off')
    }, 1500);
}

socket.on('user_joined', (data) => {
    typing.textContent = `${data.username} joined the chat`;
    addTypingNote(data);
});

socket.on('new_message', (data) => {
    addChatMessage(data);
});

socket.on('typing', (data) => {
    typing.textContent = `${data.username} is typing something...`;
    addTypingNote(data);
});

socket.on('user_left', (data) => {
    typing.textContent = `${data.username} left the chat`;
    addTypingNote(data);
});

socket.on('disconnect', () => {
    loginPage.classList.remove('login__page_hide');
    loginInput.focus();
    messageInput.blur();
});