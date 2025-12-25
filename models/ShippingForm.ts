import { FieldValue, Timestamp, getDb } from '@/lib/firebase'

export type ShippingFormInput = {
  name: string
  address: string
  contactNumber: string
  emailAddress: string
  preferredPaymentMethod: string
  paymentDetails: string
  expectedShippingDay: string
  boxesMintCondition: string
  damageNotes?: string
}

export type ShippingFormRecord = ShippingFormInput & {
  createdAt?: Timestamp | null
  updatedAt?: Timestamp | null
}

const COLLECTION = 'shippingForms'

export async function saveShippingForm(data: ShippingFormInput) {
  const db = getDb()
  const now = FieldValue.serverTimestamp()

  const docRef = await db.collection(COLLECTION).add({
    ...data,
    damageNotes: data.damageNotes || '',
    createdAt: now,
    updatedAt: now,
  })

  return docRef.id
}

export async function fetchShippingForms(limit = 100) {
  const db = getDb()
  const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').limit(limit).get()

  return snapshot.docs.map((doc) => {
    const data = doc.data() as ShippingFormRecord
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : null,
      updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : null,
    }
  })
}

