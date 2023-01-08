import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '~/types/socket'

const socketClient = () => {
  const config = useRuntimeConfig()
  console.log('config', config)
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3005', {
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
