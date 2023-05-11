import dotenv from 'dotenv';
import Hapi from '@hapi/hapi';
import routes from './routes.js';

dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT;

const init = async () => {
  const server = Hapi.server({
    port : port,
    host : host
  });

  server.route(routes);

  await server.start();
  console.log(`server running on ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();