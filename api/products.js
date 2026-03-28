// pages/api/products.js
export default async function handler(req, res) {
  const { country = "US", section = "all", search } = req.query;

  // Dummy Top Products for now, later يمكن استبدالها بـ Amazon PA API
  const products = [
    {
      id: 1,
      title: "Smart Watch Pro",
      category: "electronics",
      price: "$39.99",
      rating: 4.7,
      reviews: 1234,
      image: "https://m.media-amazon.com/images/I/61IMRs+o0iL._AC_SL1500_.jpg",
      base_link: "https://www.amazon.com/dp/B09V7Z4TJG"
    },
    {
      id: 2,
      title: "Nike Metcon 3",
      category: "sports",
      price: "$99.99",
      rating: 4.8,
      reviews: 875,
      image: "https://m.media-amazon.com/images/I/71T0-3u1hLL._AC_SL1500_.jpg",
      base_link: "https://www.amazon.com/dp/B07ZNT7PRL"
    },
    {
      id: 3,
      title: "Air Fryer 5L",
      category: "kitchen",
      price: "$59.99",
      rating: 4.6,
      reviews: 542,
      image: "https://m.media-amazon.com/images/I/81v8b8h50EL._AC_SL1500_.jpg",
      base_link: "https://www.amazon.com/dp/B08CVL1SV6"
    },
    {
      id: 4,
      title: "Home LED Lamp",
      category: "home",
      price: "$19.99",
      rating: 4.2,
      reviews: 321,
      image: "https://m.media-amazon.com/images/I/61HqX8pU7FL._AC_SL1500_.jpg",
      base_link: "https://www.amazon.com/dp/B08XYT4JX7"
    }
  ];

  // فلترة search
  let filtered = [...products];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q));
  }

  // Affiliate tag حسب الدولة
  filtered = filtered.map(p => {
    const tag = process.env[`AMAZON_${country.toUpperCase()}`];
    return {
      ...p,
      affiliate_link: tag ? `${p.base_link}?tag=${tag}` : p.base_link
    };
  });

  res.status(200).json({
    success: true,
    section,
    country: country.toUpperCase(),
    count: filtered.length,
    products: filtered
  });
    }
