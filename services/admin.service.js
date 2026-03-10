import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { commonUtils } from "../utils/common.utils.js";
import { EXCEPTION_CONSTANTS } from "../constants/exception.constants.js";
import { HTTP_MESSAGES } from "../constants/HTTP.constants.js";
import { BadRequestError, UnAuthorizedError } from "../utils/error.utils.js";

/**
 * Handles admin creation with the provided credentials
 *
 * @param {string} username - username of the admin
 * @param {string} password - plaintext password of the admin
 *
 * @returns {Promise<JSON>} - created admin detaisl
 */
const createAdmin = async (username, password) => {
  const doesAdminUsernameExist = await User.exists({
    username: username,
  });
  if (doesAdminUsernameExist) {
    throw new BadRequestError(
      EXCEPTION_CONSTANTS.ADMIN_WITH_USERNAME_ALREADY_EXISTS,
    );
  }

  const encryptedPassword = await bcrypt.hash(
    password,
    Number.parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
  );
  const createdAdmin = await User.create({
    username: username,
    password: encryptedPassword,
  });
  return commonUtils.getSafeAdmin(createdAdmin.toObject());
};

/**
 * Handles admin login
 *
 * @param {string} username - username of the admin
 * @param {string} password - plaintext password of the admin
 */
const adminLogin = async (username, password) => {
  const retrievedAdmin = await User.findOne({ username: username });
  if (!retrievedAdmin) {
    throw new UnAuthorizedError(EXCEPTION_CONSTANTS.ADMIN_WITH_USERNAME_NOT_EXIST);
  }
  const adminPassword = retrievedAdmin.password;

  if (!(await bcrypt.compare(password, adminPassword))) {
    throw new UnAuthorizedError(EXCEPTION_CONSTANTS.USERNAME_PASSWORD_INCORRECT);
  }
  return commonUtils.generateJWTToken(
    commonUtils.getSafeAdmin(retrievedAdmin.toObject()),
  );
};

export const adminService = { createAdmin, adminLogin };
