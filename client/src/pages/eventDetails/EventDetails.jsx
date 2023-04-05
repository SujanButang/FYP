import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import Members from "../../components/eventMembers/Members";
import Wall from "../../components/eventWall/Wall";
import GroupChat from "../../components/groupChat/GroupChat";
import Messages from "../../components/messages/Messages";
import { AuthContext } from "../../context/authContext";
import "./eventDetails.scss";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";

import Plan from "../../components/plans/Plan";
import Payment from "../../components/payment/Payment";
import EventSettings from "../../components/eventSettings/EventSettings";

export default function EventDetails() {
  const eventId = parseInt(useLocation().pathname.split("/")[2]);

  const {
    isLoading,
    error,
    data: eventData,
  } = useQuery(["events", eventId], async () => {
    return makeRequest.get("/events/" + eventId).then((res) => {
      return res.data;
    });
  });

  const [suggestionOpen, setSuggestionOpen] = useState(false);

  const [selectedAnchor, setSelectedAnchor] = useState("wall");

  const [openInput, setOpenInput] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const [date, setDate] = useState("");
  const [note, setNote] = useState(""); // Object to store notes for specific dates

  const queryClient = useQueryClient();

  const {
    isLoading: planLoading,
    error: planError,
    data: plans,
  } = useQuery(["plans", eventId], async () => {
    const res = await makeRequest.get("/events/plans?eventId=" + eventId);
    return res.data;
  });

  const mutation = useMutation(
    (newPlan) => {
      setNote("");
      const planDay =
        plans &&
        plans.filter(
          (plan) =>
            moment(plan.plan_date).format("YYYY-MM-DD") ===
            moment(newPlan.date).format("YYYY-MM-DD")
        );
      if (planDay.length !== 0) {
        return makeRequest
          .put("/events/plans?planId=" + planDay[0].id, newPlan)
          .then(toast.success("Plan Updated"));
      }
      return makeRequest
        .post("/events/plans?eventId=" + eventId, newPlan)
        .then(toast.success("Plan saved"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["plans"]);
      },
    }
  );

  const handleDayClick = (val) => {
    setDate(val);
    setOpenInput(true);
  };

  const handleSave = () => {
    mutation.mutate({ date: date, note: note });
  };

  return (
    <div className="event-details">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="details-container">
            <div className="img">
              <img src={"/upload/" + eventData.destinationImage} alt="" />
            </div>
            <div className="details">
              <h1>{eventData.destination}</h1>
              <h3 className="eventType">{eventData.eventType}</h3>
              <h4>
                Starting on: {moment(eventData.startDate).format("YYYY-MM-DD")}
              </h4>
              <h4>
                Ending Date: {moment(eventData.endDate).format("YYYY-MM-DD")}
              </h4>
              <h5>{eventData.eventDescription}</h5>
            </div>
            <nav className="navigation">
              <ul>
                <li className={selectedAnchor === "wall" ? "selected" : ""}>
                  <span onClick={(e) => setSelectedAnchor("wall")}>
                    Group Wall{" "}
                  </span>
                </li>
                |
                <li className={selectedAnchor === "plans" ? "selected" : ""}>
                  <span onClick={(e) => setSelectedAnchor("plans")}>
                    Planning Iterations
                  </span>
                </li>
                |
                <li className={selectedAnchor === "member" ? "selected" : ""}>
                  <span onClick={(e) => setSelectedAnchor("member")}>
                    Members
                  </span>
                </li>
                |
                <li className={selectedAnchor === "payment" ? "selected" : ""}>
                  <span onClick={(e) => setSelectedAnchor("payment")}>
                    Payment
                  </span>
                </li>
                |
                {eventData.host === currentUser.id ? (
                  <li
                    className={selectedAnchor === "settings" ? "selected" : ""}
                  >
                    <span onClick={(e) => setSelectedAnchor("settings")}>
                      Event Settings
                    </span>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </nav>
            <div className="content">
              {(() => {
                switch (selectedAnchor) {
                  case "plans":
                    return (
                      <div className="calendar-container">
                        <Calendar
                          // onChange={handleDateChange}
                          minDate={new Date(eventData.startDate)}
                          maxDate={new Date(eventData.endDate)}
                          onClickDay={(value, event) => handleDayClick(value)}
                          className="calendar"
                        />
                        {openInput ? (
                          eventData && eventData.host === currentUser.id ? (
                            <div className="plan-card">
                              <textarea
                                name="note"
                                id="note"
                                cols="30"
                                rows="3"
                                onChange={(e) => setNote(e.target.value)}
                                value={note}
                                placeholder={
                                  moment(date).format("YYYY-MM-DD") +
                                  " Write a note for this day"
                                }
                              ></textarea>
                              <div className="actions">
                                <button onClick={handleSave}>Save</button>
                                <button onClick={(e) => setOpenInput(false)}>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )
                        ) : (
                          <>
                            <div className="plans-cards">
                              {plans &&
                                plans.map((plan, index) => {
                                  return <Plan plan={plan} key={index} />;
                                })}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  case "member":
                    return (
                      eventData &&
                      eventData.members.map((user, index) => {
                        return <Members user={user} key={index} />;
                      })
                    );
                  case "payment":
                    return <Payment />;
                  case "settings":
                    return <EventSettings event={eventData} />;
                  default:
                    if (
                      eventData &&
                      eventData.members.includes(currentUser.id)
                    ) {
                      return <Wall event={eventData} />;
                    }
                    return (
                      <div className="restricted">
                        You are not allowed to see the content. <br></br>Send
                        join request to access.
                      </div>
                    );
                }
              })()}
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}
