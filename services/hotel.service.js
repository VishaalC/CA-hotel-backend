import { EXCEPTION_CONSTANTS } from "../constants/exception.constants.js";
import Hotel from "../models/hotel.model.js";
import { BadRequestError } from "../utils/error.utils.js";

/**
 * Returns a list of hotels
 *
 * @returns - array of hotels
 */
const getHotels = async () => {
  const hotels = await Hotel.find();
  return hotels;
};

/**
 * Returns a single hotel
 *
 * @param {String} hotelId - hotel ID
 * @returns {JSON} - JSON representation of hotel
 */
const getOneHotel = async (hotelId) => {
    const identifiedHotel = await Hotel.findById(hotelId);
    if (!identifiedHotel) {
        throw new BadRequestError(EXCEPTION_CONSTANTS.HOTEL_NOT_FOUND);
    }
    return identifiedHotel;
};

/**
 * Create a single hotel with the provided details
 *
 * @param {String} hotelName - name of the hotel
 * @param {String} address - address of the hotels
 * @returns
 */
const addHotel = async (hotelName, address) => {
  const hotel = await Hotel.create({
    name: hotelName,
    address: address,
  });
  return hotel;
};

/**
 * Edit an hotel
 *
 * @param {String} hotelId - ID of the hotel
 * @param {JSON} updatedHotelObject - JSON object of the updated hotel
 */
const editHotel = async (hotelId, updatedHotelObject) => {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, { $set: updatedHotelObject }, { returnDocument: after, runValidators: true });  
    if (!updatedHotel) {
        throw new BadRequestError(EXCEPTION_CONSTANTS.HOTEL_NOT_FOUND);
    }
    
    return updatedHotel;
};

export const hotelService = { getHotels, editHotel, getOneHotel, addHotel };
