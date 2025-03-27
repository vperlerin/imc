<?php

require_once __DIR__ . "/../config.php";

class Connect
{
    public static function getPDO()
    {
        $host = "localhost";
        $dbname = getenv("MYSQL_DATABASE");
        $username = getenv("MYSQL_USER");
        $password = getenv("MYSQL_PASSWORD");

        try {
            $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            // Optional: throw exception instead of die (to handle it gracefully)
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }
}
