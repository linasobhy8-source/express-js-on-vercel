import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import products from './api/Products.js';

const app = express();
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/products', (req, res) => {
  const country = req.query.country || 'us';
  res.json(products);
});

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/check-env', (req, res) => {
  const keys = ['SERPAPI_KEY','MONGODB_URI','GA_MEASUREMENT_ID','FB_PIXEL_ID','AMAZON_US','AMAZON_CA','AMAZON_EG','SECRET_KEY','VERCEL_TOKEN'];
  const results = {};
  keys.forEach(key => { results[key] = !!process.env[key]; });
  res.status(200).json({ status: 'success', results });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
