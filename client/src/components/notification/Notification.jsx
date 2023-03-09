import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import moment from "moment";
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
  return (
    <div className="notification">
      <div className="notification-container">
        <div className="notification-item">
          <img src={"/upload/" + notification.User.profilePicture} alt="" />
          <p>
            <span className="user">{notification.User.username} </span>
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
                  return <button>Accept</button>;
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
