import { IAccount, BuildingRef, Timestamp } from '@works/core'
import firestore from '@firebase/firestore-types'

/**
 * Account Class
 *
 * @export
 * @class Account
 * @implements {IAccount}
 */
export class Account implements IAccount {
  readonly roomNo!: string
  readonly building!: BuildingRef
  readonly createdAt!: Timestamp
  readonly updatedAt!: Timestamp

  /**
   * 初期化
   * @param {Partial<IAccount>} init
   * @param {string} id
   */
  constructor(init: Partial<IAccount>, id: string) {
    Object.assign(this, { ...this.mapToAccount(init), id })
  }

  /**
   * Map
   * @param {Partial<IAccount>} data
   * @return {IAccount}
   */
  private mapToAccount(data: Partial<IAccount>): IAccount {
    return {
      roomNo: data.roomNo ?? '',
      building: data.building ?? { ref: null },
      updatedAt: data.updatedAt ?? null,
      createdAt: data.createdAt ?? null,
    }
  }
}

/**
 * Converter
 */
export const accountConverter: firestore.FirestoreDataConverter<Account> = {
  toFirestore(data: Account): IAccount {
    return {
      roomNo: data.roomNo,
      building: data.building,
      updatedAt: data.updatedAt,
      createdAt: data.createdAt,
    }
  },
  fromFirestore(snap: firestore.QueryDocumentSnapshot<Account>): Account {
    const data = snap.data()
    return new Account(data, snap.id)
  },
}
