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

socket.on('join', ({ playerId, gameId }) => {
  log(`Player ${playerId} has joined the ${gameId} GS`);
});

socket.on('leave', ({ playerId, gameId }) => {
  log(`Player ${playerId} has left game server ${gameId}`);
});

socket.on('move', ({ player, x, y }) => {
  log(`Player ${player} has moved to ${x}, ${y}`);
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
  const gameId = document.getElementsByName('joinGameId')[0].value;

  e.preventDefault();
  socket.emit('join', { gameId }, (ans) => {
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

  e.preventDefault();
  socket.emit('move', { x, y }, (ans) => {
    log(`Move response: ${ans}`);
  });
}

function clearLogs() {
  const area = document.getElementsByTagName('textarea')[0];
  area.value = '';
}
