<?php
// Set the content type to plain text for better error viewing
header('Content-Type: text/plain');

// Allow requests from any origin
header('Access-Control-Allow-Origin: *');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');
// Allow specific methods
header('Access-Control-Allow-Methods: POST, OPTIONS');

// Handle pre-flight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

// Define the path to the CSV file
$csvFile = __DIR__ . '/survey_data.csv';
$publicCsvFile = __DIR__ . '/../public/api/survey_data.csv';

// Get the raw POST data
$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

// Check if the data is valid
if ($data === null) {
    http_response_code(400);
    echo "Error: Invalid JSON data.";
    exit;
}

// Define the expected headers
$headers = ['name', 'gender', 'country', 'isVegetarian', 'vegetarianTime'];

// Check if the CSV file exists
$fileExists = file_exists($csvFile);

// Open the CSV file in append mode
$file = fopen($csvFile, 'a');

// If the file is new, add the header row
if (!$fileExists || filesize($csvFile) === 0) {
    fputcsv($file, $headers);
}

// Create an array for the row data in the correct order
$rowData = [];
foreach ($headers as $header) {
    $rowData[] = isset($data[$header]) ? $data[$header] : '';
}

// Write the data to the CSV file
if (fputcsv($file, $rowData)) {
    fclose($file);

    // Also save to public folder for frontend access
    $publicFileExists = file_exists($publicCsvFile);
    $publicFile = fopen($publicCsvFile, 'a');

    if (!$publicFileExists || filesize($publicCsvFile) === 0) {
        fputcsv($publicFile, $headers);
    }

    fputcsv($publicFile, $rowData);
    fclose($publicFile);

    echo "Data saved successfully.";
} else {
    fclose($file);
    http_response_code(500);
    echo "Error: Could not write to CSV file.";
}
?>
