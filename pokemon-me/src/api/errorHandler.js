export const handleError = (error) => {
  const statusCode = error.response?.status;
  if (statusCode && statusCode !== 401) {
    console.error("API Error:", error);
  }
  return Promise.reject(error);
};
