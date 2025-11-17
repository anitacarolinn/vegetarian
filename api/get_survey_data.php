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

// Initialize data array
$countryData = [];
$totalCount = 0;

// Check if CSV file exists
if (file_exists($csvFile)) {
    // Open CSV file for reading
    $file = fopen($csvFile, 'r');

    // Read header row
    $headers = fgetcsv($file);

    // Find the index of the 'country' column
    $countryIndex = array_search('country', $headers);

    if ($countryIndex !== false) {
        // Read all data rows and count by country
        $countryCounts = [];

        while (($row = fgetcsv($file)) !== false) {
            if (isset($row[$countryIndex]) && !empty($row[$countryIndex])) {
                $country = $row[$countryIndex];

                if (!isset($countryCounts[$country])) {
                    $countryCounts[$country] = 0;
                }
                $countryCounts[$country]++;
                $totalCount++;
            }
        }

        // Convert to array format expected by frontend
        foreach ($countryCounts as $country => $count) {
            $countryData[] = [
                'country_name' => $country,
                'count' => $count
            ];
        }

        // Sort by count descending
        usort($countryData, function($a, $b) {
            return $b['count'] - $a['count'];
        });
    }

    fclose($file);
}

// Return data in expected format
$response = [
    'country_data' => $countryData,
    'total_count' => $totalCount
];

echo json_encode($response);
?>