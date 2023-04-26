import { Model } from 'mongoose';
import { hasNextPreviousPage } from './hasNextPreviousPage';
interface Args {
  currentPage: number;
  limit: number;
  model: typeof Model;
  query: object;
}

const paginatedResults = async ({ currentPage, limit, model, query }: Args) => {
  const startIndex = (currentPage - 1) * limit;

  const [modelResults, resultsTotal] = await Promise.all([
    model.find(query).limit(limit).skip(startIndex).select('-__v').exec(),

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
