require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DUMMY PRODUCTS =================
const products = [
  {
    id: 1,
    title: "Smart Watch Pro",
    category: "electronics",
    price: "$39.99",
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/61IMRs+oXyL._AC_SL1500_.jpg",
    base_link: "https://www.amazon.com/dp/B09V7Z4TJG"
  },
  { 
    id: 2,
    title: "Wireless Earbuds",
    category: "electronics",
    price: "$29.99",
    rating: 4.3,
    image: "https://m.media-amazon.com/images/I/71v9z1k4a7L._AC_SL1500_.jpg",
    base_link: "https://www.amazon.com/dp/B08T5GJ2M7"
  },
  {
    id: 3,
    title: "Air Fryer 5L",
    category: "kitchen",
    price: "$59.99",
    rating: 4.6,
    image: "https://m.media-amazon.com/images/I/81v8b8h50EL._AC_SL1500_.jpg",
    base_link: "https://www.amazon.com/dp/B08CVL1SV6"
  },
  {
    id: 4,
    title: "Home LED Lamp",
    category: "home",
    price: "$19.99",
    rating: 4.2,
    image: "https://m.media-amazon.com/images/I/61HqX8pU7FL._AC_SL1500_.jpg",
    base_link: "https://www.amazon.com/dp/B08XYT4JX7"
  }
];

// ================= API: PRODUCTS =================
app.get('/api/products', (req, res) => {
  const { country, category, search } = req.query;

  let filtered = [...products];

  // فلترة category
  if (category && category !== "all") {
    filtered = filtered.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // فلترة search
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q)
    );
  }

  // تحديد Affiliate Tag حسب الدولة
  filtered = filtered.map(p => {
    const tag = process.env[`AMAZON_${(country || "US").toUpperCase()}`];
    return {
      ...p,
      affiliate_link: tag ? `${p.base_link}?tag=${tag}` : p.base_link
    };
  });

  res.status(200).json({
    success: true,
    total: filtered.length,
    products: filtered
  });
});

// ================= API: CHECK ENV =================
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
    results[key] = !!process.env[key];
  });

  res.status(200).json({
    status: "success",
    message: "Environment keys check",
    results
  });
});

// ================= ROOT =================
app.get('/', (req, res) => {
  res.send("🚀 Koloonline API Running on Vercel");
});

// ❗❗ تصدير التطبيق
module.exports = app;

// ================= SERVER ENTRY (Vercel) =================
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    }
