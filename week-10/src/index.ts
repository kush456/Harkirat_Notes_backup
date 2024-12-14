import {Client} from 'pg';

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

const client = new Client({
    connectionString : "postgresql://postgres:Kaju@pg2874@localhost:5432/harkirat"
})


async function createTable(){
  try {
    await client.connect(); 
    const result = await client.query(`
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
        //user_id is a foreign key which references to the id of users table
        //basically means we can only add data to the addresses table if that user_id exists
        //delete cascade means if a user is deleted from users table, all their addresses are also deleted from addresses table 
        console.log(result);

  } catch (err) {
    console.error('Error during creation ', err);
  } finally {
    await client.end(); // Close the client connection
  }
}

createTable();

//joins
// SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
// FROM users u
// JOIN addresses a ON u.id = a.user_id
// WHERE u.id = '1';

// means select id from u, username from u, ..., city from a 
// from users u means renaming users to u in the query 
// join addresses renamed as a with the users table on those rows where user ka id matches adresses ka user_id, basically addresses ke saare entries
// jinme user id say 1 hai will be joined to users ki wo entry jaha user id 1 hai and so on 
// where u.id='1' means will show only those entries jinki user id 1 hai, but joined sab hai with their corresponding entries

// Benefits of using a join - 
// Reduced Latency(means less number of requests or data sent to the backend)
// Simplified Application Logic
// Transactional Integrity(agar alag queries bhejoge instead of one then could be ek kisi query mai data change ho jaye)
 
