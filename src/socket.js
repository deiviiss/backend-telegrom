import { Server } from 'socket.io';

const socket = {}

function socketConnect(server) {
  socket.io = new Server(server);
}

export {
  socket,
  socketConnect
}
