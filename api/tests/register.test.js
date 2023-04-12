const { register } = require("../controllers/auth");
const { User } = require("../models");

describe("register", () => {
  afterAll(async () => {
    // delete all users created during the test
    await User.destroy({
      where: {
        username: "testuser",
      },
    });
  });

  it("should create a new user when given valid input", async () => {
    const req = {
      body: {
        username: "testuser",
        email: "testuser@example.com",
        password: "password",
        phone: "1234567890",
        birthDate: "2000-01-01",
        gender: "male",
        address: "123 Main St",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("User has been created");
  });

  it("should return an error message when trying to register an existing user", async () => {
    const req = {
      body: {
        username: "testuser",
        email: "testuser@example.com",
        password: "password",
        phone: "1234567890",
        birthDate: "2000-01-01",
        gender: "male",
        address: "123 Main St",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith("User already exists");
  });
});
