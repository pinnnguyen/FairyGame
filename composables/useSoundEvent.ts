// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import click from '~/assets/sound/btn_click.mp3'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import bg_music_22 from '~/assets/sound/bg_music_22.mp3'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import bg_music_home from '~/assets/sound/76180931-42ba-4a4f-a837-940988b10b49.mp3'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import attack from '~/assets/sound/attack.mp3'
import reward from '~/assets/sound/reward.mp3'

const audioHome = new Audio(bg_music_home)

export const useSoundRewardEvent = async () => {
  const audio = new Audio(reward)
  await audio.play()
}

export const useSoundClickEvent = async () => {
  const audio = new Audio(click)
  await audio.play()
}

export const useSoundBattleEvent = () => {
  const audio = new Audio(bg_music_22)
  return audio
}

export const useSoundHomeEvent = () => {
  return audioHome
}

export const useSoundEventAttack = async () => {
  audioHome.pause()
  const audio = new Audio(attack)
  await audio.play()
}
