import firebase from 'firebase/app'
import { COLLECTION_NAME } from '@works/core'
import { BaseRepo } from '../baseRepo'
import { Building } from './model'

/**
 * Buildings Repo
 *
 * @export
 * @class Building Class
 * @extends {BaseRepo}
 */
export class BuildingRepo extends BaseRepo {
  private ref: firebase.firestore.CollectionReference
  /**
   * 初期化
   * @param {firebase.firestore.Firestore} firestore
   */
  constructor(private firestore: firebase.firestore.Firestore) {
    super()
    this.ref = this.firestore.collection(COLLECTION_NAME.buildings)
  }

  /**
   * 全て取得
   */
  public getAll(): Promise<Building[]> {
    const query = this.ref.orderBy('createdAt', 'asc')
    return this.findByQuery(query, Building.converter)
  }

  /**
   *  ユニークキーによる単一取得
   * @param {string} id
   */
  public getById(id: string): Promise<Building | undefined> {
    return this.get(this.ref, id, Building.converter)
  }

  /**
   * モデルを元に作成
   * @param {Building} item
   */
  public createItem(item: Building) {
    return this.create(this.ref, item, Building.converter)
  }

  /**
   * モデルを元に更新
   * @param {string} id
   * @param {Partial<Building>} item
   */
  public updateItem(id: string, item: Partial<Building>) {
    return this.update(this.ref, id, item)
  }

  /**
   * IDを元に削除
   * @param {string} id
   */
  public deleteItem(id: string) {
    return this.delete(this.ref, id)
  }
}
