import firebase from 'firebase/app'
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
  protected async get<Res>(
    ref: firebase.firestore.CollectionReference,
    id: string,
    converter: firebase.firestore.FirestoreDataConverter<Res>
  ): Promise<Res | undefined> {
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
  protected async findByQuery<Res>(
    query: firebase.firestore.Query,
    converter: firebase.firestore.FirestoreDataConverter<Res>
  ): Promise<Res[]> {
    const snap = await query.withConverter(converter).get()
    return snap.docs.map((doc) => doc.data())
  }

  /**
   *  Update API
   * @param {firestore.CollectionReference} ref
   * @param {string} id
   * @param {Partial<Res>} data
   */
  protected async update<Res>(
    ref: firebase.firestore.CollectionReference,
    id: string,
    item: Partial<Res>
  ): Promise<void> {
    const data = {
      ...item,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
    return await ref.doc(id).update(data)
  }

  /**
   *  Create API
   * @param {firestore.CollectionReference} ref
   * @param {Res} item
   * @param {firestore.FirestoreDataConverter<Res>} converter
   * @param {string} id
   */
  protected create<Res>(
    ref: firebase.firestore.CollectionReference,
    item: Res,
    converter: firebase.firestore.FirestoreDataConverter<Res>,
    id: string | undefined = undefined
  ): Promise<void | firebase.firestore.DocumentReference<Res>> {
    const data = {
      ...item,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
    return id
      ? ref.doc(id).withConverter(converter).set(data)
      : ref.withConverter(converter).add(data)
  }

  /**
   *  SubCollection
   * @param {firebase.firestore.CollectionReference} collectionRef
   * @param {string} id
   * @param {string} collectionPath
   */
  protected subCollection(
    collectionRef: firebase.firestore.CollectionReference,
    id: string,
    collectionPath: string
  ) {
    return collectionRef.doc(id).collection(collectionPath)
  }
}
