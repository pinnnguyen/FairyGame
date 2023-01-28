import type { BattleRequest } from '~/types/war'
export interface ServerToClientEvents {
  'battle:start': (response: any) => void
  'boss-daily:start': (response: any) => void
  'send-message': (reponse: any) => void
  'upgrade:preview:response': (require: any) => void
  'star:preview:response': (require: any) => void
  'equip:upgrade:response': (require: any) => void
  'equip:star:response': (require: any) => void
  'auction-response': (response: {}) => void
  'send-battle:log': (topDMG: {
    _id: string
    totalDamage: number
    sid: string
    name: string
  }[]) => void
}

export interface ClientToServerEvents {
  'boss-daily:join': (_channel: string, sid: string) => void
  'auction': (params: { _auctionItemId: string; sid?: string }) => void
  'equip:upgrade:start': (_channel: string) => void
  'equip:star:start': (_channel: string) => void
  'equip:upgrade:preview': (_equipId?: string) => void
  'equip:star:preview': (_equipId?: string) => void
  'equip:upgrade:leave': () => void
  'star:upgrade:leave': () => void
  'battle:join': (_channel: string, request: BattleRequest) => void
  'battle:leave': () => void
  'battle:refresh': () => void
  'channel:leave': () => void
  'send-notify': (message: string) => void
  'equip:upgrade': (type: string, _equipId: string) => void
  'battle:log': (_bossId: string) => void
  'disconnect': () => void
}
