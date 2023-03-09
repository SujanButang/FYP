import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./event.scss";

export default function Event({ event, own }) {
  const [notification, setNotification] = useState({
    type: "event request",
    to: event.host,
    eventId: event.id,
  });

  const [joined, setJoined] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    makeRequest.post("/notifications", notification).then(setJoined(true));
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
                <button onClick={(e) => setJoined(false)}>Joined</button>
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
    </div>
  );
}
