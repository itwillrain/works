import {
  defineNuxtPlugin,
  onGlobalSetup,
  onUnmounted,
  provide,
  ref,
} from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'
import { CurrentUser } from '~/compositions/auth'

export default defineNuxtPlugin(async (_ctx, inject) => {
  const currentUser = ref<firebase.User | null>(null)
  inject('currentUser', currentUser)

  const unsubscribe: () => void = await new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        currentUser.value = null
      } else {
        currentUser.value = user
      }
      resolve(unsubscribe)
    })
  })

  onGlobalSetup(() => {
    provide(CurrentUser, currentUser)
    onUnmounted(unsubscribe)
  })
})
