import { NextRequest, NextResponse } from 'next/server'
import { fetchContactMessages, saveContactMessage } from '@/models/ContactMessage'

export async function POST(request: NextRequest) {
  try {
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
    }

    const { name, email, subject, message } = body || {}

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    try {
      const id = await saveContactMessage({ name, email, subject: subject || '', message })
      return NextResponse.json({ message: 'Contact message submitted', id }, { status: 201 })
    } catch (e: any) {
      console.error('Error saving contact message:', e)
      return NextResponse.json(
        { error: 'Failed to save contact message', details: e.message || 'Unknown error' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Unexpected error in contact submission:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: error.message || 'Please try again later' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const messages = await fetchContactMessages()
    return NextResponse.json({ messages }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages', details: error.message },
      { status: 500 }
    )
  }
}

