import createResponse from './helpers.js';
import { createConnectionMySql } from './model.js';


const getBookWhereId = (request, h) => {
  const { id } = request.params;

  const sql = `SELECT * FROM buku WHERE id = '${id}' `;

  return createConnectionMySql(sql, null)
    .then(res => {
      // console.log(res[0]);
      
      if (res.length > 0) {

        res[0].finished = res[0].finished === 1 ? true : false;
        res[0].reading = res[0].reading === 1 ? true : false;

        return createResponse(h, {
          status : 'success',
          data : {
            book : res[0] 
          },
          code : 200
        });
      } else {
        return createResponse(h, {
          status : 'fail',
          message : 'Buku tidak ditemukan',
          code :404
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


export default getBookWhereId;