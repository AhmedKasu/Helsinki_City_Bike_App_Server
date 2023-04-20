import { Journeys } from '../../types';

const journeys: Journeys = [
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

export const typeDefs = `
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
    journeysCount: Int!
    allJourneys: [Journey!]!
  }
`;

export const resolvers = {
  Query: {
    journeysCount: (): number => journeys.length,
    allJourneys: (): Journeys => journeys,
  },
};

export default {
  typeDefs,
  resolvers,
};
