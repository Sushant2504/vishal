import { NextRequest, NextResponse } from 'next/server'
import { Twilio } from 'twilio'
import { getDb, Timestamp } from '@/lib/firebase'

type SellForm = {
  id: string
  name?: string
  email?: string
  phone?: string
  productType?: string
  brand?: string
  quantity?: string
  expirationDate?: string
  condition?: string
  message?: string
  createdAt: Date | null
}

type ContactMessage = {
  id: string
  name?: string
  email?: string
  subject?: string
  message?: string
  createdAt: Date | null
}

type ShippingForm = {
  id: string
  name?: string
  address?: string
  contactNumber?: string
  emailAddress?: string
  preferredPaymentMethod?: string
  paymentDetails?: string
  expectedShippingDay?: string
  boxesMintCondition?: string
  damageNotes?: string
  createdAt: Date | null
}

const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null

const mailCollection = process.env.MAIL_COLLECTION || 'mail'

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

function formatDate(date: Date | null) {
  return date ? date.toISOString() : 'N/A'
}

function summarizeList(list: string[], max = 3) {
  if (!list.length) return 'none'
  const head = list.slice(0, max)
  const more = list.length > max ? ` +${list.length - max} more` : ''
  return `${head.join(', ')}${more}`
}

function buildEmailBody(params: {
  sellForms: SellForm[]
  contactMessages: ContactMessage[]
  shippingForms: ShippingForm[]
  since: Date
  until: Date
}) {
  const { sellForms, contactMessages, shippingForms, since, until } = params
  const range = `${since.toISOString()} → ${until.toISOString()}`

  const sellList = sellForms
    .map(
      (s) =>
        `<li>${s.name ?? 'N/A'} | ${s.phone ?? 'N/A'} | ${s.productType ?? 'N/A'} | ${s.quantity ?? 'N/A'} | ${formatDate(s.createdAt)}</li>`
    )
    .join('')

  const contactList = contactMessages
    .map(
      (c) =>
        `<li>${c.name ?? 'N/A'} | ${c.email ?? 'N/A'} | ${c.subject ?? ''} | ${c.message ?? ''} | ${formatDate(c.createdAt)}</li>`
    )
    .join('')

  const shippingList = shippingForms
    .map(
      (s) =>
        `<li>${s.name ?? 'N/A'} | ${s.contactNumber ?? 'N/A'} | ${s.preferredPaymentMethod ?? 'N/A'} | ${s.expectedShippingDay ?? 'N/A'} | ${formatDate(s.createdAt)}</li>`
    )
    .join('')

  return `
    <h2>Daily Leads Report</h2>
    <p>Range: ${range}</p>
    <h3>Sell Forms (${sellForms.length})</h3>
    <ul>${sellList || '<li>No records</li>'}</ul>
    <h3>Contact Messages (${contactMessages.length})</h3>
    <ul>${contactList || '<li>No records</li>'}</ul>
    <h3>Shipping Forms (${shippingForms.length})</h3>
    <ul>${shippingList || '<li>No records</li>'}</ul>
  `
}

function buildSmsBody(params: {
  sellForms: SellForm[]
  contactMessages: ContactMessage[]
  shippingForms: ShippingForm[]
}) {
  const { sellForms, contactMessages, shippingForms } = params
  const sellNames = summarizeList(sellForms.map((s) => s.name || 'N/A'))
  const contactNames = summarizeList(contactMessages.map((c) => c.name || 'N/A'))
  const shipNames = summarizeList(shippingForms.map((s) => s.name || 'N/A'))

  return [
    'Daily Leads',
    `Sell: ${sellForms.length} (${sellNames})`,
    `Contact: ${contactMessages.length} (${contactNames})`,
    `Shipping: ${shippingForms.length} (${shipNames})`,
  ].join(' | ')
}

async function fetchSince<T extends { id: string; createdAt: Date | null }>(
  collection: string,
  since: Date
): Promise<T[]> {
  const db = getDb()
  const snapshot = await db
    .collection(collection)
    .where('createdAt', '>=', Timestamp.fromDate(since))
    .orderBy('createdAt', 'asc')
    .get()

  return snapshot.docs.map((doc) => {
    const data = doc.data() as any
    return {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt instanceof Timestamp ? data.createdAt.toDate() : null,
    }
  })
}

async function sendEmailReport(params: {
  html: string
  subject: string
  to: string[]
  from?: string
  errors: string[]
}) {
  const { html, subject, to, from, errors } = params

  // Firebase Trigger Email path: writes to Firestore "mail" collection
  if (to.length === 0) {
    errors.push('Email not sent: REPORT_EMAIL_TO missing')
    return false
  }
  try {
    const db = getDb()
    await db.collection(mailCollection).add({
      to,
      message: {
        subject,
        html,
      },
      ...(from ? { from } : {}),
    })
    return true
  } catch (err: any) {
    errors.push(`Email send failed (firebase mail): ${err?.message || 'unknown error'}`)
    return false
  }
}

export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return unauthorized()
  }

  const emailFrom = process.env.REPORT_EMAIL_FROM
  const emailTo = (process.env.REPORT_EMAIL_TO || '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
  const smsTo = process.env.REPORT_SMS_TO

  const missingSmsEnv = !twilioClient || !smsTo

  const now = new Date()
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000)

  const [sellForms, contactMessages, shippingForms] = await Promise.all([
    fetchSince<SellForm>('sellForms', since),
    fetchSince<ContactMessage>('contactMessages', since),
    fetchSince<ShippingForm>('shippingForms', since),
  ])

  let emailSent = false
  let smsSent = false
  const errors: string[] = []

  const html = buildEmailBody({ sellForms, contactMessages, shippingForms, since, until: now })
  const subject = `Daily Leads Report (${since.toISOString()} - ${now.toISOString()})`
  emailSent = await sendEmailReport({ html, subject, to: emailTo, from: emailFrom || undefined, errors })

  if (missingSmsEnv) {
    errors.push('SMS not sent: missing TWILIO_* / REPORT_SMS_TO')
  } else {
    try {
      const body = buildSmsBody({ sellForms, contactMessages, shippingForms })
      await twilioClient!.messages.create({
        from: process.env.TWILIO_FROM!,
        to: smsTo!,
        body,
      })
      smsSent = true
    } catch (err: any) {
      errors.push(`SMS send failed: ${err?.message || 'unknown error'}`)
    }
  }

  const status = errors.length ? 207 : 200

  return NextResponse.json(
    {
      success: errors.length === 0,
      emailSent,
      smsSent,
      counts: {
        sellForms: sellForms.length,
        contactMessages: contactMessages.length,
        shippingForms: shippingForms.length,
      },
      errors,
    },
    { status }
  )
}

