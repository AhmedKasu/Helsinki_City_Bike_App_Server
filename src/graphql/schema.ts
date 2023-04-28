import { merge } from 'lodash';

import journeysQuery from './queries/journeys';
import StationsQuery from './queries/stations';
import journeysMutation from './mutations/journeys';

export const typeDefs = [
  journeysQuery.typeDefs,
  StationsQuery.typeDefs,
  journeysMutation.typeDefs,
];

export const resolvers = merge(
  journeysQuery.resolvers,
  StationsQuery.resolvers,
  journeysMutation.resolvers
);
