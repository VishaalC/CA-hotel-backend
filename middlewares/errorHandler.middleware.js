import { EXCEPTION_CONSTANTS } from "../constants/exception.constants.js";
import { sendResponse } from "../utils/response.utils.js";

/**
 * Error handler middleware that console logs the error and send an error response message with status code
 *
 * @param {Error} error - Error Obejct
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param next - Next function
 */
export const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(
    EXCEPTION_CONSTANTS.GENERIC_ERROR_MESSAGE,
    error.message,
    error.stack,
  );

  sendResponse(res, error.message, error.status, []);
};
