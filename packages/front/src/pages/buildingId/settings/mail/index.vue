<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-form v-model="valid" @submit.prevent="updateEmail">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                v-model.trim="newEmail"
                type="email"
                label="メールアドレス"
                :rules="[rules.required, rules.email]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.trim="newEmailComfirmation"
                type="email"
                label="メールアドレス（確認用）"
                :rules="[rules.required, rules.email, confirmRule]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.trim="password"
                type="password"
                label="パスワード"
                :rules="[rules.required, rules.password]"
              />
            </v-col>
            <v-col>
              <v-btn :disabled="!valid" block large type="submit" depressed
                >メールアドレス変更</v-btn
              >
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
  useRouter,
  useContext,
  toRefs,
  computed,
} from '@nuxtjs/composition-api'
import { RULES, AUTH_ERRORS, DEFAULT_ERROR_MESSAGE } from '@works/core'
import { setLayout } from '~/services/constants/pages'
import { useSnackbarMessage } from '~/compositions/snackbar'

export default defineComponent({
  components: {},
  layout: ({ route }) => setLayout(route),
  props: {},
  setup() {
    const router = useRouter()
    const { $firebase } = useContext()
    const { setMessage } = useSnackbarMessage()

    const input = reactive<{
      valid: boolean
      newEmail: string
      newEmailComfirmation: string
      password: string
    }>({
      valid: false,
      newEmail: '',
      newEmailComfirmation: '',
      password: '',
    })

    const confirmRule = computed(() => (v: string) =>
      input.newEmail === v || 'メールアドレスが一致しません。'
    )

    const updateEmail = async () => {
      const user = $firebase.auth().currentUser
      if (!user || !user.email) {
        throw new Error('user or email undefined')
      }
      const credential = $firebase.auth.EmailAuthProvider.credential(
        user.email,
        input.password
      )
      try {
        const reauth = await user.reauthenticateWithCredential(credential)
        if (reauth) {
          await user.updateEmail(input.newEmail)
          router.push({ name: 'buildingId-settings-mail-done' })
        }
      } catch (e) {
        if (e.code) {
          const errorMessage =
            (AUTH_ERRORS as any)[e.code] ?? DEFAULT_ERROR_MESSAGE
          setMessage({ content: errorMessage, level: 'error' })
        }
      }
    }

    return {
      rules: RULES,
      ...toRefs(input),
      confirmRule,
      updateEmail,
    }
  },
  head: {},
})
</script>
