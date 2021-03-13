<template>
  <v-container class="py-10">
    <v-row>
      <v-col>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <h2 class="text-center">About</h2>
          </v-col>
        </v-row>
        <v-row>
          <!-- Personal info -->
          <v-col cols="12" md="4">
            <c-about-aside />
          </v-col>
          <!-- Resume -->
          <v-col v-if="resume" cols="12" md="8">
            <v-tabs v-model="tab" background-color="transparent" class="mb-4">
              <v-tab>Profile</v-tab>
              <v-tab>Life log</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" :class="$style.tab__items">
              <v-tab-item>
                <nuxt-content :document="resume" />
              </v-tab-item>
              <v-tab-item>
                <c-about-timeline />
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  useMeta,
  useRoute,
} from '@nuxtjs/composition-api'
import { FixMeAny } from '@works/core'
import { useResume } from '~/compositions/resume'
import { getPageTitle } from '~/services/constants/pages'
export default defineComponent({
  setup() {
    const { resume } = useResume('resume/index')
    const route = useRoute()
    useMeta(() => ({ title: getPageTitle(route.value) + ' |' }))
    const tab = ref<FixMeAny>(null)
    return {
      resume,
      tab,
    }
  },
  head: {},
})
</script>
<style lang="scss" module>
.tab {
  &__items {
    background-color: transparent !important;
  }
}
</style>
