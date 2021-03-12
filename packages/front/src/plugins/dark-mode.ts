import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(({ $vuetify, $colorMode }) => {
  $vuetify.theme.dark = $colorMode.preference === 'dark'
})
