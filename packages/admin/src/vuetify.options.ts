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
    themes: {
      light: {
        background: '#eff3f5',
        primary: '#464de4',
        accent: colors.grey.darken3,
        secondary: '#3a3f51',
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: '#4e9abd',
      },
      dark: {
        primary: '#464de4',
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
