import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Users, Zap, ArrowRight, Star, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">TaskFlow</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#recursos" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Recursos
            </Link>
            <Link href="#sobre" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Sobre
            </Link>
            <Link href="#contato" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Contato
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Cadastrar
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Login</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Organize sua vida com nossa Lista de Tarefas
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Transforme sua produtividade com uma ferramenta simples, elegante e poderosa. Gerencie suas tarefas,
                    defina prioridades e alcance seus objetivos.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Começar Agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    Ver Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.9/5 avaliação</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>+10k usuários</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-3xl blur-3xl opacity-20"></div>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Interface da Lista de Tarefas"
                    className="relative rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="recursos" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-800">
                  Recursos
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Tudo que você precisa para ser mais produtivo
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nossa plataforma oferece ferramentas intuitivas e poderosas para ajudar você a organizar, priorizar e
                  completar suas tarefas com eficiência.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle>Organização Inteligente</CardTitle>
                  <CardDescription>
                    Categorize e organize suas tarefas por projetos, prioridades e prazos de forma automática.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Lembretes Inteligentes</CardTitle>
                  <CardDescription>
                    Receba notificações personalizadas e nunca mais perca um prazo importante.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Sincronização Rápida</CardTitle>
                  <CardDescription>
                    Acesse suas tarefas em qualquer dispositivo com sincronização em tempo real.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-emerald-50 to-cyan-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-800">
                    Benefícios
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Aumente sua produtividade em 300%</h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Milhares de usuários já transformaram sua rotina com nossa lista de tarefas. Junte-se a eles e
                    descubra o poder da organização.
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-emerald-600" />
                    <span className="text-gray-700">Foque no que realmente importa</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span className="text-gray-700">Complete mais tarefas em menos tempo</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span className="text-gray-700">Nunca mais perca prazos importantes</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-emerald-600" />
                    <span className="text-gray-700">Reduza o estresse e a ansiedade</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Gráfico de Produtividade"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Pronto para transformar sua produtividade?
                </h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comece hoje mesmo e descubra como uma simples lista de tarefas pode mudar sua vida.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Criar Conta Grátis
                </Button>
                <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  Fazer Login
                </Button>
              </div>
              <p className="text-sm text-gray-400">
                Grátis para sempre • Sem cartão de crédito • Configuração em 2 minutos
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-gray-600">© {new Date().getFullYear()} TaskFlow. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Termos de Uso
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Privacidade
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Suporte
          </Link>
        </nav>
      </footer>
    </div>
  )
}
