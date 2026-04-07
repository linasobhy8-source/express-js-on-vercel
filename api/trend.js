// api/trend.js
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// جلب مسار JSON Service Account من .env
const GA_SERVICE_JSON = process.env.GA_SERVICE_JSON || './ga4-service.json';
const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID; // معرف GA4 الخاص بك

// إنشاء عميل Google Analytics
const client = new BetaAnalyticsDataClient({
  keyFile: path.resolve(__dirname, GA_SERVICE_JSON),
});

export default async function handler(req, res) {
  try {
    if (!GA_PROPERTY_ID) {
      return res.status(400).json({
        success: false,
        message: 'GA_PROPERTY_ID غير موجود في ملف .env'
      });
    }

    const request = {
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [{ name: 'conversions' }], // عدد التحويلات
      dimensions: [{ name: 'date' }],
    };

    const [response] = await client.runReport(request);

    // تحويل البيانات لتنسيق سهل الاستخدام
    const trend = response.rows.map(row => ({
      day: row.dimensionValues[0].value, // YYYYMMDD
      conversion: parseInt(row.metricValues[0].value, 10)
    }));

    res.status(200).json({
      success: true,
      data: trend,
      message: 'Weekly conversion trend retrieved successfully'
    });
  } catch (error) {
    console.error('Error in /api/trend:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}
