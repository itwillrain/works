import {CommonProperties} from '../../types/common-property'
// 公開情報
export interface IProfile extends CommonProperties {
  readonly displayName: string
  readonly photoURL: string
  readonly slug: string
}