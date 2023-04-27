import { Model } from 'mongoose';
import { hasNextPreviousPage } from './hasNextPreviousPage';
import { getSortingOrder } from './sorting';
import { OrderBy } from '../types';
interface Args {
  currentPage: number;
  limit: number;
  model: typeof Model;
  query: object;
  orderBy: OrderBy;
}

const paginatedResults = async ({
  currentPage,
  limit,
  model,
  query,
  orderBy,
}: Args) => {
  const startIndex = (currentPage - 1) * limit;
  const sortOrder = getSortingOrder(orderBy);
  console.log('order', sortOrder);

  const [modelResults, resultsTotal] = await Promise.all([
    model
      .find(query)
      .sort(orderBy)
      .limit(limit)
      .skip(startIndex)
      .select('-__v')
      .exec(),

    model.count(query),
  ]);

  const { nextPage, previousPage } = hasNextPreviousPage(
    currentPage,
    limit,
    resultsTotal
  );

  return {
    modelResults,
    paginationDetails: {
      resultsTotal,
      currentPage,
      limit,
      nextPage,
      previousPage,
    },
  };
};

export default paginatedResults;
