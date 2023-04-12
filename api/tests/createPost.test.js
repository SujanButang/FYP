const { User, Posts } = require("../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

const moment = require("moment");
const jwt = require("jsonwebtoken");

const { addPost } = require("../controllers/post");

describe("addPost function", () => {
  test("should create a new post successfully", async () => {
    // Mock the request and response objects
    const req = {
      cookies: { accessToken: "valid-token" },
      body: {
        postDescription: "Test post",
        imgURL: "https://example.com/image.jpg",
        eventId: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Posts.create function
    Posts.create = jest.fn().mockResolvedValue();

    // Mock the jwt.verify function
    jwt.verify = jest.fn().mockImplementation((token, key, callback) => {
      callback(null, { id: 1 });
    });

    await addPost(req, res);

    // Expect the Posts.create function to be called with the correct arguments
    expect(Posts.create).toHaveBeenCalledWith({
      userId: 1,
      post_description: "Test post",
      post_image: "https://example.com/image.jpg",
      event_id: 1,
      post_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Post created successfully.");
  });

  test("should return an error if the user is not logged in", async () => {
    const req = { cookies: {}, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addPost(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith("User is not logged in.");
  });

  test("should return an error if the token is invalid", async () => {
    const req = { cookies: { accessToken: "invalid-token" }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jwt.verify = jest.fn().mockImplementation((token, key, callback) => {
      callback(new Error("Invalid token"), null);
    });

    await addPost(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith("Token not valid");
  });

  test("should return an error if Posts.create throws an error", async () => {
    const req = {
      cookies: { accessToken: "valid-token" },
      body: {
        postDescription: "Test post",
        imgURL: "https://example.com/image.jpg",
        eventId: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Posts.create = jest.fn().mockRejectedValue("Error creating post.");

    jwt.verify = jest.fn().mockImplementation((token, key, callback) => {
      callback(null, { id: 1 });
    });

    await addPost(req, res);

    expect(Posts.create).toHaveBeenCalledWith({
      userId: 1,
      post_description: "Test post",
      post_image: "https://example.com/image.jpg",
      event_id: 1,
      post_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Error creating post.");
  });
});
