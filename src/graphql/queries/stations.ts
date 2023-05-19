import StationModel from '../../models/stations';
import { Station, PaginationDetails, Journey } from '../../types';
import paginatedResults from '../../utils/pagination';
import { stationAggregate } from '../../utils/aggregations';
import { averageDistance, findOccurrence } from '../../utils/utils';
import {
  parseMonth,
  parseCurrentPage,
} from '../../utils/parsers/paginationParsers';

import * as _ from 'lodash';

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
  
type StationsResult {
    stations: [Station!]!
    paginationDetails: PaginationDetails!
}  

type StartMostPopular {
    returnStationName: String
    journeys: Int
}

type EndMostPopular  {
    departureStationName: String
    journeys: Int
}

type StartStationJourneyDetails {
    count: Int!
    averageDistanceMeters: Int!  
    mostPopular: [StartMostPopular]
}

type EndStationJourneyDetails {
    count: Int!
    averageDistanceMeters: Int!  
    mostPopular:[ EndMostPopular]
}

type StationResult {
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
    journeysStarting: StartStationJourneyDetails!
    journeysEnding: EndStationJourneyDetails!
}

type Query {
    stationsCount: Int!
    allStations( currentPage: Int,limit: Int,): StationsResult! 
    searchStation(nimi:String!): [String]
    getStation( nimi: String!,month: Int): [StationResult]!
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
interface SearchArg {
  nimi: string;
  month: number;
}

interface MostPopular {
  departureStationName?: string;
  returnStationName?: string;
  journeys?: number;
}

interface StationJourneyDetails {
  count: number;
  averageDistanceMeters: number;
  mostPopular: Array<MostPopular>;
}
interface StationResult {
  fId: number;
  id: number;
  nimi: string;
  namn: string;
  name: string;
  osoite: string;
  adress: string;
  kaupunki: string;
  stad: string;
  operaattor: string;
  kapasiteet: number;
  x: number;
  y: number;
  journeysStarting: StationJourneyDetails;
  journeysEnding: StationJourneyDetails;
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
          currentPage: parseCurrentPage(currentPage),
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
      { nimi }: SearchArg
    ): Promise<SearchResults> => {
      const agg = [
        {
          $search: {
            index: 'stationAutoComplete',
            autocomplete: { query: nimi, path: 'nimi' },
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

    getStation: async (
      _root: unknown,
      { nimi, month }: SearchArg
    ): Promise<Array<StationResult>> => {
      const validMonth = parseMonth(month);

      const result = await StationModel.aggregate(
        stationAggregate({ nimi, month: validMonth })
      );

      const journeysStarting: Array<Journey> = result[0].journeysStarting; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      const journeysEnding: Array<Journey> = result[0].journeysEnding; // eslint-disable-line @typescript-eslint/no-unsafe-assignment

      const station: Array<StationResult> = _.cloneDeep(result); // eslint-disable-line @typescript-eslint/no-unsafe-assignment

      station[0].journeysStarting = {
        count: journeysStarting.length,
        averageDistanceMeters: averageDistance(journeysStarting),
        mostPopular: findOccurrence(journeysStarting, 'returnStationName'),
      };
      station[0].journeysEnding = {
        count: journeysEnding.length,
        averageDistanceMeters: averageDistance(journeysEnding),
        mostPopular: findOccurrence(journeysEnding, 'departureStationName'),
      };

      return station;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
