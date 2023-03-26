import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { useContext, useEffect, useState } from "react";
import EventForm from "../../components/eventForm/EventForm";
import Event from "../../components/event/Event";
import "./events.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

export default function Events() {
  const [form, setForm] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["events"], async () => {
    const res = await makeRequest.get("/events");
    return res.data;
  });

  const userEvent =
    (data &&
      Array.isArray(data) &&
      data.filter((event) => event.host === currentUser.id)) ||
    [];

  const otherEvent =
    (data &&
      Array.isArray(data) &&
      data.filter((event) => event.host !== currentUser.id)) ||
    [];

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
            {userEvent.length !== 0 ? (
              <div className="item">
                <Event event={userEvent[0]} own={true} />
              </div>
            ) : (
              <>
                <div className="item">
                  <p>
                    You don't have any event at present. Click create to host a
                    new Event.
                  </p>
                  <button
                    onClick={(e) => setForm(true)}
                    className="create-button"
                  >
                    Create
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="other-events">
          <div className="item-head">
            <h3>Other Events</h3>
            {isLoading ? (
              "loading"
            ) : otherEvent.length !== 0 ? (
              otherEvent.map((event) => {
                return <Event event={event} key={event.id} own={false} />;
              })
            ) : (
              <>
                <h3>No other Events found</h3>
              </>
            )}
          </div>
        </div>
      </div>
      {form && <EventForm setForm={setForm} />}
    </div>
  );
}
