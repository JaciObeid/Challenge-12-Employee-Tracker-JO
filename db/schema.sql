-- Creates database named employeeTracker and delets one if another one already existed 
DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

-- Uses the database named 'employeeTracker_db'
SELECT employeeTracker_db;

-- Creates the table for departments with an id and department name inputs(making sure no department names are the same)
CREATE TABLE IF NOT EXISTS departments(
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

-- Creates the table for roles with id, title(can't already exist to be added), salary, connecting with departments table through id in departments table 
CREATE TABLE IF NOT EXISTS role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Creates the table for employees with id, first and last names, connecting to the role id in the roles table. This also allowed for someone to have a mangaer and connected to a different employee within the same table. 
CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role (id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);