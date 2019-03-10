require("dotenv").config();
let mysql = require("mysql");
let inq = require("inquirer");
let password = process.env.PASSWORD;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password,
    database: "bamazon"
  });

function mainMenu(){
    inq.prompt([
        {
            name: 'option',
            type: 'list',
            message: "What do You Want to Do?",
            choices: ['View Products for Sale:', 'View Low Inventory:', 'Add to Inventory:', 'Add a New Product:', 'Exit']
        }
    ]).then(function(res){

        switch(res.option){
            case 'View Products for Sale:':
                viewProducts();
                break;
            case 'View Low Inventory:':
                viewLowInventory();
                break;
            case 'Add to Inventory:':
                addInventory();
                break;
            case 'Add a New Product:':
                addProduct()
                break;
            case 'Exit':
                connection.end()
                break;
        }
    }) 
}

mainMenu();

function viewProducts(){
    connection.query(`select * from products`, (err, data) => {
        if(err) throw err;

        console.log("\n");

        for (let i = 0; i < data.length; i++) {
        
            console.log(`ID: ${data[i].id} | Item: ${data[i].name} | Department: ${data[i].department} | Price: $${data[i].price} | Quanitity: ${data[i].stock}`);
        }
        mainMenu();
    })
}

function viewLowInventory(){
    connection.query(`select * from products`, (err, data) => {
        if(err) throw err;

        for (let i = 0; i < data.length; i++) {
            
            if(data[i].stock < 6){
                console.log(`ID: ${data[i].id} | Item: ${data[i].name} | Price: $${data[i].price} | Quanitity: ${data[i].stock}`);  
            }
        }
        console.log("\n");

        mainMenu();
    })
}

function addInventory(){

    connection.query(`select * from products`, (err, data) => {
        if(err) throw err;

        console.log("\n");

        for (let i = 0; i < data.length; i++) {
        
            console.log(`ID: ${data[i].id} | Item: ${data[i].name} | Price: $${data[i].price} | Quanitity: ${data[i].stock}`);
        }

        inq.prompt([

            {
                type: "input",
                name: "id",
                message: "Enter the item's ID number:"
            },
    
            {
                type: "input",
                name: "num",
                message: "Enter the Amount you Want to Add:"
            }
          
        ]).then(function(res) {
    
            connection.query(`select * from products where id = ?`, res.id, (err, data) => {
                if (err) throw err

                let add = parseInt(res.num);
            
                connection.query(
                    `UPDATE products SET ? WHERE ?`,
                    [
                        {
                            stock: data[0].stock + add
                        },
                        {
                            id: res.id
                        }
                        ]
                    )
                console.log(`You have added ${res.num} ${data[0].name}(s)`)

                viewProducts();
                mainMenu();
            })
          
        })
    })

}

function addProduct(){

    inq.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter new Item Name:"
        },
        {
            type: "input",
            name: "department",
            message: "Enter Department:"
        },
        {
            type: "input",
            name: "price",
            message: "Enter Price per Unit:"
        },
        {
            type: "input",
            name: "stock",
            message: "Enter Quantity:"
        }
    ]).then(function(res) {

        connection.query(
            "INSERT INTO products SET ?",
            {
              name: res.name,
              department: res.department,
              price: res.price,
              stock: res.stock
            },
            function(err, res) {
              if(err) throw err;

              console.log(res.affectedRows + " product inserted!\n");

              viewProducts();
              mainMenu();
            })

    })
}