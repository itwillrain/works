<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-list dense>
            <v-list-item-group>
              <v-list-item
                v-for="(page, idx) in pages"
                :key="idx"
                nuxt
                :to="generateLocation(page)({ name: page.name })"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ page.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { generateLocation, setLayout } from '../services/constants/pages'
import { PAGES } from '~/services/constants/pages'

export default defineComponent({
  components: {},
  layout: ({ route }) => setLayout(route),
  setup(_props) {
    return {
      pages: PAGES,
      generateLocation,
    }
  },
  head: {},
})
</script>
