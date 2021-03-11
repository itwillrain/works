import {Timestamp, BuildingRef, IUser, Role, COLLECTION_NAME, Room} from "@works/core";
import * as admin from 'firebase-admin';
/**
 * User Class
 *
 * @export
 * @class User
 * @implements {IUser}
 */
export class User implements IUser {
  readonly room!: Room
  building!: BuildingRef
  manageBuildings!: FirebaseFirestore.DocumentReference[]
  readonly role!: Role
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
      room: data.room ??{name:''},
      building: data.building ?? {ref: null},
      manageBuildings: data.manageBuildings ?? [],
      role: data.role ?? 'user',
      email: data.email ?? '',
      updatedAt: data.updatedAt ?? null,
      createdAt: data.createdAt ?? null,
    };
  }

  /**
   * マンションを設定する
   * @param {string} buildingId 
   * @return {void}
   */
  public setBuilding(buildingId: string): void{
    if(!buildingId) return
    this.building = {
      ref: admin.firestore().doc(`${COLLECTION_NAME.buildings}/${buildingId}`)
    }
  }

  /**
   * 
   * @param {string[]} buildingIds 
   * @return {void}
   */
  public setManageBuildings(buildingIds: string[]): void{
    if(!buildingIds.length) return
    const refs = buildingIds.map(id=> admin.firestore().doc(`${COLLECTION_NAME.buildings}/${id}`)) 
    this.manageBuildings = refs
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
        room: data.room,
        building: data.building,
        manageBuildings: data.manageBuildings,
        role: data.role,
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
