### Purpose

This project aims to provide small business enterprises with a web
application that enables them to create and manage a product catalog, 
record their sales and generate reports regarding sales made or 
changes in prices in a period.

### System Features and Requirements

* #### Functional Requirements
    
    **1. Product Catalog**
    * **1.1.** The application shall have ability to create product categories
    * **1.2.** The application shall have ability to edit product categories
    * **1.3.** The application shall have ability to list product categories
    * **1.4.** The application shall not allow creation of product categories without all fields provided
    * **1.5.** The application shall have ability to create product suppliers
    * **1.6.** The application shall have ability to edit product suppliers
    * **1.7.** The application shall have ability to list product suppliers
    * **1.8.** Product suppliers shall have an id, name and contact information
    * **1.9.** The application shall not allow creation of product suppliers without all fields provided
    * **1.10.** Product supplier's contact information shall contain an address, a phone number, name of contact
    * **1.11.** The application shall have ability to create products
    * **1.12.** The application shall have ability to edit products
    * **1.13.** The application shall have ability to list products
    * **1.14.** Products shall have an id, name, price, a product category, a product supplier, a description
    * **1.15.** The application shall not allow changing unit of product price after it is created
    * **1.18.** The application shall not allow creation of products without all fields provided
    * **1.19.** Product price shall have a unit and a value
    * **1.20.** Allowed product price units shall be by piece, kilogram, gram and liter
    * **1.21.** The application shall not allow creation of products without name, price unit and value
    * **1.22.** The application shall have ability to search products by their name
    * **1.23.** Searching products shell be autocomplete
    * **1.24.** The application shall have ability list products by product category
    * **1.25.** The application shall have ability list products by product supplier
    * **1.26.** The application shall have ability to change price of products
    
    **2. Sales**
    * **2.1** The application shall have ability to prepare a shopping basket with multiple products
    * **2.2** The application shall have ability to enter a product to shopping basket
    * **2.3** The application shall have ability to search products by fuzzy search and add selected ones to shopping basket
    * **2.4** The application shall have ability to display products by category and add selected ones to shopping basket
    * **2.5** The application shall have ability to set amount for a product in the shopping basket
    * **2.6** The application shall have ability to delete products from shopping basket
    * **2.7** The application shall have ability to calculate total cost of shopping basket
    * **2.8** The application shall have ability to display total cost of shopping basket
    * **2.9** The application shall have ability to settle a sale
    * **2.10** The application shall keep record of every settled sale as sale record
    * **2.11** Sale record shall have a basket id, total amount collected, date of sale
    * **2.12** The application shall keep product sale record when a sale is completed
    * **2.13** Product sale record shall have basket id associated with sale record, product, price and date
    * **2.14** The application shall allow entering grams when price of product that is being sold have its price unit in kilograms
    * **2.15** The application shall allow entering kilograms when price of product that is being sold have its price unit in grams
    * **2.16** The application shall correctly calculate price when amount of sale is entered as grams and price of product that is being sold have its price unit in kilograms
    * **2.17** The application shall correctly calculate price when amount of sale is entered as kilograms and price of product that is being sold have its price unit in grams
    
    **3. Product Price History**
    * **3.1.** The application shall keep history of product price whenever price of a product is changed
    * **3.2.** The application shall ability to display price history for each product
    * **3.3.** First entry of product price history shall be made when product is created
    * **3.4.** Product price history shall contain product id, price and create date
    
    **4. Reports**
    * **4.1.** The application shall have ability to display a chart of price fluctuations of product for a period given by user 
    * **4.2.** The application shall have predefined time periods as last week, last month, last 3 months, last 6 months, last year, for time period selections
    * **4.3.** The application shall have ability to give total income for a given time period
    * **4.4.** The application shall have ability to display sales made in past hour
    * **4.5.** The application shall have ability to display sales made in past 30 minutes
    * **4.6.** The application shall have ability to display sales made in period of time given by user  
    * **4.7.** The application shall have ability to show amount of sales for a product on a monthly basis
    * **4.8.** The application shall have ability to show revenue from a product on a monthly basis 
    * **4.9.** The application shall have ability to show total amount of sales on a monthly basis
    * **4.10.** The application shall have ability to show total revenue on a monthly basis

### Technologies

Spring, Angular
    
### Glossary
* **Product Category** Describes a common property of a collection of products such as dried fruits, milk products etc.
* **Product Supplier** Product supplier might be a person or foundation that provides products
* **Product** Any item that is for sale
* **Product Price** Product price has a unit (kg, gr, pieces) and value and it is cost of of products for buyers
* **Product Price History** Describes price of product for a time period in past 
* **Sopping Basket** Collection of products a customer wishes to buy
* **Sale Record** History record of product sale that is part of a completed shopping, contains price and amount of product 