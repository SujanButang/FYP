const io = require("socket.io")(8900, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId == userId);
};

let groups = [];

const addMember = ({ userId, socketId, groupName }) => {
  const groupIndex = groups.findIndex((group) => group.groupName === groupName);
  if (groupIndex === -1) {
    groups.push({ groupName, members: [{ userId, socketId }] });
  } else {
    groups[groupIndex].members.push({ userId, socketId });
  }
};

const getMembers = (groupName) => {
  return groups.find((group) => group.groupName === groupName)?.members || [];
};

const removeMember = (socketId) => {
  groups = groups.map((group) => ({
    ...group,
    members: group.members.filter((member) => member.socketId !== socketId),
  }));
};

io.on("connection", (socket) => {
  //when connect
  console.log("A user connected");
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  socket.on("createGroup", ({ userId, groupName }) => {
    addMember({ userId: userId, groupName: groupName, socketId: socket.id });
  });

  socket.on("sendGroupMessage", ({ senderId, groupName, text }) => {
    const members = getMembers(groupName);
    members.forEach((member) => {
      io.to(member.socketId).emit("getGroupMessage", { senderId, text });
    });
  });

  socket.on("createNotification", (notification) => {
    console.log(notification);
    const user = getUser(notification.to);
    if (user) {
      io.to(user.socketId).emit("getNotification", notification);
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    removeMember(socket.id);
    io.emit("getUsers", users);
  });
});
