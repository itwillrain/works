import { CommonProperties, DocumentReference } from '../../types/common-property';

export type Role = 'owner' | 'systemAdmin' | 'user'

export interface IUser extends CommonProperties {
  readonly email: string
  readonly id?: string
}

export interface IUserWIthBuilding extends Omit<IUser, 'building'> {
  readonly building: {
    name: string
  }
}