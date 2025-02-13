<?php
// Load environment variables from /DATA/sites/imc2025.imo.net/env/.env
$envPath = realpath(__DIR__ . '/../env/.env');   

if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;  
        list($key, $value) = explode('=', $line, 2);
        putenv("$key=$value");
        $_ENV[$key] = $value;
        $_SERVER[$key] = $value;
    }
}

define('BASE_PATH', dirname(__DIR__, 2));  
 
?>
 