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
      if(err) throw err;
      console.table(res);
      questions();
    });
  };

function questions() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "itemBuy",
      message: "What is the item # you would like to buy?",
      validate: function(value) {
        if(isNaN(value) == false) {
          return true;
        } else {
          return false;
        }
      }
    }, 
    {
      type: "input",
      name: "quantBuy",
      message: "How many would you like?",
      validate: function(value) {
        if(isNaN(value) == false) {
          return true;
        } else {
          return false;
        }
      }
    }
  ])
    
    .then(function(user){
      connection.query('SELECT * FROM products WHERE item_id = ?',      
      [
        user.itemBuy
      ],
      function( err, res) {
        if(err) throw err;
        console.log(res);

        if(user.quantBuy <= res[0].stock_quantity) {
          var newQuant = res[0].stock_quantity - user.quantBuy;
          // Calculate and display total
          var total = res[0].price * user.quantBuy;
          console.log(`Your total is: ${total}`);
          // call updateProduct AFTER the INSERT completes
          updateProduct(user.itemBuy, newQuant);
        } else {
          console.log("There's only " + res[0].stock_quantity + " " + "left in stock.");
          questions();
        }
      });            
  });
}

// update statement placeholders
function updateProduct(item_id, newQuant){
  console.log("Updating stock inventory...\n");
  var query = connection.query(
    "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
    [newQuant, item_id],
    function(err,res) {
      if(err) throw err;
      console.log(res.affectedRows + " product(s) updated!\n");
      connection.end();
    }
  );
  
  console.log(query.sql);
}

