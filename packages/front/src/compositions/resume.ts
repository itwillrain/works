import { useAsync, useContext, ref } from '@nuxtjs/composition-api'
import { FixMeAny } from '@works/core'

/**
 * Resume
 * @param {string} path
 * @returns
 *
 */
export const useResume = (path: string): any => {
  const { $content } = useContext()
  const resume = ref<FixMeAny>()
  useAsync(async () => (resume.value = await $content(path).fetch()))
  return { resume }
}
