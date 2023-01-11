export * from './reward'
export * from './war'

export const cloneDeep = <T>(data: T): T => JSON.parse(JSON.stringify(data))
