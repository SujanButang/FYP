import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { useContext, useState } from "react";
import EventForm from "../../components/eventForm/EventForm";
import Event from "../../components/event/Event";
import "./events.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

export default function Events() {
  const [form, setForm] = useState(false);
  const currentUser = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["events"], () => {
    return makeRequest.get("/events").then((res) => {
      return res.data;
    });
  });

  return (
    <div className="events">
      <div className="events-container">
        <div className="event-heading">
          <h2>Events</h2>
          <div className="search">
            <SearchOutlined />
            <input type="text" placeholder="Search events" />
          </div>
        </div>
        <div className="user-events">
          <div className="item-head">
            <h3>Your Event</h3>

            <>
              <div className="item">
                <p>
                  You don't have any event at present. Click create to host a
                  new Event.
                </p>
                <button onClick={(e) => setForm(true)}>Create</button>
              </div>
            </>
          </div>
        </div>
        <div className="other-events">
          <div className="item-head">
            <h3>Other Events</h3>
            {isLoading
              ? "loading"
              : data.map((event) => {
                  return <Event event={event} key={event.id} />;
                })}
          </div>
        </div>
      </div>
      {form && <EventForm setForm={setForm} />}
    </div>
  );
}
