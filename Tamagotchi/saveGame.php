<?php
include 'db_config.php';

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get post data
$username = $_POST['username'] ?? '';
$hunger = $_POST['hunger'] ?? 50;
$happiness = $_POST['happiness'] ?? 50;
$energy = $_POST['energy'] ?? 50;

if (empty($username)) {
    echo json_encode(["error" => "Username is required"]);
    exit;
}

// Update user's game state
$sql = "UPDATE users SET hunger = ?, happiness = ?, energy = ? WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiis", $hunger, $happiness, $energy, $username);

if ($stmt->execute()) {
    echo json_encode(["message" => "Game saved successfully"]);
} else {
    echo json_encode(["error" => "Failed to save game: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>