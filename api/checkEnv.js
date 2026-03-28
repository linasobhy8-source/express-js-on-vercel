// api/checkEnv.js

export default function handler(req, res) {
  try {
    const keys = {
      SERPAPI_KEY: !!process.env.SERPAPI_KEY,
      MONGODB_URI: !!process.env.MONGODB_URI,
      GA_MEASUREMENT_ID: !!process.env.GA_MEASUREMENT_ID,
      FB_PIXEL_ID: !!process.env.FB_PIXEL_ID,
      AMAZON_US: !!process.env.AMAZON_US,
      AMAZON_CA: !!process.env.AMAZON_CA,
      AMAZON_EG: !!process.env.AMAZON_EG
    };

    res.status(200).json({
      success: true,
      message: "Environment keys check",
      keys
    });
  } catch (error) {
    console.error("Error in /api/checkEnv:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
