import { Timestamp } from '../types/common-property';
import { format as $format } from 'date-fns'

/**
 * 日付をフォーマット
 * @param {firebase.firestore.Timestamp} timestamp
 * @param {string} format
 * @return {string}
 */
export const formatDate = (ts: Timestamp, format="yyyy年MM月dd日") => {
  if(!ts) return ts;
  return $format(ts.toDate(), format)
}
/**
 * 文字列の頭文字だけを大文字にして返す
 * @param {string} value
 * @return {string}
 */
 export const initialUpperCase = (value: string): string => {
  if (!value) return ''
  if (typeof value !== 'string') return ''
  return value.charAt(0).toUpperCase()
}