import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import SellForm from '@/models/SellForm'
import ShippingForm from '@/models/ShippingForm'

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
    // Test database connection
    await connectDB()
    healthCheck.database.connected = true
    healthCheck.database.error = null

    // Test model access
    try {
      const sellFormCount = await SellForm.countDocuments()
      healthCheck.models.SellForm = true
    } catch (error: any) {
      healthCheck.models.SellForm = false
      console.error('SellForm model error:', error.message)
    }

    try {
      const shippingFormCount = await ShippingForm.countDocuments()
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

