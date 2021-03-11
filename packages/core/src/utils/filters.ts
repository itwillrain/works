import { Timestamp } from '../types/common-property';
import { format as $format } from 'date-fns'
export const formatDate = (ts: Timestamp, format="yyyy年MM月dd日") => {
  return $format(ts.toDate(), format)
}