<template>
  <v-card
    class="mx-auto fill-height"
    :class="$style.card__outter"
    max-width="400"
    nuxt
    :to="{ name: 'works-id', params: { id: project.id } }"
  >
    <v-img
      class="white--text align-end"
      height="220px"
      :src="project.displayImage"
    >
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-subtitle class="pb-0"> {{ project.name }}</v-card-subtitle>
    <v-card-actions :class="$style.card__actions">
      <v-btn color="primary" text>Detail</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropOptions } from '@nuxtjs/composition-api'
import { Project } from '~/domain'
export default defineComponent({
  components: {},
  props: {
    project: {
      type: Object,
      default: () => new Project({}, ''),
    } as PropOptions<Project>,
  },
  setup() {},
})
</script>
<style lang="scss" module>
.card {
  &__outter {
    position: relative;
    padding-bottom: 50px;
  }
  &__actions {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
