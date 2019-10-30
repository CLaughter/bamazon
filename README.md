# Bamazon

#### This is an Amazon-like storefront CLI app utilizing MySQL and Node.js with Inquirer npm packages. It will take in orders from customers and deplete stock from the store's inventory. 

#### Bamazon will also track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.
---

1. *Running the Customer View (MySQL Database called bamazon)*

#### Initiate node bamazonCustomer.js in the terminal. First to display is all the items available for sale and includes the ids, names, and prices of products for sale.

#### Users will be prompted with two messages: the ID of the product they would like to buy and how many units of the product they would like to buy.

#### A table will display the following columns:

##### * item_id (unique id for each product)

##### * product_name (Name of product)

##### * department_name

##### * price (cost to customer)

##### * stock_quantity (how much of the product is available in stores)

#### Once the customer has placed the order, the app should check if the store has the inventory to meet the customer's request.

#### If there are insufficient quantities, a message will display indicating such.

#### Otherwise the store will fulfill the customer's order, update the SQL database reflecting the remaining quantities and show the total cost of the purchase.
---

2. *Running the Manager View (Node application called bamazonManager.js)*

#### The manager can select one of the following:

##### * View Products for Sale - will list every available item

##### * View Low Inventory - will list all items with an inventory count lower than five

##### * Add To Inventory - will display a prompt that will let the manager "add more" of any item currently in the store

##### * Add New Product - allows the manager to add a completely new product to the store
---

3. *Running the Supervisor View (MySQL table called departments)*

#### The supervisor can select one of the following:

##### * Create New Department

##### * View Product Sales by Department - displays a summarized table where total_profit is calculated as a difference of overhead_costs and product_sales though not stored in a database and uses a custom alias 
---

4. *MySQL table called departments*
#### Table includes the following:

##### * department_id

##### * department_name

##### * over_head_costs (A dummy number you set for each department)

#### If an item is selected for purchase of anything from the store, the bamazonCustomer.js app is modified where the price of the product and quantity purchased are factored then is added to that item in the product_sales column. It also updates the product inventory.
---

###### CLaughter developed this app as a coding bootcamp assignment.

Link to project code: https://github.com/CLaughter/bamazon.git

YouTube Link: 