import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '~/types/socket'

const socketClient = () => {
  // const config = useRuntimeConfig()
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://103.82.22.99:3005', {
    withCredentials: true,
  })

  return socket
}

const useSocket = () => {
  const _socket = socketClient()

  return {
    _socket,
  }
}

export { useSocket as default }
