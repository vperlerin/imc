-- Drop database if it exists
DROP DATABASE IF EXISTS MYSQL_DATABASE;

-- Create new database
CREATE DATABASE MYSQL_DATABASE DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE MYSQL_DATABASE;

-- Drop and recreate user
DROP USER IF EXISTS 'MYSQL_USER'@'localhost';
CREATE USER 'MYSQL_USER'@'localhost' IDENTIFIED BY 'MYSQL_PASSWORD';
GRANT ALL PRIVILEGES ON MYSQL_DATABASE.* TO 'MYSQL_USER'@'localhost';
FLUSH PRIVILEGES;

-- Admin Table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Participants Table  
CREATE TABLE IF NOT EXISTS participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title ENUM('Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.') NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country CHAR(2) NOT NULL,
    organization VARCHAR(255) DEFAULT NULL,
    dob DATE NOT NULL,
    admin_notes TEXT DEFAULT NULL,
    is_online BOOLEAN NOT NULL DEFAULT FALSE,
    is_early_bird BOOLEAN NOT NULL DEFAULT FALSE,
    confirmation_sent BOOLEAN NOT NULL DEFAULT FALSE,
    confirmation_date DATETIME DEFAULT NULL,
    password_hash VARCHAR(255) NOT NULL, 
    paypal_fee DECIMAL(10,2) UNSIGNED NOT NULL DEFAULT 0.00,
    payment_method_id INT NOT NULL,  
    total_due DECIMAL(10,2) UNSIGNED NOT NULL DEFAULT 0.00,
    total_paid DECIMAL(10,2) UNSIGNED NOT NULL DEFAULT 0.00, 
    total_reimbursed DECIMAL(10,2) UNSIGNED NOT NULL DEFAULT 0.00, 
    status ENUM('active', 'deleted') NOT NULL DEFAULT 'active',
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    comments TEXT DEFAULT NULL,  
    guardian_name VARCHAR(100) DEFAULT NULL, 
    guardian_contact VARCHAR(20) DEFAULT NULL,  
    guardian_email VARCHAR(255) DEFAULT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Password Reset Table
CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (email), 
    INDEX (token)
);

-- Payment Methods Table
CREATE TABLE IF NOT EXISTS payment_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    method VARCHAR(50) NOT NULL UNIQUE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert payment methods safely
INSERT IGNORE INTO payment_methods (method) VALUES ('Paypal');
INSERT IGNORE INTO payment_methods (method) VALUES ('Bank Transfer');
INSERT IGNORE INTO payment_methods (method) VALUES ('Other');

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    amount DECIMAL(10,2) NOT NULL,
    payment_method_id INT NOT NULL,  
    admin_note TEXT DEFAULT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Workshops Table
CREATE TABLE IF NOT EXISTS workshops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    period VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) UNSIGNED NOT NULL DEFAULT 0.00,
    price_online DECIMAL(10,2) UNSIGNED NOT NULL DEFAULT 0.00,
    responsible_name VARCHAR(255) NOT NULL,
    responsible_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Participant-Workshops Relation Table
CREATE TABLE IF NOT EXISTS participant_workshops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    workshop_id INT NOT NULL,
    attending BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Participant Arrival Table
CREATE TABLE IF NOT EXISTS arrival (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    arrival_date DATE NOT NULL,
    arrival_hour TINYINT UNSIGNED NOT NULL CHECK (arrival_hour BETWEEN 0 AND 23),
    arrival_minute TINYINT UNSIGNED NOT NULL CHECK (arrival_minute BETWEEN 0 AND 59),
    departure_date DATE NOT NULL,
    departure_hour TINYINT UNSIGNED NOT NULL CHECK (departure_hour BETWEEN 0 AND 23),
    departure_minute TINYINT UNSIGNED NOT NULL CHECK (departure_minute BETWEEN 0 AND 59),
    travelling ENUM('car', 'bus', 'plane', 'train', 'local', 'undecided') NOT NULL,
    travelling_details TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- IMC Sessions Table
CREATE TABLE IF NOT EXISTS imc_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contributions Table
CREATE TABLE IF NOT EXISTS contributions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    type ENUM('talk', 'poster') NOT NULL,
    title VARCHAR(255) NOT NULL,
    authors TEXT NOT NULL,
    abstract TEXT NOT NULL,
    session_id INT NOT NULL,
    duration ENUM('10min', '15min', '20min', '25min', '30min') NULL,
    paper_submission ENUM('before_imc', 'during_imc', 'after_imc') NOT NULL,
    print BOOLEAN NOT NULL DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES imc_sessions(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Registration Types Table
CREATE TABLE IF NOT EXISTS registration_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100) NOT NULL UNIQUE,
    price DECIMAL(10,2) UNSIGNED NOT NULL DEFAULT 0.00,
    description TEXT NOT NULL,
    total INT UNSIGNED NOT NULL DEFAULT 0,  
    room_left INT UNSIGNED NOT NULL DEFAULT 0   
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Participant Accommodation Table
CREATE TABLE IF NOT EXISTS accommodation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    registration_type_id INT NOT NULL,
    late_booking_fee DECIMAL(10,2) UNSIGNED NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (registration_type_id) REFERENCES registration_types(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Extra Options Table
CREATE TABLE IF NOT EXISTS extra_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    excursion BOOLEAN NOT NULL DEFAULT FALSE,   
    buy_tshirt BOOLEAN NOT NULL DEFAULT FALSE, 
    tshirt_size VARCHAR(50) DEFAULT NULL,  
    proceedings ENUM('pdf', 'pdf_printed') NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
