<template>
  <v-footer absolute app>
    <small :class="$style.copy">
      &copy;itwillrain {{ new Date().getFullYear() }}
    </small>
  </v-footer>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  components: {},
  props: {},
  setup() {},
})
</script>
<style lang="scss" module>
.copy {
  font-size: 0.725rem;
}
</style>
