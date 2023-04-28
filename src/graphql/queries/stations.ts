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
    searchStation(nimi:String!): [String]
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

type SearchResults = Array<string>;

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

    searchStation: async (
      _root: unknown,
      args: { nimi: string }
    ): Promise<SearchResults> => {
      const agg = [
        {
          $search: {
            index: 'stationAutoComplete',
            autocomplete: { query: args.nimi, path: 'nimi' },
          },
        },
        { $limit: 10 },
        { $project: { _id: 0, nimi: 1 } },
      ];

      const autoCompleteResult = await StationModel.aggregate(agg);
      const searchResult: SearchResults = [];

      autoCompleteResult.map((object: { nimi: string }) =>
        searchResult.push(object.nimi)
      );
      return searchResult;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
