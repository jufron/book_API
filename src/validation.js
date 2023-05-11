import createResponse from "./helpers.js";


const validateBook = (message1, message2) => {

    // validate
  if ( !name ?? true ) {
    return createResponse(h, {
      status : 'fail',
      message : message1,
      code : 400
    });
  }

  if (readPage > pageCount) {
    return createResponse(h, {
      status : 'fail',
      message : message2,
      code : 400
    });
  }

};

export default validateBook;