export const cloneDeep = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(cloneDeep)
  }
  else if (obj && typeof obj === 'object') {
    const cloned: any = {}
    const keys = Object.keys(obj)
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i]
      cloned[key] = cloneDeep(obj[key])
    }
    return cloned
  }
  else {
    return obj
  }
}

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const randomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const convertMillisecondsToSeconds = (milliseconds: number) => {
  return Math.round(milliseconds / 1000)
}

export const convertSecondsToMinutes = (seconds: number) => {
  return Math.round(seconds / 60)
}

export const formatNumber = (str: string) => {
  if (!str)
    return
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
