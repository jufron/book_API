import pool from './database/mysql.js';


const createConnectionMySql = (sql, data = null) => {
  return new Promise( (resolve, reject) => {
    pool.getConnection( (err, connect) => {
      if (err) throw err;

      connect.query(sql, data, (err, result) => {
        if (err) reject(err);
        resolve(result);

        connect.release();

      });
      
    });
  });
};


export {
  createConnectionMySql
};