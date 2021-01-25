-- Drops the company_db if it exists currently --
DROP DATABASE IF EXISTS company_db;
-- Creates the "company_db" database --
CREATE DATABASE company_db;

-- Makes it so all of the following code will affect company_db --
USE company_db;

-- Creates the table "department" within company_db --
CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL,
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);


-- Creates the table "role" within company_db --
CREATE TABLE role (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "title" which cannot contain null --
  title VARCHAR(30) NOT NULL,
  -- Create a numeric column that accepts decimals. Will be called "salary." You can put 7 numbers before the decimal point and 2 after the decimal point.
  salary DECIMAL (7,2) NOT NULL,
  -- to hold reference to role employee has --
  department_id INTEGER NOT NULL,
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);

-- Creates the table "employee" within company_db --
CREATE TABLE employee (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER AUTO_INCREMENT NOT NULL,
  -- Creates a string column called "first_name" to hold employee's first name. --
  first_name VARCHAR (30) NOT NULL,
  -- Creates a string column called "last_name" to hold employee's last name. --
  last_name VARCHAR (30) NOT NULL,
  -- Creates a numeric column called "role_id" to hold reference to role employee has --
  role_id INTEGER NOT NULL,
  -- Creates a numeric column called "manager_id" to to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager. --
  manager_id INTEGER,
  PRIMARY KEY (id)
  );
  
  SELECT * FROM department;
  SELECT * FROM role;
  SELECT * FROM employee;


-- Creates new rows containing data in the named columns --
INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ashley", "Ikeh", 4);