<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle pre-flight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

// Path to CSV file
$csvFile = __DIR__ . '/survey_data.csv';

// Initialize counters
$timeStats = [
    '1day' => 0,
    '1day_week' => 0,
    '1month' => 0,
    '1year' => 0,
    'lifetime' => 0,
    'always' => 0
];

// Mapping from form values to stats keys
$timeMapping = [
    '1-day' => '1day',
    '1-day-per-week' => '1day_week',
    '7-days' => '1month',  // 7 days is approximately counted with 1 month
    '1-month' => '1month',
    '1-year' => '1year',
    'whole-life' => 'lifetime',
    'life-after-life' => 'always'
];

// Meals calculation per category (meals per year)
$mealsPerYear = [
    '1day' => 3,           // 1 day = 3 meals
    '1day_week' => 156,    // 1 day/week * 52 weeks * 3 meals
    '1month' => 90,        // 1 month * 3 meals/day * 30 days
    '1year' => 1095,       // 1 year * 3 meals/day * 365 days
    'lifetime' => 1095,    // lifetime counted as 1 year
    'always' => 1095       // always counted as 1 year
];

$totalMeals = 0;

// Check if CSV file exists
if (file_exists($csvFile)) {
    // Open CSV file for reading
    $file = fopen($csvFile, 'r');

    // Read header row
    $headers = fgetcsv($file);

    // Find the index of the 'vegetarianTime' column
    $timeIndex = array_search('vegetarianTime', $headers);

    if ($timeIndex !== false) {
        // Read all data rows and count by vegetarian time
        while (($row = fgetcsv($file)) !== false) {
            if (isset($row[$timeIndex]) && !empty($row[$timeIndex])) {
                $vegTime = $row[$timeIndex];

                // Map form value to stats key
                if (isset($timeMapping[$vegTime])) {
                    $statsKey = $timeMapping[$vegTime];
                    $timeStats[$statsKey]++;

                    // Calculate meals
                    if (isset($mealsPerYear[$statsKey])) {
                        $totalMeals += $mealsPerYear[$statsKey];
                    }
                }
            }
        }
    }

    fclose($file);
}

// Return data in expected format
$response = [
    'time_stats' => $timeStats,
    'total_meals' => $totalMeals
];

echo json_encode($response);
?>
