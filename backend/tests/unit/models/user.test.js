import {
  vi,
  expect,
  describe,
  it,
  beforeEach,
  beforeAll,
  afterAll,
} from "vitest";
import { sequelize } from "../../../src/db_connect.js";
import bcrypt from "bcrypt";

import { validatePassword } from "../../../src/utils/validatePassword.js";
import User from "../../../src/models/user.js";
import { Sequelize } from "sequelize";

vi.mock("bcrypt");
vi.mock("../../../src/utils/validatePassword.js");

beforeAll(() => {
  sequelize = new Sequelize("sqlite::memory:");
  const attributes = User.getAttributes();
  User.init(attributes, {
    hooks: {
      beforeCreate: async (user) => {
        if (!validatePassword(user.password)) {
          console.log(validatePassword(user.password));
          throw new Error(
            "Password must be 6-20 characters long, contain at least one digit, one uppercase letter, one lowercase letter, and one special character"
          );
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
  });
});

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe.concurrent("User model", () => {
  it("should be called with the correct attributes", () => {
    const attributes = User.getAttributes();

    expect(attributes.firstName).toBeDefined();
    expect(attributes.lastName).toBeDefined();
    expect(attributes.email).toBeDefined();
    expect(attributes.password).toBeDefined();
    expect(attributes.refreshToken).toBeDefined();
  });

  it("should be throw an error if the password is invalid", async () => {
    validatePassword.mockReturnValue(false);

    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "abc@investrack.com",
      password: "password",
    };

    expect(User.create(userData)).rejects.toThrow(
      "Password must be 6-20 characters long, contain at least one digit, one uppercase letter, one lowercase letter, and one special character"
    );
  });

  it("should has the password before saving", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "abc@investrack.com",
      password: "password",
    };

    validatePassword.mockReturnValue(true);
    bcrypt.hash.mockReturnValue("hashedPassword");

    const user = await User.create(userData);

    expect(bcrypt.hash).toHaveBeenCalledWith("password", expect.any(Number));
    expect(user.password).toEqual("hashedPassword");
  });

  it("should have created user with valid data", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "abc@investrack.com",
      password: "hashedPassword",
    };

    validatePassword.mockReturnValue(true);
    bcrypt.hash.mockReturnValue("hashedPassword");

    const user = await User.create(userData);

    expect(user).toBeDefined();
    expect(user.firstName).toEqual(userData.firstName);
    expect(user.lastName).toEqual(userData.lastName);
    expect(user.email).toEqual(userData.email);
    expect(user.password).toEqual("hashedPassword");
  });
});
