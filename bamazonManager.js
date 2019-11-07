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
  }
    makeTable();
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
  var quit = 'Quit';

  inquirer.prompt (
    {
      name: "mgrChoice",
      type: "list",
      message: "Make your selection",
      choices: [ productsForSale, lowInventory, addInventory, addNewProduct, quit ],
      validate: function(value) {
        if(isNaN(value) == false) {
          return true;
        } else {
          return false;
        }
      }
    }
  ) 
  
  // Respond to mgr input and call function
  .then(function(answer) {
      if(answer.mgrChoice === productsForSale) {
        viewProducts();
      } else if(answer.mgrChoice === lowInventory) {
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
  console.log("All available items listed for sale.");
  connection.query("SELECT * FROM products", function(err,res) {
    if(err) throw err;
     console.table(res); 
  
  console.log("======================================================================");
  return mgrSelect();
  });
} 

function viewLowInv() {
  console.log("Inventory is less than 5 units for the listed item(s).");
  connection.query("SELECT * From products WHERE stock_quantity <= 5", function(err,res) {
    if(err) throw err;
      console.table(res);

    console.log("======================================================================");
    return mgrSelect();
  });
}

function viewAddInv() {
  connection.query("SELECT * FROM products", function(err,res) {
    if(err) throw err;
      console.table(res);

      function mgrSelect() {
        var item_id = 'Enter inventory Item Id number: ';
        var stock_quantity = 'Enter the quantity of units: ';
        var quit = 'Quit';
    
        inquirer.prompt (
          {
            name: "mgrChoice",
            type: "list",
            message: "Enter required information.",
            choices: [ item_id, stock_quantity, quit ]
          }
        ) 
        
        // Respond to mgr input and call function
        .then(function(answer) {
          if(answer.mgrChoice === item_id && answer.mgrChoice === stock_quantity) {
            updateInv();
          } else {
            process.exit();
          }
        });
      }

      function updateInv() {
        console.log("Updating your inventory quantities...\n");
          connection.query("UPDATE products SET ? WHERE ?",
          [
            {
              item_id: "number"
            },
            {
              stock_quantity: "?"
            }
          ],
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");

          console.log("======================================================================");
          return mgrSelect();
          }
        );
      }
  });
}

function addNewProduct() {
  connection.query("UPDATE products SET ? WHERE ?",
    [

    ],
    function(err, res) {
      if (err) throw err;
      console.table(res);

      function mgrSelect() {
        var item_id = 'Enter inventory Item Id number: ';
        var product_name = 'Enter inventory Product Name: ';
        var department_name = 'Enter the Department Name: ';
        var price = 'Enter selling price: ';
        var stock_quantity = 'Enter the quantity of units: '
        var quit = 'Quit';
    
        inquirer.prompt (
          {
            name: "mgrChoice",
            type: "list",
            message: "Enter required information.",
            choices: [ item_id, product_name, department_name, price, stock_quantity, quit ],
            validate: function(value) {
              if(isNaN(value) == false) {
                return true;
              } else {
                return false;
              }
            }
          }
        ) 
        
        // Respond to mgr input and call function
        .then(function(answer) {
          if(answer.mgrChoice === item_id && answer.mgrChoice === product_name && answer.mgrChoice === department_name && answer.mgrChoice === price && answer.mgrChoice === stock_quantity) {
            updateInv();
          } else {
            process.exit();
          }
          updateInv();
        });
      }

      function updateInv() {
        connection.query("UPDATE products SET ? WHERE ?",
          [
            {
              item_id: 99
            },
            {
              product_name: "Rocky Road"
            },
            {
              department_name: "Rocky Road"
            },
            {
              price: 1.00
            },
            {
              stock_quantity: 100
            }
          ],
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products deleted!\n");

          console.log("======================================================================");
          return mgrSelect();
          }
        );
      }
    });
}