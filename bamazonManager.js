var inquirer = require('inquirer');
var mysql = require('mysql');

// Create mysql connection
var connection = mysql.createConnection( {
  host: 'localhost',
  port: 3306,
  user: 'chris',
  password: 'root1root',
  database: 'bamazonDB'
});

  connection.connect(function(err) {
    if(err) throw err;
    // Display if connected or throw error
    console.log("Connected as id: " + connection.threadId); 
    mgrSelect();
  });

// Query user input and define previously called function
function mgrSelect() {
var productsForSale = 'View Products for Sale';
var lowInventory = 'View Low Inventory';
var addInventory = 'Add to Inventory';
var addNewProduct = 'Add New Product';

  inquirer.prompt (
      {
        type: "list",
        name: "mgrChoice",
        choices: [
          'productsForSale',
          'lowInventory',
          'addInventory',
          'addNewProduct'
        ]
      }
    ) 
      // Respond to mgr input 
      .then(function(answer) {
        // Loop through products list and display row data in a list
        for (var i = 0; i < res.length; i++) {
          
          if(answer.choices === productsForSale) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            console.log('-------------------------------------------------');
          } else if(answer.choices === lowInventory && stock_quantity <=5) {
            // console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            console.log('-------------------------------------------------');
          }         
        }
      });
    }
          
