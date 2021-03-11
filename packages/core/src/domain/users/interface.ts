import { CommonProperties, DocumentReference } from '../../types/common-property';

export type Role = 'owner' | 'systemAdmin' | 'user'
export interface BuildingRef {
  ref: DocumentReference| null 
}

export interface Room {
  name: string
}

export interface IUser extends CommonProperties {
  readonly room: Room
  building: BuildingRef 
  readonly manageBuildings: DocumentReference[]
  readonly role: Role
  readonly email: string
  readonly id?: string
}

export interface IUserWIthBuilding extends Omit<IUser, 'building'> {
  readonly building: {
    name: string
  }
}