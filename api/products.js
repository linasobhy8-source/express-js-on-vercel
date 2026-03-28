// pages/api/products.js

export default function handler(req, res) {
  // ================= PRODUCTS =================
  const products = [
    {
      id: 1,
      title: "Smart Watch Pro",
      category: "electronics",
      price: "$39.99",
      rating: 4.7,
      image: "https://m.media-amazon.com/images/I/61IMRs+o0iL._AC_SL1500_.jpg",
      base_link: "https://www.amazon.com/dp/B09V7Z4TJG"
    },
    {
      id: 2,
      title: "Anker Bluetooth Speaker",
      category: "electronics",
      price: "$49.99",
      rating: 4.8,
      image: "https://m.media-amazon.com/images/I/71tV4O0rO0L._AC_SL1500_.jpg",
      base_link: "https://www.amazon.com/dp/B07ZNT7PRL"
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

  // ================= QUERY =================
  const { country = "US", category, search } = req.query;

  let filtered = [...products];

  // ================= FILTER CATEGORY =================
  if (category && category !== "all") {
    filtered = filtered.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // ================= FILTER SEARCH =================
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q)
    );
  }

  // ================= AFFILIATE LINKS =================
  filtered = filtered.map(p => {
    const tag = process.env[`AMAZON_${country.toUpperCase()}`];

    return {
      ...p,
      affiliate_link: tag
        ? `${p.base_link}?tag=${tag}`
        : p.base_link
    };
  });

  // ================= RESPONSE =================
  res.status(200).json({
    success: true,
    country: country.toUpperCase(),
    count: filtered.length,
    products: filtered
  });
      }
