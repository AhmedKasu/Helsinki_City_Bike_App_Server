import startServer from './server';
import connectMongo from './mongoDb';

connectMongo();

startServer()
  .then()
  .catch((e) => console.log(e));
