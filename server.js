import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// CSV file paths
const csvFile = path.join(__dirname, 'api', 'survey_data.csv');
const publicCsvFile = path.join(__dirname, 'public', 'api', 'survey_data.csv');

// Helper function to ensure directory exists
function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

// Helper function to convert array to CSV row
function arrayToCsvRow(array) {
  return array.map(field => {
    // Escape quotes and wrap in quotes if contains comma or quotes
    if (field.toString().includes(',') || field.toString().includes('"')) {
      return `"${field.toString().replace(/"/g, '""')}"`;
    }
    return field;
  }).join(',') + '\n';
}

// Save to CSV endpoint
app.post('/api/save_to_csv.php', (req, res) => {
  try {
    const data = req.body;

    // Define headers
    const headers = ['name', 'gender', 'country', 'isVegetarian', 'vegetarianTime'];

    // Ensure directories exist
    ensureDirectoryExists(csvFile);
    ensureDirectoryExists(publicCsvFile);

    // Check if files exist
    const csvFileExists = fs.existsSync(csvFile);
    const publicCsvFileExists = fs.existsSync(publicCsvFile);

    // Prepare row data
    const rowData = headers.map(header => data[header] || '');
    const csvRow = arrayToCsvRow(rowData);

    // Write to main CSV file
    if (!csvFileExists || fs.statSync(csvFile).size === 0) {
      fs.writeFileSync(csvFile, arrayToCsvRow(headers), 'utf8');
    }
    fs.appendFileSync(csvFile, csvRow, 'utf8');

    // Write to public CSV file
    if (!publicCsvFileExists || fs.statSync(publicCsvFile).size === 0) {
      fs.writeFileSync(publicCsvFile, arrayToCsvRow(headers), 'utf8');
    }
    fs.appendFileSync(publicCsvFile, csvRow, 'utf8');

    res.status(200).send('Data saved successfully.');
  } catch (error) {
    console.error('Error saving CSV:', error);
    res.status(500).send(`Error: Could not write to CSV file. ${error.message}`);
  }
});

// Get survey data endpoint
app.get('/api/get_survey_data.php', (req, res) => {
  try {
    if (!fs.existsSync(csvFile)) {
      return res.json({ country_data: [], total_count: 0 });
    }

    const csvContent = fs.readFileSync(csvFile, 'utf8');
    const lines = csvContent.trim().split('\n');

    if (lines.length <= 1) {
      return res.json({ country_data: [], total_count: 0 });
    }

    // Parse CSV
    const headers = lines[0].split(',');
    const countryIndex = headers.indexOf('country');

    if (countryIndex === -1) {
      return res.json({ country_data: [], total_count: 0 });
    }

    const countryCounts = {};
    let totalCount = 0;

    // Process data rows
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines
      const row = lines[i].split(',');
      if (row[countryIndex] && row[countryIndex].trim()) {
        const country = row[countryIndex].trim();
        countryCounts[country] = (countryCounts[country] || 0) + 1;
        totalCount++;
      }
    }

    // Convert to array and sort
    const countryData = Object.entries(countryCounts).map(([country, count]) => ({
      country_name: country,
      count: count
    }));

    countryData.sort((a, b) => b.count - a.count);

    res.json({
      country_data: countryData,
      total_count: totalCount
    });
  } catch (error) {
    console.error('Error reading CSV:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get time stats endpoint
app.get('/api/get_time_stats.php', (req, res) => {
  try {
    if (!fs.existsSync(csvFile)) {
      return res.json({
        time_stats: {
          '1day': 0,
          '1day_week': 0,
          '1month': 0,
          '1year': 0,
          'lifetime': 0,
          'always': 0
        },
        total_meals: 0
      });
    }

    const csvContent = fs.readFileSync(csvFile, 'utf8');
    const lines = csvContent.trim().split('\n');

    if (lines.length <= 1) {
      return res.json({
        time_stats: {
          '1day': 0,
          '1day_week': 0,
          '1month': 0,
          '1year': 0,
          'lifetime': 0,
          'always': 0
        },
        total_meals: 0
      });
    }

    const headers = lines[0].split(',');
    const timeIndex = headers.indexOf('vegetarianTime');

    const timeStats = {
      '1day': 0,
      '1day_week': 0,
      '1month': 0,
      '1year': 0,
      'lifetime': 0,
      'always': 0
    };

    const timeMapping = {
      '1-day': '1day',
      '1-day-per-week': '1day_week',
      '7-days': '1month',
      '1-month': '1month',
      '1-year': '1year',
      'whole-life': 'lifetime',
      'life-after-life': 'always'
    };

    const mealsPerYear = {
      '1day': 3,
      '1day_week': 156,
      '1month': 90,
      '1year': 1095,
      'lifetime': 1095,
      'always': 1095
    };

    let totalMeals = 0;

    // Process data rows
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines
      const row = lines[i].split(',');
      if (row[timeIndex] && row[timeIndex].trim()) {
        const vegTime = row[timeIndex].trim();
        if (timeMapping[vegTime]) {
          const statsKey = timeMapping[vegTime];
          timeStats[statsKey]++;
          totalMeals += mealsPerYear[statsKey] || 0;
        }
      }
    }

    res.json({
      time_stats: timeStats,
      total_meals: totalMeals
    });
  } catch (error) {
    console.error('Error reading CSV:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`\n✅ CSV API Server running on http://localhost:${PORT}`);
  console.log(`📁 CSV file: ${csvFile}`);
  console.log(`📁 Public CSV file: ${publicCsvFile}`);
  console.log(`\n🔗 Test endpoints:`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/get_survey_data.php`);
  console.log(`   - http://localhost:${PORT}/api/get_time_stats.php\n`);
});
