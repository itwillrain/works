import { inject, InjectionKey, Ref, computed } from '@nuxtjs/composition-api'
import { assertIsDefined } from '@works/core'

export type MessageLevel = 'success' | 'info' | 'error' | 'warning' | null

export interface SnackbarMessage {
  content: string
  level?: MessageLevel
  code?: number
}

export const SnackbarMessageKey: InjectionKey<Ref<SnackbarMessage>> = Symbol(
  'SnackbarMessage'
)

export const useSnackbarMessage = () => {
  const message = inject(SnackbarMessageKey)
  assertIsDefined(message)

  const setMessage = (_message: SnackbarMessage) => (message.value = _message)

  const hasMessage = computed({
    get: () => !!message.value.content,
    set: () => setMessage({ content: '' }),
  })

  return {
    message,
    hasMessage,
    setMessage,
  }
}
