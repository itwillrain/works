<template>
  <v-timeline dense clipped>
    <v-timeline-item v-for="(year, i) in years" :key="i" :color="year.color" small>
      <div class="py-4">
        <h3 :class="`font-weight-500 mb-4 ${year.color}--text`">
          {{ year.year }}
        </h3>
        <div>{{ year.title }}</div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
interface Timeline {
  color: string
  year: string
  title: string
  desc?: string
}
export default defineComponent({
  components: {},
  props: {},
  setup() {
    const years = ref<Timeline[]>([
      {
        color: 'cyan',
        year: 'March 2004',
        title: '奈良市立一条高等学校普通科卒業',
      },
      {
        color: 'cyan',
        year: 'March 2008',
        title: '大阪芸術大学デザイン学科卒業',
      },
      {
        color: 'cyan',
        year: 'June 2008',
        title: '有限会社ROVEX入社',
      },
      {
        color: 'cyan',
        year: 'June 2013',
        title: '有限会社ROVEX退社',
      },
      {
        color: 'cyan',
        year: 'June 2014',
        title: 'イギリス Mayfair School of English（2015年4月まで）',
      },
      {
        color: 'cyan',
        year: 'Nov 2015',
        title: 'フィリピンSMEAG スパルタ校語学留学（2016年3月まで）',
      },
      {
        color: 'cyan',
        year: 'Sep 2017',
        title: '株式会社NEOPA 入社',
      },
    ])
    return {
      years,
    }
  },
})
</script>
