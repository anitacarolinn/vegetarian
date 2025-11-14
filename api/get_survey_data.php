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
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Atur set karakter ke UTF-8 untuk penanganan karakter yang benar
$conn->set_charset("utf8");

// Query untuk mengambil data jumlah respons per negara dari tabel 'responses'
$sql = "SELECT country, count(country) as total FROM responses GROUP BY country ORDER BY COUNT(country) DESC";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    // Ambil semua baris dan simpan dalam array
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);

$conn->close();

?>