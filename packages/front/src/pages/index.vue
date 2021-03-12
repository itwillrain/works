<template>
  <div>
    <v-container>
      <v-row></v-row>
    </v-container>
  </div>
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
