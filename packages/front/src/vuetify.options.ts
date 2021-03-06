import ja from 'vuetify/src/locale/ja'
import colors from 'vuetify/es5/util/colors'
const primary = '#06b6d4'
export default {
  breakpoint: {
    thresholds: {
      sm: 0,
      md: 768,
    },
    mobileBreakpoint: 768,
  },
  icons: {},
  lang: {
    locales: { ja },
    current: 'ja',
  },
  // rtl: true,
  theme: {
    themes: {
      light: {
        background: {
          base: '#ffffff',
          darken1: '#f9f9fb',
        },
        primary,
        accent: colors.grey.darken3,
        secondary: '#3a3f51',
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: '#4e9abd',
      },
      dark: {
        background: {
          base: '#111827',
          darken1: '#0d1320',
          lighten1: '#1f2937',
        },
        primary,
        accent: colors.grey.darken3,
        secondary: '#dfe8fb',
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: '#4e9abd',
      },
    },
    options: { customProperties: true },
  },
}
