## Installation and Setup 
1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install all dependencies.
3. Run `npm start` to start the application.
4. Open `http://localhost:3000` in your browser to view the website.
5. Open `http://localhost:3000` for admin Pannel

# Entity-Relationship Model

## Product Table
- **Entity:** Product
- **Attributes:** 
  - product_id (Primary Key)
  - name
  - description

## Variant Table
- **Entity:** Variant
- **Attributes:** 
  - variant_id (Primary Key)
  - product_id (Foreign Key)
  - variant_name
  - price
  - inventory
- **Relationships:**
  - Product (1) ------< Variant (M) (One-to-Many)

## Order Table
- **Entity:** Order
- **Attributes:** 
  - order_id (Primary Key)
  - product_id (Foreign Key)
  - variant_id (Foreign Key)
  - quantity
  - total_price
  - order_date
  - buyer_id
- **Relationships:**
  - Product (M) ------< Order (1) (Many-to-One)
  - Variant (M) ------< Order (1) (Many-to-One)

## Entity-Relationship Diagram
![ER Diagram](/src/img/ERDIAGRAM.png)



