import firebase from 'firebase/app'
import { COLLECTION_NAME, IUserWIthBuilding } from '@works/core'
import { BaseRepo } from '../baseRepo'
import { User } from './model'

/**
 * User Repo
 *
 * @export
 * @class UserRepo
 * @extends {BaseRepo}
 */
export class UserRepo extends BaseRepo {
  private ref: firebase.firestore.CollectionReference
  /**
   * 初期化
   * @param {firebase.firestore.Firestore} firestore
   */
  constructor(private firestore: firebase.firestore.Firestore) {
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
   * User 一覧取得
   * @returns { Promise<User[]>}
   */
  public getList(): Promise<User[]> {
    const query = this.ref.orderBy('createdAt', 'desc')
    return this.findByQuery(query, User.converter)
  }

  /**
   * User 一覧取得
   * @returns { Promise<User[]>}
   */
  public async getUsersWithBuilding(): Promise<IUserWIthBuilding[]> {
    const query = this.ref.orderBy('createdAt', 'desc')
    const users = await this.findByQuery(query, User.converter)
    return await Promise.all(
      users.map((user) => user.toUserWIthBuilding(this.firestore))
    )
  }

  /**
   * User 一覧取得
   * @returns { Promise<User[]>}
   */
  public async findUserWithBuidingByEmail(
    email: string
  ): Promise<IUserWIthBuilding[]> {
    const query = this.ref
      .orderBy('createdAt', 'desc')
      .where('email', '==', email)
    const users = await this.findByQuery(query, User.converter)
  }
}
