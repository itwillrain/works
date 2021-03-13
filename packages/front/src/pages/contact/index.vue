<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2 class="text-center mb-4">お問い合わせ</h2>
        <p class="body-2 text-sm-center">
          お問い合わせありがとうございます。2~3日以内にご返信させていただきます。
        </p>
      </v-col>
      <v-col cols="12" md="8">
        <v-form ref="form" v-model="isValid" @submit.prevent="submit">
          <v-row>
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="company.name"
                label="会社名"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="phoneNumber"
                label="電話番号"
                :rules="[rules.phone]"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-textarea
                v-model="content"
                counter="200"
                :rules="[rules.max(200, content), rules.required]"
                label="お問い合わせ内容"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
          <div class="d-flex justify-center">
            <v-btn
              type="submit"
              color="primary"
              depressed
              :disabled="!isValid"
              min-width="200"
              rounded
              :loading="isLoading"
            >
              送信
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  useContext,
} from '@nuxtjs/composition-api'
import { DEFAULT_ERROR_MESSAGE, RULES } from '@works/core'
import { useSnackbarMessage } from '~/compositions/snackbar'
interface ContactForm {
  isValid: boolean
  content: string
  company: {}
  phoneNumber: string
  isLoading: boolean
}
export default defineComponent({
  components: {},
  props: {},
  setup() {
    const { $firebase } = useContext()
    const { setMessage } = useSnackbarMessage()
    const form = ref<any>()
    const contactForm = reactive<ContactForm>({
      isValid: false,
      isLoading: false,
      content: '',
      company: {
        name: '',
      },
      phoneNumber: '',
    })

    const submit = async () => {
      contactForm.isLoading = true
      const contact = $firebase
        .app()
        .functions('asia-northeast1')
        .httpsCallable('v1-callable-contact')
      try {
        const { data } = await contact(contactForm)
        if (data.success) {
          form.value.reset()
          setMessage({ level: 'success', content: 'メールを送信しました。' })
        }
      } catch (err) {
        if (err) {
          setMessage({ level: 'error', content: DEFAULT_ERROR_MESSAGE })
        }
      } finally {
        contactForm.isLoading = false
      }
    }
    return {
      form,
      rules: RULES,
      submit,
      ...toRefs(contactForm),
    }
  },
})
</script>
