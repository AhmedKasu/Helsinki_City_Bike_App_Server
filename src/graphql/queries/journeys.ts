import JourneyModel from '../../models/journeys';
import { Journeys } from '../../types';

export const typeDefs = `
  type Journey {
    id:ID
    departure: String!
    return:String!
    departureStationId:Int!
    returnStationName:String!
    returnStationId:Int!
    departureStationName:String!
    coveredDistanceMeters:Int!
    durationSeconds:Int!
  }

  type Query {
    journeysCount: Int!
    allJourneys: [Journey!]!
  }
`;

export const resolvers = {
  Query: {
    journeysCount: async (): Promise<number> =>
      JourneyModel.collection.countDocuments(),
    allJourneys: async (): Promise<Journeys> => {
      const query = {
        coveredDistanceMeters: { $gt: 10 },
        durationSeconds: { $gt: 10 },
      };
      return await JourneyModel.find(query).limit(20).select('-__v');
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
