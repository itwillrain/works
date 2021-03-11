import { ref } from '@nuxtjs/composition-api'
import { Location } from 'vue-router'

export type Breadcrumb = {
  text: string
  disabled: boolean
  to?: string | Location
  href?: string
}

export const useBreadcrumbs = () => {
  const breadcrumbs = ref<Breadcrumb[]>([])

  const setBreadcrumbs = (items: Breadcrumb[]) => {
    breadcrumbs.value = items
  }
  return {
    breadcrumbs,
    setBreadcrumbs,
  }
}
