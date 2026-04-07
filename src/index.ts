import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import products from './products.js' // أو products.ts إذا استخدمتي TS بالكامل

dotenv.config() // تحميل مفاتيح .env

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000

// Home Route - HTML
app.get('/', (req, res) => {
  res.type('html').send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>🔥 Koloonline Store</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <h1>Welcome to Koloonline Store 🚀</h1>
      <p>Use <a href="/api/products">/api/products</a> to see product data</p>
      <p>Health check: <a href="/healthz">/healthz</a></p>
    </body>
    </html>
  `)
})

// API: Products
app.get('/api/products', (req, res) => {
  const country = (req.query.country || 'us').toLowerCase()
  // يمكن الفلترة حسب country لاحقًا
  res.json(products)
})

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

// Check environment keys
app.get('/api/check-env', (req, res) => {
  const keys = [
    'SERPAPI_KEY',
    'MONGODB_URI',
    'GA_MEASUREMENT_ID',
    'FB_PIXEL_ID',
    'AMAZON_US',
    'AMAZON_CA',
    'AMAZON_EG',
    'SECRET_KEY',
    'VERCEL_TOKEN'
  ]
  const results: Record<string, boolean> = {}
  keys.forEach(key => results[key] = !!process.env[key])
  res.status(200).json({ status: 'success', results })
})

export default app
