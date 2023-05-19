import { GraphQLError } from 'graphql';
import { Default } from '../../types';

export const parseMonth = (value: number) => {
  if (value < 1 || value > 12)
    throw new GraphQLError(`Invalid month format. Month must be (1-12)`, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  return value;
};

export const parseCurrentPage = (value: number): number => {
  return value > 0 ? value : Default.CurrentPage;
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
