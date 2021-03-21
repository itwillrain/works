import {CommonProperties} from '../../types'
import {Timestamp} from '../../types/common-property'

export interface IProject extends CommonProperties {
  name: string
  url: string
  isPickup: boolean
  isPublished: boolean
  skills: string[]
  desc: string
  orderIndex: number
  displayImage: string
  startAt: Timestamp | null
  endAt: Timestamp | null
  id?: string
}
