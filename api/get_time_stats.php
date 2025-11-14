<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once(__DIR__ . '/../configuration.php');

// Kredensial database diambil dari objek $config yang dimuat dari configuration.php
$host = $config->host;
$user = $config->user;
$password = $config->password;
$database = $config->db;

// Buat koneksi
$conn = new mysqli($host, $user, $password, $database);

// Periksa koneksi
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Atur set karakter ke UTF-8
$conn->set_charset("utf8");

// Query untuk menghitung jumlah respons untuk setiap kategori vegetarian_time
$sql = "SELECT vegetarian_time, count(*) as total FROM responses GROUP BY vegetarian_time ORDER BY total DESC";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);

$conn->close();
?>
