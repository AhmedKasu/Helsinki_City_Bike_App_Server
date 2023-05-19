import { GraphQLError } from 'graphql';
import { Default, SortOrder } from '../types';

export const parseDistaceDurration = (value: number): number => {
  return value ? value : Default.DistanceDurration;
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

export const parseMonth = (value: number) => {
  if (value < 1 || value > 12)
    throw new GraphQLError(`Invalid month format. Month must be (1-12)`, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  return value;
};
