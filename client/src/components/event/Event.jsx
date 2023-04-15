import moment from "moment";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { SocketContext } from "../../context/socketContext";
import "./event.scss";
import { ToastContainer, toast } from "react-toastify";

export default function Event({ event, own }) {
  const { currentUser } = useContext(AuthContext);
  const [notification, setNotification] = useState({
    type: "event request",
    from: currentUser.id,
    to: event.host,
    eventId: event.id,
    status: "unread",
  });

  const [joined, setJoined] = useState(false);
  const { socket } = useContext(SocketContext);

  const handleClick = async (e) => {
    e.preventDefault();
    socket.emit("createNotification", notification);
    await makeRequest.post("/notifications", notification);
    setJoined(true);
    toast.success("Request Sent");
  };

  return (
    <div className="event">
      <div className="event-container">
        <div className="img">
          <img src={"/upload/" + event.destinationImage} alt="" />
        </div>
        <div className="desc">
          <h2 className="destination">{event.destination}</h2>
          <h5 className="type">{event.eventType}</h5>
          <h5 className="duration">
            Duration:{" "}
            {moment(event.endDate).diff(moment(event.startDate), "days")} days
          </h5>
          <h5>Start Date: {moment(event.startDate).format("YYYY-MM-DD")}</h5>
          <h5>Host: {event.User.username}</h5>
        </div>
        <div className="actions">
          {own ? (
            <>
              <button>Edit</button>
              <Link to={"/eventDetails/" + event.id}>
                <button>See Details</button>
              </Link>
            </>
          ) : (
            <>
              {joined ? (
                <button onClick={(e) => setJoined(false)}>Requested</button>
              ) : event.members.includes(currentUser.id) ? (
                <button disabled>Joined</button>
              ) : (
                <button onClick={handleClick}>Join</button>
              )}

              <Link to={"/eventDetails/" + event.id}>
                <button>See Details</button>
              </Link>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
