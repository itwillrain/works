import { IUser, Role, Room } from '@works/core'
import firestore from '@firebase/firestore-types'

/**
 * User Class
 *
 * @export
 * @class User
 * @implements {IUser}
 */
export class User implements IUser {
  readonly room!: Room
  building!: {
    ref: firestore.DocumentReference | null
  }

  readonly role!: Role
  readonly email!: string
  readonly manageBuildings!: firestore.DocumentReference[]
  readonly createdAt!: firestore.Timestamp
  readonly updatedAt!: firestore.Timestamp
  readonly id!: string

  /**
   * 初期化
   * @param {Partial<IUser>} init
   * @param {string} id
   */
  constructor(init: Partial<IUser>, id: string) {
    Object.assign(this, { ...this.map(init), id })
  }

  /**
   * Map
   * @param {Partial<IUser>} data
   * @return {IUser}
   */
  map(data: Partial<IUser>): IUser {
    return {
      room: data.room ?? { name: '' },
      building: data.building ?? { ref: null },
      role: data.role ?? 'user',
      email: data.email ?? '',
      manageBuildings: data.manageBuildings ?? [],
      updatedAt: data.updatedAt ?? null,
      createdAt: data.createdAt ?? null,
    }
  }

  /**
   * Converter
   *
   * @static
   * @type {firestore.FirestoreDataConverter<User>}
   * @memberof User
   */
  static readonly converter: firestore.FirestoreDataConverter<User> = {
    toFirestore(data: User): IUser {
      return {
        room: data.room,
        building: data.building,
        role: data.role,
        email: data.email,
        manageBuildings: data.manageBuildings,
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
      }
    },
    fromFirestore(snap: firestore.QueryDocumentSnapshot<User>): User {
      const data = snap.data()
      return new User(data, snap.id)
    },
  }
}
