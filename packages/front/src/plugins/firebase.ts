import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(async ({ $config }, inject) => {
  if (firebase.apps.length !== 0) return

  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  })

  if ($config.ENVIRONMENT === 'local' && location.host === 'localhost:8018') {
    // local開発時のエミュレータ対応
    const localhost = await fetch('http://localhost:8080').catch(
      () => undefined
    )
    if (localhost && localhost.status === 200) {
      firebase.firestore().settings({
        host: 'localhost:8080',
        ssl: false,
      })
      firebase.app().functions('asia-northeast1').useEmulator('localhost', 5001)
      firebase.auth().useEmulator('http://localhost:9099/')
    }
  }

  inject('firebase', firebase)
})
