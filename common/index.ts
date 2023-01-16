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
  // return {
  //   seconds: time % 60,
  //   minutes: Math.floor(time / 60) % 60,
  //   hours: Math.floor(time / 60 / 60) % 24,
  //   days: Math.floor(time / 60 / 60 / 24) % 7,
  //   weeks: Math.floor(time / 60 / 60 / 24 / 7),
  //   months: Math.floor(time / 60 / 60 / 24 / 30.4368),
  //   totalDays: Math.floor(time / 60 / 60 / 24),
  //   totalHours: Math.floor(time / 60 / 60),
  //   totalMinutes: Math.floor(time / 60),
  //   totalSeconds: time,
  // }

  return {
    hours: Math.round(time / 60 / 60),
    minutes: Math.floor(time / 60) % 60,
    seconds: Math.round(time % 60),
  }
}

export const startEndHoursBossFrameTime = (hours: number) => {
  const date = new Date()
  const now = new Date().getTime()
  date.setHours(hours)
  date.setMinutes(0)

  if (date.getTime() + 1800000 < now)
    date.setDate(date.getDate() + 1)

  return {
    start: date.getTime(),
    end: date.getTime() + 1800000, // + them 30 phut
  }
}

export const startTimeEvent = (startTime: number, endTime: number) => {
  const now = new Date().getTime()

  return now < endTime && now > startTime
}

export function fromNow(to: number, now = +new Date()) {
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = now - to

  if (elapsed < msPerMinute)
    return `${Math.round(elapsed / 1000)} seconds ago`

  else if (elapsed < msPerHour)
    return `${Math.round(elapsed / msPerMinute)} minutes ago`

  else if (elapsed < msPerDay)
    return `${Math.round(elapsed / msPerHour)} hours ago`

  else if (elapsed < msPerMonth)
    return `${Math.round(elapsed / msPerDay)} days ago`

  else if (elapsed < msPerYear)
    return `${Math.round(elapsed / msPerMonth)} months ago`
  else
    return `${Math.round(elapsed / msPerYear)} years ago`
}
