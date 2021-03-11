import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import {
  isAuthenticatedOnly,
  isUnauthenticatedOnly,
} from '../services/constants/pages'

export default defineNuxtMiddleware(({ app, route, redirect }) => {
  console.table(route)
  const isLogin = app.$firebase.auth().currentUser

  // Routing
  if (isLogin) {
    // Loginしている場合
    if (isUnauthenticatedOnly(route)) {
      return redirect({ name: 'projects' })
    }
    // Loginしていない場合
  } else if (isAuthenticatedOnly(route)) {
    return redirect({ name: 'login' })
  }
})
