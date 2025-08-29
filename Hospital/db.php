<?php
// db.php - Database connection script

$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "hospital_management";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
