import bcrypt from "bcrypt";

import prisma from "../db_connect.js";
import {
  validatePassword,
  verifyPasswordHash,
} from "../utils/validatePassword.js";
import { generateAccessRefreshToken } from "../middlewares/auth.middleware.js";

// Register User

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if all fields are filled
    if (!firstName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    let user;

    // Check if user already exists
    user = await prisma.user.findFirst({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if password is valid ( length, special characters, etc)
    const passwordValidation = validatePassword(password);
    if (!passwordValidation) {
      return res.status(400).json({
        message:
          "Password must be 6-20 characters long, contain at least one digit, one uppercase letter, one lowercase letter, and one special character",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_PASSWORD)
    );

    // Create user
    user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      },
    });

    // Return response
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are filled
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if user exists
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if password is correct
    const isValidPassword = await verifyPasswordHash(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(
      user
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken)
      .json({
        message: "User logged in successfully",
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: { refreshToken: req.cookies.refreshToken },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    // Delete refresh token from database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: null },
    });

    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging out user",
      error: error.message,
    });
  }
};

export { registerUser, loginUser, logoutUser };
