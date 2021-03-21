import { defineNuxtPlugin, onGlobalSetup, provide, ref } from '@nuxtjs/composition-api'
import { SnackbarMessage, SnackbarMessageKey } from '../compositions/snackbar'

export default defineNuxtPlugin((_ctx, inject) => {
  const message = ref<SnackbarMessage>({ content: '' })
  inject('message', message)

  onGlobalSetup(() => {
    provide(SnackbarMessageKey, message)
  })
})
