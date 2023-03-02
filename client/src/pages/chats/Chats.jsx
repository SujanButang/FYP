import "./chats.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import Chat from "../../components/chat/Chat";

export default function Chats() {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery(["chats"], () => {
    return makeRequest.get("/chats").then((res) => {
      return res.data;
    });
  });

  return (
    <div className="chats">
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
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
