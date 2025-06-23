import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import mongoose from 'mongoose'

// GET - Testar conexão com banco de dados
export async function GET() {
  try {
    await dbConnect()
    
    // Verificar status da conexão
    const connectionState = mongoose.connection.readyState
    const states = {
      0: 'desconectado',
      1: 'conectado',
      2: 'conectando',
      3: 'desconectando'
    }
    
    return NextResponse.json({
      success: true,
      message: 'Conexão com banco de dados testada com sucesso',
      data: {
        status: states[connectionState as keyof typeof states] || 'desconhecido',
        database: mongoose.connection.db?.databaseName || 'N/A',
        host: mongoose.connection.host || 'N/A',
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao conectar com banco de dados',
        details: error.message
      },
      { status: 500 }
    )
  }
}