-- Drop any previous DB with this name
DROP DATABASE bamazonDB;
-- Create and use DB
CREATE DATABASE bamazonDB;
USE bamazonDB;
-- Set table parameters
CREATE TABLE products(
  item_id INT unsigned NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(20) NOT NULL,
  price DECIMAL(5,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);
-- Inserting  rows of data to the products table
INSERT INTO bamazonDB.products (product_name, department_name, price, stock_quantity)
values ('Mirror', 'Home Decore', '1', '10'),
       ('TV', 'Electronics', '5.5', '12'),
       ('Computer', 'Electronics', '999.99', '8'),
       ('Bath Rug', 'Home Decore', '8.75', '23'),
       ('Cement', 'Building Supplies', '18.95', '60'),
       ('Fence Post', 'Building Supplies', '15.95', '98'),
       ('Screw', 'Hardware', '.25', '695'),
       ('Paint Brush', 'Paint', '19.98', '42'),
       ('Wall Cabinet', 'Interior Design', '1895', '8'),
       ('fishing pole', 'Sporting Goods', '39.95', '29');