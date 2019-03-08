### Purpose

This project aims to provide small business enterprises with a web
application that enables them to create and manage a product catalog, 
record their sales and generate reports regarding sales made or 
changes in prices in a period.

### System Features and Requirements

#### Functional Requirements

1. Product Catalog
     1. The application shall have ability to create product categories
     1. The application shall have ability to edit product categories
     1. The application shall have ability to list product categories
     1. The application shall have ability to delete product categories
     1. Product categories shall have a name
     1. The application shall not allow creation of product categories without all fields provided
     1. The application shall have ability to create product suppliers
     1. The application shall have ability to edit product suppliers
     1. The application shall have ability to list product suppliers
     1. The application shall have ability to delete product suppliers
     1. Product suppliers shall have a name and contact information
     1. The application shall not allow creation of product suppliers without all fields provided
     1. Product supplier's contact information shall contain an address, a phone number, name of contact
     1. The application shall have ability to create products
     1. The application shall have ability to edit products
     1. The application shall have ability to list products
     1. Products shall have a name, price, a product category, a product supplier, a description
     1. Product price shall have a unit and a value
     1. Allowed product price units shall be by piece, kilogram, gram and liter
     1. The application shall not allow creation of products without name, price unit and value
     1. The application shall have ability to search products by name
     1. The application shall have ability to search product categories by name
     1. The application shall have ability to search product suppliers by name
     1. Product search shall be approximate string matching(fuzzy search)
     1. When searching products, product categories or suppliers the application shall display best matches simultaneously
     1. The application shall have ability list products by product category
     1. The application shall have ability list products by product supplier
     1. The application shall have ability to change price of products
    
1. Sales
     1. The application shall have ability to prepare a shopping basket with multiple products
     1. The application shall have ability to enter a product to shopping basket
     1. The application shall have ability to search products by fuzzy search and add selected ones to shopping basket
     1. The application shall have ability to display products by category and add selected ones to shopping basket
     1. The application shall have ability to set amount for a product in the shopping basket
     1. The application shall have ability to delete products from shopping basket
     1. The application shall have ability to calculate total cost of shopping basket
     1. The application shall have ability to display total cost of shopping basket
     1. The application shall have ability to settle a sale
     1. The application shall keep record of every settled sale as sale record
     1. Sale record shall have a basket id, total amount collected, date of sale
     1. The application shall keep product sale record when a sale is completed
     1. Product sale record shall have basket id associated with sale record, product, price and date
     1. The application shall allow entering grams when price of product that is being sold have its price unit in kilograms
     1. The application shall allow entering kilograms when price of product that is being sold have its price unit in grams
     1. The application shall correctly calculate price when amount of sale is entered as grams and price of product that is being sold have its price unit in kilograms
     1. The application shall correctly calculate price when amount of sale is entered as kilograms and price of product that is being sold have its price unit in grams
    
1. Product Price History
     1. The application shall keep history of product price whenever price of a product is changed
     1. The application shall ability to display price history for each product
     1. First entry of product price history shall be made when product is created
     1. Product price history shall contain product id, price and create date
    
1. Reports
     1. The application shall have ability to display a chart of price fluctuations of product for a period given by user 
     1. The application shall have predefined time periods as last week, last month, last 3 months, last 6 months, last year, for time period selections
     1. The application shall have ability to give total income for a given time period
     1. The application shall have ability to display sales made in past hour
     1. The application shall have ability to display sales made in past 30 minutes
     1. The application shall have ability to display sales made in period of time given by user  
     1. The application shall have ability to show amount of sales for a product on a monthly basis
     1. The application shall have ability to show revenue from a product on a monthly basis 
     1. The application shall have ability to show total amount of sales on a monthly basis
     1. The application shall have ability to show total revenue on a monthly basis

### Technologies

Spring, Angular
    
### Glossary
 **Product Category** Describes a common property of a collection of products such as dried fruits, milk products etc.
 **Product Supplier** could be a person or foundation that provides products
 **Product** Any item that is for sale
 **Product Price** consists of a unit (kg, gr, pieces) and value
 **Product Price History** Describes price of product for a time period in past 
 **Sopping Basket** Collection of products a customer wishes to buy
 **Sale Record** History record of product sale that is part of a completed shopping, contains price and amount of product 
