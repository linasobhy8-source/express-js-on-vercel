// api/products.js
export default function handler(req, res) {
  try {
    const products = [
      {
        id: 1,
        asin: "B09V7Z4TJG",
        title: "ساعة ذكية احترافية",
        category: "electronics",
        price: 39.99,
        rating: 4.5,
        image: "https://m.media-amazon.com/images/I/61IMRs+o0iL._AC_SL1500_.jpg",
        affiliate_link: "https://www.amazon.com/dp/B09V7Z4TJG"
      },
      {
        id: 2,
        asin: "B07ZNT7PRL",
        title: "مكبر صوت بلوتوث من أنكر",
        category: "audio",
        price: 49.99,
        rating: 4.7,
        image: "https://m.media-amazon.com/images/I/71tV4O0rO0L._AC_SL1500_.jpg",
        affiliate_link: "https://www.amazon.com/dp/B07ZNT7PRL"
      },
      {
        id: 3,
        asin: "B08CVL1SV6",
        title: "Air Fryer 5L",
        category: "kitchen",
        price: 59.99,
        rating: 4.6,
        image: "https://m.media-amazon.com/images/I/81v8b8h50EL._AC_SL1500_.jpg",
        affiliate_link: "https://www.amazon.com/dp/B08CVL1SV6"
      }
    ];

    const { country = "US", category, search } = req.query;

    let filtered = [...products];

    if (category && category !== "all") {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(q));
    }

    filtered = filtered.map(p => {
      const tag = process.env[`AMAZON_${country.toUpperCase()}`];
      return { ...p, affiliate_link: tag ? `${p.affiliate_link}?tag=${tag}` : p.affiliate_link };
    });

    res.status(200).json({ success: true, total: filtered.length, data: filtered });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
