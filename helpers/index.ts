export * from './reward'

export const cloneDeep = <T>(data: T): T => JSON.parse(JSON.stringify(data))
