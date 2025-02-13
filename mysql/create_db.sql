CREATE DATABASE IF NOT EXISTS MYSQL_DATABASE;
USE MYSQL_DATABASE;

CREATE USER 'MYSQL_USER'@'localhost' IDENTIFIED BY 'MYSQL_PASSWORD'; 
GRANT ALL PRIVILEGES ON MYSQL_DATABASE.* TO 'MYSQL_USER'@'localhost';
FLUSH PRIVILEGES;

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
    organization VARCHAR(255),
    dob DATE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workshops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS participant_workshops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    workshop_id INT NOT NULL,
    attending BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS participant_arrival (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    arrival_date DATE NOT NULL,
    arrival_hour TINYINT NOT NULL CHECK (arrival_hour BETWEEN 0 AND 23),
    arrival_minute TINYINT NOT NULL CHECK (arrival_minute BETWEEN 0 AND 59),
    departure_date DATE NOT NULL,
    departure_hour TINYINT NOT NULL CHECK (departure_hour BETWEEN 0 AND 23),
    departure_minute TINYINT NOT NULL CHECK (departure_minute BETWEEN 0 AND 59),
    travelling ENUM('car', 'bus', 'plane', 'train', 'local', 'undecided') NOT NULL,
    travelling_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS imc_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES imc_sessions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS registration_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100) NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    method VARCHAR(50) NOT NULL UNIQUE 
);

INSERT IGNORE INTO payment_methods (method) VALUES
('Paypal'),
('Bank Transfer'),
('Other');

CREATE TABLE IF NOT EXISTS participant_accommodation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    registration_type_id INT NOT NULL,
    late_booking_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    payment_method_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (registration_type_id) REFERENCES registration_types(id) ON DELETE CASCADE,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS extra_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    excursion BOOLEAN NOT NULL DEFAULT FALSE,   
    buy_tshirt BOOLEAN NOT NULL DEFAULT FALSE, 
    tshirt_size VARCHAR(50) DEFAULT NULL, 
    tshirt_price DECIMAL(10,2) NOT NULL,
    proceedings ENUM('pdf', 'pdf_printed') NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS participant_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    comments TEXT DEFAULT NULL,   
    service_agreement BOOLEAN NOT NULL DEFAULT FALSE,  
    guardian_name VARCHAR(255) DEFAULT NULL,  
    guardian_contact VARCHAR(50) DEFAULT NULL,  
    guardian_email VARCHAR(255) DEFAULT NULL, 
    parental_consent BOOLEAN DEFAULT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
);
