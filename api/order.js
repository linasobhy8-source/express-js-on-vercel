import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
  if (!client.isConnected) await client.connect();
  return client.db("koloonline"); // اسم قاعدة البيانات
}

export default async function handler(req, res) {
  const db = await connectDB();
  const ordersCollection = db.collection("orders");

  if (req.method === "POST") {
    const { title, link, price, country } = req.body;
    const order = {
      title,
      link,
      price: parseFloat(price),
      country: country || "us",
      date: new Date().toISOString(),
    };
    await ordersCollection.insertOne(order);
    return res.status(201).json({ status: "success", order });
  }

  if (req.method === "GET") {
    const country = req.query.country || "us";
    const orders = await ordersCollection
      .find({ country })
      .sort({ date: -1 })
      .toArray();
    return res.status(200).json(orders);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
