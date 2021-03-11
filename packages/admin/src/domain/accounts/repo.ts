import firebase from 'firebase/app'
import { COLLECTION_NAME } from '@works/core'
import { BaseRepo } from '../baseRepo'
import { Account } from './model'

/**
 * Account Repo
 *
 * @export
 * @class AccountRepo
 * @extends {BaseRepo}
 */
export class AccountRepo extends BaseRepo {
  private ref: firebase.firestore.CollectionReference
  /**
   * 初期化
   * @param {firebase.firestore.Firestore} firestore
   */
  constructor(private firestore: firebase.firestore.Firestore) {
    super()
    this.ref = this.firestore.collection(COLLECTION_NAME.accounts)
  }

  /**
   *  Account取得
   * @param {string} id
   */
  public getAccount(id: string): Promise<Account | undefined> {
    return this.get(this.ref, id, Account.converter)
  }
}
