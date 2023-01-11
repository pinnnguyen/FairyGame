import type { Socket } from 'socket.io-client'
import io from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '~/types'

export default defineNuxtPlugin(() => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('/')
  return {
    provide: {
      io: socket,
    },
  }
})
