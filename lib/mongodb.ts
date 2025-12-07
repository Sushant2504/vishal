import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sushantnadavade006_db_user:0SA8OkkY4aoX6w7B@v-1.i2ci0i7.mongodb.net/victorious-medical?retryWrites=true&w=majority'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout (reduced for faster failure)
      socketTimeoutMS: 30000, // 30 seconds socket timeout
      maxPoolSize: 10,
      retryWrites: true,
      connectTimeoutMS: 10000, // 10 seconds connection timeout
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully')
      return mongoose
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error.message)
      cached.promise = null
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e: any) {
    cached.promise = null
    console.error('❌ Failed to establish MongoDB connection:', e.message)
    
    // Provide more helpful error messages
    if (e.message?.includes('IP') || e.message?.includes('whitelist') || e.name === 'MongooseServerSelectionError') {
      throw new Error('Database connection failed: Your IP address may not be whitelisted in MongoDB Atlas. Please contact the administrator or check your MongoDB Atlas network settings.')
    } else if (e.message?.includes('authentication') || e.message?.includes('auth')) {
      throw new Error('Database connection failed: Authentication error. Please check your database credentials.')
    } else if (e.message?.includes('timeout') || e.message?.includes('ETIMEDOUT')) {
      throw new Error('Database connection failed: Connection timeout. Please check your network connection.')
    } else if (e.message?.includes('ENOTFOUND') || e.message?.includes('DNS')) {
      throw new Error('Database connection failed: Unable to resolve database host. Please check your network connection.')
    }
    
    throw e
  }

  return cached.conn
}

export default connectDB

