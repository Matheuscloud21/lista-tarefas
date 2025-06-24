# 🔧 Troubleshooting MongoDB no Vercel

## ❌ Problema Comum
O Vercel mostra erro "MONGODB_URI para permitir build sem variável de ambiente" mesmo após as correções.

## ✅ Soluções Aplicadas

### 1. **Código Corrigido em `lib/mongodb.ts`**
```typescript
// ✅ CORRETO - Com fallback para desenvolvimento
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lista-tarefa'

// ✅ CORRETO - Aviso sem bloquear build
if (!process.env.MONGODB_URI) {
     console.warn('MONGODB_URI não definida - usando valor padrão para build')
}
```

### 2. **Configuração no Vercel Dashboard**
1. Acesse seu projeto no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://matheuscloud:matheuscloud21@cluster0.8thklps.mongodb.net/lista-tarefa?retryWrites=true&w=majority&appName=Cluster0`
   - **Environment**: Production, Preview, Development

### 3. **Forçar Novo Deploy**
Se o problema persistir:

1. **Limpar cache do Vercel:**
   - No dashboard, vá em **Settings** → **General**
   - Clique em **Clear Build Cache**

2. **Forçar redeploy:**
   - Vá na aba **Deployments**
   - Clique nos 3 pontos do último deploy
   - Selecione **Redeploy**

3. **Verificar branch:**
   - Confirme que o Vercel está apontando para a branch `main`
   - Vá em **Settings** → **Git** para verificar

## 🧪 Como Testar

### Teste Local:
```bash
npm run test:db
```

### Verificar Logs do Vercel:
1. Acesse o dashboard do Vercel
2. Vá na aba **Functions**
3. Clique em qualquer API route
4. Verifique os logs de execução

## 🚨 Erros Comuns e Soluções

### Erro: "MongoServerError: Authentication failed"
- ✅ Verifique usuário/senha na string de conexão
- ✅ Confirme que o usuário tem permissões no banco

### Erro: "MongoNetworkTimeoutError"
- ✅ Verifique se o IP do Vercel está na whitelist do MongoDB Atlas
- ✅ Configure `0.0.0.0/0` para permitir todos os IPs

### Erro: "Cannot read properties of undefined"
- ✅ Confirme que a variável `MONGODB_URI` está configurada no Vercel
- ✅ Verifique se não há caracteres especiais mal codificados na URL

## 📋 Checklist Final

- [ ] Código em `lib/mongodb.ts` está correto
- [ ] Variável `MONGODB_URI` configurada no Vercel Dashboard
- [ ] Cache do Vercel foi limpo
- [ ] Redeploy foi feito
- [ ] Branch correta está sendo usada
- [ ] Logs do Vercel foram verificados
- [ ] Teste local funcionando: `npm run test:db`

## 🔗 Links Úteis

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [MongoDB Atlas Network Access](https://docs.atlas.mongodb.com/security/add-ip-address-to-list/)
- [Next.js MongoDB Integration](https://nextjs.org/learn/dashboard-app/setting-up-your-database)