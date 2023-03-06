import moment from "moment";
import "./event.scss";

export default function Event({ event }) {
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
          <h5>Host: Sujan Rai</h5>
        </div>
        <div className="actions">
          <button>Join</button>
          <button>See Details</button>
        </div>
      </div>
    </div>
  );
}
