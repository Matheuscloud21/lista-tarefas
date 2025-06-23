'use client'

import { Button } from "@/components/ui/button"
import { Zap, Users, Star, ArrowRight, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import * as motion from "motion/react-client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Verificar se usuário está logado e redirecionar para dashboard
    const userData = localStorage.getItem('user')
    if (userData) {
      router.push('/dashboard')
    }
  }, [router])
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <motion.div
          className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-7xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Todo o conteúdo do header */}
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">WebBolt</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Botões de Cadastrar e Login */}
            <div className="flex items-center space-x-4">            
              <Link href="/cadastro">
              
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer rounded transition transform hover:scale-110 duration-300"> Cadastrar </Button> </Link> <Link href="/login"> <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer rounded transition transform hover:scale-110 duration-300">Login</Button> </Link> </div>
          </div>
        </motion.div>
      </header>


      {/* Main Content - Página estática sem scroll */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-blue-500/20 px-3 py-1 text-sm text-blue-300 font-medium border border-blue-500/30">
                  
                  ⚡ Velocidade e Eficiência
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                  Organize sua vida com WebBolt
                </h1>
                <p className="text-lg text-slate-300 max-w-[600px] mx-auto lg:mx-0">
                  A ferramenta mais rápida e intuitiva para gerenciar suas tarefas. Experimente a velocidade do raio na
                  organização da sua produtividade.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/cadastro">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto shadow-lg shadow-blue-500/25 cursor-pointer"
                  >
                    Começar Agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white w-full sm:w-auto cursor-pointer"
                  >
                    Fazer Login
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span>4.9/5 avaliação</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>+15k usuários</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative bg-slate-800/90 backdrop-blur border border-slate-700/50 rounded-2xl shadow-2xl p-8 max-w-md w-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">Minhas Tarefas</h3>
                      <span className="text-sm text-slate-400">Hoje</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                        <CheckCircle className="h-5 w-5 text-blue-400" />
                        <span className="text-sm text-slate-200">Revisar relatório mensal</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                        <div className="h-5 w-5 border-2 border-slate-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Preparar apresentação</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                        <div className="h-5 w-5 border-2 border-slate-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Reunião com equipe</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                        <Clock className="h-5 w-5 text-orange-400" />
                        <span className="text-sm text-slate-200">Deadline projeto - 2h</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-700">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>4 de 7 tarefas concluídas</span>
                        <span>57% completo</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full w-[57%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
