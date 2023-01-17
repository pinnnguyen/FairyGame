// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import click from '~/assets/sound/btn_click.mp3'
// import click from '~/assets/sound/btn_click.mp3'

export const useSoundClickEvent = () => {
  const audio = new Audio(click)
  audio.play()
}

// export const
