import express from "express";
import { hotelController } from "../controllers/hotel.controller.js";
import { validateJWTToken } from "../middlewares/jwt.middleware.js";
import { pathParamValidator, requestBodyValidator } from "../middlewares/validator.middleware.js";
import { COMMON_CONSTANTS } from "../constants/common.constants.js";

const hotelRouter = express.Router();
hotelRouter.use(validateJWTToken);

hotelRouter.get("/", hotelController.getHotels);
hotelRouter.get("/:id", pathParamValidator(COMMON_CONSTANTS.MONGO_OBJECT_ID_REGEX, "id"), hotelController.getOneHotel);
hotelRouter.post("/", requestBodyValidator(COMMON_CONSTANTS.CREATE_EDIT_HOTEL_FIELDS), hotelController.addHotel);
hotelRouter.put("/:id", requestBodyValidator(COMMON_CONSTANTS.CREATE_EDIT_HOTEL_FIELDS), hotelController.editHotel);

export default hotelRouter;
