import {Timestamp,  IUser} from "@works/core";
/**
 * User Class
 *
 * @export
 * @class User
 * @implements {IUser}
 */
export class User implements IUser {
  readonly email!: string
  readonly createdAt!: Timestamp
  readonly updatedAt!: Timestamp
  readonly id!: string

  /**
   * 初期化
   * @param {Partial<IUser>} init
   * @param {string} id
   */
  constructor(init: Partial<IUser>, id: string) {
    Object.assign(this, {...this.map(init), id});
  }

  /**
   * Map
   * @param {Partial<IUser>} data
   * @return {IUser}
   */
  private map(data: Partial<IUser>): IUser {
    return {
      email: data.email ?? '',
      updatedAt: data.updatedAt ?? null,
      createdAt: data.createdAt ?? null,
    };
  }

  /**
   * Converter
   *
   * @static
   * @type {FirebaseFirestore.FirestoreDataConverter<User>}
   * @memberof User
   */
  static readonly converter: FirebaseFirestore.FirestoreDataConverter<User> = {
    toFirestore(data: User): IUser {
      return {
        email: data.email,
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
      };
    },
    fromFirestore(snap: FirebaseFirestore.QueryDocumentSnapshot<User>): User {
      const data = snap.data();
      return new User(data, snap.id);
    },
  }
}
