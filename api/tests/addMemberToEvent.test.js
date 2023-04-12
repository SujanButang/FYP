const { Events, Rooms } = require("../models");
const { addMember } = require("../controllers/events");

jest.mock("../models");

describe("addMember", () => {
  let req, res;

  beforeEach(() => {
    req = { query: { eventId: 1 }, body: { userId: 2 } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  it("should add a new member to an existing event", async () => {
    const existingEvent = { id: 1, members: [3] };
    Events.findOne.mockResolvedValueOnce(existingEvent);
    await addMember(req, res);
    expect(Events.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(Events.update).toHaveBeenCalledWith(
      { members: [3, 2] },
      { where: { id: 1 } }
    );
    expect(Rooms.update).toHaveBeenCalledWith(
      { members: [3, 2] },
      { where: { event_id: 1 } }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Member added successfully");
  });
});
