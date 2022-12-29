import type { BattleRequest } from '~/types/war'

export interface ServerToClientEvents {
  'battle:start': (response: any) => void
  'boss-daily:start': (response: any) => void
}

export interface ClientToServerEvents {
  'boss-daily:join': (_channel: string, sid: string) => void
  'battle:join': (_channel: string, request: BattleRequest) => void
  'battle:leave': () => void
  'battle:refresh': () => void
  'channel:leave': () => void
}
