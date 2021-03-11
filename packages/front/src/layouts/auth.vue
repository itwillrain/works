<template>
  <v-app light :class="$style.single">
    <c-s-the-header></c-s-the-header>
    <v-main>
      <p-m-base-snackbar />
      <nuxt />
    </v-main>
  </v-app>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  components: {},
  props: {},
  setup() {},
})
</script>
<style lang="scss" module>
.single {
  background-color: var(--v-background-base) !important;
}
</style>
