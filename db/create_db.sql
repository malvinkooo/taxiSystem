CREATE DATABASE taxi_system
  CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE cars_list (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  stateCarNumber VARCHAR(20),
  gasolineConsumptionRatio DECIMAL(4,2),
  brand VARCHAR(20),
  description VARCHAR(250)
);

CREATE TABLE drivers_list (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20),
  surname VARCHAR(20),
  phone VARCHAR(20),
  description VARCHAR(250),
  carId INT(11) UNSIGNED,
  currentLocation INT(11) UNSIGNED,
  status ENUM('На заказе', 'Отсутствует', 'Свободен')
);

CREATE TABLE orders_list (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  driverId INT(11) UNSIGNED,
  clientId INT(11) UNSIGNED,
  dateOfCreation DATETIME,
  dateOfCompletion DATETIME,
  carFeedPoint INT(11) UNSIGNED,
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

ALTER TABLE drivers_list
  ADD CONSTRAINT FOREIGN KEY(carId) REFERENCES cars_list(id)
    ON UPDATE RESTRICT
    ON DELETE SET NULL;

ALTER TABLE drivers_list
  ADD UNIQUE (carId);

INSERT INTO cars_list
  (stateCarNumber, gasolineConsumptionRatio, brand, description)
  VALUES
    ('GH121212', '0.12', 'Nissan x3', 'Какое-то описание машины #1'),
    ('FR3456', '12.14', 'Opel c34', 'Какое-то описание машины #2'),
    ('GX4532', '1.15', 'Lexus x3', 'Какое-то описание машины #3'),
    ('UH3456', '4.70', 'Mazda f4', 'Какое-то описание машины #4');

INSERT INTO drivers_list
  (name, surname, phone, description, carId, currentLocation, status)
  VALUES
  ('Валентин', 'Петров', '0999999999', 'Какое-то описание про водителя', 4, NULL, 'Свободен'),
  ('Фродо', 'Беггинс', '0777777777', 'Краткое описание', 3, NULL, 'На заказе'),
  ('Сэм', 'Пупкинс', '0666666666', 'Описание', NULL, NULL, 'Отсутствует');

INSERT INTO orders_list
  (driverId, clientId, dateOfCreation, dateOfCompletion, carFeedPoint, destination, distance, rate, status)
  VALUES
  (1, 1, '2018-07-25 11:15:29', NULL, 1, 2, 1500, '1.10', 'Новый'),
  (2, 2, '2018-07-01 05:12:17', NULL, 1, 2, 1200, '1.10', 'Новый');

INSERT INTO address
  (title, lng, lat)
  VALUES
    ('улица Дерибасовская, 11', '30.7403809', '46.4835766'),
    ('улица Дерибасовская, 20', '30.7360264', '46.4843170');

INSERT INTO client_list
  (name, surname, phone)
  VALUES
  ('Клиент', 'Клиентович', '0999999999'),
  ('Бильбо', 'Беггинс', '0777777777');
