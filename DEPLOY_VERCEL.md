# 🚀 Guia de Deploy na Vercel

## ✅ Problema Resolvido!

O erro de "lockfile outdated" foi corrigido! O `pnpm-lock.yaml` foi atualizado e enviado para o repositório.

## 🔧 Passos para Deploy Bem-sucedido

### 1. **Configurar Variáveis de Ambiente na Vercel**

No painel da Vercel (vercel.com):

1. Acesse seu projeto
2. Vá em **Settings** → **Environment Variables**
3. Clique **Add New**
4. Adicione esta variável:

```
Key: MONGODB_URI
Value: mongodb+srv://matheuscloud:matheuscloud21@cluster0.8thklps.mongodb.net/lista-tarefa?retryWrites=true&w=majority&appName=Cluster0
Environment: Production, Preview, Development (selecione todos)
```

5. Clique **Save**

**IMPORTANTE**: Não use secrets ou referências @. Adicione diretamente como Environment Variable simples.

### 2. **Verificar MongoDB Atlas**

Certifique-se que no MongoDB Atlas:

1. **Network Access** → **IP Access List**:
   - Adicione `0.0.0.0/0` (permite todos os IPs)
   - Ou adicione IPs específicos da Vercel

2. **Database Access**:
   - Usuário `matheuscloud` está ativo
   - Tem permissões de leitura/escrita

### 3. **Fazer Deploy**

Opção 1 - **Deploy Automático**:
- O push para `main` já deve ter disparado o deploy automaticamente
- Verifique o dashboard da Vercel

Opção 2 - **Deploy Manual**:
```bash
vercel --prod
```

## 🎯 URLs que Funcionarão

Após o deploy:

```
https://seu-app.vercel.app/                    # Landing page
https://seu-app.vercel.app/cadastro            # Cadastro
https://seu-app.vercel.app/login               # Login
https://seu-app.vercel.app/dashboard           # Dashboard
https://seu-app.vercel.app/api/test-db         # Teste de conexão
https://seu-app.vercel.app/api/users           # API usuários
https://seu-app.vercel.app/api/auth/login      # API login
https://seu-app.vercel.app/api/tasks           # API tarefas
```

## 🧪 Testar Depois do Deploy

1. **Teste de Conexão**:
   ```bash
   curl https://seu-app.vercel.app/api/test-db
   ```
   Deve retornar: `{"success":true,...}`

2. **Criar Usuário**:
   ```bash
   curl -X POST https://seu-app.vercel.app/api/users \
   -H "Content-Type: application/json" \
   -d '{"name":"Teste","email":"teste@email.com","password":"123456"}'
   ```

3. **Testar Login**:
   ```bash
   curl -X POST https://seu-app.vercel.app/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"email":"teste@email.com","password":"123456"}'
   ```

## ⚠️ Lembrete Importante

- **NUNCA** commite o arquivo `.env.local` para o Git
- Use apenas as **Environment Variables** da Vercel
- O arquivo `.gitignore` já está configurado corretamente

## 🐛 Se Ainda Houver Problemas

1. **Verifique os logs** no dashboard da Vercel
2. **Confirme** que a variável `MONGODB_URI` está configurada
3. **Teste** a string de conexão localmente primeiro
4. **Verifique** se o MongoDB Atlas permite conexões da Vercel

## 🎉 Resultado Final

Após o deploy, você terá:
- ✅ Sistema completo funcionando na Vercel
- ✅ MongoDB Atlas conectado
- ✅ Todas as funcionalidades operacionais
- ✅ URLs públicas funcionais

O deploy deve funcionar perfeitamente agora! 🚀