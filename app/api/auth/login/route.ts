import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/lib/models/User'
import bcrypt from 'bcryptjs'

// POST - Login do usuário
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }
    
    // Buscar usuário pelo email
    const user = await User.findOne({ email })
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }
    
    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }
    
    // Retornar dados do usuário sem a senha
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
    
    return NextResponse.json({
      success: true,
      data: userResponse,
      message: 'Login realizado com sucesso'
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}