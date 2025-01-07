<?php
include('db_config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $save_data = $_POST['save_data'];

    // Insert user data into the database
    $sql = "INSERT INTO users (username, save_data) VALUES ('$username', '$save_data')";

    if ($conn->query($sql) === TRUE) {
        echo "User saved successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Tamagotchi</title>
</head>
<body>
    <h1>Tamagotchi</h1>
    <form method="POST" action="main.php">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>

        <label for="save_data">Save Data:</label>
        <textarea id="save_data" name="save_data" required></textarea><br><br>

        <input type="submit" value="Save">
    </form>
</body>
</html>
