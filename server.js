const dns = require('dns')
const authRoutes = require('./routes/authRoutes')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const Expense = require('./models/Expense')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
const PORT = 5000


app.get('/', (req, res) => {
  res.send('Expense Tracker Backend is Running')
})

app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find()

    res.json(expenses)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch expenses',
      error: error.message
    })
  }
})

app.post('/api/expenses', async (req, res) => {
  try {
    console.log('MongoDB readyState:', mongoose.connection.readyState)
    console.log('Request body:', req.body)
    console.log('Expense model:', Expense.modelName)
    console.log('Expense collection:', Expense.collection.name)

    const newExpense = await Expense.create(req.body)

    console.log('Expense saved:', newExpense)

    res.status(201).json(newExpense)
  } catch (error) {
    console.error('Create expense error:', error)

    res.status(400).json({
      message: 'Failed to create expense',
      error: error.message
    })
  }
})

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id)

    if (!deletedExpense) {
      return res.status(404).json({
        message: 'Expense not found'
      })
    }

    res.json({
      message: 'Expense deleted successfully',
      expense: deletedExpense
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete expense',
      error: error.message
    })
  }
})

app.put('/api/expenses/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!updatedExpense) {
      return res.status(404).json({
        message: 'Expense not found'
      })
    }

    res.json(updatedExpense)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update expense',
      error: error.message
    })
  }
})

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000
})
  .then(async () => {
    console.log('MongoDB connected')
    console.log('Mongoose readyState:', mongoose.connection.readyState)

    await mongoose.connection.db.admin().ping()
    console.log('MongoDB ping successful')

    

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed')
    console.error(error)
  })