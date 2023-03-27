import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import Loading from "../loading/Loading";
import "./notification.scss";

export default function Notification({ notification }) {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(
    ["user", notification.from],
    async () => {
      const res = await makeRequest.get("/users/find/" + notification.from);
      return res.data[0];
    }
  );

  const mutation = useMutation(
    (id) => {
      return makeRequest.put("/notifications?notificationId=" + id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notifications"]);
      },
    }
  );

  const handleRead = () => {
    mutation.mutate(notification.id);
  };

  const handleFollow = async () => {
    await makeRequest.post("/relationships?followedId=" + notification.from);
    mutation.mutate(notification.id);
  };

  const handleAccept = async () => {
    await makeRequest.put("/events/addMember?eventId=" + notification.event, {
      userId: notification.from,
    });
    handleRead();
  };
  return (
    <div className="notification">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="notification-container">
          <div className="notification-item">
            <img src={"/upload/" + data.profilePicture} alt="" />
            <p>
              <Link
                to={`/profile/${notification.from}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="user">{data.username} </span>
              </Link>
              {(() => {
                switch (notification.type) {
                  case "like":
                    return "liked your post";
                  case "event request":
                    return "sent you event request";
                  case "follow":
                    return "started following you";
                  case "comment":
                    return "commented on your post";
                }
              })()}
            </p>
          </div>
          <span className="time">
            {moment(notification.createdAt).fromNow()}
          </span>
          {notification.status === "unread" ? (
            <div className="buttons">
              {(() => {
                switch (notification.type) {
                  case "like":
                    return <></>;
                  case "follow":
                    return <button onClick={handleFollow}>Follow back</button>;
                  case "event request":
                    return <button onClick={handleAccept}>Accept</button>;
                }
              })()}
              <button onClick={handleRead}>Mark as read</button>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
