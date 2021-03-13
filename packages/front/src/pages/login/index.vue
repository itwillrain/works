<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-card-text>
            <v-row justify="center">
              <v-col>
                <p-a-logo />
              </v-col>
            </v-row>
            <v-form v-model="isValid" @submit.prevent="submit">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model.trim="email"
                    dense
                    :rules="[rules.required, rules.email]"
                    outlined
                    label="Email"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model.trim="password"
                    :rules="[rules.required]"
                    :type="isVisible ? 'text' : 'password'"
                    outlined
                    dense
                    label="Password"
                    :append-icon="isVisible ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="isVisible = !isVisible"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-checkbox
                    v-model="rememberMe"
                    label="Remember Me"
                    class="ma-0 pa-0"
                  >
                  </v-checkbox>
                </v-col>
                <v-col>
                  <v-btn
                    type="submit"
                    depressed
                    block
                    color="primary"
                    :disabled="!isValid"
                  >
                    login
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
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
  useRouter,
  useMeta,
  useRoute,
} from '@nuxtjs/composition-api'
import {
  RULES,
  AUTH_ERRORS,
  DEFAULT_ERROR_MESSAGE,
  FixMeAny,
} from '@works/core'
import firebase from 'firebase/app'
import { signIn } from '~/compositions/auth'
import { getPageTitle, setLayout } from '~/services/constants/pages'
import { useSnackbarMessage } from '~/compositions/snackbar'
import 'firebase/auth'

export default defineComponent({
  components: {},
  layout: ({ route }) => setLayout(route),
  setup() {
    const isValid = ref<boolean>(false)
    const isVisible = ref<boolean>(false)
    const router = useRouter()
    const { setMessage } = useSnackbarMessage()
    const route = useRoute()
    useMeta(() => ({ title: getPageTitle(route.value) + ' |' }))

    const input = reactive<{
      email: string
      password: string
      rememberMe: boolean
    }>({
      email: '',
      password: '',
      rememberMe: true,
    })
    /**
     * ログイン
     */
    const submit = async () => {
      try {
        const persistence: keyof typeof firebase.auth.Auth.Persistence = input.rememberMe
          ? 'LOCAL'
          : 'SESSION'

        await signIn(input.email, input.password, persistence)
        router.push({ name: 'index' })
      } catch (e) {
        if (e.code) {
          const errorMessage =
            (AUTH_ERRORS as FixMeAny)[e.code] ?? DEFAULT_ERROR_MESSAGE
          setMessage({ content: errorMessage, level: 'error' })
        }
      }
    }

    return {
      ...toRefs(input),
      isValid,
      isVisible,
      rules: RULES,
      submit,
    }
  },
  head: {},
})
</script>
