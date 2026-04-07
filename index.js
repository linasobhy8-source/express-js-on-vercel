import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import products from './api/products.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.static('public'))

const PORT = process.env.PORT || 3000

// Home Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// API: Products
app.get('/api/products', (req, res) => {
  const country = req.query.country || 'us'
  res.json(products)
})

// Health check
app.get('/healthz', (req, res) => res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() }))

export default app
