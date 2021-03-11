<template>
<div>
  <v-bottom-navigation>
    <v-btn :to="{ name: 'buildingId' }">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'buildingId-account' }">
      <span>かぎ</span>
      <v-icon>mdi-key</v-icon>
    </v-btn>

    <v-btn>
      <span>ポイント</span>
      <v-icon>mdi-alpha-p-circle</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'buildingId-facilities' }">
      <span>共有部</span>
      <v-icon>mdi-office-building-outline</v-icon>
    </v-btn>

  </v-bottom-navigation>
</div>
</template>

<script lang="ts">
import { defineComponent,useContext } from '@nuxtjs/composition-api'
import { generateLocation } from '~/services/constants/pages'
import { PAGES } from '~/services/constants/pages'

export default defineComponent({
  components: {},
  setup(_props,ctx) {
    const { app } = useContext();
    return {
      app,
      pages: PAGES,
      generateLocation,
    }
  },
  head: {},
})
</script>