<template>
  <v-app>
    <c-s-the-header />
    <v-main>
      <nuxt />
      <p-m-base-snackbar />
    </v-main>
    <c-s-the-footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  props: {},
  setup() {
    return {}
  },
  head: {},
})
</script>
