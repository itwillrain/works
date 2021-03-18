export const AUTH_ERRORS = {
  'auth/email-already-in-use': 'ご利用のメールアドレスは既に登録されています。',
  'auth/invalid-email': 'メールアドレスが不正な形式です。',
  'auth/user-disabled': 'ユーザーが無効化されています。',
  'auth/user-not-found': '指定されたメールアドレスに対応するユーザが存在しません。',
  'auth/wrong-password': '指定されたメールアドレスとパスワードが一致しません。',
  'auth/too-many-requests': 'しばらく経ってから再度お試しください。',
  'auth/account-exists-with-different-credential': 'すでに同一のメールアドレスで別のベンダーにより登録されています。',
  'auth/invalid-action-code': 'メールアドレスの確認のリクエストの期限が切れたか、リンクがすでに使用されています。',
  'auth/requires-recent-login': '再ログインしてください。',
  'auth/user-token-expired': '再ログインしてください。',
  'auth/invalid-user-token': '再ログインしてください。',
}

export const STORAGE_ERRORS = {
  'storage/unknown': '不明なエラーが発生しました。',
}

export const SECURITY_RULE_ERROR = {
  'permission-denied': '入力値に不備または、アクセス権限がございません。',
}

export const DEFAULT_ERROR_MESSAGE = 'エラーが発生しました。しばらくたってから再度お試しください。'
