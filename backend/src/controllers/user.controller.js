// import User from "../models/user.models.js";
import User from "../models/user.js";
import { verifyPasswordHash } from "../utils/validatePassword.js";
import { generateAccessRefreshToken } from "../middlewares/auth.middleware.js";

// Register User

/**
 * Registers a new user.
 *
 * @async
 * @function registerUser
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.first_name - The first name of the user.
 * @param {string} req.body.last_name - The last name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object with a status code and message.
 * @throws {Error} If there is an error during user registration.
 */
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  let user;

  // Check if all fields are filled
  if (!firstName || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // Check if user already exists
  user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create user
  try {
    user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.message === "Password validation failed.") {
      return res.status(400).json({
        message:
          "Password must be 6-20 characters long, contain at least one digit, one uppercase letter, one lowercase letter, and one special character",
      });
    } else {
      return res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if all fields are filled
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // Check if user exists
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  // Check if password is correct
  const isValidPassword = await verifyPasswordHash(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(user);

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
};

const logoutUser = async (req, res) => {
  const user = await User.findOne({
    where: { refreshToken: req.cookies.refreshToken },
  });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }
  // Delete refresh token from database
  await User.update(
    {
      refreshToken: null,
    },
    {
      where: { id: user.id },
    }
  );

  res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ message: "User logged out successfully" });
};

export { registerUser, loginUser, logoutUser };
