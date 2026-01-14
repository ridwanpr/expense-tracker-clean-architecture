import { ResponseError } from "../errors/response.error.js";

export const stringToNumber = (
  value: string | undefined,
  statusCode: number,
  errorMessage: string
): number => {
  if (!value || value.trim() === "") {
    throw new ResponseError(statusCode, errorMessage);
  }
  const result = Number(value);
  if (isNaN(result)) {
    throw new ResponseError(statusCode, errorMessage);
  }
  return result;
};
