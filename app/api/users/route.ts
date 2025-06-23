import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/lib/models/User'
import bcrypt from 'bcryptjs'

// GET - Listar usuários (para admin)
export async function GET() {
  try {
    await dbConnect()
    
    const users = await User.find({}).select('-password')
    
    return NextResponse.json({
      success: true,
      data: users
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar usuários' },
      { status: 500 }
    )
  }
}

// POST - Criar novo usuário
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { name, email, password } = await request.json()
    
    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Usuário já existe com este email' },
        { status: 400 }
      )
    }
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Criar usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })
    
    // Retornar usuário sem senha
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
    
    return NextResponse.json({
      success: true,
      data: userResponse,
      message: 'Usuário criado com sucesso'
    }, { status: 201 })
    
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}