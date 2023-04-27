import { merge } from 'lodash';

import journeysQuery from './queries/journeys';
import journeysMutation from './mutations/journeys';

export const typeDefs = [journeysQuery.typeDefs, journeysMutation.typeDefs];

export const resolvers = merge(
  journeysQuery.resolvers,
  journeysMutation.resolvers
);
