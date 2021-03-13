import {Timestamp,  ICase} from "@works/core";
/**
 * Case Class
 *
 * @export
 * @classCase 
 * @implements {ICase}
 */
export class Case implements ICase {
  readonly email!: string
  readonly content!: string
  readonly company!: { name:string}
  readonly phoneNumber!: string 
  readonly createdAt!: Timestamp
  readonly updatedAt!: Timestamp
  readonly id!: string

  /**
   * 初期化
   * @param {Partial<ICase>} init
   * @param {string} id
   */
  constructor(init: Partial<ICase>, id: string) {
    Object.assign(this, {...this.map(init), id});
  }

  /**
   * Map
   * @param {Partial<ICase>} data
   * @return {ICase}
   */
  private map(data: Partial<ICase>): ICase {
    return {
      email: data.email ?? '',
      content: data.content ?? '',
      company: data.company ?? {name: ''},
      phoneNumber: data.phoneNumber ?? '',
      updatedAt: data.updatedAt ?? null,
      createdAt: data.createdAt ?? null,
    };
  }

  /**
   * Converter
   *
   * @static
   * @type {FirebaseFirestore.FirestoreDataConverter<Case>}
   * @memberofCase 
   */
  static readonly converter: FirebaseFirestore.FirestoreDataConverter<Case> = {
    toFirestore(data: Case): ICase {
      return {
        email: data.email,
        content: data.content,
        company: data.company,
        phoneNumber: data.phoneNumber,
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
      };
    },
    fromFirestore(snap: FirebaseFirestore.QueryDocumentSnapshot<Case>): Case {
      const data = snap.data();
      return new Case(data, snap.id);
    },
  }
}
