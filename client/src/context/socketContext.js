import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./authContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useRef();

  const { currentUser } = useContext(AuthContext);

  socket.current = io("ws://localhost:8900");

  useEffect(() => {
    socket.current.emit("addUser", currentUser.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [currentUser]);

  const contextValue = {
    onlineUsers,
    socket: socket.current,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
