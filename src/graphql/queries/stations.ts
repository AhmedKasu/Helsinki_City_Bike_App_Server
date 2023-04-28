import StationModel from '../../models/stations';
import { Station, PaginationDetails } from '../../types';
import paginatedResults from '../../utils/pagination';

const typeDefs = `
type Station {
    fId: Int!
    id: Int!
    nimi: String!
    namn: String!
    name: String!
    osoite: String!
    adress: String!
    kaupunki: String!
    stad: String!
    operaattor: String!
    kapasiteet: Int!
    x: Float!
    y: Float!
}

type PaginationDetails {
    resultsTotal: Int!
    limit: Int!
    currentPage: Int!
    nextPage: Boolean!
    previousPage: Boolean!
  }

type StationResult {
    stations: [Station!]!
    paginationDetails: PaginationDetails!
}  

type Query {
    stationsCount: Int!
    allStations( currentPage: Int,limit: Int,): StationResult! 
  }
`;
interface QueryArgs {
  currentPage: number;
  limit: number;
}
interface StationResults {
  stations: Array<Station>;
  paginationDetails: PaginationDetails;
}

const resolvers = {
  Query: {
    stationsCount: async (): Promise<number> =>
      StationModel.collection.countDocuments(),

    allStations: async (
      _root: unknown,
      args: QueryArgs
    ): Promise<StationResults> => {
      const { limit, currentPage } = args;

      const { modelResults: stations, paginationDetails } =
        await paginatedResults({
          currentPage,
          limit,
          model: StationModel,
          query: {},
        });

      return {
        stations,
        paginationDetails,
      };
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
