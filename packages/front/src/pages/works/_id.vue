<template>
  <div>
    <v-container class="py-10">
      <v-row class="head">
        <v-col cols="12">
          <h2>{{ project.name }}</h2>
        </v-col>
        <v-col cols="12" class="pb-0">
          <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">
            <v-img :src="project.displayImage" :aspect-ratio="16 / 9">
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row> </template
            ></v-img>
          </a>
          <v-img v-else :src="project.displayImage" :aspect-ratio="16 / 9">
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row> </template
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <div :class="$style.bg">
      <v-container>
        <v-row v-if="project.startAt || project.endAt">
          <v-col>
            <h3>期間</h3>
            <time> {{ formatDate(project.startAt) }}</time>
            ~
            <time> {{ formatDate(project.endAt) }}</time>
          </v-col>
        </v-row>
        <v-row v-if="project && project.skills.length">
          <v-col>
            <h3>使用したスキル・ツール</h3>
            <div>
              <v-chip v-for="(skill, idx) in project.skills" :key="idx" class="ma-2" color="primary">
                {{ skill }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
        <v-row :class="$style.content">
          <v-col>
            <h3>概要</h3>
            <p v-html="$sanitize(project.desc)"></p>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- comment -->
  </div>
</template>
<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import { formatDate } from '@works/core'
import { useProject } from '~/compositions/projects'
export default defineComponent({
  components: {},
  props: {},
  setup() {
    const { project } = useProject()
    useMeta(() => ({ title: project.value?.name ?? '' }))
    return { project, formatDate }
  },
  head: {},
})
</script>
<style lang="scss" module>
.bg {
  margin-top: -6rem;
  padding-top: 6rem;
  background-color: var(--v-background-darken1);
}
content {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
