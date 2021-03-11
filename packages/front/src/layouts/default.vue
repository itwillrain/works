<template>
  <v-app>
    <v-main>
      <nuxt />
      <p-m-base-snackbar />
    </v-main>
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
