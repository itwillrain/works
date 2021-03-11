<template>
  <v-app>
    <l-the-header />
    <v-main>
      <nuxt />
      <p-m-base-snackbar />
    </v-main>
    <l-the-bottom-nav />
  </v-app>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  props: {},
  setup() {
    return {
    }
  },
  head: {},
})
</script>
