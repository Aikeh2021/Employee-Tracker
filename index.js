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
    console.log(response);
});