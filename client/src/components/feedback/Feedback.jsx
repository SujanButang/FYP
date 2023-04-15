import { useLocation, useNavigate } from "react-router-dom";
import "./feedback.scss";
import { makeRequest } from "../../axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";

export default function Feedback() {
  const eventId = parseInt(useLocation().pathname.split("/")[2]);
  const { isLoading, error, data } = useQuery(["events", eventId], async () => {
    const res = await makeRequest.get("/events/" + eventId);
    return res.data;
  });

  const [membersDetails, setMembersDetails] = useState([]);

  useEffect(() => {
    if (data && data.members) {
      const tempMembersDetails = [];
      Promise.all(
        data.members.map(async (member) => {
          const res = await makeRequest.get("/users/find/" + member);
          tempMembersDetails.push(res.data[0]);
        })
      ).then(() => {
        setMembersDetails(tempMembersDetails);
      });
    }
  }, [data]);

  const [rating, setRating] = useState({ eventId: eventId });

  const handleRatingChange = (name, value) => {
    setRating((prevRatings) => ({
      ...prevRatings,
      [name]: value,
    }));
  };

  const { currentUser } = useContext(AuthContext);
  const filteredMembers = membersDetails.filter(
    (member) => member.id !== currentUser.id
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await makeRequest.post("/feedback", rating);
    queryClient.invalidateQueries(["notifications"]);

    toast.success("Form submitted");
    navigate("/");
  };
  return (
    <div className="feedback">
      <div className="feedback-container">
        <div className="feedback-heading">
          <h2>Feedback</h2>
          <h3>{data?.destination}</h3>
        </div>
        <div className="form">
          <form>
            <div className="event">
              <label htmlFor="event">Rate the Event:</label>
              <div className="event-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input
                      type="checkbox"
                      value={value}
                      checked={rating.event === value}
                      onChange={(e) => handleRatingChange("event", value)}
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
            <div className="member-rating">
              {membersDetails.length > 0 && (
                <label htmlFor="users">
                  How was your experience with the event members?
                  {filteredMembers?.map((member, index) => {
                    return (
                      <div className="members">
                        <div className="user-details">
                          <img
                            key={index}
                            src={"/upload/" + member.profilePicture}
                            alt=""
                          />
                          <span>{member.username}</span>
                        </div>
                        <div className="user-rating">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <div className="rate">
                              <label key={value} className="rate">
                                <input
                                  type="checkbox"
                                  value={value}
                                  checked={rating[member.id] === value}
                                  onChange={() =>
                                    handleRatingChange(member.id, value)
                                  }
                                />
                                {value}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </label>
              )}
            </div>
            <label htmlFor="others">
              Any feedback to the Travel Admin Platform?
            </label>
            <textarea
              placeholder="Write your feedback here"
              onChange={(e) => handleRatingChange("feedback", e.target.value)}
            />{" "}
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
