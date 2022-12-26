import { io } from 'socket.io-client'

const socketClient = () => {
  // const config = useRuntimeConfig()
  return io('http://localhost:3005', {
    withCredentials: true,
    // extraHeaders: {
    //   'x-meem-io': 'true'
    // }
  })
}

const useSocket = () => {
  const _socket = socketClient()

  return {
    _socket,
  }
}

export { useSocket as default }
