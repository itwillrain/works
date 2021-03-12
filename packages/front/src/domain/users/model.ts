import { IUser } from '@works/core'
import firestore from '@firebase/firestore-types'

/**
 * User Class
 *
 * @export
 * @class User
 * @implements {IUser}
 */
export class User implements IUser {
  readonly email!: string
  readonly createdAt!: firestore.Timestamp
  readonly updatedAt!: firestore.Timestamp

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
      email: data.email ?? '',
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
        email: data.email,
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
