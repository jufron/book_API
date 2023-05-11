import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

// const connection = mysql.createConnection({
//   host,
//   user,
//   password,
//   database 
// });

const pool = mysql.createPool({
  host,
  user,
  password,
  database ,
  connectionLimit : 10
});

// connection.connect( err => {
//   if (err) {
//     console.log(`koneksi database gagal ${err}`);
//     return;
//   }
//   console.log('Terhubung ke database mysql');
// });
// connection.connect();

// export default connection;
export default pool;