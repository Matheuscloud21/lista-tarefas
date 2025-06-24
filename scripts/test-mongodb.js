const mongoose = require('mongoose')

// Configuração da URI do MongoDB com fallback para desenvolvimento
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lista-tarefa'

console.log('Testando conexão MongoDB...')
console.log('URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//[USER]:[PASSWORD]@'))

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
    console.log('✅ Conexão com MongoDB estabelecida com sucesso!')
    
    // Teste simples de operação
    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()
    console.log('📊 Collections disponíveis:', collections.map(c => c.name))
    
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:')
    console.error('Tipo do erro:', error.name)
    console.error('Mensagem:', error.message)
    
    if (error.code) {
      console.error('Código do erro:', error.code)
    }
    
    process.exit(1)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Conexão encerrada')
  }
}

testConnection()