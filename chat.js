const status = document.querySelector('.status');
const messages = document.querySelector('.messages');
const form = document.querySelector('.form');
const formBtn = document.querySelector('.form__button');
const input = document.querySelector('.form__input');

const ws = new WebSocket('ws://localhost:3000');

let userName;

function setStatus(value) {
    status.textContent = value;
}

function printMessage(value) {
    const li = document.createElement('li');
    li.textContent = `${userName}: ${value}`;
    messages.appendChild(li);
}

form.addEventListener('submit', e => {
        e.preventDefault();
        ws.send(input.value);
        input.value = '';
})

ws.addEventListener('open', () => {
    userName = prompt('What is your name?')
    setStatus('ONLINE')
});
ws.addEventListener('close', () => setStatus('OFFLINE'));
ws.addEventListener('message', (e) => printMessage(e.data));



