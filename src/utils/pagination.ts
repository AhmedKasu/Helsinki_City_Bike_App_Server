import { Model } from 'mongoose';
import { hasNextPreviousPage } from './hasNextPreviousPage';
import { getSortingOrder } from './sorting';
import { OrderBy } from '../types';
import { parseQueryLimit } from './parsers/paginationParsers';
interface Args {
  currentPage: number;
  limit: number;
  model: typeof Model;
  query: object;
  orderBy?: OrderBy;
}

const paginatedResults = async ({
  currentPage,
  limit,
  model,
  query,
  orderBy,
}: Args) => {
  const parsedLimit = parseQueryLimit(limit);
  const startIndex = (currentPage - 1) * parsedLimit;
  const sortOrder = getSortingOrder(orderBy);

  const [modelResults, resultsTotal] = await Promise.all([
    model
      .find(query)
      .sort(sortOrder)
      .limit(parsedLimit)
      .skip(startIndex)
      .select('-__v')
      .exec(),

    model.count(query),
  ]);

  const { nextPage, previousPage } = hasNextPreviousPage(
    currentPage,
    parsedLimit,
    resultsTotal
  );

  return {
    modelResults,
    paginationDetails: {
      resultsTotal,
      currentPage,
      limit: parsedLimit,
      nextPage,
      previousPage,
    },
  };
};

export default paginatedResults;
