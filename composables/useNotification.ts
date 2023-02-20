import type { SnackbarPosition } from '@varlet/ui'
import { Snackbar } from '@varlet/ui'

export const sendNotification = (message: string, duration?: number, position?: SnackbarPosition) => {
  Snackbar({
    content: message,
    position: position ?? 'bottom',
    duration: duration ?? 2000,
  })
}
