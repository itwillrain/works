import { InjectionKey, Ref, inject } from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Account } from '~/domain'

export const CurrentUser: InjectionKey<Ref<Account | null>> = Symbol(
  'CurrentUser'
)

export const useCurrentUser = () => {
  const currentUser = inject(CurrentUser)
  if (currentUser === undefined) {
    throw new Error(`currentUser is not provided`)
  }
  return {
    currentUser,
  }
}


export const signIn = async (email: string, password: string) => {
  await firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signOut = async () => {
  await firebase.auth().signOut()
}
