import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lista-tarefa'

if (!process.env.MONGODB_URI) {
     console.warn('MONGODB_URI não definida - usando valor padrão para build')
}

// Declaração de tipo para global
declare global {
     var mongoose: {
          conn: any
          promise: Promise<any> | null
     }
}

let cached = global.mongoose

if (!cached) {
     cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
     if (cached.conn) {
          return cached.conn
     }

     if (!cached.promise) {
          const opts = {
               bufferCommands: false,
          }
          cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
               return mongoose
          })
     }

     try {
          cached.conn = await cached.promise
     } catch (e) {
          cached.promise = null
          throw e
     }

     return cached.conn
}

export default dbConnect
