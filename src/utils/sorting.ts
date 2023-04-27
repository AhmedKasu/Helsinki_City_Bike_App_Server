import { GraphQLError } from 'graphql';
import { parseSortOrder } from './parsers';
import { OrderBy } from '../types';

export const getSortingOrder = (obj: OrderBy) => {
  if (obj && Object.keys(obj).length < 1)
    throw new GraphQLError('orderBy object can not be empty!', {
      extensions: { code: 'BAD_USER_INPUT' },
    });

  if (!obj) return {};

  const order: OrderBy = {};
  Object.keys(obj).forEach((key) => {
    order[key] = parseSortOrder(obj[key]);
  });
  return order;
};
