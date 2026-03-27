export default function handler(req, res) {
  const products = [
    {
      id: 1,
      title: "Smart Watch Pro",
      category: "electronics",
      price: "$39.99",
      rating: 4.7,
      image: "https://m.media-amazon.com/images/I/61IMRs+o0iL._AC_SL1500_.jpg",
      affiliate_link: "https://www.amazon.com/dp/B09V7Z4TJG?tag=koloonlinesto-20"
    },
    {
      id: 2,
      title: "Anker Bluetooth Speaker",
      category: "electronics",
      price: "$49.99",
      rating: 4.8,
      image: "https://m.media-amazon.com/images/I/71tV4O0rO0L._AC_SL1500_.jpg",
      affiliate_link: "https://www.amazon.com/dp/B07ZNT7PRL?tag=koloonlinesto-20"
    }
    // أضف أي منتجات أخرى هنا
  ];

  const country = req.query.country || "us";
  res.status(200).json(products);
}
