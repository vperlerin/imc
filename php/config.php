<?php

// Load environment variables from /DATA/sites/imc2025.imo.net/env/.env
$envPath = realpath(__DIR__ . '/../env/.env');   

if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) continue;  // Skip empty lines and comments

        // Ensure the line contains '='
        if (strpos($line, '=') === false) {
            echo "Warning: Invalid .env line (no '=' found): $line\n";
            continue;
        }

        list($key, $value) = explode('=', $line, 2);

        // Ensure the key is valid (not empty)
        if (empty($key)) {
            echo "Warning: Invalid .env key: $line\n";
            continue;
        }

        putenv("$key=$value");
        $_ENV[$key] = $value;
        $_SERVER[$key] = $value;
    }
}

 
?>
 