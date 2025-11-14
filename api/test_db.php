<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Izinkan permintaan dari mana saja. Di lingkungan produksi, batasi ini ke domain aplikasi React Anda.
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Sertakan file konfigurasi untuk mendapatkan kredensial database
// configuration.php diharapkan berada di direktori induk dari folder 'api'
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
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed: ' . $conn->connect_error]);
    exit;
}

// Atur set karakter ke UTF-8 untuk penanganan karakter yang benar
$conn->set_charset("utf8");

// Query untuk mengambil beberapa data dari tabel 'responses' untuk pengujian
$sql = "SELECT id, name, country FROM responses LIMIT 10"; // Ambil 10 data terbaru
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data[] = ['message' => 'No data found in responses table.'];
}

echo json_encode($data);

$conn->close();
