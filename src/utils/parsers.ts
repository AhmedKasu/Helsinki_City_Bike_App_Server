import { GraphQLError } from 'graphql';
import { Default } from '../types';

export const parseDistaceDurration = (value: number): number => {
  if (value !== undefined && value < Default.DistanceDurration) {
    throw new GraphQLError(
      `Distance or Durration must be greater than or equal to ${Default.DistanceDurration}`,
      { extensions: { code: 'BAD_USER_INPUT' } }
    );
  }

  return value ? value : Default.DistanceDurration;
};

export const parseQueryLimit = (limit: number) => {
  if (
    limit !== undefined &&
    (limit < Default.MinQueryLimit || limit > Default.MaxQueryLimit)
  )
    throw new GraphQLError(
      `Limit must be greater than or equal to ${Default.MinQueryLimit} and less than or equal to ${Default.MaxQueryLimit}`,
      { extensions: { code: 'BAD_USER_INPUT' } }
    );

  return limit ? limit : Default.MinQueryLimit;
};
