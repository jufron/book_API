import createBook from "./create.js";
import deleteBookWhereID from "./delete.js";
import getAllBook from "./getAll.js";
import getBookWhereId from "./show.js";
import updateBookWhereId from "./update.js";


const routes = [
  {
    method : 'POST',
    path : '/books',
    handler : createBook
  },
  {
    method : 'GET',
    path : '/books',
    handler : getAllBook
  },
  {
    method : 'GET',
    path : '/books/{id}',
    handler : getBookWhereId
  },
  {
    method : 'PUT',
    path : '/books/{id}',
    handler : updateBookWhereId
  },
  {
    method : 'DELETE',
    path : '/books/{id}',
    handler : deleteBookWhereID
  }
];

export default routes;