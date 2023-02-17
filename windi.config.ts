import { defineConfig } from 'windicss/helpers'
import type { Plugin } from 'windicss/types/interfaces'

// colors
import colors from 'windicss/colors'

// themes
import defaultTheme from 'windicss/defaultTheme'

// plugins
import TypographyPlugin from 'windicss/plugin/typography'
import AspectRatioPlugin from 'windicss/plugin/aspect-ratio'
import FiltersPlugin from 'windicss/plugin/filters'
import LineClampPlugin from 'windicss/plugin/line-clamp'

const MyTheme = {
  colors: {
    green: {
      DEFAULT: '#212121',
      50: '#B4E4CF',
      100: '#A5DFC5',
      200: '#87D4B2',
      300: '#69CA9E',
      400: '#4BBF8B',
      500: '#3BA676',
      600: '#2C7D59',
      700: '#1E533B',
      800: '#0F2A1E',
      900: '#000000',
    },
    blue: {
      DEFAULT: '#0096FF',
      50: '#B8E2FF',
      100: '#A3D9FF',
      200: '#7AC8FF',
      300: '#52B8FF',
      400: '#29A7FF',
      500: '#0096FF',
      600: '#0075C7',
      700: '#00548F',
      800: '#003357',
      900: '#00121F',
    },
    red: {
      DEFAULT: '#FF6464',
      50: '#FFFFFF',
      100: '#FFFFFF',
      200: '#FFDEDE',
      300: '#FFB6B6',
      400: '#FF8D8D',
      500: '#FF6464',
      600: '#FF2C2C',
      700: '#F30000',
      800: '#BB0000',
      900: '#830000',
    },
  },
}

export default defineConfig({
  darkMode: 'class',
  attributify: true,
  extract: {
    include: [
      './components/**/*.{vue,js}',
      './composables/**/*.{js,ts}',
      './content/**/*.md',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './utils/**/*.{js,ts}',
      './app.vue',
    ],
  },
  theme: {
    fontSize: {
      6: '6px',
      7: '7px',
      8: '8px',
      9: '9px',
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
    },
    backgroundColor: {
      primary: '#191b1e',
      base: '#000000',
    },
    backgroundImage: {
      bg_aution: 'url("/common/bg-aution.png")',
      bg_bottom: 'url("/index/bg_bottom.png")',
      bg_index: 'url("/index/bg.png")',
      bg_5: 'url("/common/bg_5.jpg")',
      boss_daily_panel: 'url("/panel/boss_daily.png")',
      bg_pve: 'url("/pve/bg.png")',
      right_bottom: 'url("/button/right_bottom.png")',
      iconbg_0: 'url(\'/quality_bg/iconbg_0.png\')',
      iconbg_1: 'url(\'/quality_bg/iconbg_1.png\')',
      iconbg_2: 'url(\'/quality_bg/iconbg_2.png\')',
      iconbg_3: 'url(\'/quality_bg/iconbg_3.png\')',
      iconbg_4: 'url(\'/quality_bg/iconbg_4.png\')',
      iconbg_5: 'url(\'/quality_bg/iconbg_5.png\')',
      iconbg_6: 'url(\'/quality_bg/iconbg_6.png\')',
    },
    extend: {
      maxWidth: {
        '8xl': '90rem',
      },
      colors: {
        primary: '#d2d2d2',
        green: MyTheme.colors.green,
        blue: MyTheme.colors.blue,
        red: MyTheme.colors.red,
        slate: colors.slate,
      },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  shortcuts: {
    'light-img': 'block dark:hidden',
    'dark-img': 'hidden dark:block',
    'flex-center': 'flex items-center justify-center',
    'border-full-box': 'border-1 text-primary rounded-full border-white/40',
    'border-box': 'border-1 border-white/40 rounded text-primary',
    'flex-item-w-full': 'flex items-center w-full',
    'ab-flex-w-full': 'absolute flex w-full',
  },
  plugins: [
    // filters plugin require for navbar blur
    FiltersPlugin as Plugin,
    TypographyPlugin as Plugin,
    AspectRatioPlugin as Plugin,
    LineClampPlugin as Plugin,
  ] as Plugin[],
})
