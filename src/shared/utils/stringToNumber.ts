import { ResponseError } from "../errors/response.error.js";

export const stringToNumber = (
  value: string | undefined,
  statusCode: number,
  errorMessage: string
) => {
  const result = Number(value);

  if (NaN) {
    throw new ResponseError(statusCode, errorMessage);
  }

  return result;
};
