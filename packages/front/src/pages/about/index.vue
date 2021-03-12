<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2 class="text-center">About</h2>
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="12" md="4">
            <v-card max-width="375" class="mx-auto">
              <v-img
                src="https://cdn.vuetifyjs.com/images/lists/ali.png"
                height="300px"
                dark
              >
              </v-img>

              <v-list two-line>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary"> mdi-phone </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>070-4219-3358</v-list-item-title>
                    <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary"> mdi-email </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>
                      info.itwillrain@gmial.com
                    </v-list-item-title>
                    <v-list-item-subtitle>Personal</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary"> mdi-map-marker </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>東京都目黒区</v-list-item-title>
                    <v-list-item-subtitle>目黒本町</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <p>
              大阪にてフリーランスのWeb制作をしております。<br />
              2006年よりアルバイトにて制作を始める。<br />
              2007年から5年間大阪市内の制作会社でデザイン・コーディングなどの業務を行う。<br />
              2012年よりフリーランスへ転向。<br />
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  components: {},
  props: {},
  setup() {},
})
</script>
