import { jest } from "@jest/globals";

import { EXCEPTION_CONSTANTS } from "../constants/exception.constants.js";
import { BadRequestError, UnAuthorizedError } from "../utils/error.utils.js";

jest.unstable_mockModule("../models/user.model.js", () => ({
  default: {
    exists: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

jest.unstable_mockModule("../models/hotel.model.js", () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

jest.unstable_mockModule("../utils/common.utils.js", () => ({
  commonUtils: {
    getSafeAdmin: jest.fn((user) => ({ id: user._id, username: user.username })),
    generateJWTToken: jest.fn((payload) => "token-" + payload.username),
  },
}));

jest.unstable_mockModule("bcrypt", () => ({
  default: {
    hash: jest.fn(async (value) => "hashed-" + value),
    compare: jest.fn(async (value, hash) => value === hash.replace("hashed-", "")),
  },
}));

let adminService;
let hotelService;
let User;
let Hotel;
let commonUtils;
let bcrypt;

beforeAll(async () => {
  User = (await import("../models/user.model.js")).default;
  Hotel = (await import("../models/hotel.model.js")).default;
  commonUtils = (await import("../utils/common.utils.js")).commonUtils;
  bcrypt = (await import("bcrypt")).default;

  adminService = (await import("../services/admin.service.js")).adminService;
  hotelService = (await import("../services/hotel.service.js")).hotelService;
});

describe("adminService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createAdmin throws when username exists", async () => {
    User.exists.mockResolvedValue(true);

    await expect(adminService.createAdmin("admin", "pw")).rejects.toThrow(
      BadRequestError,
    );
    await expect(adminService.createAdmin("admin", "pw")).rejects.toThrow(
      EXCEPTION_CONSTANTS.ADMIN_WITH_USERNAME_ALREADY_EXISTS,
    );
  });

  test("createAdmin creates and returns safe admin object", async () => {
    User.exists.mockResolvedValue(false);
    User.create.mockResolvedValue({
      _id: "abc",
      username: "admin",
      toObject: () => ({ _id: "abc", username: "admin" }),
    });

    const result = await adminService.createAdmin("admin", "pw");

    expect(bcrypt.hash).toHaveBeenCalledWith("pw", expect.any(Number));
    expect(User.create).toHaveBeenCalledWith({
      username: "admin",
      password: "hashed-pw",
    });
    expect(result).toEqual({ id: "abc", username: "admin" });
  });

  test("adminLogin throws if user not found", async () => {
    User.findOne.mockResolvedValue(null);

    await expect(adminService.adminLogin("admin", "pw")).rejects.toThrow(
      UnAuthorizedError,
    );
    await expect(adminService.adminLogin("admin", "pw")).rejects.toThrow(
      EXCEPTION_CONSTANTS.ADMIN_WITH_USERNAME_NOT_EXIST,
    );
  });

  test("adminLogin throws when password doesn't match", async () => {
    User.findOne.mockResolvedValue({ password: "hashed-other" });

    await expect(adminService.adminLogin("admin", "pw")).rejects.toThrow(
      UnAuthorizedError,
    );
    await expect(adminService.adminLogin("admin", "pw")).rejects.toThrow(
      EXCEPTION_CONSTANTS.USERNAME_PASSWORD_INCORRECT,
    );
  });

  test("adminLogin returns token when credentials are valid", async () => {
    User.findOne.mockResolvedValue({
      username: "admin",
      password: "hashed-pw",
      toObject: () => ({ username: "admin" }),
    });

    const token = await adminService.adminLogin("admin", "pw");

    expect(token).toBe("token-admin");
    expect(commonUtils.generateJWTToken).toHaveBeenCalledWith({
      id: undefined,
      username: "admin",
    });
  });
});

describe("hotelService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getHotels returns hotel list", async () => {
    const hotels = [{ name: "H1" }, { name: "H2" }];
    Hotel.find.mockResolvedValue(hotels);

    const result = await hotelService.getHotels();
    expect(result).toBe(hotels);
  });

  test("getOneHotel throws when not found", async () => {
    Hotel.findById.mockResolvedValue(null);

    await expect(hotelService.getOneHotel("id")).rejects.toThrow(
      BadRequestError,
    );
    await expect(hotelService.getOneHotel("id")).rejects.toThrow(
      EXCEPTION_CONSTANTS.HOTEL_NOT_FOUND,
    );
  });

  test("getOneHotel returns hotel when found", async () => {
    const hotel = { name: "Test" };
    Hotel.findById.mockResolvedValue(hotel);

    const result = await hotelService.getOneHotel("id");
    expect(result).toBe(hotel);
  });

  test("addHotel creates and returns a hotel", async () => {
    const created = { name: "New", address: "Addr" };
    Hotel.create.mockResolvedValue(created);

    const result = await hotelService.addHotel("New", "Addr");
    expect(result).toBe(created);
    expect(Hotel.create).toHaveBeenCalledWith({ name: "New", address: "Addr" });
  });

  test("editHotel throws when hotel not found", async () => {
    Hotel.findByIdAndUpdate.mockResolvedValue(null);

    await expect(hotelService.editHotel("id", { name: "X" })).rejects.toThrow(
      BadRequestError,
    );
    await expect(hotelService.editHotel("id", { name: "X" })).rejects.toThrow(
      EXCEPTION_CONSTANTS.HOTEL_NOT_FOUND,
    );
  });

  test("editHotel returns updated hotel", async () => {
    const updated = { name: "Updated" };
    Hotel.findByIdAndUpdate.mockResolvedValue(updated);

    const result = await hotelService.editHotel("id", { name: "Updated" });
    expect(result).toBe(updated);
    expect(Hotel.findByIdAndUpdate).toHaveBeenCalledWith(
      "id",
      { $set: { name: "Updated" } },
      { returnDocument: "after", runValidators: true },
    );
  });
});
