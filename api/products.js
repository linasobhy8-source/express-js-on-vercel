// api/products.js
export default async function handler(req, res) {
  // 1️⃣ الدولة المطلوبة: us, ca, pl, eg
  const country = req.query.country || "us";

  // 2️⃣ Affiliate Tags لكل دولة
  const affiliateTags = {
    us: "koloonlinesto-20",
    ca: "onlinesho0429-20",
    pl: "koloonline-21",
    eg: "onlinesh03f31-21"
  };

  // 3️⃣ منتجات تجريبية (يمكن استبدالها لاحقًا ببيانات Amazon API)
  const products = [
    {
      title: "سماعة Anker Speakerphone",
      image: "https://m.media-amazon.com/images/I/71tV4O0rO0L._AC_SL1500_.jpg",
      asin: "B07ZNT7PRL",
      affiliate_link: `https://www.amazon.${country === "eg" ? "eg" : country === "pl" ? "pl" : country === "ca" ? "ca" : "com"}/dp/B07ZNT7PRL?tag=${affiliateTags[country]}`
    },
    {
      title: "سكين HOSHANHO الياباني",
      image: "https://m.media-amazon.com/images/I/81pZ9n52llL._AC_SL1500_.jpg",
      asin: "B0CKMF6GPZ",
      affiliate_link: `https://www.amazon.${country === "eg" ? "eg" : country === "pl" ? "pl" : country === "ca" ? "ca" : "com"}/dp/B0CKMF6GPZ?tag=${affiliateTags[country]}`
    }
  ];

  // 4️⃣ إعادة المنتجات كـ JSON
  res.status(200).json(products);
}
