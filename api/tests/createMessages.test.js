const { createMessage } = require("../controllers/messages");
const { Messages } = require("../models");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

describe("createMessage", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      cookies: {},
      body: {},
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Messages.create = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return 403 if user is not logged in", async () => {
    await createMessage(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith("User is not logged in.");
  });

  it("should return 403 if token is not valid", async () => {
    req.cookies.accessToken = "invalid-token";
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(new Error("invalid signature"));
    });
    await createMessage(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith("Token not valid");
  });

  it("should create a new message in a chat", async () => {
    const userId = 123;
    const chatId = 1;
    const message = "Hello, World!";
    req.cookies.accessToken = "valid-token";
    req.body.message = message;
    req.query.chatId = chatId;
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(null, { id: userId });
    });
    Messages.create.mockResolvedValueOnce({});
    await createMessage(req, res);
    expect(Messages.create).toHaveBeenCalledWith({
      senderId: userId,
      messageText: message,
      messageImg: undefined,
      chatId: chatId,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Message sent successfully.");
  });

  it("should create a new message in a room", async () => {
    const userId = 123;
    const roomId = 1;
    const message = "Hello, World!";
    req.cookies.accessToken = "valid-token";
    req.body.message = message;
    req.query.roomId = roomId;
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(null, { id: userId });
    });
    Messages.create.mockResolvedValueOnce({});
    await createMessage(req, res);
    expect(Messages.create).toHaveBeenCalledWith({
      senderId: userId,
      messageText: message,
      messageImg: undefined,
      roomId: roomId,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Message sent successfully.");
  });

  it("should return 403 if there is an error", async () => {
    req.cookies.accessToken = "valid-token";
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(null, { id: 123 });
    });
    Messages.create.mockRejectedValueOnce(new Error("Something went wrong."));
    await createMessage(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(new Error("Something went wrong."));
  });
});
