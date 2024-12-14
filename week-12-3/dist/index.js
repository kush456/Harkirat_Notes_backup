"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// 1. creating a db
const client = new pg_1.Client({
    connectionString: "postgresql://postgres:Kaju@pg2874@localhost:5432/harkirat2"
});
function createTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect(); //you should await on client connect always before doing anything as it takes some time
        const result = yield client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
        //console.log(result);
    });
}
function insertTable(username, password, email) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`
        INSERT INTO users (username, password, email) 
        VALUES ($1, $2, $3)
    `, [username, password, email]); //this is right, using dynamic variables, ${} wale causes SQL injection
        console.log(result);
    });
}
function createAddressesTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect(); //you should await on client connect always before doing anything as it takes some time
        const result = yield client.query(`
        CREATE TABLE addresses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `); //user_id is a foreign key that relates to the id column/key of the users table, so all the entries with user_id as 1 will map to the entries of the users table with id = 1
        console.log(result);
    });
}
//createAddressesTable();
//TRANSACTIONS
//Transactions are critical in SQL databases to ensure that a series of operations either all succeed or all fail. This is important when you have multiple related operations that must be treated as a single unit.
//say a user signs up so he sends two queries
//his id and shit in user table and address in addresses table
//if either is a wrong entry, we dont want partial data to fill in
//so we make it a 4 step process
//first begin a transaction, then do both queries
//these will succeed but we wont see anything added in the table
//then we commit, then both the queries happen
//if either is wrong commit is rolled back
//useful in paytm, say kahi se -50 rupees hogaye but wo dusre tak pohoche nahi, +50 nhi hua
//toh roll back ho jaane chahiye paise...
function insertUserAndAddress(username, email, password, city, country, street, pincode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            // Start transaction
            yield client.query('BEGIN');
            // Insert user
            const insertUserText = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
            const userRes = yield client.query(insertUserText, [username, email, password]);
            const userId = userRes.rows[0].id;
            // Insert address using the returned user ID
            const insertAddressText = `
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5);
        `;
            yield client.query(insertAddressText, [userId, city, country, street, pincode]);
            // Commit transaction
            yield client.query('COMMIT');
            console.log('User and address inserted successfully');
        }
        catch (err) {
            yield client.query('ROLLBACK'); // Roll back the transaction on error
            console.error('Error during transaction, rolled back.', err);
            throw err;
        }
        finally {
            yield client.end(); // Close the client connection
        }
    });
}
// Example usage
insertUserAndAddress('johndoe', 'john.doe@example.com', 'securepassword123', 'New York', 'USA', '123 Broadway St', '10001');
