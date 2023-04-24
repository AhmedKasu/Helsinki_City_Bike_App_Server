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
  allJourneys(currentPage:Int,limit:Int): JourneyResult! 
}
`;

interface QueryArgs {
  currentPage: number;
  limit: number;
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
      const { currentPage, limit } = args;
      const query = {
        coveredDistanceMeters: { $gt: 10 },
        durationSeconds: { $gt: 10 },
      };

      const { modelResults: journeys, paginationDetails } =
        await paginatedResults({
          currentPage,
          limit,
          model: JourneyModel,
          query,
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
