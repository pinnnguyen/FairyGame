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
  return milliseconds / 1000
}

export const convertSecondsToMinutes = (seconds: number) => {
  return seconds / 60
}

export const formatNumber = (str: string) => {
  if (!str)
    return
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatCash = (n: number) => {
  if (!n)
    return 0
  if (n < 1e3)
    return n
  // if (n >= 1e3 && n < 1e6)
  //   return `${+(n / 1e3).toFixed(1)} Vạn`
  // if (n >= 1e6 && n < 1e9)
  //   return `${+(n / 1e6).toFixed(1)}M`
  // if (n >= 1e9 && n < 1e12)
  //   return `${+(n / 1e9).toFixed(1)}B`
  // if (n >= 1e12)
  //   return `${+(n / 1e12).toFixed(1)}T`
  return `${+(n / 1e3).toFixed(1)} Vạn`
}

export const timeOffset = (time: number) => {
  return {
    seconds: time % 60,
    minutes: Math.floor(time / 60) % 60,
    hours: Math.floor(time / 60 / 60) % 24,
    days: Math.floor(time / 60 / 60 / 24) % 7,
    weeks: Math.floor(time / 60 / 60 / 24 / 7),
    months: Math.floor(time / 60 / 60 / 24 / 30.4368),
    totalDays: Math.floor(time / 60 / 60 / 24),
    totalHours: Math.floor(time / 60 / 60),
    totalMinutes: Math.floor(time / 60),
    totalSeconds: time,
  }
}