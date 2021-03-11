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
    Object.assign(this, { ...this.mapToUser(init), id })
  }

  /**
   * Map
   * @param {Partial<IProfile>} data
   * @return {IProfile}
   */
  private mapToUser(data: Partial<IProfile>): IProfile {
    return {
      displayName: data.displayName ?? '',
      slug: data.slug ?? '',
      photoURL: data.photoURL ?? '',
      updatedAt: data.updatedAt ?? null,
      createdAt: data.createdAt ?? null,
    }
  }
}

/**
 * Converter
 */
export const profileConverter: firestore.FirestoreDataConverter<Profile> = {
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
