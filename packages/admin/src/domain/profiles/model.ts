import { IProfile, Timestamp } from '@works/core'
import firestore from '@firebase/firestore-types'

/**
 * Profile Class
 *
 * @export
 * @class Profile
 * @implements {IProfile}
 */
export class Profile implements IProfile {
  readonly displayName!: string
  readonly slug!: string
  readonly photoURL!: string
  readonly createdAt!: Timestamp
  readonly updatedAt!: Timestamp

  /**
   * 初期化
   * @param {Partial<IProfile>} init
   * @param {string} id
   */
  constructor(init: Partial<IProfile>, id: string) {
    Object.assign(this, { ...this.map(init), id })
  }

  /**
   * Map
   * @param {Partial<IProfile>} data
   * @return {IProfile}
   */
  private map(data: Partial<IProfile>): IProfile {
    return {
      displayName: data.displayName ?? '',
      slug: data.slug ?? '',
      photoURL: data.photoURL ?? '',
      updatedAt: data.updatedAt ?? null,
      createdAt: data.createdAt ?? null,
    }
  }

  /**
   * Converter
   */
  static readonly converter: firestore.FirestoreDataConverter<Profile> = {
    toFirestore(data: Profile): IProfile {
      return {
        displayName: data.displayName,
        slug: data.slug,
        photoURL: data.photoURL,
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
      }
    },
    fromFirestore(snap: firestore.QueryDocumentSnapshot<Profile>): Profile {
      const data = snap.data()
      return new Profile(data, snap.id)
    },
  }
}
