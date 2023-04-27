import JourneyModel from '../../models/journeys';
import { Journey, PaginationDetails, OrderBy } from '../../types';
import paginatedResults from '../../utils/pagination';
import { parseDistaceDurration, parseQueryLimit } from '../../utils/parsers';

const typeDefs = `
type PaginationDetails {
  resultsTotal: Int!
  limit: Int!
  currentPage: Int!
  nextPage: Boolean!
  previousPage: Boolean!
}

type Journey {
  id: ID
  departure: String!
  return: String!
  departureStationId: Int!
  returnStationName: String!
  returnStationId: Int!
  departureStationName: String!
  coveredDistanceMeters: Int!
  durationSeconds: Int!
  }

type JourneyResult {
  journeys: [Journey!]!
  paginationDetails: PaginationDetails!
}

input OrderBy {
  departureStationName: String
  returnStationName: String
  coveredDistanceMeters: String
  durationSeconds: String
}

type Query {
  journeysCount: Int!
  allJourneys(
    orderBy: OrderBy,
    currentPage: Int,
    limit: Int,
    departureStationName: String,
    returnStationName: String,
    coveredDistanceMeters: Int,
    durationSeconds: Int
  ): JourneyResult! 
}
`;

interface QueryArgs {
  currentPage: number;
  limit: number;
  departureStationName: string;
  returnStationName: string;
  coveredDistanceMeters: number;
  durrationSeconds: number;
  orderBy: OrderBy;
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
      const {
        currentPage,
        limit,
        departureStationName,
        returnStationName,
        coveredDistanceMeters,
        durrationSeconds,
        orderBy,
      } = args;

      const defaultQuery = {
        coveredDistanceMeters: {
          $gte: parseDistaceDurration(coveredDistanceMeters),
        },
        durationSeconds: {
          $gte: parseDistaceDurration(durrationSeconds),
        },
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
          limit: parseQueryLimit(limit),
          model: JourneyModel,
          query:
            departureStationName && returnStationName
              ? searchQuery
              : defaultQuery,
          orderBy,
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
