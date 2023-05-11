


const createResponse = (h, dataObj) => {
  let response;
  const { code, message = null, status, data = null, statusCode = null, error = null} = dataObj;

  if (data !== null) {
    if (message == null) {
      response = h.response({
        status,
        data
      });
    } else {
      response = h.response({
        status,
        message,
        data
      });
    }
  } 

  if (data == null) {
    response = h.response({
      status,
      message
    });
  }

  if (statusCode !== null && error !== null) {
    response = h.response({
      statusCode,
      error,
      message
    });
  }
  response.code(code);
  response.header('Content-Type', 'application/json');
  return response;
};

export default createResponse;
