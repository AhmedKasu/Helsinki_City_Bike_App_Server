import JourneyModel from '../../models/journeys';
import { Journey, PaginationDetails } from '../../types';
import paginatedResults from '../../utils/pagination';

export const typeDefs = `
type PaginationDetails {
  limit: Int!
  currentPage: Int!
  nextPage: Boolean!
  previousPage: Boolean!

}

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

type JourneyResult {
  journeys:[Journey!]!
  paginationDetails: PaginationDetails!
}

type Query {
  journeysCount: Int!
  allJourneys(currentPage:Int,limit:Int,departureStationName:String,returnStationName:String): JourneyResult! 
}
`;

interface QueryArgs {
  currentPage: number;
  limit: number;
  departureStationName: string;
  returnStationName: string;
}
interface JourneyResults {
  journeys: Array<Journey>;
  paginationDetails: PaginationDetails;
}

export const resolvers = {
  Query: {
    journeysCount: async (): Promise<number> =>
      JourneyModel.collection.countDocuments(),

    allJourneys: async (
      _root: unknown,
      args: QueryArgs
    ): Promise<JourneyResults> => {
      const { currentPage, limit, departureStationName, returnStationName } =
        args;

      const defaultQuery = {
        coveredDistanceMeters: { $gt: 10 },
        durationSeconds: { $gt: 10 },
      };

      const searchQuery = {
        ...defaultQuery,
        $and: [
          { departureStationName: { $in: [departureStationName] } },
          { returnStationName: { $in: [returnStationName] } },
        ],
      };

      const { modelResults: journeys, paginationDetails } =
        await paginatedResults({
          currentPage,
          limit,
          model: JourneyModel,
          query:
            departureStationName && returnStationName
              ? searchQuery
              : defaultQuery,
        });

      return {
        journeys,
        paginationDetails,
      };
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
