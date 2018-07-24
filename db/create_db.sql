CREATE DATABASE taxi_system
  CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE cars_list (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  state_car_number VARCHAR(20),
  gasoline_consumption_ratio DECIMAL(4,2),
  brand VARCHAR(20),
  description VARCHAR(250)
);

CREATE TABLE drivers_list (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20),
  surname VARCHAR(20),
  phone VARCHAR(20),
  description VARCHAR(250),
  car_id INT(11) UNSIGNED,
  current_location INT(11) UNSIGNED,
  status ENUM('На заказе', 'Отсутствует', 'Свободен')
);

CREATE TABLE orders_list (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  driver_id INT(11) UNSIGNED,
  client_id INT(11) UNSIGNED,
  data_create DATE,
  data_completion DATE,
  car_feed_point INT(11) UNSIGNED,
  destination INT(11) UNSIGNED,
  distance INT(10),
  rate DECIMAL(4,2),
  status ENUM('Новый', 'Выполняется', 'Выполнен', 'Отменен')
);

CREATE TABLE client_list (
  id INt(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20),
  surname VARCHAR(20),
  phone VARCHAR(20)
);

CREATE TABLE address (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50),
  lng DECIMAL(12,10),
  lat DECIMAL(12,10)
);