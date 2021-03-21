import {IUser} from './interface'
import {assertIsDefined} from '../../utils/assert'

export class RegisterUserDto {
  readonly user!: IUser
  readonly buildingId!: string
  readonly manageBuildingIds!: string[]
  readonly password!: string

  constructor(data: any) {
    data.hasOwnProperty('user') ? (this.user = data.user) : assertIsDefined(data.user)
    data.hasOwnProperty('buildingId') ? (this.buildingId = data.buildingId) : assertIsDefined(data.buildingId)
    data.hasOwnProperty('password') ? (this.password = data.password) : assertIsDefined(data.password)
    data.hasOwnProperty('manageBuildingIds') ? (this.manageBuildingIds = data.manageBuildingIds) : assertIsDefined(data.manageBuildingIds)
  }
}

export class DeleteUserDto {
  readonly uid!: string

  constructor(data: any) {
    data.hasOwnProperty('uid') ? (this.uid = data.uid) : assertIsDefined(data.uid)
  }
}
