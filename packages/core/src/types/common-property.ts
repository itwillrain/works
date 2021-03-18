import firebase from 'firebase'
import admin from 'firebase-admin'

export type DocumentReference = admin.firestore.DocumentReference | firebase.firestore.DocumentReference
export type Timestamp = admin.firestore.Timestamp | firebase.firestore.Timestamp
export interface CommonProperties {
  readonly createdAt: Timestamp | null
  readonly updatedAt: Timestamp | null
}
