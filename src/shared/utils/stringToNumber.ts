import { ResponseError } from "../errors/response.error.js";

export const stringToNumber = (
  value: string | undefined,
  statusCode: number,
  errorMessage: string
): number => {
  const result = Number(value);
  if (isNaN(result)) {
    throw new ResponseError(statusCode, errorMessage);
  }
  return result;
};
