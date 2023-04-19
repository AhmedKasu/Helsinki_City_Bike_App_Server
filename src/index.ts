import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const journeys = [
  {
    departure: '2021-06-30T23:59:46',
    return: '2021-06-30T23:59:55',
    departureStationId: '107',
    returnStationName: 'Tenholantie',
    returnStationId: '111',
    departureStationName: 'Esterinportti',
    coveredDistance: '1847',
    duration: '404',
  },
  {
    departure: '2021-06-30T23:59:46',
    return: '2021-06-30T23:59:55',
    departureStationId: '009',
    returnStationName: 'Erottajan aukio',
    returnStationId: '040',
    departureStationName: 'Hakaniemi',
    coveredDistance: '1847',
    duration: '404	',
  },
];

const typeDefs = `
  type Journey {
    departure: String!
    return:String!
    departureStationId:ID!
    returnStationName:String!
    returnStationId:ID!
    departureStationName:String!
    coveredDistance:String
    duration:String
  }

  type Query {
    journeyCount: Int!
    allJourneys: [Journey!]!
  }
`;

const resolvers = {
  Query: {
    journeyCount: () => journeys.length,
    allJourneys: () => journeys,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async (): Promise<void> => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

void startServer();
