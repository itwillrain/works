import { IUser, Role, Room, IUserWIthBuilding } from '@works/core'
import firestore from '@firebase/firestore-types'
import { BuildingRepo } from '../buildings/repo'

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
   * merge Building
   * @param {firestore.FirebaseFirestore} db
   * @returns {Promise<IUserWIthBuilding>}
   */
  async toUserWIthBuilding(
    db: firestore.FirebaseFirestore
  ): Promise<IUserWIthBuilding> {
    const buildingRepo = new BuildingRepo(db)
    const building = this.building.ref
      ? await buildingRepo.getById(this.building.ref.id)
      : undefined
    return {
      id: this.id,
      room: this.room,
      building: { name: building?.name ?? '' },
      role: this.role,
      email: this.email,
      manageBuildings: this.manageBuildings,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
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
