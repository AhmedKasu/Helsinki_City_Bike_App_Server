import { ApolloServer } from '@apollo/server';
import { connect } from 'mongoose';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers, typeDefs } from './graphql/schema';
import config from './config';
import defautImport from './graphql/queries/defaultImport';

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async (): Promise<void> => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: config.PORT },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

void startServer();
