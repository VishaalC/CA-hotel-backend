import { HTTP_MESSAGES, HTTP_STATUS } from "../constants/HTTP.constants.js";

/**
 * Utility function to handle response sending
 *
 * @param {String} message - HTTP Message to be sent in response
 * @param {Number} status - HTTP Status to be sent
 * @param {JSON} payload - JSON payload to be sent
 *
 * @returns {void}
 */
export const sendResponse = (res, message, status, payload) => {
  const error_status = HTTP_STATUS.INTERNAL_SERVER_ERROR;

  res.status(status || error_status).json({
    status: status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: message || HTTP_MESSAGES.INTERNAL_SERVER_ERROR,
    payload: payload || "",
  });
};
