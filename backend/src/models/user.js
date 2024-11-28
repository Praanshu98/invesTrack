"use strict";

import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import sequelize from "../db_connect.js";
import { validatePassword } from "../utils/validatePassword.js";

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (!validatePassword(user.password)) {
          throw new Error("Password validation failed.");
        } else {
          user.password = await bcrypt.hash(
            user.password,
            Number(process.env.SALT_ROUNDS)
          );
        }
      },
    },
    sequelize,
    modelName: "Users",
  }
);

export default User;
