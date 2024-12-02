import jwt from "jsonwebtoken";
import prisma from "../db_connect.js";

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "2d",
    }
  );
  return refreshToken;
};

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, name: user.first_name },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );

  return accessToken;
};

const generateAccessRefreshToken = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refreshToken: refreshToken,
    },
  });

  return { accessToken, refreshToken };
};

// const verifyAccessToken = (user, token) => {
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return "Invalid token";
//     }
//     return generateAccessToken(user);
//   });
// };

export {
  generateRefreshToken,
  generateAccessToken,
  generateAccessRefreshToken,
};
