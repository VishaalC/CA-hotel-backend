import { EXCEPTION_CONSTANTS } from "../constants/exception.constants.js";
import { BadRequestError } from "../utils/error.utils.js";

/**
 * Validates the provided request body fields
 * 
 * @param {Array} allowedFields - Array of fields allowed
 */
export const requestBodyValidator = (allowedFields) => {
    return (req, res, next) => {
        const requestBodyFields = Object.keys(req.body);
        for (const field of requestBodyFields) {
            if (!allowedFields.includes(field)) {
                throw new BadRequestError(`${EXCEPTION_CONSTANTS.INVALID_BODY_FIELD}: ${field}`);
            }
        }
        next();
    }
}

/**
 * Validates the provided path params
 * 
 * @param {RegExp} validPathParamRegex - Regex to validate the path params
 * @param {String} pathParam - path param to be validated
 */
export const pathParamValidator = (validPathParamRegex, pathParam) => {
    return (req, res, next) => {
        if (!validPathParamRegex.test(req.params[pathParam])) {
            throw new BadRequestError(`${EXCEPTION_CONSTANTS.INVALID_PATH_PARAM}: ${pathParam}`)
        }
        next(); 
    }
}