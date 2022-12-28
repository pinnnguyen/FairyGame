import type { BattleRequest } from '~/types/war'

export interface ServerToClientEvents {
  battleStart: (response: any) => void
  battleEnd: (response: any) => void
}

export interface ClientToServerEvents {
  battle: (_channel: string, request: BattleRequest) => void
  // 'bag:join': (_channel: string) => void
  battleLeave: () => void
  battleRefresh: () => void
}
