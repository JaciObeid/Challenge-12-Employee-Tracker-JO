INSERT INTO department (department_name) 
VALUES
('Customer Service'),
('Engineering'),
('Finance'),
('Human Resources'),
('Legal'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Customer Service Lead', 72000, 1),
('Customer Service Associate', 60000, 1),
('Lead Engineer', 96000, 2),
('Associate Engineer', 89000, 2),
('Finance Lead', 103000, 3),
('Finance Associate', 60000, 3),
('Human Resources Lead', 85000, 4),
('Human Resources Associate', 35000, 4),
('Legal Team Lead', 170000, 5),
('Legal Associate', 82000, 5),
('Sales Lead', 175000, 6),
('Sales Intern', 32000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Scott', 'Johnson', 1, NULL),
('Joey', 'Hawkes', 2, 1),
('Nancy', 'Bwatch', 2, 1),
('Ella', 'Silsea', 3, NULL),
('Mike', 'Wasowski', 4, 4),
('Steve', 'Harrington', 4, 4),
('Edward', 'Smith', 4, 4),
('Cameron', 'Hicks', 5, NULL),
('Yuri', 'Lfown', 6, 8),
('Donald', 'Duck', 6, 8),
('Denis', 'Dannists', 7, NULL),
('Lucy', 'West', 8, 11),
('Ruby', 'Hawkers',9, NULL),
('Eddison', 'Johnson', 10, 13),
('Aaron', 'Obron', 11, NULL),
('Jamie', 'Smith', 12, 15),
('John', 'Hill', 12, 15); 