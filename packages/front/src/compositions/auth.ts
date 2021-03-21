import { InjectionKey, Ref, inject } from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'
export const CurrentUser: InjectionKey<Ref<firebase.User | null>> = Symbol('CurrentUser')

export const useCurrentUser = () => {
  const currentUser = inject(CurrentUser)
  if (currentUser === undefined) {
    throw new Error(`currentUser is not provided`)
  }
  return {
    currentUser,
  }
}

export const signIn = async (email: string, password: string, persistence: keyof typeof firebase.auth.Auth.Persistence = 'SESSION') => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence[persistence])
  await firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signOut = async () => {
  await firebase.auth().signOut()
}
