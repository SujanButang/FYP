import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import Map from "../../components/maps/Map";
import "./eventDetails.scss";

export default function EventDetails() {
  const eventId = parseInt(useLocation().pathname.split("/")[2]);
  console.log(eventId);

  const { isLoading, error, data } = useQuery(["events", eventId], async () => {
    return makeRequest.get("/events/" + eventId).then((res) => {
      return res.data;
    });
  });

  console.log(data && data);

  return (
    <div className="event-details">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="details-container">
            <div className="img">
              <img src={"/upload/" + data.destinationImage} alt="" />
            </div>
            <div className="details">
              <h1>{data.destination}</h1>
              <h3 className="eventType">{data.eventType}</h3>
              <h4>
                Starting on: {moment(data.startDate).format("YYYY-MM-DD")}
              </h4>
              <h4>Ending Date: {moment(data.endDate).format("YYYY-MM-DD")}</h4>
              <h5>{data.eventDescription}</h5>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
