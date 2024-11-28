export const sendResponse = (res, code, message, data = {}) => {
  const response = message ? { message, ...data } : { ...data };
  res.status(code).json(response);
};
