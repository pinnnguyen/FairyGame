import { h } from 'vue'
import { Icon, Message } from 'vexip-ui'

export const sendMessage = (message: string, duration?: number) => {
  Message.open({
    duration: duration ?? 1500,
    className: '!rounded-xl',
    closable: false,
    renderer: () => {
      return h('span', [
        h(Icon, {
          name: 'bell-slash',
          style: {
            marginRight: '5px',
            color: '#339af0',
          },
        }),
                `${message}`,
      ])
    },
  })
}