import { NextResponse } from 'next/server'
import { getDb } from '@/lib/firebase'

export async function GET() {
  try {
    await getDb().listCollections()
    return NextResponse.json({ 
      status: 'connected', 
      message: 'Firestore connection successful',
      timestamp: new Date().toISOString()
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: error.message || 'Database connection failed',
      timestamp: new Date().toISOString()
    }, { status: 503 })
  }
}

