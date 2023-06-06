// Utility methods
function log(message) {
  const area = document.getElementsByTagName('textarea')[0];
  area.value += `${message}\n`;
  area.scrollTop = area.scrollHeight;
}

function sendXhr(to, method, event) {
  event.preventDefault();

  const data = new URLSearchParams(new FormData(event.target)).toString();
  const xhr = new XMLHttpRequest();
  xhr.open(method, to, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    log(`${to} ${method} -> ${this.responseText}`);
  };
  xhr.send(data);
}

// eslint-disable-next-line no-undef
const socket = io('ws://localhost:3000', {
  transports: ['websocket'],
  autoConnect: false,
});

// Websockets incoming messages
socket.on('connect', () => {
  log('Connected');
});

socket.on('disconnect', () => {
  log('Disconnected');
});

socket.on('join', (data) => {
  log(`WS join -> ${JSON.stringify(data)}`);
});

socket.on('leave', (data) => {
  log(`WS leave -> ${JSON.stringify(data)}`);
});

socket.on('move', (data) => {
  log(`WS move -> ${JSON.stringify(data)}`);
});

socket.on('status', (data) => {
  log(`WS status -> ${JSON.stringify(data)}`);
});

socket.on('coin', (data) => {
  log(`WS coin -> ${JSON.stringify(data)}`);
});

socket.on('message', (message) => {
  log(`Received message: ${message}`);
});

// Click handlers
function connect(e) {
  e.preventDefault();
  socket.connect();
}

function join(e) {
  const gameServer = document.getElementsByName('joinGameId')[0].value;

  e.preventDefault();
  socket.emit('join', { gameServer }, (ans) => {
    log(`Join response ${ans}`);
  });
}

function leave(e) {
  e.preventDefault();
  socket.emit('leave', {}, (ans) => {
    log(`Leave response ${ans}`);
  });
}

function disconnect(e) {
  e.preventDefault();
  socket.close();
}

function move(e) {
  const x = document.getElementsByName('moveX')[0].value;
  const y = document.getElementsByName('moveY')[0].value;
  const direction = document.getElementsByName('moveDirection')[0].value;
  const position = { x, y };

  e.preventDefault();
  socket.emit('move', { direction, position });
}

function updatePlayer(e) {
  const money = Number(document.getElementsByName('updateMoney')[0].value);
  const exp = Number(document.getElementsByName('updateExp')[0].value);
  const credits = Number(document.getElementsByName('updateCredits')[0].value);

  e.preventDefault();
  socket.emit('updatePlayer', { money, exp, credits });
}

function spawnCoin(e) {
  const x = document.getElementsByName('coinX')[0].value;
  const y = document.getElementsByName('coinY')[0].value;
  const amount = document.getElementsByName('coinAmount')[0].value;

  e.preventDefault();
  socket.emit('spawnCoin', { position: { x, y }, amount });
}

function clearLogs() {
  const area = document.getElementsByTagName('textarea')[0];
  area.value = '';
}
