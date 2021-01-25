const inquirer = require("inquirer");
const mysql = require("mysql");

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