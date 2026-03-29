export default function handler(req, res) {
  try {
    const envKeys = [
      "SERPAPI_KEY",
      "MONGODB_URI",
      "GA_MEASUREMENT_ID",
      "FB_PIXEL_ID",
      "AMAZON_US",
      "AMAZON_CA",
      "AMAZON_EG"
    ];

    const results = {};
    const missing = [];

    envKeys.forEach(key => {
      const exists = !!process.env[key];
      results[key] = exists;
      if (!exists) missing.push(key);
    });

    res.status(200).json({
      success: true,
      message: "Environment variables status",
      total: envKeys.length,
      working: envKeys.length - missing.length,
      missing,
      keys: results
    });
  } catch (error) {
    console.error("Error in /api/checkEnv:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
