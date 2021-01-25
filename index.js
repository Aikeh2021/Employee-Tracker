const inquirer = require("inquirer");
const mysql = require("mysql");

//Setting up the connection to mySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "GTPTFall2020",
    database: "company_db"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    question1Prompt();
})


//Each time an employee is added, they need to be pushed into an array. This will help with the remove employee function
let employeeArray = [];
let managerArray = ["Not Applicable"];
let roleTitleArray = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"];
let departmentArray = ["Sales", "Engineering", "Finance", "Legal"];

//this is the first question user will see
const question1Prompt = function askQuestion1(){
    inquirer.prompt([
        {
            type: "list",
            name: "question1",
            message: "What would you like to do?",
            choices: ["View all employees", "View all employees by department", "View all employees by manager", "Add employee", "Remove employee", "Update employee role", "Update employee manager", "Add a department", "Add a role", "View all departments", "View all roles", "EXIT"]
        }
    ])
    .then((response) => {
        if(response.question1 === "View all employees"){
            // console.log("Read employee table");
            readAllEmployees();
        }
        else if(response.question1 === "View all employees by department"){
            console.log("Read employees by department");
        }
        else if(response.question1 === "View all employees by manager"){
            console.log("Read employees by manager");
        }
        else if(response.question1 === "Add employee"){
            // console.log("Insert into employee table");
            question3Prompt();
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
        else if(response.question1 === "Add a department"){
            console.log("Call function to create a department");
        }
        else if(response.question1 === "Add a role"){
            console.log("Call a function to create a role");
        }
        else if(response.question1 === "View all departments"){
            console.log("Call a function to display all the departments")
        }
        else if(response.question1 === "View all roles"){
            console.log("Call a function to display all the roles");
        }
        else{
            exit();
        }
    });
};

//This question should come after the user wants to remove an employee
const question2Prompt = function askQuestion2(){
    inquirer.prompt([
        {
            type: "list",
            name: "question2",
            message: "Which employee do you want to remove?",
            choices: employeeArray
        }
    ])
    .then((selectedEmployee) =>{
        console.log("Call the delete function");
        //call the delete employee function
        //loop over the employee array and remove the selected employee
    });
}

    //This question should come after the user wants to add an employee
    const question3Prompt = function askAddFollowUps(){
        console.log("something");
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: roleTitleArray
            },
            {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: managerArray
            }
        ])
        .then((createdEmployee) =>{
            console.log(`Added ${createdEmployee.first_name} ${createdEmployee.last_name} to the database`);
            //CREATE an employee
            connection.query(
                "INSERT INTO employee SET ?",
                createdEmployee,
                function(err, res) {
                    if(err) throw err;
                    let newEmployee = "";
                    newEmployee = `${createdEmployee.first_name} ${createdEmployee.last_name}` + newEmployee;
                employeeArray.push(newEmployee);
                console.log(employeeArray);
            question1Prompt();
        })
            
        
    });
        
    };
    

//DELETE an employee
const deleteEmployees = function deleteEmployee() {
    connection.query("DELETE FROM employee WHERE ?",
    {
        first_name: "employee's first name",
        last_name: "employee's last name"
    },
    function (err, res) {
        if (err) throw err;
        console.log("Removed employee from the database");
        //write a function to loop over the array and remove the removed employee from the array;
        connection.end;
        question1Prompt();
    }
    );
}



//Writing out the functions for to interact with sql database

//READ employees
const readAllEmployees = function readEmployees(){
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end;
        question1Prompt();
    });
}


//Writing a function to end the computer management system if the user chooses to exit
function exit(){
    console.log("Goodbye for now!");
    connection.end();
}


