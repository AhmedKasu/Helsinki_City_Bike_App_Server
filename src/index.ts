import { connect } from 'mongoose';

import config from './config';
import defautImport from './graphql/queries/defaultImport';
import startServer from './server';

console.log('connecting to MongoDB');

connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

// Deletes all journeys with distance/durration < 10
void defautImport();

startServer()
  .then()
  .catch((e) => console.log(e));
