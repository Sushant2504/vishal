import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'

export async function GET() {
  try {
    await connectDB()
    return NextResponse.json({ 
      status: 'connected', 
      message: 'Database connection successful',
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

