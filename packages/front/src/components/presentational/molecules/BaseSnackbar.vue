<template>
  <v-snackbar v-if="hasMessage" v-model="hasMessage" :vertical="vertical" :color="message.level" text>
    {{ message.content }}
    <template #action="{ attrs }">
      <v-btn :color="message.level" text v-bind="attrs" @click="resetMessage"> 閉じる </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useSnackbarMessage } from '~/compositions/snackbar'
export default defineComponent({
  components: {},
  props: {},
  setup() {
    const { message, hasMessage, setMessage } = useSnackbarMessage()
    const vertical = ref<boolean>(true)
    const resetMessage = () => setMessage({ content: '' })
    return {
      message,
      hasMessage,
      vertical,
      resetMessage,
    }
  },
})
</script>
