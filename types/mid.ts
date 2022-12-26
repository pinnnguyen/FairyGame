export interface Mid {
  _id: string /* primary key */
  name: string
  id: number
  description: string
  monsterId: string
  isPvp: boolean
  ms: number
  rateExp?: number // type unknown;
  rateResource?: number // type unknown;
}
