const connection = require("./connection.js");

class DB {
    constructor(connection) {
        this.connection = connection
    }
    findAllEmployees() {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;")
    };
    findEmployeesDepartment(department_id) {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = ?;" , department_id) 
    };
    obtainRoleId() {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name FROM employee")
    };
    // findFinancialManagement() {
    //     return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id")
    // }
    employeeAdd() {
        return this.connection.query("INSERT INTO employee first_name, last_name")
    };
}

module.exports = new DB(connection);