import { GraphQLError } from 'graphql';
import JourneyModel from '../../models/journeys';
import StationModel from '../../models/stations';
import { Journey, Station } from '../../types';

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
    departureStationName: String!
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

      const departureStation: Station | null = await StationModel.findOne({
        nimi: journeyInput.departureStationName,
      });
      if (!departureStation)
        throw new GraphQLError('Saving journey failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: journeyInput.departureStationName,
          },
        });

      const returnStation: Station | null = await StationModel.findOne({
        nimi: journeyInput.returnStationName,
      });
      if (!returnStation)
        throw new GraphQLError('Saving journey failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: journeyInput.returnStationName,
          },
        });

      const journey = new JourneyModel({
        ...{
          ...journeyInput,
          departureStationId: departureStation?.id,
          returnStationId: returnStation?.id,
        },
      });

      return journey.save();
    },
  },
};

export default { typeDefs, resolvers };
