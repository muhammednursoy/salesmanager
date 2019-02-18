### Purpose

This project aims to provide small business enterprises with a web
application that enables them to create and manage a product catalog, 
record their sales and generate reports regarding sales made or 
changes in prices in a period.

### System Features and Requirements

* #### Functional Requirements
    
    ***1. Product Catalog***
   
    * **1.1.** The application shall have ability to create/edit/list product categories
    * **1.2.** The application shall not allow creation of product categories without all fields provided
    * **1.3.** The application shall have ability to create/edit/list product suppliers
    * **1.4.** Product suppliers shall have a name and contact information
    * **1.5.** The application shall not allow creation of product suppliers without all fields provided
    * **1.6.** The application shall have ability to create products
    * **1.7.** Products shall have a name, price, a product category, a supplier
    * **1.8.** Product price shall consists of unit and value
    * **1.9.** The application shall not allow creation of products without all fields provided
    * **1.10.** The application shall have ability to search products by their name
    * **1.11.** Searching products shell be [typeahead](https://en.wikipedia.org/wiki/Typeahead)
    * **1.12.** The application shall have ability list products by product category
    * **1.13.** The application shall have ability list products by product supplier
    
    **2. Sales**
    
    * **2.1** The application shall have ability to prepare a sale list wit multiple products
    * **2.2** The application shall have ability to enter a product to sale list
    * **2.3** The application shall have ability to set amount for a product in the sale list
    * **2.4** The application shall have ability to delete products from sale list
    * **2.5** The application shall have ability to settle a sale by entering amount of cash collected
    * **2.6** The application shall keep record of every settled sale
    
    **3. Sale Sessions**
    
    * **3.1.** The application shall have ability to open and close a session for sales made in a 
    period
    * **3.2.** Sale sessions shall contain sale record made in these sessions *//todo*
    
    **4. Product Price History**
    
    * **4.1.** The application shall keep history of product price whenever price of a product is changed
    * **4.1.** The application shall ability to display price history for each product
    * **4.2.** First entry of product price history shall be made when product is created
    * **4.3.** Product price history shall contain date of change
    
    **5. Reports**

### Glossary
* **Product Category**  
* **Product Supplier**  
* **Product** 
* **Product Price**   
* **Product Price History** 
* **Sale List**  
* **Sale Record**  
* **Sale Session**  