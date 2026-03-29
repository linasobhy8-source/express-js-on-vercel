import { MongoClient } from "mongodb";

// ================= GLOBAL CONNECTION (Vercel Fix) =================
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in Environment Variables");
}

const uri = process.env.MONGODB_URI;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

// ================= API HANDLER =================
export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("koloonline");
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
    console.error("❌ Orders API Error:", err);

    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: err.message,
    });
  }
}
