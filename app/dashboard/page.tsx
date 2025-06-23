'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, Plus, CheckCircle, Clock, Edit, Trash2, LogOut } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  _id: string
  name: string
  email: string
}

interface Task {
  _id: string
  title: string
  description: string
  completed: boolean
  priority: 'baixa' | 'média' | 'alta'
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'média' as 'baixa' | 'média' | 'alta',
    dueDate: ''
  })
  const router = useRouter()

  useEffect(() => {
    // Verificar se usuário está logado
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    loadTasks(parsedUser._id)
  }, [router])

  const loadTasks = async (userId: string) => {
    try {
      const response = await fetch(`/api/tasks?userId=${userId}`)
      const data = await response.json()
      
      if (data.success) {
        setTasks(data.data)
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTask,
          userId: user._id
        })
      })

      const data = await response.json()

      if (data.success) {
        setTasks(prev => [data.data, ...prev])
        setNewTask({ title: '', description: '', priority: 'média', dueDate: '' })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
    }
  }

  const toggleTaskComplete = async (taskId: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed })
      })

      const data = await response.json()

      if (data.success) {
        setTasks(prev => prev.map(task => 
          task._id === taskId ? { ...task, completed: !completed } : task
        ))
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
    }
  }

  const deleteTask = async (taskId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) return

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        setTasks(prev => prev.filter(task => task._id !== taskId))
      }
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'border-red-500/50 bg-red-500/20'
      case 'média': return 'border-yellow-500/50 bg-yellow-500/20'
      case 'baixa': return 'border-green-500/50 bg-green-500/20'
      default: return 'border-slate-600/50 bg-slate-700/50'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    )
  }

  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">WebBolt</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-slate-300">Olá, {user?.name}</span>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar - Stats */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/90 backdrop-blur border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progresso</span>
                    <span className="text-white">{completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total</span>
                    <span className="text-white">{totalTasks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Concluídas</span>
                    <span className="text-green-400">{completedTasks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pendentes</span>
                    <span className="text-yellow-400">{totalTasks - completedTasks}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Tasks */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">Minhas Tarefas</h1>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Tarefa
              </Button>
            </div>

            {/* Add Task Form */}
            {showAddForm && (
              <Card className="mb-6 bg-slate-800/90 backdrop-blur border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Adicionar Nova Tarefa</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddTask} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-slate-200">
                          Título
                        </Label>
                        <Input
                          id="title"
                          value={newTask.title}
                          onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                          className="bg-slate-700/50 border-slate-600 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority" className="text-slate-200">
                          Prioridade
                        </Label>
                        <select
                          id="priority"
                          value={newTask.priority}
                          onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as any }))}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white"
                        >
                          <option value="baixa">Baixa</option>
                          <option value="média">Média</option>
                          <option value="alta">Alta</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-slate-200">
                        Descrição
                      </Label>
                      <Input
                        id="description"
                        value={newTask.description}
                        onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dueDate" className="text-slate-200">
                        Data de Vencimento
                      </Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Adicionar Tarefa
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddForm(false)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-800"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Tasks List */}
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <Card className="bg-slate-800/90 backdrop-blur border-slate-700/50">
                  <CardContent className="py-8 text-center">
                    <p className="text-slate-400">Nenhuma tarefa encontrada. Adicione sua primeira tarefa!</p>
                  </CardContent>
                </Card>
              ) : (
                tasks.map((task) => (
                  <Card
                    key={task._id}
                    className={`bg-slate-800/90 backdrop-blur border-slate-700/50 ${getPriorityColor(task.priority)}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <button
                            onClick={() => toggleTaskComplete(task._id, task.completed)}
                            className="mt-1"
                          >
                            {task.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-400" />
                            ) : (
                              <div className="h-5 w-5 border-2 border-slate-500 rounded-full hover:border-blue-400 transition-colors"></div>
                            )}
                          </button>
                          
                          <div className="flex-1">
                            <h3 className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                              {task.title}
                            </h3>
                            {task.description && (
                              <p className={`text-sm mt-1 ${task.completed ? 'line-through text-slate-600' : 'text-slate-400'}`}>
                                {task.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                              <span className="capitalize">Prioridade: {task.priority}</span>
                              {task.dueDate && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteTask(task._id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}