<template>
  <div>
    <v-app-bar v-if="$currentUser.value" height="60" flat app :class="$style.header" hide-on-scroll>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-app-bar-title class="pa-0">
        <n-link :to="{ name: 'index' }" :class="$style.header__logo">
          <p-a-logo></p-a-logo>
        </n-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn text icon small class="mr-2" @click="$colorMode.value === 'dark' ? ($colorMode.preference = 'light') : ($colorMode.preference = 'dark')">
        <v-icon>{{ $colorMode.value === 'dark' ? 'mdi-brightness-2' : 'mdi-white-balance-sunny' }}</v-icon>
      </v-btn>

      <v-btn text icon small class="mr-2" href="https://github.com/itwillrain/works" target="_blank">
        <v-icon> mdi-github </v-icon>
      </v-btn>
      <v-menu offset-y min-width="200px">
        <template #activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar color="primary" size="32">
              <span class="white--text">{{ initialUpperCase($currentUser.value.email) }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>ログアウト</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <!-- Drawer -->
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list nav dense>
        <v-list-item-group active-class="primary--text">
          <v-list-item v-for="(menu, idx) in headerMenu" :key="idx" :to="{ name: menu.name }">
            <v-list-item-icon v-if="menu.icon">
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <div class="pa-2">
          <v-btn block depressed color="primary" @click="logout"> Logout </v-btn>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, useContext, useRouter, watchEffect } from '@nuxtjs/composition-api'
import { initialUpperCase } from '@works/core'
import { signOut } from '~/compositions/auth'
import { headerMenu, Page } from '~/services/constants/pages'
interface Data {
  headerMenu: Page[]
  drawer: boolean
}
export default defineComponent({
  components: {},
  props: {},
  setup() {
    const data = reactive<Data>({
      headerMenu: headerMenu(),
      drawer: false,
    })
    const { $colorMode, $vuetify } = useContext()
    const router = useRouter()

    watchEffect(() => {
      $vuetify.theme.dark = $colorMode.value === 'dark'
    })
    /**
     * ログアウト
     */
    const logout = async () => {
      await signOut()
      router.push({ name: 'login' })
    }
    return { initialUpperCase, logout, ...toRefs(data) }
  },
})
</script>
<style lang="scss" module>
.header {
  &__logo {
    vertical-align: bottom;
    img {
      width: 180px;
    }
  }
}
</style>
