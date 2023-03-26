import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { SocketContext } from "../../context/socketContext";
import Loading from "../loading/Loading";
import Message from "../message/Message";
import "./groupMessages.scss";

export default function GroupMessages() {
  const [msg, setMsg] = useState("");
  const scrollRef = useRef();
  const { currentUser } = useContext(AuthContext);
  const roomId = parseInt(useLocation().pathname.split("/")[2]);

  const [messages, setMessages] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { socket } = useContext(SocketContext);

  const { isLoading, error, data } = useQuery(
    ["messages", roomId],
    async () => {
      const res = await makeRequest.get(`/messages/group/${roomId}`);
      setMessages(res.data);
      return res.data;
    }
  );

  const {
    isLoading: roomLoading,
    error: roomError,
    data: roomData,
  } = useQuery(["rooms", roomId], async () => {
    const res = await makeRequest.get("/chats/event?roomId=" + roomId);
    return res.data[0];
  });

  const {
    isLoading: memberLoading,
    error: memberError,
    data: memberData,
  } = useQuery(["room=Members", roomId], async () => {
    const res = await makeRequest.get("/events/members?roomId=" + roomId);
    return res.data;
  });

  useEffect(() => {
    if (roomData) {
      socket.emit("createGroup", {
        userId: currentUser.id,
        groupName: roomData.Event.destination,
      });
    }
  }, [currentUser, roomData]);

  const queryClient = useQueryClient();

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const mutation = useMutation(
    (message) => {
      if (!message) return makeRequest.get(`/messages/${roomId}`);
      return makeRequest.post("/messages?roomId=" + roomId, {
        message: message,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["messages"]);
        scrollToBottom();
      },
    }
  );

  useEffect(() => {
    arrivalMessage &&
      memberData?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    mutation.mutate();
  }, [arrivalMessage]);

  useEffect(() => {
    socket.on("getGroupMessage", (data) => {
      console.log(data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClick = async (e) => {
    e.preventDefault();
    socket.emit("sendGroupMessage", {
      senderId: currentUser.id,
      groupName: roomData.Event.destination,
      text: msg,
    });
    mutation.mutate(msg);
    setMsg("");
  };
  return (
    <div className="messages">
      <div className="messages-wrapper">
        {roomLoading ? (
          <Loading />
        ) : (
          <div className="chat-info">
            <div className="receiver">
              <img src={"/upload/" + roomData.Event.destinationImage} alt="" />
              <div className="receiver-info">
                <span className="receiver-name">
                  {roomData.Event.destination}
                </span>
                <span className="status">{roomData.Event.eventType}</span>
              </div>
            </div>
          </div>
        )}
        <div className="messages-top">
          {messages &&
            messages.map((message, index) => {
              return (
                <div ref={scrollRef} key={index}>
                  <Message
                    msg={message}
                    own={message.senderId === currentUser.id}
                  />
                </div>
              );
            })}
        </div>
        <div className="messages-bottom">
          <div className="chatBoxBottom">
            <textarea
              name="message-text"
              className="chatMessageInput"
              placeholder="Write Something"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
            ></textarea>
            {msg === "" ? (
              <button
                className="chatSubmitButton"
                onClick={handleClick}
                disabled
              >
                Send
              </button>
            ) : (
              <button className="chatSubmitButton" onClick={handleClick}>
                Send
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
