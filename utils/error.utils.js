import { HTTP_STATUS } from "../constants/HTTP.constants.js";

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS.BAD_REQUEST;
  }
}

export class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS.UNAUTHORIZED;
  }
}
