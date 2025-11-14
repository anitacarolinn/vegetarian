<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Include the database configuration
require_once 'configuration.php';

$response = ['status' => 'error', 'message' => 'An unknown error occurred.'];

try {
    // Create a new database connection
    $conn = new mysqli($config->host, $config->user, $config->password, $config->db);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Get the posted data
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if data is valid
    if ($data === null || !isset($data['name']) || !isset($data['gender']) || !isset($data['country']) || !isset($data['isVegetarian']) || !isset($data['vegetarianTime'])) {
        throw new Exception("Invalid input. All fields are required.");
    }

    // Prepare and bind the statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO responses (name, gender, country, is_vegetarian, vegetarian_time) VALUES (?, ?, ?, ?, ?)");
    if ($stmt === false) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }

    $stmt->bind_param(
        "sssss",
        $data['name'],
        $data['gender'],
        $data['country'],
        $data['isVegetarian'],
        $data['vegetarianTime']
    );

    // Execute the statement
    if ($stmt->execute()) {
        $response['status'] = 'success';
        $response['message'] = 'Survey response recorded successfully.';
    } else {
        throw new Exception("Execute statement failed: " . $stmt->error);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    http_response_code(500);
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>