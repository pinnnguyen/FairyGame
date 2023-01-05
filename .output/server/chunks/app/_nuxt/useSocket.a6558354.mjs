import { io } from 'socket.io-client';

const socketClient = () => {
  const socket = io("http://103.82.22.99:3005", {
    withCredentials: true
  });
  return socket;
};
const useSocket = () => {
  const _socket = socketClient();
  return {
    _socket
  };
};

export { useSocket as u };
//# sourceMappingURL=useSocket.a6558354.mjs.map
