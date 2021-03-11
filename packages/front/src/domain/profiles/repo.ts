import firebase from 'firebase/app'
import { COLLECTION_NAME } from '@works/core'
import { BaseRepo } from '../baseRepo'
import { profileConverter, Profile } from './model'

/**
 * Profiles Repo
 *
 * @export
 * @class Profile Class
 * @extends {BaseRepo}
 */
export class ProfileRepo extends BaseRepo {
  private ref: firebase.firestore.CollectionReference
  /**
   * 初期化
   * @param {firebase.firestore.Firestore} firestore
   */
  constructor(private firestore: firebase.firestore.Firestore) {
    super()
    this.ref = this.firestore.collection(COLLECTION_NAME.profiles)
  }

  /**
   *  Profile取得
   * @param {string} id
   */
  public getProfile(id: string): Promise<Profile | undefined> {
    return this.get(this.ref, id, profileConverter)
  }
}
