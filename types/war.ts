export interface WarRequest {
  kind: 'solo'
  player: {
    userId: string
  }
  target: {
    id: string
    type: string
  }
}
