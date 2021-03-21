import {COLLECTION_NAME} from '@works/core'
import {BaseRepo} from '../baseRepo'
import {Case} from './model'

/**
 * Case Repo
 *
 * @export
 * @class CaseRepo
 * @extends {BaseRepo}
 */
export class CaseRepo extends BaseRepo {
  private ref: FirebaseFirestore.CollectionReference
  /**
   * 初期化
   * @param {FirebaseFirestore.Firestore} firestore
   */
  constructor(private firestore: FirebaseFirestore.Firestore) {
    super()
    this.ref = this.firestore.collection(COLLECTION_NAME.cases)
  }

  /**
   *  Case取得
   * @param {string} id
   * @return {Promise<Case | undefined>}
   */
  public getCase(id: string): Promise<Case | undefined> {
    return this.get(this.ref, id, Case.converter)
  }

  /**
   * Case作成
   * @param {Case} case
   * @return  {Promise<FirebaseFirestore.DocumentReference | FirebaseFirestore.WriteResult>}
   */
  public createCase(_case: Case): Promise<FirebaseFirestore.DocumentReference<Case>> {
    return this.create(this.ref, _case, Case.converter)
  }
}
