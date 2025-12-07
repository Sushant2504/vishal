import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import SellForm from '@/models/SellForm'

export async function POST(request: NextRequest) {
  try {
    // Parse request body first
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    const { name, email, phone, productType, brand, quantity, expirationDate, condition, message } = body

    // Validate required fields
    if (!name || !email || !phone || !productType || !quantity || !condition) {
      return NextResponse.json(
        { error: 'Missing required fields', details: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Connect to database
    try {
      await connectDB()
    } catch (dbError: any) {
      console.error('Database connection error:', dbError)
      
      // Provide more specific error messages
      let errorDetails = dbError.message || 'Unable to connect to database. Please try again later.'
      
      // Check for specific MongoDB errors
      if (dbError.name === 'MongooseServerSelectionError' || dbError.message?.includes('IP') || dbError.message?.includes('whitelist')) {
        errorDetails = 'Database connection failed: IP address may not be whitelisted. Please contact the administrator.'
      } else if (dbError.message?.includes('timeout')) {
        errorDetails = 'Database connection timeout. Please try again in a moment.'
      } else if (dbError.message?.includes('authentication')) {
        errorDetails = 'Database authentication failed. Please contact support.'
      }
      
      return NextResponse.json(
        { 
          error: 'Database connection failed', 
          details: errorDetails,
          retry: true
        },
        { status: 503 } // Service Unavailable
      )
    }

    // Create new sell form entry
    try {
      const sellForm = new SellForm({
        name,
        email,
        phone,
        productType,
        brand: brand || '',
        quantity,
        expirationDate: expirationDate || '',
        condition,
        message: message || '',
      })

      await sellForm.save()

      console.log('✅ Sell form saved successfully:', sellForm._id)

      return NextResponse.json(
        { 
          message: 'Sell form submitted successfully',
          id: sellForm._id 
        },
        { status: 201 }
      )
    } catch (saveError: any) {
      console.error('Error saving form:', saveError)
      return NextResponse.json(
        { 
          error: 'Failed to save form data', 
          details: saveError.message || 'An error occurred while saving your data'
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Unexpected error in sell form submission:', error)
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred', 
        details: error.message || 'Please try again later'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    const forms = await SellForm.find().sort({ createdAt: -1 }).limit(100)
    return NextResponse.json({ forms }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching sell forms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch forms', details: error.message },
      { status: 500 }
    )
  }
}

