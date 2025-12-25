import { App, cert, getApps, initializeApp } from 'firebase-admin/app'
import { FieldValue, Firestore, Timestamp, getFirestore } from 'firebase-admin/firestore'

/**
 * Lazily initialize the Firebase Admin SDK and return a Firestore instance.
 * Env vars:
 * - FIREBASE_PROJECT_ID
 * - FIREBASE_CLIENT_EMAIL
 * - FIREBASE_PRIVATE_KEY (use `\n` escaped newlines)
 */
let firebaseApp: App | null = null
let firestoreDb: Firestore | null = null

function getFirebaseConfig() {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase credentials. Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.')
  }

  return { projectId, clientEmail, privateKey }
}

function getFirebaseApp(): App {
  if (firebaseApp) return firebaseApp

  const { projectId, clientEmail, privateKey } = getFirebaseConfig()

  firebaseApp = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      })

  return firebaseApp
}

export function getDb(): Firestore {
  if (firestoreDb) return firestoreDb
  const app = getFirebaseApp()
  firestoreDb = getFirestore(app)
  return firestoreDb
}

export { FieldValue, Timestamp }

