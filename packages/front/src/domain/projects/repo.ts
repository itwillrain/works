import firebase from 'firebase/app'
import { COLLECTION_NAME } from '@works/core'
import { BaseRepo } from '../baseRepo'
import { Project } from './model'

/**
 * Project Repo
 *
 * @export
 * @class ProjectRepo
 * @extends {BaseRepo}
 */
export class ProjectRepo extends BaseRepo {
  private ref: firebase.firestore.CollectionReference
  /**
   * 初期化
   * @param {firebase.firestore.Firestore} firestore
   */
  constructor(private firestore: firebase.firestore.Firestore) {
    super()
    this.ref = this.firestore.collection(COLLECTION_NAME.projects)
  }

  /**
   *  Project取得
   * @param {string} id
   * @return {Promise<Project | undefined>}
   */
  public getProject(id: string): Promise<Project | undefined> {
    return this.get(this.ref, id, Project.converter)
  }

  /**
   * Project 一覧取得
   * @returns { Promise<Project[]>}
   */
  public getProjects(): Promise<Project[]> {
    const query = this.ref.orderBy('createdAt', 'desc')
    return this.findByQuery(query, Project.converter)
  }
}
