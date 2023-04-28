import StationModel from '../../models/stations';

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

type Query {
    stationsCount: Int!
    allStations: [Station!]! 
  }
`;

const resolvers = {
  Query: {
    stationsCount: async (): Promise<number> =>
      StationModel.collection.countDocuments(),

    allStations: async () => {
      const stations = await StationModel.find({});
      return stations;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
