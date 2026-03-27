import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* DB */
let isConnected = false;
async function connectDB(){
  if(isConnected) return;
  const db = await mongoose.connect(process.env.MONGODB_URI);
  isConnected = db.connections[0].readyState;
}

/* MODEL */
const AnalyticsSchema = new mongoose.Schema({
  asin:String,
  click:{type:Number,default:0},
  cart:{type:Number,default:0},
  whatsapp:{type:Number,default:0},
  buy:{type:Number,default:0}
});
const Analytics = mongoose.models.Analytics || mongoose.model("Analytics", AnalyticsSchema);

/* TRACK */
app.post("/api/track", async (req,res)=>{
  await connectDB();
  const {asin,type}=req.body;

  let doc = await Analytics.findOne({asin}) || new Analytics({asin});
  doc[type] += 1;
  await doc.save();

  res.json({success:true});
});

/* STATS */
app.get("/api/stats", async (req,res)=>{
  await connectDB();

  let data = await Analytics.find();

  let totals={click:0,cart:0,buy:0};
  data.forEach(i=>{
    totals.click+=i.click;
    totals.cart+=i.cart;
    totals.buy+=i.buy;
  });

  res.json({totals,data});
});

/* ROOT */
app.get("/",(req,res)=>{
  res.sendFile(process.cwd()+"/public/index.html");
});

export default app;
