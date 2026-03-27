const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// 🔥 Dummy Products
const products = [
  {
    id: 1,
    title: "Smart Watch Pro",
    category: "electronics",
    price: "$39.99",
    image: "https://m.media-amazon.com/images/I/61IMRs+o.jpg",
    rating: 4.5,
    affiliate_link: "https://amzn.to/3xxxx"
  },
  {
    id: 2,
    title: "Wireless Earbuds",
    category: "electronics",
    price: "$29.99",
    image: "https://m.media-amazon.com/images/I/71xxxx.jpg",
    rating: 4.2,
    affiliate_link: "https://amzn.to/3xxxx"
  },
  {
    id: 3,
    title: "Kitchen Mixer",
    category: "kitchen",
    price: "$89.99",
    image: "https://m.media-amazon.com/images/I/51xxxx.jpg",
    rating: 4.7,
    affiliate_link: "https://amzn.to/3xxxx"
  }
];

// API: Get products by country (dummy)
app.get("/api/products", (req, res) => {
  const country = req.query.country || "us";
  res.json(products);
});

// API: Track order (dummy)
let orders = [];
app.post("/api/order", (req, res) => {
  const { title, link, price } = req.body;
  const order = { id: orders.length + 1, title, link, price, date: new Date() };
  orders.push(order);
  res.json({ success: true, order });
});

// API: Dashboard stats
app.get("/api/stats", (req, res) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + parseFloat(o.price.replace("$", "")), 0);
  res.json({ totalOrders, totalRevenue, orders });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
