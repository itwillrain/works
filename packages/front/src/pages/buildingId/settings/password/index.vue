<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-form v-model="valid" @submit.prevent="updatePassword">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                v-model.trim="password"
                type="password"
                label="現在のパスワード"
                :rules="[rules.required, rules.password]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.trim="newPassword"
                type="password"
                label="新しいパスワード"
                :rules="[rules.required, rules.password]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.trim="newPasswordComfirmation"
                type="password"
                label="新しいパスワード再入力"
                :rules="[rules.required, rules.password, confirmRule]"
              />
            </v-col>
            <v-col>
              <v-btn :disabled="!valid" block large type="submit" depressed
                >パスワード変更</v-btn
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
      password: string
      newPassword: string
      newPasswordComfirmation: string
    }>({
      valid: false,
      password: '',
      newPassword: '',
      newPasswordComfirmation: '',
    })

    const confirmRule = computed(() => (v: string) =>
      input.newPassword === v || 'パスワードが一致しません。'
    )

    const updatePassword = async () => {
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
          await user.updatePassword(input.newPassword)
          router.push({ name: 'buildingId-settings-password-done' })
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
      updatePassword,
      ...toRefs(input),
      confirmRule,
    }
  },
  head: {},
})
</script>
