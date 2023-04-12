const jwt = require("jsonwebtoken");
const { Events, Rooms } = require("../models");
const { createEvent } = require("../controllers/events");

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("createEvent", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      cookies: { accessToken: "valid-token" },
      body: {
        destination: "New York",
        type: "Vacation",
        start: "2023-04-10",
        end: "2023-04-20",
        desc: "A trip to New York",
        destPic: "https://example.com/newyork.jpg",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Events.findOne = jest.fn();
    Events.create = jest.fn();
    Rooms.create = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 403 if user is not logged in", async () => {
    req.cookies.accessToken = undefined;
    await createEvent(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith("User is not logged in.");
  });

  it("should return 403 if token is not valid", async () => {
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(new Error("Invalid token"));
    });
    await createEvent(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith("Token not valid");
  });

  it("should create a new event", async () => {
    const userId = 123;
    req.cookies.accessToken = "valid-token";
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(null, { id: userId });
    });
    Events.findOne.mockResolvedValueOnce(null);
    const eventId = 2;
    Events.create.mockResolvedValueOnce({ id: eventId, members: [userId] });
    Rooms.create.mockResolvedValueOnce({});
    await createEvent(req, res);
    expect(Events.create).toHaveBeenCalledWith({
      destination: "New York",
      eventType: "Vacation",
      startDate: "2023-04-10",
      endDate: "2023-04-20",
      members: [userId],
      eventDescription: "A trip to New York",
      host: userId,
      destinationImage: "https://example.com/newyork.jpg",
    });
    // expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //   message: "Event created successfully.",
    // });
  });

  it("should return 500 if there is an error", async () => {
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(null, { id: 1 });
    });
    Events.findOne.mockRejectedValueOnce(new Error("Database error"));
    await createEvent(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(new Error("Database error"));
  });
});
