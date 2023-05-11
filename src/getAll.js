import createResponse from './helpers.js';
import { createConnectionMySql } from './model.js';

const getAllBook = (request, h) => {

  const { 
    name = undefined, 
    reading = undefined, 
    finished = undefined
  } = request.query;

  let sql = 'SELECT id, name, publisher FROM buku';

  if (name !== undefined) {
    sql += ` WHERE name='${name}' `;
  }

  if (reading !== undefined) {
    sql += ` WHERE reading='${reading}' `;
  }

  // diperbaiki lagi
  if (finished !== undefined) {
    sql = ` WHERE finished='${finished}' `;
  }

  return createConnectionMySql(sql, null) 
    .then(res => {
      // console.log(res);

      if (res.length > 0) {
        return createResponse(h, {
          status : 'success',
          data : { 
            books : res
           },
          code : 200
        });
      } else {
        return createResponse(h, {
          status : 'success',
          data : [],
          code : 200
        });
      }

    })
    .catch(err => {
      console.log(err);

      return createResponse(h, {
        statusCode : 500,
        error : 'Internal Server Error',
        message : 'An internal server error occurred',
        code : 500
      });
    });
};


export default getAllBook;