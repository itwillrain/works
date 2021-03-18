import {CommonProperties} from '../../types'

export interface ICase extends CommonProperties {
  email: string
  content: string
  phoneNumber: string
  PIC: string
  company: {
    name: string
  }
}
