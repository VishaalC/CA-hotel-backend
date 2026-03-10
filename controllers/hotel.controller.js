import { HTTP_MESSAGES, HTTP_STATUS } from "../constants/HTTP.constants.js";
import { hotelService } from "../services/hotel.service.js";
import { sendResponse } from "../utils/response.utils.js";

/**
 * Retrieves list of hotels
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns
 */
const getHotels = async (req, res) => {
  const hotels = await hotelService.getHotels();
  sendResponse(res, HTTP_MESSAGES.SUCCESS_OK, HTTP_STATUS.SUCCESS_OK, hotels);
};

/**
 * Retrieves one hotel
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
const getOneHotel = async (req, res) => {
  const hotel = await hotelService.getOneHotel(req.params.id);
  sendResponse(res, HTTP_MESSAGES.SUCCESS_OK, HTTP_STATUS.SUCCESS_OK, hotel);
};

/**
 * Adds one hotel
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
const addHotel = async (req, res) => {
  const hotel = await hotelService.addHotel(
    req.body.name,
    req.body.address,
  );
  sendResponse(res, HTTP_MESSAGES.SUCCESS_OK, HTTP_STATUS.SUCCESS_OK, hotel);
};

/**s
 * Edit/Update an hotel
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
const editHotel = async (req, res) => {
  const hotel = await hotelService.editHotel(req.params.id, req.body);
  sendResponse(res, HTTP_MESSAGES.SUCCESS_OK, HTTP_STATUS.SUCCESS_OK, hotel);
};

export const hotelController = { getHotels, editHotel, getOneHotel, addHotel };
