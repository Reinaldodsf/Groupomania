# GroupoMania - Internal Social Network #

## Context ##
The aim of this project is to create a Full-Stack Solution for **Groupomania**.

The project will be to build an internal social network for Groupomania's employees.

This is the Project 7 for the Junior Web Developer path.


## Prerequisites ##
You will need to installed:
- `Node.js`
- `Vue.js`
- `MySQL`

## First step##
1. First step is to **clone this repo**
2. Then Setup the **MySQL Database**
3. Installing and Connect the **Frontend**
4. Installing and Connect the **Backend**


## Setup the MySQL Database ##

- Open your terminal
- Connect to MySQL: `mysql -h localhost -u root -p`
- Insert your password
- Import and run the database Script: `groupomania_db.sql;`
- In the backend folder, go to the `connectdb.js` file and enter your password in password: 'xx'


## Installation - Backend ##

Within the **Backend folder** (`cd Backend`) run `npm install`.

Intall all the below Package with `npm install`:
- `http`
- `express`
- `mysql`
- `body-parser`
- `mongoose`
- `path`
- `xss-clean`
- `multer`
- `jsonwebtoken`
- `bcrypt`
- `fs`

Start the server with `node server` or `nodemon server`, in the command promp you should receive the final message *"Connected to MySQL Database!"*

Use `Ctrl+C` in the terminal to stop the connection to the server.


## Installation - Frontend ##

- Within the **Frontend folder** (`cd Frontend`) run `npm install`.

- Run `npm run serve`. This should both run the local server and launch your browser.

Use `Ctrl+C` in the terminal to stop the local server.
