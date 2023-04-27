import JourneyModel from '../../models/journeys';
import { Journey } from '../../types';

const typeDefs = `
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

input JourneyInput {
    departure: String!
    return: String!
    departureStationId: Int!
    departureStationName: String!
    returnStationId: Int!
    returnStationName: String!
    coveredDistanceMeters: Int!
    durationSeconds: Int!
}

type Mutation {
    addJourney(journeyInput: JourneyInput): Journey!
}
`;

interface MutationArgs {
  journeyInput: Journey;
}

const resolvers = {
  Mutation: {
    addJourney: async (_root: unknown, args: MutationArgs) => {
      const { journeyInput } = args;
      const journey = new JourneyModel(journeyInput);
      return journey.save();
    },
  },
};

export default { typeDefs, resolvers };
