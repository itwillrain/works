<template>
  <v-container class="py-10 fill-height">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2 class="text-center">お問い合わせ</h2>
        <p>お問い合わせありがとうございます。</p>
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
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { RULES } from '@works/core'
interface ContactForm {
  isValid: boolean
  content: string
  company: {}
  phoneNumber: string
}
export default defineComponent({
  components: {},
  props: {},
  setup() {
    const contactForm = reactive<ContactForm>({
      isValid: false,
      content: '',
      company: {
        name: '',
      },
      phoneNumber: '',
    })
    return {
      rules: RULES,
      ...toRefs(contactForm),
    }
  },
})
</script>
