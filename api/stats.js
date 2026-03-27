export default function handler(req, res) {
  const data = {
    totals: {
      clicks: 1234,
      cart: 345,
      whatsapp: 210,
      buy: 150,
      conversion: "12%"
    },
    topProducts: [
      { asin: "B09V7Z4TJG", clicks: 500, buy: 60, whatsapp: 40 },
      { asin: "B07ZNT7PRL", clicks: 400, buy: 50, whatsapp: 30 }
    ],
    countries: {
      US: 80,
      UK: 30,
      CA: 20,
      DE: 20
    }
  };
  res.status(200).json(data);
}
