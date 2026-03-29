// api/products.js

export default function handler(req, res) {
  try {
    // تحديد الدولة من query string، افتراضيًا "us"
    const country = (req.query.country || "us").toLowerCase();

    // Affiliate Tags لكل دولة
    const affiliateTags = {
      us: "koloonlinesto-20",
      ca: "onlinesho0429-20",
      pl: "koloonline-21",
      eg: "onlinesh03f31-21"
    };

    // تحديد دومين Amazon حسب الدولة
    const domain =
      country === "eg"
        ? "amazon.eg"
        : country === "pl"
        ? "amazon.pl"
        : country === "ca"
        ? "amazon.ca"
        : "amazon.com";

    // الحصول على التاج المناسب
    const tag = affiliateTags[country] || affiliateTags.us;

    // قائمة المنتجات (كمثال)
    const products = [
      {
        title: "Echo Dot (5th Gen)",
        price: "$49.99",
        rating: 4.7,
        image: "https://m.media-amazon.com/images/I/61u0y9ADElL._AC_SL1000_.jpg",
        link: `https://${domain}/dp/B09B8Q3YHJ?tag=${tag}`
      },
      {
        title: "Fire TV Stick 4K",
        price: "$59.99",
        rating: 4.8,
        image: "https://m.media-amazon.com/images/I/51CgKGfMelL._AC_SL1000_.jpg",
        link: `https://${domain}/dp/B08XVYZ1Y5?tag=${tag}`
      },
      {
        title: "Kindle Paperwhite",
        price: "$129.99",
        rating: 4.6,
        image: "https://m.media-amazon.com/images/I/61fPYvC5RAL._AC_SL1000_.jpg",
        link: `https://${domain}/dp/B08N36XNTT?tag=${tag}`
      },
      {
        title: "Smart Watch Pro",
        price: "$39.99",
        rating: 4.5,
        image: "https://m.media-amazon.com/images/I/61IMRs+o0iL._AC_SL1500_.jpg",
        link: `https://${domain}/dp/B09V7Z4TJG?tag=${tag}`
      }
    ];

    // إرسال JSON للـ Frontend
    res.status(200).json({ success: true, country, products });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
