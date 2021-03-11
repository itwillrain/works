<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-form v-model="valid" @submit.prevent="sendPasswordReset">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field type="email" v-model.trim="email" label="メールアドレス" :rules="[rules.required, rules.email]" />
            </v-col>
            <v-col>
              <v-btn :disabled="!valid" block large type="submit" depressed>送信する</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, useRouter, useContext, toRefs } from '@nuxtjs/composition-api'
import { setLayout } from '~/services/constants/pages'
import { RULES, AUTH_ERRORS, DEFAULT_ERROR_MESSAGE } from '@works/core'
import { useSnackbarMessage } from '~/compositions/snackbar'

export default defineComponent({
  components: {},
  layout: ({ route }) => setLayout(route),
  props: {},
  setup() {
    const router = useRouter();
    const {$firebase} = useContext();
    const { setMessage } = useSnackbarMessage();
    const input = reactive<{ valid: boolean; email: string; }>({
      valid : false,
      email: '',
    })

    const sendPasswordReset = async () => {
      const auth = $firebase.auth();
      const actionCodeSettings = {url: `${process.env.BASE_URL}`};
      try {
        await auth.sendPasswordResetEmail(input.email, actionCodeSettings);
        router.push({name: 'password-done'});
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
      sendPasswordReset,
      ...toRefs(input)
    }
  },
  head: {},
})
</script>