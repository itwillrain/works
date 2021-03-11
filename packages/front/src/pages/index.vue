<template>
  <div>
    <v-container>
      <v-row v-if="$currentUser">
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
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { Project } from '~/domain'
import { setLayout } from '~/services/constants/pages'
export default defineComponent({
  components: {},
  layout: ({ route }) => setLayout(route),
  props: {},
  setup() {
    const pickupProjects = ref<Project[]>([])
    onMounted(
      () =>
        (pickupProjects.value = new Array(10).fill(
          new Project(
            {
              name:
                '映画『過去はいつも新しく、未来はつねに懐かしい　写真家 森山大道』公式サイト',
            },
            'aaaa'
          )
        ))
    )
    return {
      pickupProjects,
    }
  },
  head: {},
})
</script>
