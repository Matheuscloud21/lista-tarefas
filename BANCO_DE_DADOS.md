# 🗄️ Configuração do Banco de Dados - Lista de Tarefas

## 📋 Resumo da Implementação

Implementei uma configuração completa do MongoDB para seu projeto de lista de tarefas com:

- ✅ Models para User e Task
- ✅ API Routes completas (CRUD)
- ✅ Autenticação com bcrypt
- ✅ Validações e tratamento de erros
- ✅ Relacionamento entre usuários e tarefas

## 🏗️ Estrutura Criada

```
├── lib/
│   ├── mongodb.ts          # Configuração da conexão
│   └── models/
│       ├── User.ts         # Model de usuário
│       └── Task.ts         # Model de tarefa
└── app/api/
    ├── users/route.ts      # CRUD de usuários
    ├── tasks/
    │   ├── route.ts        # CRUD de tarefas
    │   └── [id]/route.ts   # Operações por ID
    ├── auth/
    │   └── login/route.ts  # Autenticação
    └── test-db/route.ts    # Teste de conexão
```

## 🔧 Configuração Necessária

### 1. Variáveis de Ambiente (.env.local)

```env
# MongoDB Atlas (substitua pela sua senha real)
MONGODB_URI=mongodb+srv://admin:SUA_SENHA_AQUI@cluster0.8thklps.mongodb.net/lista-tarefa?retryWrites=true&w=majority&appName=Cluster0

# Ou MongoDB local
# MONGODB_URI=mongodb://localhost:27017/lista-tarefa
```

### 2. Dependências Instaladas

- `mongoose` - ODM para MongoDB
- `bcryptjs` - Hash de senhas
- `@types/bcryptjs` - Types do bcrypt

## 🚀 Como Usar as APIs

### 🧪 Testar Conexão

```bash
GET /api/test-db
```

### 👤 Usuários

**Criar usuário:**
```javascript
POST /api/users
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

**Listar usuários:**
```javascript
GET /api/users
```

### 🔐 Autenticação

**Login:**
```javascript
POST /api/auth/login
{
  "email": "joao@email.com",
  "password": "123456"
}
```

### ✅ Tarefas

**Criar tarefa:**
```javascript
POST /api/tasks
{
  "title": "Minha tarefa",
  "description": "Descrição da tarefa",
  "priority": "alta",
  "dueDate": "2024-12-31",
  "userId": "USER_ID_AQUI"
}
```

**Listar tarefas:**
```javascript
GET /api/tasks
GET /api/tasks?userId=USER_ID
GET /api/tasks?completed=true
```

**Atualizar tarefa:**
```javascript
PUT /api/tasks/TASK_ID
{
  "title": "Título atualizado",
  "completed": true
}
```

**Deletar tarefa:**
```javascript
DELETE /api/tasks/TASK_ID
```

**Buscar tarefa específica:**
```javascript
GET /api/tasks/TASK_ID
```

## 📊 Models

### User Model
- `name`: string (obrigatório)
- `email`: string (obrigatório, único)
- `password`: string (obrigatório, hash)
- `createdAt`: Date

### Task Model
- `title`: string (obrigatório)
- `description`: string
- `completed`: boolean (padrão: false)
- `priority`: enum ['baixa', 'média', 'alta']
- `dueDate`: Date
- `userId`: ObjectId (referência ao User)
- `createdAt`: Date
- `updatedAt`: Date

## 🔍 Próximos Passos

1. **Configure sua senha** no `.env.local`
2. **Teste a conexão** acessando `/api/test-db`
3. **Crie um usuário** usando `/api/users`
4. **Faça login** usando `/api/auth/login`
5. **Crie tarefas** usando `/api/tasks`

## 🛠️ Exemplo de Uso no Frontend

```javascript
// Criar usuário
const response = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'João',
    email: 'joao@email.com',
    password: '123456'
  })
})

const user = await response.json()

// Criar tarefa
const taskResponse = await fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Estudar Next.js',
    description: 'Aprender sobre API routes',
    priority: 'alta',
    userId: user.data._id
  })
})
```

## 🚨 Importante

- Substitua `SUA_SENHA_AQUI` pela senha real do MongoDB Atlas
- As senhas são automaticamente hasheadas com bcrypt
- Todas as APIs retornam JSON com `success: boolean`
- Validações são feitas automaticamente pelos schemas
- Erros são tratados e retornados com status codes apropriados

Sua configuração está completa e pronta para uso! 🎉