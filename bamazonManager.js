var inquirer = require('inquirer');
var mysql = require('mysql');
require("console.table");

var connection = mysql.createConnection( {
  host: 'localhost',
  port: 3306,
  user: 'chris',
  password: 'root1root',
  database: 'bamazonDB'
});

  connection.connect(function(err) {
    if(err) {
    console.error("Error connecting: " + err.stack);
  } else {
    console.log("Connected as id: " + connection.threadId); 
    makeTable();
  }
});

function makeTable() {
  connection.query("SELECT * FROM products", function(err,res) {
    if(err) {
    console.error("Error connecting: " + err.stack);       
  }
  mgrSelect();
  });
}

// Query user input
function mgrSelect() {
  var productsForSale = 'View Products for Sale';
  var lowInventory = 'View Low Inventory';
  var addInventory = 'Add to Inventory';
  var addNewProduct = 'Add New Product';
  var quit = "Quit";

  inquirer.prompt (
    {
      name: "mgrChoice",
      type: "list",
      message: "Make your selection",
      choices: [ productsForSale, lowInventory, addInventory, addNewProduct, quit]
    }
  ) 
  
  // Respond to mgr input and call function
  .then(function(answer) {
      if(answer.mgrChoice === productsForSale) {
        viewProducts();
      } else if(answer.mgrChoice === lowInventory && stock_quantity <=5) {
        viewLowInv();
      } else if(answer.mgrChoice === addInventory) {
        viewAddInv();
      } else if(answer.mgrChoice === addNewProduct) {
        addNewProduct();
      } else {
        process.exit();
      }
  });  
}

// Fetch date and display in table format
function viewProducts() {
  // Make table with all data
  connection.query("SELECT * FROM products", function(err,res) {
    if(err) {
    console.error("Error connecting: " + err.stack);       
  } else {
    console.table(res); 
  }
  console.log("======================================================================");
  return mgrSelect();
  });
} 
  

function quit() {
  console.log("You have exited the program.");
  process.exit();
}

