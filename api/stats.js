export default function handler(req, res) {
  const data = {
    totals: {
      clicks: 1200,
      cart: 350,
      whatsapp: 180,
      buy: 75,
      conversion: "6%"
    },
    topProducts: [
      { asin: "B09V7Z4TJG", clicks: 500, buy: 30, whatsapp: 50 },
      { asin: "B07ZNT7PRL", clicks: 400, buy: 25, whatsapp: 40 }
    ],
    countries: {
      US: 50,
      CA: 15,
      UK: 10
    }
  };
  res.status(200).json(data);
}
