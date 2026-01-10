import type { Request } from "express";
import type { User } from "../../generated/prisma/client.js";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

export interface UserRequest<
  Body = any,
  Params = ParamsDictionary,
  Query = ParsedQs
> extends Request<Params, any, Body, Query> {
  user?: User;
}
