CREATE DATABASE IF NOT EXISTS restaurant_reservation;

USE restaurant_reservation;

-- Create Users Table
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userName VARCHAR(50) NOT NULL,
  userEmail VARCHAR(50) UNIQUE NOT NULL
);

-- Create Reservations table with userEmail as a foreign key
CREATE TABLE Reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userEmail VARCHAR(50) NOT NULL,
  reservationTime DATETIME NOT NULL,
  tableNumber INT NOT NULL,
  FOREIGN KEY (userEmail) REFERENCES Users(userEmail)
);