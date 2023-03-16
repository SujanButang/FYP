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

export default function EventDetails() {
  const eventId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["events", eventId], async () => {
    return makeRequest.get("/events/" + eventId).then((res) => {
      return res.data;
    });
  });

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
      return makeRequest.post("/events/plans?eventId=" + eventId, newPlan);
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
    const plants =
      plans &&
      plans.filter(
        (plan) =>
          moment(plan.plan_date).format("YYYY-MM-DD") ===
          moment(date).format("YYYY-MM-DD")
      );

    console.log(plants);
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
            <nav className="navigation">
              <ul>
                <li className={selectedAnchor === "wall" ? "selected" : ""}>
                  <span onClick={(e) => setSelectedAnchor("wall")}>
                    Group Wall{" "}
                  </span>
                </li>
                |
                <li className={selectedAnchor === "chat" ? "selected" : ""}>
                  <span onClick={(e) => setSelectedAnchor("chat")}>
                    Group Chat
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
              </ul>
            </nav>
            <div className="content">
              {(() => {
                switch (selectedAnchor) {
                  case "chat":
                    if (data && data.members.includes(currentUser.id)) {
                      return <GroupChat />;
                    }
                    return (
                      <div className="restricted">
                        You are not allowed to see the content. <br></br>Send
                        join request to access.
                      </div>
                    );
                  case "plans":
                    return (
                      <div className="calendar-container">
                        <Calendar
                          // onChange={handleDateChange}
                          minDate={new Date(data.startDate)}
                          maxDate={new Date(data.endDate)}
                          onClickDay={(value, event) => handleDayClick(value)}
                          className="calendar"
                        />
                        {openInput ? (
                          data && data.host === currentUser.id ? (
                            <div className="plan-card">
                              <textarea
                                name="note"
                                id="note"
                                cols="30"
                                rows="3"
                                onChange={(e) => setNote(e.target.value)}
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
                            <div className="plan-card">
                              <textarea
                                name="note"
                                id="note"
                                cols="30"
                                rows="3"
                                onChange={(e) => setNote(e.target.value)}
                                disabled
                                placeholder={
                                  plans &&
                                  plans.filter(
                                    (plan) =>
                                      moment(plan.plan_date).format(
                                        "YYYY-MM-DD"
                                      ) === moment(date).format("YYYY-MM-DD")
                                  ).plan_note
                                }
                              ></textarea>
                              <div className="actions">
                                <button onClick={(e) => setOpenInput(false)}>
                                  Close
                                </button>
                              </div>
                            </div>
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  case "member":
                    return (
                      data &&
                      data.members.map((user, index) => {
                        return <Members user={user} key={index} />;
                      })
                    );
                  case "payment":
                    return <p>Option 4 is selected</p>;
                  default:
                    if (data && data.members.includes(currentUser.id)) {
                      return <Wall event={data} />;
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
    </div>
  );
}
