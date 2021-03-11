<template>
<div>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>マンションからのお知らせ</v-card-title>
          <v-card-text>現在東京インターマークスにて、居住者の鍵を使用した実証実験が進行中です。<br>実証実験の詳細については<n-link to="/">こちら</n-link>をご覧ください。</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row dense>
      <v-col cols="12">
        <p class="mb-0 subtitle-1">クイックアクセス</p>
      </v-col>
      <v-col cols="12">
        <v-btn block large color="primary">ゲストパーキングを予約する</v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn block large color="primary">Suicaを登録する</v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn block large color="primary">鍵の管理を行う</v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn block large color="primary" :to="{ name: 'buildingId-settings' }">設定</v-btn>
      </v-col>

    </v-row>
  </v-container>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  props: {},
  setup() {},
  head: {},
})
</script>