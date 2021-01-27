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
            readEmployees();
        }
        else if(response.question1 === "View all employees by department"){
            console.log("Read employees by department");
        }
        else if(response.question1 === "View all employees by manager"){
            console.log("Read employees by manager");
        }
        else if(response.question1 === "Add employee"){
            // console.log("Insert into employee table");
            addEmployee()
        }
        else if(response.question1 === "Remove employee"){
            // console.log("Delete from employee table");
            removeEmployee();
        }
        else if(response.question1 === "Update employee role"){
            console.log("Update employee with id of blank, role to blank");
        }
        else if(response.question1 === "Update employee manager"){
            console.log("Update employee with id of blank, manager to blank");
        }
        else if(response.question1 === "Add a department"){
            // console.log("Call function to create a department");
            addDepartment();
        }
        else if(response.question1 === "Add a role"){
            console.log("Call a function to create a role");
        }
        else if(response.question1 === "View all departments"){
            // console.log("Call a function to display all the departments")
            readDepartments();
        }
        else if(response.question1 === "View all roles"){
            // console.log("Call a function to display all the roles");
            readRoles();
        }
        else{
            exit();
        }
    });
};

//This question should come after the user wants to remove an employee
function removeEmployee(){
    connection.query("SELECT * FROM employee", function (err, res){
        if(err) throw err;
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee do you want to remove?",
            choices: res.map((employee) => `${employee.first_name} ${employee.last_name}`)
        }
    ])
    .then((toRemove) =>{
        connection.query('DELETE FROM employee WHERE ?',
        {
            first_name: toRemove.first_name,
            // last_name: toRemove.last_name
        },
        function(err, res) {
            if(err) throw err;
            console.log("Removed an employee");
            question1Prompt();
        })
    })
    


    
    });
}

    //This question should come after the user wants to add an employee
function addEmployee(){
    connection.query("SELECT * FROM role", function (err, res){
        if(err) throw err;
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
                choices: res.map((role) => `${role.title}`)
            },
            // {
            //     type: "list",
            //     name: "manager",
            //     message: "Who is the employee's manager?",
            //     choices: res.map((employee) => `${employee.first_name} ${employee.last_name}`)
            // }
        ])
        .then((createdEmployee) =>{
            console.log(`Added ${createdEmployee.first_name} ${createdEmployee.last_name} to the database`);
            connection.query(
                "INSERT INTO employee SET ?",
                createdEmployee,
                function(err, res) {
                    if(err) throw err;
            question1Prompt();
        })
    })
         
        
    });
        
    };



//READ employees
function readEmployees(){
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end;
        question1Prompt();
    });
}

//READ departments
 function readDepartments(){
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end;
        question1Prompt();
    });
}

//READ roles
function readRoles(){
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end;
        question1Prompt();
    });
}


//INSERT INTO departments (add a department)
function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to add?"
        }
    ])
    .then((response) => {
        connection.query("INSERT INTO department SET ?",
        response,
        function(err, res){
            if(err) throw err;
        question1Prompt();
        }
        )
    })

}



//Writing a function to end the computer management system if the user chooses to exit
function exit(){
    console.log("Goodbye for now!");
    connection.end();
}


