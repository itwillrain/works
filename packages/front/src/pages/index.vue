<template>
  <v-container class="py-10">
    <v-row></v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { setLayout } from '~/services/constants/pages'
export default defineComponent({
  components: {},
  layout: ({ route }) => setLayout(route),
  props: {},
  setup() {},
  head: {},
})
</script>
