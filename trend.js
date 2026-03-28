// api/trend.js

export default function handler(req, res) {
  try {
    const trend = [
      { day: "Mon", conversion: 10 },
      { day: "Tue", conversion: 12 },
      { day: "Wed", conversion: 8 },
      { day: "Thu", conversion: 15 },
      { day: "Fri", conversion: 9 },
      { day: "Sat", conversion: 13 },
      { day: "Sun", conversion: 11 }
    ];

    res.status(200).json({
      success: true,
      data: trend,
      message: "Weekly conversion trend retrieved successfully"
    });
  } catch (error) {
    console.error("Error in /api/trend:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
