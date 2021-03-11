import { Context } from '@nuxt/types'
import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import {
  isAuthenticatedOnly,
  isUnauthenticatedOnly,
} from '../services/constants/pages'

export default defineNuxtMiddleware(async (ctx) => {
  const { route, redirect, $currentUser } = ctx
  console.table(route)
  const isLogin = !!$currentUser.value

  // Routing
  if (isLogin) {
    // Loginしている場合
    const { claims } = await $currentUser.value!.getIdTokenResult(true)
    checkPermission(claims, ctx)

    if (isUnauthenticatedOnly(route)) {
      return redirect({ name: 'index' })
    }
    // Loginしていない場合
  } else if (isAuthenticatedOnly(route)) {
    return redirect({ name: 'login' })
  }
})

/**
 * 管理者権限チェック
 * @param { [key: string]: any} claims
 * @param {Context} ctx
 */
function checkPermission(claims: { [key: string]: any }, ctx: Context) {
  if (claims.role !== 'systemAdmin' && claims.role !== 'owner') {
    ctx.$firebase.auth().signOut()
    ctx.redirect({ name: 'login' })
    ctx.$message.value = {
      level: 'error',
      content: 'ログイン権限がございません。管理者にお問い合わせください。',
    }
  }
}
