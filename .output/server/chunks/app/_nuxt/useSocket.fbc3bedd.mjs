import { io } from 'socket.io-client';

const socketClient = () => {
  const socket = io("http://localhost:3005", {
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
//# sourceMappingURL=useSocket.fbc3bedd.mjs.map
