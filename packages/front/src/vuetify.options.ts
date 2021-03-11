import ja from 'vuetify/src/locale/ja'
import colors from 'vuetify/es5/util/colors'
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
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#4e9abd',
        accent: colors.grey.darken3,
        secondary: '#ebc000',
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: '#4e9abd',
      },
      dark: {
        primary: '#4e9abd',
        accent: colors.grey.darken3,
        secondary: '#ebc000',
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: '#4e9abd',
      },
    },
  },
}
