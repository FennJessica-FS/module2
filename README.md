# Module Two NodeJS and MongoDB API

This project is a REST API built with Node.js, Express, and MongoDB using Mongoose.
It was created for Module Two to practice working with databases, routes,
controllers, and CRUD operations.

## Project Overview

The API works with restaurants and menu items.

A restaurant represents a business.
A menu item represents food that belongs to a restaurant.

Each menu item stores the ID of the restaurant it belongs to so the two collections
are connected.

## Collections

### Restaurant

Fields:
name
cuisine
rating
isOpen

### MenuItem

Fields:
name
price
isAvailable
restaurant

The restaurant field stores the ID of a restaurant.

## API Routes

### Restaurants
GET /restaurants  
GET /restaurants/:id  
POST /restaurants  
PUT /restaurants/:id  
DELETE /restaurants/:id  

### Menu Items
GET /menuitems  
GET /menuitems/:id  
POST /menuitems  
PUT /menuitems/:id  
DELETE /menuitems/:id  

## Validation and Error Handling

Required fields are validated using Mongoose schemas.
Controller functions use try and catch blocks.
Invalid requests return appropriate status codes.

## Technologies Used

Node.js  
Express  
MongoDB  
Mongoose  
dotenv  
Postman  

## Running the Project

Install dependencies:
npm install

Create a .env file with:
MONGODB_URI=your_mongodb_connection_string
PORT=3000

Start the server:
npx nodemon server.js

Use Postman to test all API routes.
GET requests can also be tested in the browser.
