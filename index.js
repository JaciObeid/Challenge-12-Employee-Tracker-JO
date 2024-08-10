//Gets inquirer so node can ask questions
const inquirer = require("inquirer")

//Allows interaction with postgres
const {Pool} = require("pg");


//Allows PostgreSQL pool connection using the user and password inputs change them for your personal local host when you use them
const pool = new Pool({
    user: 'postgres', 
    password: '',
    host: 'localhost',
    database: 'employeeTracker_db'
}, console.log(`Connected to the employee database.`));

//------ Start the User Input ------//

async function MainQuestions(){
    try{
        const answers = await inquirer.prompt([
            {
                type:'list',
                name:'selection',
                message:'What would you like to do?',
                choices:[
                    'Add Employee', 
                    'Add Role',
                    'Add Department',
                    'Update Employee Role',
                    'View all Employees',
                    'View All Roles',
                    'View All Departments',
                    'Exit'
                ]
            }
        ]);
//---------After inital choice is made it will go through these case statments------//
        
    switch(answers.selection){
        case 'Add Employee':
                try{
                    const roles = await pool.query("SELECT id as value, title as name from role");
                    const managers = await pool.query("select id as value, first_name || ' ' || last_name as name from employee");
                    const answers = await inquirer.prompt([
                        {
                            type:'input',
                            name:'first_name',
                            message:"What is the employee's first name?"
                        },
                        {
                            type:'input',
                            name:'last_name',
                            message:"What is the employee's last name?"
                        },
                        {
                            type:'list',
                            name:'role_id',
                            message:"What is the employee's role?",
                            choices: roles.rows
                        },
                        {
                            type:'list',
                            name:'manager_id',
                            message:"Who is the employee's manager?",
                            choices: managers.rows
                        },
            
                    ]);
            
                    await pool.query(
                        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`,
                        [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
                    MainQuestions();
                    } 
            catch(err){
                    console.log('Error occured please try again', err);
                        }
            break;
        case 'Add Role':
            try{
                const departments = await pool.query("SELECT id as value, department_name as name from departments");
                const answers = await inquirer.prompt([
                    {
                        type:'input',
                        name:'title',
                        message:"What is the name of the role?"
                    },
                    {
                        type:'input',
                        name:'salary',
                        message:"What is the salary of the role?"
                    },
                    {
                        type:'list',
                        name:'department_id',
                        message:"Which department does the role belong to?",
                        choices: departments.rows
                    }
                ]);
                const res = await pool.query(`INSERT INTO role (title, salary, department_id) values ($1, $2, $3);`, 
                [answers.title, answers.salary, answers.department_id]);
                MainQuestions(); 
            } catch(err){
                console.log('Error occur try again', err);
            }     
                break;
        case 'Add Department':
            try{
                const answers = await inquirer.prompt([
                    {
                        type:'input',
                        name:'name',
                        message:"What is the name of the department?"
                    }
                ]);
            
                const res = await pool.query(`INSERT INTO departments (department_name)
                VALUES($1);`, 
                [answers.name]);
                MainQuestions();  
        
            } catch(err){
                    console.log('Error occured try again', err);
            }
                break;
        case 'Update Employee Role':
            try{
                const roles = await pool.query("SELECT id as value, title as name from role");
                const employees = await pool.query("select id as value, first_name || ' ' || last_name as name from employee");
                const answers = await inquirer.prompt([
                    {
                        type:'list',
                        name:'id',
                        message:"Which employee do you want to update?",
                        choices: employees.rows
                    },
                    {
                        type:'list',
                        name:'role_id',
                        message:"Which role do you want to assign the selected employee?",
                        choices: roles.rows
                    }
            
                ]);
            
                await pool.query(
                    `UPDATE employee SET role_id = $1 WHERE id = $2`,
                    [answers.role_id, answers.id]);
                MainQuestions();   
            
        
            } catch(err){
                console.log('Error occured please try again', err);
            }
                break;
        case 'View all Employees':
                try{
                    const res = await pool.query(
                        `SELECT employee.id AS employee_id,employee.first_name, employee.last_name, role.title AS role_title, role.salary, departments.department_name AS department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee JOIN role ON employee.role_id = role.id JOIN departments ON role.department_id = departments.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id`);
                    console.table(res.rows);
                    MainQuestions();
            
                } catch(err){
                    console.log('Error occured try again', err);
                }
                break;
            case 'View All Roles':
                try{
                    const res = await pool.query('SELECT role.title, role.salary, departments.department_name FROM role join departments on role.department_id = departments.id');
                    console.table(res.rows);
                    MainQuestions();
            
                } catch(err){
                    console.log('Error occured try again', err);
                }
                break;
            case 'View All Departments':
                try{
                    const res = await pool.query('SELECT * FROM departments');
                    console.table(res.rows);
                    MainQuestions();
                } catch(err){
                    console.log('Error occured try again', err);
                }
                break;
            case 'Exit':
                pool.end();
                break;
            default:
                console.log('Invalid choice');
                break;
        }

    } catch (err) {
    console.log('Error', err);
    }
}


// Starts questions starting at the main menu questions after application is called in the termainal
MainQuestions();