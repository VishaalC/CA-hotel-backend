import { EXCEPTION_CONSTANTS } from "../constants/exception.constants.js";
import { UnAuthorizedError } from "../utils/error.utils.js";
import jwt from "jsonwebtoken";

/**
 * Validates the JWT token in authorization headers
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param next
 */
export const validateJWTToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new UnAuthorizedError(EXCEPTION_CONSTANTS.MISSING_BEARER);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new UnAuthorizedError(err.message);
    }
    req.user = decoded;
    next();
  });
};
