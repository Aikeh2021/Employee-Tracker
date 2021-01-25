const inquirer = require("inquirer");
const mysql = require("mysql");

//Each time an employee is added, they need to be pushed into an array. This will help with the remove employee function
let employeeArray = [];

//this is the first question user will see
inquirer.prompt([
    {
        type: "list",
        name: "question1",
        message: "What would you like to do?",
        choices: ["View all employees", "View all employees by department", "View all employees by manager", "Add employee", "Remove employee", "Update employee role", "Update employee manager"]
    }
])
.then((response) => {
    if(response.question1 === "View all employess"){
        console.log("Read employee table");
    }
    else if(response.question1 === "View all employees by department"){
        console.log("Read employees by department");
    }
    else if(response.question1 === "View all employees by manager"){
        console.log("Read employees by manager");
    }
    else if(response.question1 === "Add employee"){
        console.log("Insert into employee table");
    }
    else if(response.question1 === "Remove employee"){
        console.log("Delete from employee table");
    }
    else if(response.question1 === "Update employee role"){
        console.log("Update employee with id of blank, role to blank");
    }
    else if(response.question1 === "Update employee manager"){
        console.log("Update employee with id of blank, manager to blank");
    }
    else{
        console.log("Goodbye!");
    }
});

//Writing out the functions for to interact with sql database

//READ employees
const readAllEmployees = function readEmployees(){
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end;
    });
}

//DELETE an employee
const deleteEmployees = function deleteEmployee() {
    connection.query("DELETE FROM employee WHERE ?",
    {

    })
}