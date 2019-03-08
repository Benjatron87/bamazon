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
            choices: ['Buy Something', 'Exit']
        }
    ]).then(function(res){

        switch(res.option){
            case 'Buy Something':
                purchaseItem()
                break;
            case 'Exit':
                connection.end()
                break;
        }
    }) 
}

mainMenu();

function purchaseItem(){

    connection.query(`select * from products`, (err, data) => {
        if(err) throw err;

        console.log("\n");

        for (let i = 0; i < data.length; i++) {
        
            console.log(`ID: ${data[i].id} | Item: ${data[i].name} | Price: $${data[i].price}`);
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
                message: "Enter the amount you want:"
            }
          
        ]).then(function(res) {
    
            connection.query(`select * from products where id = ?`, res.id, (err, data) => {
                if (err) throw err
                
                if(res.num <= data[0].stock){
                    connection.query(
                        `UPDATE products SET ? WHERE ?`,
                        [
                            {
                              stock: data[0].stock - res.num
                            },
                            {
                              id: res.id
                            }
                          ]
                       )
                       console.log(`You have Purchased ${res.num} ${data[0].name}(s)`)
                       mainMenu();
                    }
                else{
                    console.log("There are not enough in Stock!")
                    mainMenu();
                }
               })
          
        })
       })

}