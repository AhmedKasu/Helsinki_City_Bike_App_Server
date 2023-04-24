import { Model } from 'mongoose';
import { PaginationDetails } from '../types';
import { GraphQLError } from 'graphql';

const isValidLimit = (limit: number): boolean => {
  return limit > 0 && limit < 101;
};

const hasNextPreviousPage = (
  currentPage: number,
  limit: number,
  modelLength: number
): Omit<PaginationDetails, 'limit' | 'currentPage'> => {
  const startIndex = (currentPage - 1) * limit;
  const endIndex = currentPage * limit;

  const nextPage = endIndex < modelLength ? true : false;
  const previousPage = startIndex > 0 ? true : false;
  return { nextPage, previousPage };
};

interface args {
  currentPage: number;
  limit: number;
  model: typeof Model;
  query: object;
}

const paginatedResults = async ({ currentPage, limit, model, query }: args) => {
  if (!isValidLimit(limit)) {
    throw new GraphQLError(
      'Limit must be greater than 0 and less than or equal to 100',
      { extensions: { code: 'BAD_USER_INPUT' } }
    );
  }

  const startIndex = (currentPage - 1) * limit;
  const modelLength = await model.collection.countDocuments();

  const { nextPage, previousPage } = hasNextPreviousPage(
    currentPage,
    limit,
    modelLength
  );

  const modelResults = await model
    .find(query)
    .limit(limit)
    .skip(startIndex)
    .select('-__v')
    .exec();

  return {
    modelResults,
    paginationDetails: { currentPage, limit, nextPage, previousPage },
  };
};

export default paginatedResults;
