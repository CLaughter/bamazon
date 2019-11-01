require('dotenv').config()

var inquirer = require('inquirer');
var mysql = require('mysql');

// Create mysql connection
var connection = mysql.createConnection( {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASS,
  database: 'bamazonDB'
});

  connection.connect(function(err) {
    if(err) throw err;
    console.log("Connected as id: " + connection.threadId); 
    // query products
    queryAllProducts();
  });

// List all items for sale
function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err,res) {
    if(err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log('-------------------------------------------------');
    questions();
  })
}

// Query user input
function questions() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "itemBuy",
      message: "What is the item # you would like to buy?"
    }, 
    {
      type: "input",
      name: "quantBuy",
      message: "How many would you like?"
    }
  ])
    
  // Respond to user if order submitted otherwise quantity available
    .then(function(user){
      var query = connection.query
      ('SELECT * FROM products WHERE item_id = ?',
      [
        user.itemBuy
      ],
      function( err, res) {
        if(err) throw err;
        console.log(res);
        if(user.quantBuy <= res[0].stock_quantity) {
          var newQuant = res[0].stock_quantity - user.quantBuy;
          // Calculate total
          var total = res[0].price * user.quantBuy;
          console.log(`Your total is: ${total}`);
          // call updateProduct AFTER the INSERT completes
          updateProduct(user.itemBuy, newQuant);
        } else {
          console.log("Not");
          questions();
        }
      });            
  });
}

//     // update statement placeholders
    function updateProduct(item_id, newQuant){
      console.log("Updating stock inventory...\n");
      var query = connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
        [newQuant, item_id],
        function(err,res) {
          if(err) throw err;
          console.log(res.affectedRows + " products inserted!\n");
          connection.end();
        }
      );
      // Logs actual query being run
      console.log(query.sql);
    }

