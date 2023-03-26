import "./chats.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import Chat from "../../components/chat/Chat";
import Loading from "../../components/loading/Loading";
import GroupChat from "../../components/groupChat/GroupChat";

export default function Chats() {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery(["chats"], () => {
    return makeRequest.get("/chats").then((res) => {
      return res.data;
    });
  });

  const {
    isLoading: roomLoading,
    error: roomError,
    data: roomData,
  } = useQuery(["rooms"], () => {
    return makeRequest.get("/chats/rooms").then((res) => {
      return res.data;
    });
  });

  return (
    <div className="chats">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="chat-container">
          <h2>Chats</h2>
          <div className="search">
            <SearchOutlinedIcon />
            <input type="text" placeholder="Search chats" />
          </div>
          <div className="items">
            {data &&
              data.map((chat, index) => {
                return (
                  <div className="item" key={index}>
                    <Chat
                      member={chat.members.filter(
                        (member) => member !== currentUser.id
                      )}
                      chatId={chat.id}
                    />
                  </div>
                );
              })}
          </div>
          <div className="items">
            {roomData &&
              roomData.map((chat, index) => {
                return (
                  <div className="item" key={index}>
                    <GroupChat details={chat} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
