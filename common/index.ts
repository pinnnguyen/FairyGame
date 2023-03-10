import { PLAYER_LEVEL_TITLE, RANGE_EXP_A_LEVEL, RANGE_LEVEL_ID, RANGE_PLAYER_BIG_LEVEL } from '~/server/rule'

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

export const formatCash = (n: any) => {
  if (!n)
    return 0

  if (n < 1e4)
    return n

  if (n >= 1e4 && n < 1e6)
    return `${+(n / 1e4).toFixed(1)} Vạn`
  if (n >= 1e6 && n < 1e9)
    return `${+(n / 1e6).toFixed(1)}M`
  if (n >= 1e9 && n < 1e12)
    return `${+(n / 1e9).toFixed(1)}B`
  if (n >= 1e12)
    return `${+(n / 1e12).toFixed(1)}T`
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

export const startTimeEvent = (startTime?: number, endTime?: number) => {
  const now = new Date().getTime()

  return now < endTime! && now > startTime!
}

export function fromNow(to: number, now = +new Date()) {
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = now - to

  if (elapsed < msPerMinute)
    return `${Math.round(elapsed / 1000)} Giây trước`

  else if (elapsed < msPerHour)
    return `${Math.round(elapsed / msPerMinute)} Phút trước`

  else if (elapsed < msPerDay)
    return `${Math.round(elapsed / msPerHour)} Giờ trước`

  else if (elapsed < msPerMonth)
    return `${Math.round(elapsed / msPerDay)} Ngày trước`

  else if (elapsed < msPerYear)
    return `${Math.round(elapsed / msPerMonth)} Tháng trước`
  else
    return `${Math.round(elapsed / msPerYear)} Năm trước`
}

export const qualityPalette = (quality: number) => {
  if (quality === 1)
    return '#6ba55f'

  if (quality === 2)
    return '#5388c1'

  if (quality === 3)
    return '#915fb3'

  if (quality === 4)
    return '#db8840'

  if (quality === 5)
    return '#cb525f'

  if (quality! >= 6)
    return '#e17298'

  return '#d2d2d2'
}

export const colorQuality = (quality: number) => {
  if (quality === 1) {
    return {
      color: '#6ba55f',
    }
  }

  if (quality === 2) {
    return {
      color: '#5388c1',
    }
  }

  if (quality === 3) {
    return {
      color: '#915fb3',
    }
  }

  if (quality === 4) {
    return {
      color: '#db8840',
    }
  }

  if (quality === 5) {
    return {
      color: '#cb525f',
    }
  }

  if (quality! >= 6) {
    return {
      color: '#e17298',
    }
  }
}
export const playerTitle = (level: number, playerNextLevel: number) => {
  let levelTitle = ''
  let floor = ''
  let expLimited = 0

  for (let i = 0; i < RANGE_PLAYER_BIG_LEVEL.length; i++) {
    if (level >= RANGE_PLAYER_BIG_LEVEL[i] && level < RANGE_PLAYER_BIG_LEVEL[i + 1]) {
      const lr = level - RANGE_PLAYER_BIG_LEVEL[i]
      const rbl = (RANGE_PLAYER_BIG_LEVEL[i + 1] - RANGE_PLAYER_BIG_LEVEL[i]) / 10
      const lfloor = Math.floor(lr / rbl)
      const floorR = RANGE_LEVEL_ID[lfloor]

      levelTitle = PLAYER_LEVEL_TITLE[i]
      if (floorR <= 3) {
        if (floorR === 1)
          floor = 'Sơ Kỳ 1'

        if (floorR === 2)
          floor = 'Sơ Kỳ 2'

        if (floorR === 3)
          floor = 'Sơ Kỳ 3'
      }

      if (floorR > 3 && floorR <= 6) {
        if (floorR === 4)
          floor = 'Trung Kỳ 1'

        if (floorR === 5)
          floor = 'Trung Kỳ 2'

        if (floorR === 6)
          floor = 'Trung Kỳ 3'
      }

      if (floorR > 6 && floorR < 9) {
        if (floorR === 7)
          floor = 'Hậu Kỳ 1'
        if (floorR === 8)
          floor = 'Hậu Kỳ 2'
      }

      if (floorR >= 9)
        floor = 'Đỉnh Phong'

      expLimited = 5 * playerNextLevel * (playerNextLevel + Math.round(playerNextLevel / 5)) * 12 * RANGE_EXP_A_LEVEL[i] + playerNextLevel
    }
  }

  return {
    levelTitle,
    floor,
    expLimited,
  }
}

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length
  let randomIndex

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}
