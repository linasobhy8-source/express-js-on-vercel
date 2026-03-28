// server.js
require('dotenv').config(); // يقرأ مفاتيح .env
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// 🔥 Dummy Products Database
const products = [
  {
    id: 1,
    title: "Smart Watch Pro",
    category: "electronics",
    price: "$39.99",
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/61IMRs+oXyL._AC_SL1500_.jpg",
    affiliate_link: process.env.AMAZON_US
      ? `https://www.amazon.com/dp/B09V7Z4TJG?tag=${process.env.AMAZON_US}`
      : "https://www.amazon.com/dp/B09V7Z4TJG"
  },
  { 
    id: 2,
    title: "Wireless Earbuds",
    category: "electronics",
    price: "$29.99",
    rating: 4.3,
    image: "https://m.media-amazon.com/images/I/71v9z1k4a7L._AC_SL1500_.jpg",
    affiliate_link: process.env.AMAZON_US
      ? `https://www.amazon.com/dp/B08T5GJ2M7?tag=${process.env.AMAZON_US}`
      : "https://www.amazon.com/dp/B08T5GJ2M7"
  },
  {
    id: 3,
    title: "Air Fryer 5L",
    category: "kitchen",
    price: "$59.99",
    rating: 4.6,
    image: "https://m.media-amazon.com/images/I/81v8b8h50EL._AC_SL1500_.jpg",
    affiliate_link: process.env.AMAZON_US
      ? `https://www.amazon.com/dp/B08CVL1SV6?tag=${process.env.AMAZON_US}`
      : "https://www.amazon.com/dp/B08CVL1SV6"
  },
  {
    id: 4,
    title: "Home LED Lamp",
    category: "home",
    price: "$19.99",
    rating: 4.2,
    image: "https://m.media-amazon.com/images/I/61HqX8pU7FL._AC_SL1500_.jpg",
    affiliate_link: process.env.AMAZON_US
      ? `https://www.amazon.com/dp/B08XYT4JX7?tag=${process.env.AMAZON_US}`
      : "https://www.amazon.com/dp/B08XYT4JX7"
  }
];

// 🔹 API: Get Products (with optional filtering)
app.get('/api/products', (req, res) => {
  const { country, category, search } = req.query;

  let filtered = [...products];

  // فلترة حسب التصنيف
  if (category && category !== "all") {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // فلترة حسب البحث
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q));
  }

  // اختيار رابط أمازون حسب البلد
  filtered = filtered.map(p => {
    let tag = process.env[`AMAZON_${(country || "US").toUpperCase()}`];
    return { ...p, affiliate_link: tag ? `${p.affiliate_link.split("?")[0]}?tag=${tag}` : p.affiliate_link };
  });

  res.json(filtered);
});

// 🔹 API: Check Environment Keys
app.get('/api/checkEnv', (req, res) => {
  const keys = [
    "SERPAPI_KEY",
    "MONGODB_URI",
    "GA_MEASUREMENT_ID",
    "FB_PIXEL_ID",
    "AMAZON_US",
    "AMAZON_CA",
    "AMAZON_EG",
    "SECRET_KEY",
    "VERCEL_TOKEN"
  ];
  const results = {};
  keys.forEach(key => {
    results[key] = !!process.env[key]; // true إذا موجود
  });

  res.status(200).json({
    status: "success",
    message: "Environment keys check",
    results
  });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
