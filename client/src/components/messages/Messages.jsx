import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import Message from "../message/Message";
import "./messages.scss";

export default function Messages() {
  const [msg, setMsg] = useState("");
  const scrollRef = useRef();

  const chatId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["messages", chatId], () =>
    makeRequest.get(`/messages/${chatId}`).then((res) => {
      return res.data;
    })
  );

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const mutation = useMutation(
    (message) => {
      return makeRequest.post("/messages?chatId=" + chatId, {
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

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate(msg);
    setMsg("");
  };

  return (
    <div className="messages">
      <div className="messages-wrapper">
        <div className="chat-info">
          <div className="receiver">
            <img
              src="https://images.freeimages.com/images/previews/bb0/cat-in-window-1218032.jpg"
              alt=""
            />
            <div className="receiver-info">
              <span className="receiver-name">Sujan Rai</span>
              <span className="status">
                <div className="active"></div>Online
              </span>
            </div>
          </div>
        </div>
        <div className="messages-top">
          {data &&
            data.map((message, index) => {
              return (
                <div ref={scrollRef} key={index}>
                  <Message
                    msg={message}
                    own={message.senderId == currentUser.id}
                  />
                </div>
              );
            })}
        </div>
        <div className="messages-bottom">
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="write something..."
              name="message-text"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
            ></textarea>
            {msg == "" ? (
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
