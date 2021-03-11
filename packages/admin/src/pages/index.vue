<template>
  <v-container class="fill-height">
    <!-- パンくず -->
    <portal to="breadcrumbs">
      <v-breadcrumbs :items="breadcrumbs">
        <template #item="{ item }">
          <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">
            <span v-if="item.to == '/'"><v-icon>mdi-home-outline</v-icon></span>
            <span v-else>{{ item.text }}</span>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </portal>

    <v-row v-if="$currentUser"></v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { setLayout } from '~/services/constants/pages'
import { useBreadcrumbs } from '~/compositions/breadcrumbs'

export default defineComponent({
  components: {},
  layout: ({ route }) => setLayout(route),
  props: {},
  setup() {
    const { setBreadcrumbs, breadcrumbs } = useBreadcrumbs()
    setBreadcrumbs([
      {
        text: 'parent',
        to: '/',
        disabled: false,
      },
      {
        text: 'users',
        to: { name: 'users' },
        disabled: false,
      },
      {
        text: 'masters',
        to: { name: 'buildings-buildingId-masters' },
        disabled: false,
      },
    ])
    return {
      setBreadcrumbs,
      breadcrumbs,
    }
  },
  head: {},
})
</script>
