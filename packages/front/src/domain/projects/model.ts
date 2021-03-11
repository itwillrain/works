import { IProject } from '@works/core'
import firestore from '@firebase/firestore-types'

/**
 * Project Class
 *
 * @export
 * @classProject
 * @implements {IProject}
 */
export class Project implements IProject {
  readonly id!: string
  readonly name!: string
  readonly url!: string
  readonly createdAt!: firestore.Timestamp
  readonly updatedAt!: firestore.Timestamp

  /**
   * 初期化
   * @param {Partial<IProject>} init
   * @param {string} id
   */
  constructor(init: Partial<IProject>, id: string) {
    Object.assign(this, { ...this.map(init), id })
  }

  /**
   * Map
   * @param {Partial<IProject>} data
   * @return {IProject}
   */
  map(data: Partial<IProject>): IProject {
    return {
      id: data.id,
      name: data.name ?? '',
      url: data.url ?? '',
      updatedAt: data.updatedAt ?? null,
      createdAt: data.createdAt ?? null,
    }
  }

  /**
   * Converter
   *
   * @static
   * @type {firestore.FirestoreDataConverter<Project>}
   * @memberofProject
   */
  static readonly converter: firestore.FirestoreDataConverter<Project> = {
    toFirestore(data: Project): IProject {
      return {
        name: data.name,
        url: data.url,
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
      }
    },
    fromFirestore(snap: firestore.QueryDocumentSnapshot<Project>): Project {
      const data = snap.data()
      return new Project(data, snap.id)
    },
  }
}
