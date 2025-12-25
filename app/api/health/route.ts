import { NextResponse } from 'next/server'
import { getDb } from '@/lib/firebase'

export async function GET() {
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: {
      connected: false,
      error: null as string | null,
    },
    models: {
      SellForm: false,
      ShippingForm: false,
    },
  }

  try {
    const db = getDb()
    // Test database connection by listing collections
    await db.listCollections()
    healthCheck.database.connected = true
    healthCheck.database.error = null

    // Test model access
    try {
      const sellFormCount = await db.collection('sellForms').limit(1).get()
      healthCheck.models.SellForm = true
    } catch (error: any) {
      healthCheck.models.SellForm = false
      console.error('SellForm model error:', error.message)
    }

    try {
      const shippingFormCount = await db.collection('shippingForms').limit(1).get()
      healthCheck.models.ShippingForm = true
    } catch (error: any) {
      healthCheck.models.ShippingForm = false
      console.error('ShippingForm model error:', error.message)
    }

    return NextResponse.json(healthCheck, { status: 200 })
  } catch (error: any) {
    healthCheck.status = 'error'
    healthCheck.database.error = error.message
    console.error('Health check failed:', error)
    return NextResponse.json(healthCheck, { status: 503 })
  }
}

