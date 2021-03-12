import { useAsync, useContext, ref } from '@nuxtjs/composition-api'
export const useResume = (path: string): any => {
  const { $content } = useContext()
  const resume = ref<any>()
  useAsync(async () => (resume.value = await $content(path).fetch()))
  return { resume }
}
