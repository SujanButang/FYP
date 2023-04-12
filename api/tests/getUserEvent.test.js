const { User, Events } = require("../models");
const { Sequelize } = require("sequelize");
const { getUserEvents } = require("../controllers/events");

describe("getUserEvents", () => {
  it("should return events hosted by the user with the given userId", async () => {
    const userId = 123;
    const expectedEvents = [
      { id: 1, host: userId },
      { id: 2, host: userId },
    ];
    const findAllMock = jest.fn().mockResolvedValueOnce(expectedEvents);
    const includeMock = jest.fn().mockReturnValue({ where: jest.fn() });
    Events.findAll = findAllMock;
    User.findOne = jest.fn().mockResolvedValueOnce({});
    User.findOne.mockReturnValue({ include: includeMock });
    const req = { query: { userId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getUserEvents(req, res);
    expect(Events.findAll).toHaveBeenCalledWith({
      where: { host: userId },
      include: {
        model: User,
        attributes: ["username", "profilePicture"],
        where: { id: Sequelize.col("Events.host") },
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedEvents);
  });

  it("should return 404 if no events are found", async () => {
    const userId = 456;
    Events.findAll = jest.fn().mockResolvedValueOnce(null);
    const req = { query: { userId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getUserEvents(req, res);
    expect(Events.findAll).toHaveBeenCalledWith({
      where: { host: userId },
      include: {
        model: User,
        attributes: ["username", "profilePicture"],
        where: { id: Sequelize.col("Events.host") },
      },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("No events found");
  });

  it("should return 500 if there is an error", async () => {
    const userId = 789;
    const error = new Error("Internal Server Error");
    Events.findAll = jest.fn().mockRejectedValueOnce(error);
    const req = { query: { userId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getUserEvents(req, res);
    expect(Events.findAll).toHaveBeenCalledWith({
      where: { host: userId },
      include: {
        model: User,
        attributes: ["username", "profilePicture"],
        where: { id: Sequelize.col("Events.host") },
      },
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(error);
  });
});
