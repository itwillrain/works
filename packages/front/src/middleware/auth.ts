import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import {
  isAuthenticatedOnly,
  isUnauthenticatedOnly,
} from '../services/constants/pages'

export default defineNuxtMiddleware((ctx) => {
  const { redirect, route, $currentUser } = ctx
  console.table(route)
  const isLogin = !!$currentUser.value
  console.log(isLogin)

  // Routing
  if (isLogin) {
    // Loginしている場合
    if (isUnauthenticatedOnly(route)) {
      return redirect({ name: 'top' })
    }
    // Loginしていない場合
  } else if (isAuthenticatedOnly(route)) {
    return redirect({ name: 'login' })
  }
})
