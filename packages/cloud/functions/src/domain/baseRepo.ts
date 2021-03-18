import * as admin from 'firebase-admin'
/**
 * BaseRepo
 *
 * @export
 * @abstract
 * @class BaseRepo
 */
export abstract class BaseRepo {
  /**
   * Get API
   * @param {firestore.CollectionReference} ref
   * @param {string} id
   * @param {firestore.FirestoreDataConverter<Res>} converter
   */
  protected async get<Res>(ref: FirebaseFirestore.CollectionReference, id: string, converter: FirebaseFirestore.FirestoreDataConverter<Res>): Promise<Res | undefined> {
    const doc = await ref.doc(id).withConverter(converter).get()
    if (doc.exists) {
      return doc.data()
    } else {
      return undefined
    }
  }

  /**
   * Find By Query
   * @param {firestore.Query} query
   * @param {firestore.FirestoreDataConverter<Res>} converter
   */
  protected async findByQuery<Res>(query: FirebaseFirestore.Query, converter: FirebaseFirestore.FirestoreDataConverter<Res>): Promise<Res[]> {
    const snap = await query.withConverter(converter).get()
    return snap.docs.map(doc => doc.data())
  }

  /**
   *  Update API
   * @param {firestore.CollectionReference} ref
   * @param {string} id
   * @param {Promise<FirebaseFirestore.WriteResult>} item
   */
  protected async update<Res>(ref: FirebaseFirestore.CollectionReference, id: string, item: Partial<Res>): Promise<FirebaseFirestore.WriteResult> {
    const data = {
      ...item,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }
    return await ref.doc(id).update(data)
  }

  /**
   *  Create API
   * @param {firestore.CollectionReference} ref
   * @param {Res} item
   * @param {firestore.FirestoreDataConverter<Res>} converter
   * @return {Promise<void | FirebaseFirestore.DocumentReference<Res>>}
   */
  protected create<Res>(ref: FirebaseFirestore.CollectionReference, item: Res, converter: FirebaseFirestore.FirestoreDataConverter<Res>): Promise<FirebaseFirestore.DocumentReference<Res>> {
    const data = {
      ...item,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }
    return ref.withConverter(converter).add(data)
  }

  /**
   * Delete
   * @param {FirebaseFirestore.DocumentReference} ref
   */
  protected delete(ref: FirebaseFirestore.DocumentReference) {
    return ref.delete()
  }

  /**
   *  SubCollection
   * @param {FirebaseFirestore.CollectionReference} collectionRef
   * @param {string} id
   * @param {string} collectionPath
   * @return {FirebaseFirestore.CollectionReference}
   */
  protected subCollection(collectionRef: FirebaseFirestore.CollectionReference, id: string, collectionPath: string): FirebaseFirestore.CollectionReference {
    return collectionRef.doc(id).collection(collectionPath)
  }
}
