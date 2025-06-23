import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
     title: {
          type: String,
          required: [true, 'Título é obrigatório'],
          trim: true
     },
     description: {
          type: String,
          trim: true
     },
     completed: {
          type: Boolean,
          default: false
     },
     priority: {
          type: String,
          enum: ['baixa', 'média', 'alta'],
          default: 'média'
     },
     dueDate: {
          type: Date
     },
     userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
     },
     createdAt: {
          type: Date,
          default: Date.now
     },
     updatedAt: {
          type: Date,
          default: Date.now
     }
})

// Middleware para atualizar updatedAt automaticamente
TaskSchema.pre('save', function (next) {
     this.updatedAt = new Date()
     next()
})

export default mongoose.models.Task || mongoose.model('Task', TaskSchema)
