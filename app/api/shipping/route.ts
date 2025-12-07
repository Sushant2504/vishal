import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ShippingForm from '@/models/ShippingForm'

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
    const {
      name,
      address,
      contactNumber,
      emailAddress,
      preferredPaymentMethod,
      paymentDetails,
      expectedShippingDay,
      boxesMintCondition,
      damageNotes,
    } = body

    // Validate required fields
    if (
      !name ||
      !address ||
      !contactNumber ||
      !emailAddress ||
      !preferredPaymentMethod ||
      !paymentDetails ||
      !expectedShippingDay ||
      !boxesMintCondition
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate payment method
    const validPaymentMethods = ['Venmo', 'Check', 'Zelle', 'CashApp', 'PayPal']
    if (!validPaymentMethods.includes(preferredPaymentMethod)) {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      )
    }

    // Validate mint condition
    if (!['Yes', 'No'].includes(boxesMintCondition)) {
      return NextResponse.json(
        { error: 'Invalid mint condition value' },
        { status: 400 }
      )
    }

    // Create new shipping form entry
    try {
      const shippingForm = new ShippingForm({
        name,
        address,
        contactNumber,
        emailAddress,
        preferredPaymentMethod,
        paymentDetails,
        expectedShippingDay,
        boxesMintCondition,
        damageNotes: damageNotes || '',
      })

      await shippingForm.save()
      console.log('✅ Shipping form saved successfully:', shippingForm._id)

      // Prepare email data for owner notification
      const emailBody = `
Thank you for accepting our offer! Here are the shipping details:

Name: ${name}
Address: ${address}
Contact Number: ${contactNumber}
Email Address: ${emailAddress}
Preferred Payment Method: ${preferredPaymentMethod}
Payment Details: ${paymentDetails}
Expected Shipping Day: ${expectedShippingDay}
Are all boxes in mint condition? ${boxesMintCondition}
${damageNotes ? `Damage Notes: ${damageNotes}` : ''}
      `.trim()

      return NextResponse.json(
        {
          message: 'Shipping form submitted successfully',
          id: shippingForm._id,
          emailData: {
            to: 'victoriousmedicalbuyback1@gmail.com',
            subject: `New Shipping Form Submission - ${name}`,
            body: emailBody,
          },
        },
        { status: 201 }
      )
    } catch (saveError: any) {
      console.error('Error saving shipping form:', saveError)
      return NextResponse.json(
        { 
          error: 'Failed to save form data', 
          details: saveError.message || 'An error occurred while saving your data'
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Unexpected error in shipping form submission:', error)
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
    const forms = await ShippingForm.find().sort({ createdAt: -1 }).limit(100)
    return NextResponse.json({ forms }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching shipping forms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch forms', details: error.message },
      { status: 500 }
    )
  }
}

