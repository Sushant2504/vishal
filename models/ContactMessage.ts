import { FieldValue, Timestamp, getDb } from '@/lib/firebase'

export type ContactMessageInput = {
  name: string
  email: string
  subject?: string
  message: string
}

export type ContactMessageRecord = ContactMessageInput & {
  createdAt?: Timestamp | null
  updatedAt?: Timestamp | null
}

const COLLECTION = 'contactMessages'

export async function saveContactMessage(data: ContactMessageInput) {
  const db = getDb()
  const now = FieldValue.serverTimestamp()

  const docRef = await db.collection(COLLECTION).add({
    ...data,
    subject: data.subject || '',
    createdAt: now,
    updatedAt: now,
  })

  return docRef.id
}

export async function fetchContactMessages(limit = 100) {
  const db = getDb()
  const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').limit(limit).get()

  return snapshot.docs.map((doc) => {
    const data = doc.data() as ContactMessageRecord
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : null,
      updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : null,
    }
  })
}

