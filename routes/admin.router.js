import express from "express";
import { adminController } from "../controllers/admin.controller.js";
import { requestBodyValidator } from "../middlewares/validator.middleware.js";
import { COMMON_CONSTANTS } from "../constants/common.constants.js";

const adminRouter = express.Router();
adminRouter.post("/", requestBodyValidator(COMMON_CONSTANTS.CREATE_LOGIN_ADMIN_FIELDS), adminController.signUp);
adminRouter.post("/login", requestBodyValidator(COMMON_CONSTANTS.CREATE_LOGIN_ADMIN_FIELDS), adminController.login);

export default adminRouter;
