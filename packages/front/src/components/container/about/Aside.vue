<template>
  <v-card max-width="375" class="mx-auto">
    <v-img :src="require('@/assets/img/profile.jpg')" aspect-ratio="1">
      <v-row class="fill-height" no-gutters>
        <v-col align-self="end">
          <div class="headline text-center white--text mr-2 mb-2">Takeshi Matsushita</div>
        </v-col>
      </v-row>
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-list two-line>
      <v-list-item href="tel:07042193358">
        <v-list-item-icon>
          <v-icon color="primary"> mdi-phone </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>070-4219-3358</v-list-item-title>
          <v-list-item-subtitle>Mobile</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item href="mailto:info.itwillrain@gmial.com?subject=[portfolio]お問い合わせ ">
        <v-list-item-icon>
          <v-icon color="primary"> mdi-email </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title> info.itwillrain@gmial.com </v-list-item-title>
          <v-list-item-subtitle>Personal</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary"> mdi-map-marker </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>東京都目黒区</v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  components: {},
  props: {},
  setup() {},
})
</script>
