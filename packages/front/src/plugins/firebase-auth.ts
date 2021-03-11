import {
  defineNuxtPlugin,
  onGlobalSetup,
  onUnmounted,
  provide,
  ref,
} from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'
import { AccountRepo, Account } from '~/domain/'
import { CurrentUser } from '~/compositions/account'

export default defineNuxtPlugin(async (_ctx, inject) => {
  const currentUser = ref<Account | null>(null)
  inject('currentUser', currentUser)

  const unsubscribe: () => void = await new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        currentUser.value = null
      } else {
        const accountRepo = new AccountRepo(firebase.firestore())
        const account = await accountRepo.getAccount(user.uid)
        currentUser.value = account ?? null
      }
      resolve(unsubscribe)
    })
  })

  onGlobalSetup(() => {
    provide(CurrentUser, currentUser)
    onUnmounted(unsubscribe)
  })
})
