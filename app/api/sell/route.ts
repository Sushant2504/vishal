import { NextRequest, NextResponse } from 'next/server'
import { fetchSellForms, saveSellForm } from '@/models/SellForm'

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

    // Create new sell form entry
    try {
      const id = await saveSellForm({
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

      console.log('✅ Sell form saved successfully:', id)

      return NextResponse.json(
        { 
          message: 'Sell form submitted successfully',
          id 
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
    const forms = await fetchSellForms()
    return NextResponse.json({ forms }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching sell forms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch forms', details: error.message },
      { status: 500 }
    )
  }
}

