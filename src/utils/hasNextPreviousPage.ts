interface NextPreviousPage {
  nextPage: boolean;
  previousPage: boolean;
}

export const hasNextPreviousPage = (
  currentPage: number,
  limit: number,
  modelLength: number
): NextPreviousPage => {
  const startIndex = (currentPage - 1) * limit;
  const endIndex = currentPage * limit;

  const nextPage = endIndex < modelLength ? true : false;
  const previousPage = startIndex > 0 ? true : false;
  return { nextPage, previousPage };
};
