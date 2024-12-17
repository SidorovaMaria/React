export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleString("en-GB", options).replace(",", "");
};
