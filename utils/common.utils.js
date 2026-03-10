import jwt from "jsonwebtoken";

/**
 * Util function to remove sensitive credentials from admin object
 *
 * @param {JSON} admin - Admin details
 * @returns {JSON} - Returns a safe version of admin without sensitive credentials
 */
const getSafeAdmin = (admin) => {
  const { password, __v, ...safeAdmin } = admin;
  return safeAdmin;
};

/**
 * Generates a JSON web token
 *
 * @param {String} payload - payload
 *
 * @returns {String} - JSON web token strings
 */
const generateJWTToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

export const commonUtils = { getSafeAdmin, generateJWTToken };
