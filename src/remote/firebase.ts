import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const {
  NEXT_PUBLIC_API_KEY,
  NEXT_PUBLIC_AUTH_DOMAIN,
  NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_STORAGE_BUCKET,
  NEXT_PUBLIC_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_APP_ID,
  NEXT_PUBLIC_MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
  apiKey: NEXT_PUBLIC_API_KEY,
  authDomain: NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_APP_ID,
  measurementId: NEXT_PUBLIC_MEASUREMENT_ID,
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const store = getFirestore(app)
