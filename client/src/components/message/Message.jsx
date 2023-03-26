import "./message.scss";
import moment from "moment";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading/Loading";

export default function Message({ msg, own }) {
  const { isLoading, error, data } = useQuery(
    ["users", msg.senderId],
    async () => {
      return await makeRequest
        .get("/users/find/" + msg.senderId)
        .then((res) => {
          return res.data[0];
        });
    }
  );
  return (
    <div className={own ? "message own" : "message"}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="message-top ">
          <img
            src={"/upload/" + data.profilePicture}
            alt=""
            className="receiver-img"
          />
          <p className="text-content">
            {msg.messageText}
            <span>{moment(msg.createdAt).fromNow()}</span>
          </p>
        </div>
      )}
    </div>
  );
}
