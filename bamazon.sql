DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
 id int not null AUTO_INCREMENT,
 name varchar(100) not null,
 department varchar(100) not null,
 price decimal(10,2) not null,
 stock integer(10) not null,
 primary key (id)
);

INSERT INTO products (name, department, price, stock)
VALUES ("Mountain Bike", "Sports/Outdoors", 200.50, 10);

INSERT INTO products (name, department, price, stock)
VALUES ("Stuffed Bear", "Toys", 9.99, 100);

INSERT INTO products (name, department, price, stock)
VALUES ("Macbook Pro", "Electronics", 1999.99, 25);

INSERT INTO products (name, department, price, stock)
VALUES ("iPhone", "Electronics", 999.99, 50);

INSERT INTO products (name, department, price, stock)
VALUES ("Discraft Ultrastar", "Sports/Outdoors", 14.99, 400);

INSERT INTO products (name, department, price, stock)
VALUES ("The Northface Jacket", "Clothing", 149.99, 17);

INSERT INTO products (name, department, price, stock)
VALUES ("Scarf", "Clothing", 4.99, 130);

INSERT INTO products (name, department, price, stock)
VALUES ("Nike Air Max", "Clothing", 199.99, 7);

