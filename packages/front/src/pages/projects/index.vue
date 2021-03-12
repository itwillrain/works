<template>
  <div>
    <v-container>
      <v-row v-if="pickupProjects.length">
        <v-col
          v-for="(project, idx) in pickupProjects"
          :key="idx"
          cols="12"
          sm="6"
          md="4"
        >
          <p-m-project-card :project="project"></p-m-project-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePickupProjects } from '~/compositions/projects'
import { setLayout } from '~/services/constants/pages'
export default defineComponent({
  components: {},
  layout: ({ route }) => setLayout(route),
  props: {},
  setup() {
    const { pickupProjects } = usePickupProjects()
    return {
      pickupProjects,
    }
  },
  head: {},
})
</script>
