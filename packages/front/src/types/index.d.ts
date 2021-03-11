import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { Ref } from '@nuxtjs/composition-api'
import { Account } from '~/domain'
export interface InjectedByPlugin {
  $currentUser: Ref<Account | null>
  $firebase: typeof firebase
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
