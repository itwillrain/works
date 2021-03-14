<template>
  <v-container class="py-10">
    <v-row v-if="projects">
      <v-col>
        <v-row>
          <v-col cols="12">
            <h2 class="text-center">Works</h2>
          </v-col>
        </v-row>
        <v-row v-if="projects.length">
          <v-col
            v-for="(project, idx) in projects"
            :key="idx"
            cols="12"
            sm="6"
            md="4"
          >
            <p-m-project-card :project="project"></p-m-project-card>
          </v-col>
        </v-row>
        <infinite-loading @infinite="infiniteHandler">
          <div slot="no-results" />
          <span slot="no-more"></span>
        </infinite-loading>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, useMeta, useRoute } from '@nuxtjs/composition-api'
import { useProjects } from '~/compositions/projects'
import { getPageTitle, setLayout } from '~/services/constants/pages'
export default defineComponent({
  layout: ({ route }) => setLayout(route),
  props: {},
  setup() {
    const { projects, infiniteHandler } = useProjects()
    const route = useRoute()
    useMeta(() => ({ title: getPageTitle(route.value) + ' |' }))

    return {
      infiniteHandler,
      projects,
    }
  },
  head: {},
})
</script>
