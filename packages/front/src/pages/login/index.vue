<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-form v-model="valid" @submit.prevent="submit">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field v-model.trim="email" label="Email" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model.trim="password" label="Password" />
            </v-col>
            <v-col cols="12">
              <v-btn class="pl-0 mb-3" text left :to="{ name: 'password' }">パスワードをお忘れの方</v-btn>
            </v-col>

            <v-col>
              <v-btn type="submit" depressed>login</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { AUTH_ERRORS, DEFAULT_ERROR_MESSAGE } from '@works/core'
import { signIn } from '~/compositions/account'
import { setLayout } from '~/services/constants/pages'
import { useSnackbarMessage } from '~/compositions/snackbar'

export default defineComponent({
  components: {},
  layout: ({ route }) => setLayout(route),
  props: {},
  setup() {
    const valid = ref<boolean>(false)
    const { app } = useContext()
    const { setMessage } = useSnackbarMessage()

    const input = reactive<{ email: string; password: string }>({
      email: '',
      password: '',
    })

    const submit = async () => {
      try {
        await signIn(input.email, input.password)
        app.router!.push({ name: 'index' })
      } catch (e) {
        if (e.code) {
          const errorMessage =
            (AUTH_ERRORS as any)[e.code] ?? DEFAULT_ERROR_MESSAGE
          setMessage({ content: errorMessage, level: 'error' })
        }
      }
    }

    return {
      valid,
      ...toRefs(input),
      submit,
    }
  },
  head: {},
})
</script>
