import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Task from '@/lib/models/Task'
import mongoose from 'mongoose'

// GET - Buscar tarefa por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await dbConnect()
    
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: 'ID inválido' },
        { status: 400 }
      )
    }
    
    const task = await Task.findById(id).populate('userId', 'name email')
    
    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Tarefa não encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: task
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar tarefa' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar tarefa
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await dbConnect()
    
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: 'ID inválido' },
        { status: 400 }
      )
    }
    
    const { title, description, completed, priority, dueDate } = await request.json()
    
    const task = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        completed,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).populate('userId', 'name email')
    
    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Tarefa não encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: task,
      message: 'Tarefa atualizada com sucesso'
    })
    
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

// DELETE - Deletar tarefa
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await dbConnect()
    
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: 'ID inválido' },
        { status: 400 }
      )
    }
    
    const task = await Task.findByIdAndDelete(id)
    
    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Tarefa não encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Tarefa deletada com sucesso'
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}