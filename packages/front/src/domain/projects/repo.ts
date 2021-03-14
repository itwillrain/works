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

  /**
   * Project 一覧取得
   * @returns { Promise<Project[]>}
   */
  public async getProjectsWithHasMore(
    lastVisible: Project | undefined = undefined,
    step = 1
  ): Promise<{
    projects: Project[]
    hasMore: boolean
    last: Project | undefined
  }> {
    const limit = step + 1
    const baseQuery = this.ref.orderBy('createdAt', 'desc').limit(limit)
    const query = lastVisible
      ? baseQuery.startAfter(lastVisible.createdAt)
      : baseQuery
    const projects = await this.findByQuery<Project>(query, Project.converter)
    console.log(projects)
    const hasMore = projects.length === limit
    let last
    if (hasMore) {
      projects.pop()
      last = projects.slice(-1)[0]
    }

    return { projects, hasMore, last }
  }

  /**
   * Project 一覧取得
   * @returns { Promise<Project[]>}
   */
  public getPickupProjects(limit = 5): Promise<Project[]> {
    const query = this.ref
      .orderBy('createdAt', 'desc')
      .where('isPickup', '==', true)
      .limit(limit)
    return this.findByQuery(query, Project.converter)
  }
}
