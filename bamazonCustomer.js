var inquirer = require('inquirer');
var mysql = require('mysql');

// Create mysql connection
var connection = mysql.createConnection( {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
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
    console.log('---------------------------');
  });
}
