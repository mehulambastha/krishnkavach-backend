import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const getUserFromRequest = (req: Request) => {
  return (req as AuthenticatedRequest).user;
}
