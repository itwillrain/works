<template>
  <v-app-bar
    v-if="$currentUser.value"
    height="60"
    flat
    app
    class="header"
    hide-on-scroll
  >
    <v-app-bar-title>
      <n-link :to="{ name: 'index' }" :class="$style.header__logo">
        <p-a-logo></p-a-logo>
      </n-link>
    </v-app-bar-title>
    <ul :class="$style.header__menu" class="d-flex">
      <li v-for="menu in headerMenu" :key="menu.name">
        <n-link :to="{ name: menu.name }">
          {{ menu.title }}
        </n-link>
      </li>
    </ul>

    <v-spacer></v-spacer>
    <v-btn
      text
      icon
      small
      class="mr-2"
      @click="
        $colorMode.preference === 'dark'
          ? ($colorMode.preference = 'light')
          : ($colorMode.preference = 'dark')
      "
    >
      <v-icon>{{
        $colorMode.preference === 'dark'
          ? 'mdi-brightness-2'
          : 'mdi-white-balance-sunny'
      }}</v-icon>
    </v-btn>

    <v-btn
      text
      icon
      small
      class="mr-2"
      href="https://github.com/itwillrain/works"
      target="_blank"
    >
      <v-icon> mdi-github </v-icon>
    </v-btn>

    <div class="mr-4">
      <strong class="body-2 font-weight-bold">
        {{ $currentUser.value.email }}
      </strong>
    </div>
    <v-menu offset-y min-width="200px">
      <template #activator="{ on }">
        <v-btn icon class="mr-2" v-on="on">
          <v-avatar color="primary" size="42">
            <span class="white--text headline">{{
              initialUpperCase($currentUser.value.email)
            }}</span>
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
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  useContext,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import { initialUpperCase } from '@works/core'
import { signOut } from '~/compositions/auth'
import { headerMenu, Page } from '~/services/constants/pages'
interface Data {
  headerMenu: Page[]
}
export default defineComponent({
  components: {},
  props: {},
  setup() {
    const data = reactive<Data>({
      headerMenu: headerMenu(),
    })
    const { $colorMode, $vuetify } = useContext()
    const router = useRouter()
    watch(
      () => $colorMode.value,
      () => {
        $vuetify.theme.dark = $colorMode.value === 'dark'
      }
    )
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
    line-height: 1;
    vertical-align: bottom;
    img {
      width: 200px;
    }
  }
  &__menu {
    li {
      list-style: none;
      margin-right: 1rem;
    }
    a {
      text-decoration: none;
    }
  }
}
</style>
