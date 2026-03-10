import { HTTP_MESSAGES, HTTP_STATUS } from "../constants/HTTP.constants.js";
import { adminService } from "../services/admin.service.js";
import { sendResponse } from "../utils/response.utils.js";

/**
 * Controller to handle admin sign up
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
const signUp = async (req, res) => {
  const createdUser = await adminService.createAdmin(
    req.body.username,
    req.body.password,
  );
  sendResponse(
    res,
    HTTP_MESSAGES.SUCCESS_OK,
    HTTP_STATUS.SUCCESS_OK,
    createdUser,
  );
};

/**
 * Login controller for admins
 */
const login = async (req, res) => {
  const logInUser = await adminService.adminLogin(
    req.body.username,
    req.body.password,
  );
  sendResponse(
    res,
    HTTP_MESSAGES.SUCCESS_OK,
    HTTP_STATUS.SUCCESS_OK,
    logInUser,
  );
};

export const adminController = { login, signUp };
