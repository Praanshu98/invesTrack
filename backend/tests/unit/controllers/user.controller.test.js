import { describe, it, expect, beforeEach, vi } from "vitest";

import {
  registerUser,
  loginUser,
} from "../../../src/controllers/user.controller";

import User from "../../../src/models/user.js";
import { verifyPasswordHash } from "../../../src/utils/validatePassword.js";
import { generateAccessRefreshToken } from "../../../src/middlewares/auth.middleware.js";

// Mock dependencies
vi.mock("../../../src/models/user.js");
vi.mock("../../../src/utils/validatePassword.js");
vi.mock("../../../src/middlewares/auth.middleware.js");

let req, res;

beforeEach(() => {
  vi.clearAllMocks();
  req = {
    body: {},
  };
  res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
    cookie: vi.fn().mockReturnThis(),
  };
});

describe("registerUser", () => {
  it("should return a 400 status code if any field is missing", async () => {
    req.body = {
      firstName: "John",
      lastName: "Doe",
      email: "john@investrack.com",
    };
    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please fill in all fields",
    });
  });

  it("should return a 400 status code if user already exists", async () => {
    req.body = {
      firstName: "John",
      lastName: "Doe",
      email: "John@investrack.com",
      password: "password123",
    };

    User.findOne.mockResolvedValue({ email: "John@investrack.com" });
    await registerUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: req.body.email },
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "User already exists",
    });
  });

  it("should return a 201 status code if user is created successfully", async () => {
    req.body = {
      firstName: "John",
      lastName: "Doe",
      email: "john@investrack.com",
      password: "password123",
    };

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      firstName: "John",
      lastName: "Doe",
      email: "john@investrack.com",
      password: "hashedPassword",
    });

    await registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created successfully",
    });
  });
});

describe("loginUser", () => {
  it("should return a 400 status code if any field is missing", async () => {
    req.body = {
      email: "john@investrack.com",
    };

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please fill in all fields",
    });
  });

  it("should return a 400 status code if user does not exist", async () => {
    req.body = {
      email: "john@investrack.com",
      password: "password123",
    };

    User.findOne.mockResolvedValue(null);

    await loginUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: req.body.email },
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "User does not exist",
    });
  });

  it("should return a 400 status code if password is incorrect", async () => {
    req.body = {
      email: "john@investrack.com",
      password: "password123",
    };

    const user = {
      email: "john@investrack.com",
      password: "password123",
    };

    User.findOne.mockResolvedValue({
      id: 1,
      email: "john@example.com",
      password: "hashedpassword123",
    });

    verifyPasswordHash.mockResolvedValue(false);

    await loginUser(req, res);

    expect(verifyPasswordHash).toHaveBeenCalledWith(
      req.body.password,
      "hashedpassword123"
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid password",
    });
  });

  it("should return a 200 status code if user is logged in successfully", async () => {
    req.body = {
      email: "john@investrack.com",
      password: "password123",
    };

    const user = {
      firstName: "John",
      lastName: "Doe",
      email: "john@investrack.com",
      password: "password123",
    };

    User.findOne.mockResolvedValue(user);
    verifyPasswordHash.mockResolvedValue(true);
    generateAccessRefreshToken.mockResolvedValue({
      accessToken: "accessToken123",
      refreshToken: "refreshToken123",
    });

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.cookie).toHaveBeenCalledWith("accessToken", "accessToken123");
    expect(res.cookie).toHaveBeenCalledWith("refreshToken", "refreshToken123");
    expect(res.json).toHaveBeenCalledWith({
      message: "User logged in successfully",
      accessToken: "accessToken123",
      refreshToken: "refreshToken123",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  });
});
