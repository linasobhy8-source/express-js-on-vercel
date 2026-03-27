export default function handler(req, res) {
  const products = [
    {
      id: 1,
      title: "Smart Watch Pro",
      price: "$39.99",
      image: "/images/product1.png",
      rating: 4.7,
      affiliate_link: "https://www.amazon.com/dp/B09V7Z4TJG?tag=koloonlinesto-20",
      category: "electronics"
    },
    // ممكن تضيفي كل منتجاتك هنا
  ];
  res.status(200).json(products);
}
