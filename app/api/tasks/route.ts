import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Task from '@/lib/models/Task'

// GET - Listar todas as tarefas
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const completed = searchParams.get('completed')
    
    // Filtros
    let filter: any = {}
    if (userId) filter.userId = userId
    if (completed !== null) filter.completed = completed === 'true'
    
    const tasks = await Task.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      data: tasks
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar tarefas' },
      { status: 500 }
    )
  }
}

// POST - Criar nova tarefa
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { title, description, priority, dueDate, userId } = await request.json()
    
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      userId
    })
    
    // Populate para retornar dados completos
    await task.populate('userId', 'name email')
    
    return NextResponse.json({
      success: true,
      data: task,
      message: 'Tarefa criada com sucesso'
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