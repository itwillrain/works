import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { Ref } from '@nuxtjs/composition-api'
import { SnackbarMessage } from '../compositions/snackbar'
export interface InjectedByPlugin {
  $currentUser: Ref<firebase.User | null>
  $firebase: typeof firebase
  $message: Ref<SnackbarMessage>
}

declare module '@nuxt/types' {
  interface Context extends InjectedByPlugin {}
  interface NuxtAppOptions extends InjectedByPlugin {}
}

declare module 'vue/types/vue' {
  interface Vue extends InjectedByPlugin {}
}

declare module 'vuex/types/index' {
  interface Store<S> extends InjectedByPlugin {}
}
