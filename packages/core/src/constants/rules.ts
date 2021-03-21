// Vuetify Rules
export const RULES = {
  required: (v: string | number) => !!v || v === 0 || '必須項目です。', // 0 許容
  kana: (v: string) => !v || /^[ア-ン゛゜ァ-ォャ-ョー「」、]+$/g.test(v) || 'カタカナを入力してください。',
  phone: (v: string) => !v || /^[+]?[(]?[0-9]{3,4}[)]?[-\s]?[0-9]{3,4}[-\s]?[0-9]{4,6}$/im.test(v) || '電話番号を入力ください',
  postalCode: (v: string) => !v || /^[0-9]{7}$/.test(v) || '郵便番号はハイフンなしで半角数字７桁で入力ください',
  url: (v: string) => !v || /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi.test(v) || 'URL形式で入力ください。',
  prefecture: (v: string) => (v || '').length <= 4 || ' 4文字以内で入力ください',
  password: (v: string) => (!!v && v.length >= 8) || '8文字以上の英数字で入力してください。',
  email: (v: string) => /.+@.+\..+/.test(v) || '正しいメールアドレスを入力してください。',
  halfWidthAlphanumericWithUnderscoreAndDot: (v: string) => /^[a-zA-Z0-9_.]*$/.test(v) || '半角英数・アンダーバー・ドットで入力してください。',
  halfWidthAlphanumericWithUnderscore: (v: string) => /^[a-zA-Z0-9_]*$/.test(v) || '半角英数・アンダーバーで入力してください。',
  halfWidthAlphanumericWithUnderscoreAndHyphen: (v: string) => /^[a-zA-Z0-9_-]*$/.test(v) || '半角英数・アンダーバー・ハイフンで入力してください。',
  halfWidthAlphanumeric: (v: string) => /^[a-zA-Z0-9]*$/.test(v) || '半角英数で入力してください。',
  positiveNum: (v: number) => v >= 0 || 'マイナスはご入力いただけません',
  max: (max: number, v: string) => {
    return (v || '').length <= max || `${max}文字以内で入力ください。`
  },
  min: (min: number, v: string) => {
    return (v || '').length >= min || `${min}文字以上で入力ください。`
  },
  size: (size: number, v: any[]) => {
    return (v || []).length >= size || `最低${size}は選択ください。`
  },
}
