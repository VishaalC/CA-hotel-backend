import mongoose from "mongoose";
import { EXCEPTION_CONSTANTS } from "../constants/exception.constants.js";
import dns from "dns";

/**
 * Function to connect to MongoDB through mongoose
 *
 * @param connectionURI - {string} connection URI string
 *
 * @returns mongoose Connection object
 */
async function connectToMongoDB(connectionURI) {
  try {
    // This is a fix for an issue in node 24.4 which prevents mongoose DNS from resolving
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    return await mongoose.connect(connectionURI);
  } catch (exception) {
    console.log(EXCEPTION_CONSTANTS.DB_CONNECTION_EXCEPTION, exception);
  }
}

export { connectToMongoDB };
