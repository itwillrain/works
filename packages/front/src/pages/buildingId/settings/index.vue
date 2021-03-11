<template>
  <v-container>
    <v-list dense outlined>
      <v-list-item :to="{ name: 'buildingId-settings-password' }">
        <v-list-item-title>パスワード変更</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ name: 'buildingId-settings-mail' }">
        <v-list-item-title>メールアドレス変更</v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-title>ログアウト</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { setLayout } from '~/services/constants/pages'
import { signOut } from '~/compositions/account'

export default defineComponent({
  components: {},
  layout: ({ route }) => setLayout(route),
  props: {},
  setup() {
    const router = useRouter();
    const logout = async () => {
      signOut()
      await router.push({ name: 'login' })
    }
    return {
      logout
    }
  },
  head: {},
})
</script>