const { login } = require("../controllers/auth");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("login", () => {
  beforeAll(async () => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync("password", salt);
    await User.create({
      username: "testuser",
      email: "testuser@example.com",
      password: hashedPassword,
      phone: "1234567890",
      birthDate: "2000-01-01",
      gender: "male",
      address: "123 Main St",
    });
  });

  afterAll(async () => {
    await User.destroy({
      where: {
        username: "testuser",
      },
    });
  });

  it("should log in an existing user with correct credentials", async () => {
    const req = {
      body: {
        email: "testuser@example.com",
        password: "password",
      },
    };
    const res = {
      cookie: jest.fn(() => res),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("should return an error message when attempting to log in with incorrect password", async () => {
    const req = {
      body: {
        email: "testuser@example.com",
        password: "wrongpassword",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith("Wrong password");
  });

  it("should return an error message when attempting to log in with non-existent user", async () => {
    const req = {
      body: {
        email: "nonexistentuser@example.com",
        password: "password",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("User not found");
  });
});
