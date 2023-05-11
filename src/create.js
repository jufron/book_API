import { nanoid } from 'nanoid';
import createResponse from './helpers.js';
import { createConnectionMySql } from './model.js';
import validateBook from './validation.js';


const createBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;  
  const id = nanoid(16);
  const insertedAt = new Date();
  insertedAt.toISOString();

  // validate
  if ( !name ?? true ) {
    return createResponse(h, {
      status : 'fail',
      message : 'Gagal menambahkan buku. Mohon isi nama buku',
      code : 400
    });
  }

  if (readPage > pageCount) {
    return createResponse(h, {
      status : 'fail',
      message : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      code : 400
    });
  }

  const sql = 'INSERT INTO buku SET ?';
  const data = { 
    id,
    name,  
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished    : pageCount === readPage ? true : false,
    reading, 
    insertedAt,
    updatedAt   : insertedAt
  };

  return createConnectionMySql(sql, data)
    .then(res => {
      // console.log(res);

      if (res.affectedRows === 1) {
        return createResponse(h, {
          status : 'success',
          message : 'Buku berhasil ditambahkan',
          data : { bookId : id },
          code : 201
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

export default createBook;