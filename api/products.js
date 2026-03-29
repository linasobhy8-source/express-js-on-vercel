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
        link: `https://${domain}/dp/B08N36XNTT?tag=${tag}`
      },
      {
        title: "Smart Watch Pro",
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
