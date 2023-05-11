import { getWhereId } from '../model.js';
// import connection from './mysql.js';

// const sql = 'SELECT * FROM buku';

// connection.query(sql, (err, result) => {
//   if (err) throw err;
//   console.log(result);
// });

// fetchData();

getWhereId('f8bGTaf2R0kTK0DX')
  .then(result => console.log(result[0]))
  .catch(err => console.log(`terjadi kesalahan ${err}`));