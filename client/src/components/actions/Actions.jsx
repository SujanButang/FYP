import "./actions.scss";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function Actions({ suggestion }) {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(
    ["votes", suggestion],
    async () => {
      const res = await makeRequest.get(
        "/suggestions/votes?suggestionId=" + suggestion
      );
      return res.data;
    }
  );
  console.log(data);

  const userVote =
    data && data.filter((vote) => vote.voter_id === currentUser.id);

  const mutation = useMutation(
    (newVote) => {
      if (newVote.status === true) {
        return makeRequest.post(
          "/suggestions/votes?suggestionId=" + suggestion,
          { status: newVote.vote }
        );
      }
      if (newVote.status === false) {
        return makeRequest.put(
          "/suggestions/votes?suggestionId=" + suggestion,
          { status: newVote.vote }
        );
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("votes");
      },
    }
  );

  const handleVote = (vote) => {
    const hasVoted =
      data && data.filter((vot) => vot.voter_id === currentUser.id);
    if (hasVoted.length === 0) {
      const status = true;
      mutation.mutate({ vote: vote, status: true });
    }
    const status = false;
    mutation.mutate({ vote: vote, status: false });
  };

  return (
    <div className="actions">
      {isLoading ? (
        "loading"
      ) : (
        <>
          {userVote.length !== 0 && userVote[0].status === "up" ? (
            <div className="action">
              <ThumbUpAltIcon style={{ color: "#a974ff" }} />
              <span>
                {data && data.filter((vote) => vote.status === "up").length}{" "}
                upvotes
              </span>
            </div>
          ) : (
            <div className="action">
              <ThumbUpOffAltIcon
                style={{ cursor: "pointer" }}
                onClick={(e) => handleVote("up")}
              />
              <span>
                {data && data.filter((vote) => vote.status === "up").length}{" "}
                upvotes
              </span>
            </div>
          )}
          {userVote.length !== 0 && userVote[0].status === "down" ? (
            <div className="action">
              <ThumbDownAltIcon style={{ color: "#eb5153" }} />
              <span>
                {data && data.filter((vote) => vote.status === "down").length}{" "}
                downvotes
              </span>
            </div>
          ) : (
            <div className="action">
              <ThumbDownOffAltIcon
                style={{ cursor: "pointer" }}
                onClick={(e) => handleVote("down")}
              />
              <span>
                {data && data.filter((vote) => vote.status === "down").length}{" "}
                downvotes
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
