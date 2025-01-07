export const extractIndexFromUrl = (url) => {
  const segments = url.split("/");
  const index = segments[segments.length - 2]; // The second to last segment is the ID
  return index;
};
export const setPageNumber = (pageNumber) => {
  const limit = 20 * pageNumber;
  const offset = 20 * (pageNumber - 1);
  return { limit, offset };
};
