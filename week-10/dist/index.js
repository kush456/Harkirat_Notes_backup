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
// // 1. creating a db
// const client = new Client({
//     connectionString : "postgresql://postgres:Kaju@pg2874@localhost:5432/harkirat"
// })
// async function createTable(){
//     await client.connect();//you should await on client connect always before doing anything as it takes some time
//     const result = await client.query(`
//         CREATE TABLE users(
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `);
//     console.log(result);
// }
// createTable();
// //2. insert data
// // const client = new Client({
// //     connectionString : "postgresql://postgres:Kaju@pg2874@localhost:5432/harkirat"
// // })
// // Async function to insert data into a table
// //another way to connect to the database 
// async function insertData(username: string, email: string, password: string) {
//   const client = new Client({
//     host: 'localhost',
//     port: 5432,
//     database: 'harkirat',
//     user: 'postgres',
//     password: 'Kaju@pg2874',
//   });
//   try {
//     await client.connect(); // Ensure client connection is established
//     //this is an unsafe way, can cause sql injection, basically in place of data user can type an sql query
//     // const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
//     // const res = await client.query(insertQuery);
//     // Use parameterized query to prevent SQL injection
//     const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
//     const values = [username, email, password];
//     const res = await client.query(insertQuery, values);//sql understands now that these values, they want to put in the database and not anything else like if a semi colon then uske aag eke contents are a query, sql wont do that mistake 
//     console.log('Insertion success:', res); // Output insertion result
//   } catch (err) {
//     console.error('Error during the insertion:', err);
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }
// insertData('username5', 'user5@example.com', 'user_password').catch(console.error);
//Relationships in sql
const client = new pg_1.Client({
    connectionString: "postgresql://postgres:Kaju@pg2874@localhost:5432/harkirat"
});
function createTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
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
        `);
            console.log(result);
        }
        catch (err) {
            console.error('Error during creation ', err);
        }
        finally {
            yield client.end(); // Close the client connection
        }
    });
}
createTable();
