<template>
  <v-app>
    <!--  Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      dark
      fixed
      app
    >
      <v-list>
        <v-list-item :to="{ name: 'index' }" exact>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title class="title">Magical Key</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="(page, i) in pages"
          :key="i"
          :to="generateLocation(page)({ name: page.name })"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="page.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Header -->
    <v-app-bar fixed app flat height="58" color="white">
      <v-app-bar-nav-icon @click.stop="miniVariant = !miniVariant" />
      <v-toolbar-title class="font-weight-bold" v-text="title" />

      <portal-target name="breadcrumbs"></portal-target>
      <v-spacer></v-spacer>
      <div v-if="$currentUser.value" class="mr-2">
        <strong class="body-2 font-weight-bold">
          {{ $currentUser.value.email }}
        </strong>
        <br />
        <!-- TODO: ここに管理中のマンション名を表示する -->
        <span class="caption">管理中のマンション表示</span>
      </div>
      <v-menu offset-y min-width="200px">
        <template #activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar color="primary" size="48">
              <span class="white--text headline">J</span>
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

    <!-- Main -->
    <v-main>
      <nuxt />
      <p-m-base-snackbar />
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import {
  draweMenu,
  generateLocation,
  getPageTitle,
  Page,
} from '~/services/constants/pages'
import { signOut } from '~/compositions/auth'

export default defineComponent({
  components: {},
  props: {},
  setup() {
    const { route, app } = useContext()
    const layout = reactive<{
      drawer: boolean
      miniVariant: boolean
      pages: Page[]
    }>({
      drawer: true,
      miniVariant: false,
      pages: draweMenu(),
    })

    /**
     * ページからタイトル表示
     */
    const title = computed(() => getPageTitle(route.value))
    useMeta(() => ({ title: `${title.value ? title.value + ' -' : ''}` }))

    /**
     * ログアウト
     */
    const logout = async () => {
      await signOut()
      app.router!.push({ name: 'login' })
    }

    return {
      ...toRefs(layout),
      title,
      logout,
      generateLocation,
    }
  },
  head: {},
})
</script>
