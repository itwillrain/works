import { InjectionKey, Ref, inject } from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'
import { assertIsDefined } from '@works/core'
export const CurrentUser: InjectionKey<Ref<firebase.User | null>> = Symbol(
  'CurrentUser'
)

export const useCurrentUser = () => {
  const currentUser = inject(CurrentUser)
  assertIsDefined(currentUser)
  return {
    currentUser,
  }
}

export const signIn = async (
  email: string,
  password: string,
  persistence: keyof typeof firebase.auth.Auth.Persistence = 'SESSION'
) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence[persistence])
  await firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signOut = async () => {
  await firebase.auth().signOut()
}
