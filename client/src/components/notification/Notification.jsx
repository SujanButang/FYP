import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import moment from "moment";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./notification.scss";

export default function Notification({ notification }) {
  const queryClient = useQueryClient();

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

  const handleFollow = () => {
    makeRequest
      .post("/relationships?followedId=" + notification.from)
      .then(handleRead);
  };

  const handleAccept = () => {
    makeRequest.put("/events/addMember?eventId=" + notification.event, {
      userId: notification.from,
    });
  };
  return (
    <div className="notification">
      <div className="notification-container">
        <div className="notification-item">
          <img src={"/upload/" + notification.User.profilePicture} alt="" />
          <p>
            <Link
              to={`/profile/${notification.from}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="user">{notification.User.username} </span>
            </Link>
            {(() => {
              switch (notification.type) {
                case "like":
                  return "liked your post";
                case "event request":
                  return "sent you event request";
                case "follow":
                  return "started following you";
              }
            })()}
          </p>
        </div>
        <span className="time">{moment(notification.createdAt).fromNow()}</span>
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
    </div>
  );
}
