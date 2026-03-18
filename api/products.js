export default function handler(req, res) {
  const country = req.query.country || "us";

  const affiliateTags = {
    us: "koloonlinesto-20",
    ca: "onlinesho0429-20",
    pl: "koloonline-21",
    eg: "onlinesh03f31-21"
  };

  const domain =
    country === "eg"
      ? "amazon.eg"
      : country === "pl"
      ? "amazon.pl"
      : country === "ca"
      ? "amazon.ca"
      : "amazon.com";

  const tag = affiliateTags[country] || affiliateTags.us;

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
    }
  ];

  res.status(200).json(products);
}
