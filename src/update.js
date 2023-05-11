import validateBook from './validation.js';
import createResponse  from './helpers.js';
import { createConnectionMySql } from './model.js';


const updateBookWhereId = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, reading, readPage } = request.payload;  
  const updatedAt = new Date;

  // validate name
    if ( !name ?? true ) {
    return createResponse(h, {
      status : 'fail',
      message : 'Gagal memperbarui buku. Mohon isi nama buku',
      code : 400
    });
  }

  if (readPage > pageCount) {
    return createResponse(h, {
      status : 'fail',
      message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      code : 400
    });
  }

  const sql = `UPDATE buku SET
    name = ?, 
    year = ?, 
    author = ?, 
    summary = ?, 
    publisher = ?, 
    pageCount = ?,
    readPage = ?,
    finished = ?,
    reading = ?,
    updatedAt = ?
    WHERE id = ?
  `;

  const finished = pageCount == readPage ? true : false; 
  const  data = [name, year, author, summary, publisher, pageCount, readPage, finished, reading , updatedAt.toISOString(), id];

  return createConnectionMySql(sql, data)
    .then(res => {

       if (res.affectedRows === 1) {
        // success update
        
        return createResponse(h, {
          status : 'success',
          message : 'Buku berhasil diperbarui',
          code : 200
        });                

      } else {
        // failid update
        return createResponse(h, {
          status : 'fail',
          message : 'Gagal memperbarui buku. Id tidak ditemukan',
          code : 404
        });
      }

    })
    .catch(err => {
      console.log(err);
      // failid error
      return createResponse(h, {
        statusCode : 500,
        error : 'Internal Server Error',
        message : 'An internal server error occurred',
        code : 500
      });
    });
};  

export default updateBookWhereId;