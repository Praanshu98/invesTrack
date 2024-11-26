// import User from "../models/user.models.js";
import User from "../models/user.js";

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
  user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  return res.status(201).json({ message: "User created successfully" });
};

export { registerUser };
