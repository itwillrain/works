import {COLLECTION_NAME} from '@works/core'
import {BaseRepo} from '../baseRepo'
import {User} from './model'

/**
 * User Repo
 *
 * @export
 * @class UserRepo
 * @extends {BaseRepo}
 */
export class UserRepo extends BaseRepo {
  private ref: FirebaseFirestore.CollectionReference
  /**
   * 初期化
   * @param {FirebaseFirestore.Firestore} firestore
   */
  constructor(private firestore: FirebaseFirestore.Firestore) {
    super()
    this.ref = this.firestore.collection(COLLECTION_NAME.users)
  }

  /**
   *  User取得
   * @param {string} id
   * @return {Promise<User | undefined>}
   */
  public getUser(id: string): Promise<User | undefined> {
    return this.get(this.ref, id, User.converter)
  }

  /**
   * User作成
   * @param {User} user
   * @return  {Promise<FirebaseFirestore.DocumentReference | FirebaseFirestore.WriteResult>}
   */
  public createUser(user: User): Promise<FirebaseFirestore.DocumentReference | FirebaseFirestore.WriteResult> {
    return this.create(this.ref, user, User.converter)
  }

  /**
   *  User 削除
   * @param uid
   * @return {Promise<FirebaseFirestore.WriteResult>}
   */
  public deleteUser(uid: string): Promise<FirebaseFirestore.WriteResult> {
    return this.delete(this.ref.doc(uid))
  }
}
