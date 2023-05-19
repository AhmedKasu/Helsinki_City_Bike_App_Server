import { GraphQLError } from 'graphql';
import { SortOrder } from '../../types';

const isValidOrder = (order: string): order is SortOrder => {
  return Object.values(SortOrder)
    .map((o) => o.toString())
    .includes(order);
};

type OrderBy = SortOrder.Ascending | SortOrder.Descending;

export const parseSortOrder = (order: string): OrderBy => {
  if (!order || (order && !isValidOrder(order)))
    throw new GraphQLError(
      `Invalid order ${order}. Order may only be 'asc' or 'desc'`,
      {
        extensions: { code: 'BAD_USER_INPUT' },
      }
    );

  return order as OrderBy;
};
