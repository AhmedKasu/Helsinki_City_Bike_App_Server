import { connect } from 'mongoose';

import config from './config';
import defautImport from './graphql/queries/defaultImport';

const connectMongo = () => {
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
};

export default connectMongo;
