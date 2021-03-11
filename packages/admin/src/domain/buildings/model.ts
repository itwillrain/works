import { IBuilding } from '@works/core'
import firestore from '@firebase/firestore-types'

/**
 * Building Class
 *
 * @export
 * @class Building
 * @implements {IBuilding}
 */
export class Building implements IBuilding {
  readonly id!: string
  readonly name!: string
  readonly createdAt!: firestore.Timestamp
  readonly updatedAt!: firestore.Timestamp

  /**
   * 初期化
   * @param {Partial<IBuilding>} init
   * @param {string} id
   */
  constructor(init: Partial<IBuilding>, id: string) {
    Object.assign(this, { ...this.map(init), id })
  }

  /**
   * Map
   * @param {Partial<IBuilding>} data
   * @return {IBuilding}
   */
  private map(data: Partial<IBuilding>): IBuilding {
    return {
      name: data.name ?? '',
      updatedAt: data.updatedAt ?? null,
      createdAt: data.createdAt ?? null,
    }
  }

  /**
   * Converter
   */
  static readonly converter: firestore.FirestoreDataConverter<Building> = {
    toFirestore(data: Building): IBuilding {
      return {
        name: data.name,
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
      }
    },
    fromFirestore(snap: firestore.QueryDocumentSnapshot<Building>): Building {
      const data = snap.data()
      return new Building(data, snap.id)
    },
  }
}
