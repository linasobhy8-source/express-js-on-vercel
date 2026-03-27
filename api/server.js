const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// API: Products
const products = [
  {
    id: 1,
    title: "Smart Watch Pro",
    category: "electronics",
    price: "$39.99",
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/61IMRs+oXyL._AC_SL1500_.jpg",
    affiliate_link: "https://www.amazon.com/dp/B09V7Z4TJG?tag=koloonlinesto-20"
  },
  {
    id: 2,
    title: "Wireless Earbuds",
    category: "electronics",
    price: "$29.99",
    rating: 4.3,
    image: "https://m.media-amazon.com/images/I/71v9z1k4a7L._AC_SL1500_.jpg",
    affiliate_link: "https://www.amazon.com/dp/B08T5GJ2M7?tag=koloonlinesto-20"
  },
  {
    id: 3,
    title: "Air Fryer 5L",
    category: "kitchen",
    price: "$59.99",
    rating: 4.6,
    image: "https://m.media-amazon.com/images/I/81v8b8h50EL._AC_SL1500_.jpg",
    affiliate_link: "https://www.amazon.com/dp/B08CVL1SV6?tag=koloonlinesto-20"
  },
  {
    id: 4,
    title: "Home LED Lamp",
    category: "home",
    price: "$19.99",
    rating: 4.2,
    image: "https://m.media-amazon.com/images/I/61HqX8pU7FL._AC_SL1500_.jpg",
    affiliate_link: "https://www.amazon.com/dp/B08XYT4JX7?tag=koloonlinesto-20"
  }
];

// GET products
app.get('/api/products', (req, res) => {
  const country = req.query.country || "us";
  // يمكنك إضافة فلترة حسب البلد هنا إذا أردت
  res.json(products);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
