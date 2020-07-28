DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
id INT UNSIGNED AUTO_INCREMENT,
name VARCHAR(30) UNIQUE NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT UNSIGNED AUTO_INCREMENT,
title VARCHAR(30) UNIQUE NOT NULL,
salary DECIMAL (6) UNSIGNED NOT NULL,
department_id INT UNSIGNED NOT NULL,
PRIMARY KEY (id),
INDEX dep_ind (department_id),
CONSTRAINT fk_department FOREIGN KEY (department_id) 
REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
id INT UNSIGNED AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT UNSIGNED NOT NULL,
manager_id INT UNSIGNED,
PRIMARY KEY (id),
INDEX role_ind (role_id),
CONSTRAINT fk_role FOREIGN KEY (role_id) 
REFERENCES role(id) ON DELETE CASCADE,
INDEX mng_ind (manager_id),
CONSTRAINT fk_manager FOREIGN KEY (manager_id)
REFERENCES employee(id) ON DELETE CASCADE
);

INSERT INTO department
	(name)
VALUES
	('Financial Management'),
	('Financial Analysts'),
	('Accounting'),
	('Investment');

INSERT INTO role
	(title, salary, department_id)
VALUES
	('Financial Officer', 90000, 1),
    ('Controller', 75000, 1),
    ('Financial advisor', 65000, 2),
    ('Investment analyst', 70000, 2),
    ('Accountant', 60000, 3),
    ('Bookkepper', 40000, 3),
    ('Salesperson', 45000, 4),
    ('Sales manager', 55000, 4);
    
INSERT INTO employee
	(first_name, last_name, role_id, manager_id)
VALUES
	('Kevin', 'Great', 1, NULL),
    ('Marry', 'Brodko', 1, 1),
    ('Andrew', 'Melnyk', 2, 2),
    ('Cassandra', 'Smith', 2, NULL),
    ('Olga', 'Shevchenko', 3, NULL),
    ('John', 'Weismer', 3, 3),
    ('Sofia', 'Goncharenko', 4, 4),
    ('Harry', 'Poter', 4, NULL);
    
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee
