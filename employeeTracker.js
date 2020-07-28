const inquirer = require("inquirer");
//const table = require("console.table");
const db = require("./db");

const TABLE_ALL_EMPLOYEES = "View all employees";
const TABLE_ALL_EMPLOYEES_BY_DEPARTMENT = "View All Employees By Department";
const TABLE_ALL_EMPLOYEES_BY_MANAGER = "View All Employees By Manager";
const TABLE_EMPLOYEE_ADD = "Add Employee";
const TABLE_EMPLOYEE_REMOVE = "Remove Employee";
const TABLE_EMPLOYEE_ROLE_UPDATE = "Update Employee Role";
const TABLE_EMPLOYEE_MANAGER_UPDATE = "Update Employee Manager";
const EXIT = "exit";

const Financial_Management = "Financial Management";
const Financial_Analysts = "Financial Analysts";
const Accounting_Department = "Accounting Department";
const Investment_Department = "Investment";
const departments = [Financial_Management, Financial_Analysts, Accounting_Department, Investment_Department];

start();

async function start() {
    inquirer
        .prompt(
            {
                name: "menuOfQuestions",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    TABLE_ALL_EMPLOYEES,
                    TABLE_ALL_EMPLOYEES_BY_DEPARTMENT,
                    TABLE_ALL_EMPLOYEES_BY_MANAGER,
                    TABLE_EMPLOYEE_ADD,
                    TABLE_EMPLOYEE_REMOVE,
                    TABLE_EMPLOYEE_ROLE_UPDATE,
                    TABLE_EMPLOYEE_MANAGER_UPDATE,
                    EXIT
                ]
            }
        )
        .then(function (answer) {
            console.log("ANSWER: ", answer);
            switch (answer.menuOfQuestions) {
                case TABLE_ALL_EMPLOYEES:
                    console.log("all employees!");
                    employeesSearch();
                    break;
                case TABLE_ALL_EMPLOYEES_BY_DEPARTMENT:
                    console.log("all employees by department!");
                    employeesDepartment();
                    break;
                case TABLE_ALL_EMPLOYEES_BY_MANAGER:
                    console.log("all employees by manager!");
                    break;
                case TABLE_EMPLOYEE_ADD:
                    console.log("employee added!");
                    employeeAdd();
                    break;
                case TABLE_EMPLOYEE_REMOVE:
                    console.log("employee removed!");
                    break;
                case TABLE_EMPLOYEE_ROLE_UPDATE:
                    console.log("employee role updated!");
                    updateEmployeeRole();
                    break;
                case TABLE_EMPLOYEE_MANAGER_UPDATE:
                    console.log("employee manager updated!");
                    break;
                case EXIT:
                    console.log("Come back again!");
                    connection.end();
                    break;
            }
        });

    async function employeesSearch() {
        const employees = await db.findAllEmployees();
        employees.forEach(employee => console.log(`ID: ${employee.id} | First Name: ${employee.first_name} | Last Name: ${employee.last_name} | Title:${employee.title} | Department: ${employee.department} | Salary: ${employee.salary} | Manager: ${employee.manager}`));
        start();
    };


    function employeesDepartment() {
        return inquirer
            .prompt(
                {
                    name: "departments",
                    type: "list",
                    message: "Choose a department",
                    choices: [
                        Financial_Management,
                        Financial_Analysts,
                        Accounting_Department,
                        Investment_Department
                    ]
                }
            )
            .then(function (answer) {
                switch (answer.departments) {
                    case Financial_Management:
                        return findEmployeesDepartment(1);
                        break;
                    case Financial_Analysts:
                        return findEmployeesDepartment(2);
                        break;
                    case Accounting_Department:
                        return findEmployeesDepartment(3);
                        break;
                    case Investment_Department:
                        return findEmployeesDepartment(4);
                        break;
                }
            }).then (function (employees) {
               
            })

    };

    // async function findFinancialManagement() {
    //     const query = ``
    // };

    async function findEmployeesDepartment(department_id) {
        // departments.forEach(employee => console.log(`ID: ${employee.id} | First Name: ${employee.first_name} | Last Name: ${employee.last_name} | Title:${department.title} | Department: ${department_id}`));
        const employees = await db.findEmployeesDepartment(department_id);
        employees.forEach(employee => console.log(`ID: ${employee.id} | First Name: ${employee.first_name} | Last Name: ${employee.last_name} | Title:${employee.title} | Department: ${employee.department}`));
        start();
    };

    async function updateEmployeeRole(info) {
        const role = await db.obtainRoleId(info.role);
        const query = `UPDATE employee SET role_id = ? WHERE employee.first_name = ? AND employee.last_name = ?`;
        const args = [role, employee.id[0], employee.id[1]];
        await connection.query(query, args);
        console.log(`updated ${employee.id[0]} ${employee.id[1]} with a new role ${info.role}`)
        start();
    };

   async function employeeAdd() {
        return inquirer
            .prompt(
                {
                    name: "firstName",
                    type: "input",
                    message: "What is a new employees's first name?"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is a new employees's last name?"
                },
                {
                    name: "roleId",
                    type: "input",
                    message: "What is a new employees' rol?"
                },
                {
                    name: "managerId",
                    type: "input",
                    message: "Who is a manager for a new employee?",

                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            )
            .then(function (answer) {
                connection.query(
                    "INSERT INTO employee SET ?",
                    // {
                    //     first_name = answer.firstName,
                    //     last_name = answer.lastName,
                    //     role_id = answer.roleId,
                    //     manager_id = answer.managerId
                    // },
                    function (err) {
                        if (err) throw err;
                        console.log("A new employee was successfully added!");
                        start();
                    }
                );
            });
    }
}
