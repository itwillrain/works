<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <p>メールアドレス変更完了しました</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { setLayout } from '~/services/constants/pages'
export default defineComponent({
  components: {},
  layout: ({ route }) => setLayout(route),
  props: {},
  setup() {
  },
  head: {},
})
</script> 