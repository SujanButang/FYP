import "./suggestions.scss";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import Actions from "../actions/Actions";

export default function Suggestions({ plan }) {
  const [suggestion, setSuggestion] = useState("");
  const eventId = parseInt(useLocation().pathname.split("/")[2]);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(
    ["suggestions", plan.id],
    async () => {
      const res = await makeRequest.get("/suggestions?planId=" + plan.id);
      return res.data;
    }
  );

  const queryCient = useQueryClient();

  const mutation = useMutation(
    (suggestionDescription) => {
      return makeRequest.post("/suggestions?planId=" + plan.id, {
        suggestionDescription,
      });
    },
    {
      onSuccess: () => {
        queryCient.invalidateQueries(["suggestions"]);
      },
    }
  );

  const handleClick = (e) => {
    e.preventDefault();
    mutation.mutate(suggestion);
    setSuggestion("");
  };

  return (
    <div className="suggestions">
      <div className="suggestion-add">
        <img src={"/upload/" + currentUser.profilePicture} alt="" />
        <input
          type="text"
          placeholder="write some suggestion for this day"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {data &&
        data.map((suggest) => (
          <div className="suggest" key={suggest.id}>
            <img src={"/upload/" + suggest.User.profilePicture} alt="" />
            <div className="info">
              <span>{suggest.User.username}</span>
              <p>{suggest.suggestion_description}</p>
            </div>
            <Actions suggestion={suggest.id} />
          </div>
        ))}
    </div>
  );
}
