// api/orders.js

import { MongoClient } from "mongodb";

// ================= MONGODB CLIENT =================
const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = null;

async function connectDB() {
  if (!db) {
    if (!client.isConnected?.()) {
      await client.connect();
    }
    db = client.db("koloonline"); // اسم قاعدة البيانات
  }
  return db;
}

// ================= API HANDLER =================
export default async function handler(req, res) {
  try {
    const db = await connectDB();
    const ordersCollection = db.collection("orders");

    // ================= CREATE ORDER =================
    if (req.method === "POST") {
      const { title, link, price, country } = req.body;

      if (!title || !link || !price) {
        return res.status(400).json({
          status: "error",
          message: "Missing required fields: title, link, or price",
        });
      }

      const order = {
        title,
        link,
        price: parseFloat(price),
        country: (country || "us").toLowerCase(),
        date: new Date(),
      };

      const result = await ordersCollection.insertOne(order);
      return res.status(201).json({
        status: "success",
        message: "Order created successfully",
        orderId: result.insertedId,
        order,
      });
    }

    // ================= GET ORDERS =================
    if (req.method === "GET") {
      const country = (req.query.country || "us").toLowerCase();
      const limit = parseInt(req.query.limit) || 50;

      const orders = await ordersCollection
        .find({ country })
        .sort({ date: -1 })
        .limit(limit)
        .toArray();

      return res.status(200).json({
        status: "success",
        total: orders.length,
        orders,
      });
    }

    // ================= METHOD NOT ALLOWED =================
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({
      status: "error",
      message: `Method ${req.method} Not Allowed`,
    });
  } catch (err) {
    console.error("Orders API Error:", err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: err.message,
    });
  }
      }
