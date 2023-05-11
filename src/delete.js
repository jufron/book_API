import createResponse from './helpers.js';
import { createConnectionMySql } from './model.js';


const deleteBookWhereID = (request, h) => {
  const { id } = request.params;

  const sql = `DELETE FROM buku WHERE id='${id}' `;

  return createConnectionMySql(sql, null)
    .then(res => {
      if (res.affectedRows === 1) {        
        return createResponse(h, {
          status : 'success',
          message : 'Buku berhasil dihapus',
          code : 200
        });
      } else {
        return createResponse(h, {
          status : 'fail',
          message : 'Buku gagal dihapus. Id tidak ditemukan',
          code : 404
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


export default deleteBookWhereID;