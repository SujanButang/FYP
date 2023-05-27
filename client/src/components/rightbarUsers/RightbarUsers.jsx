import { useQuery, useMutation, queryCache } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

export default function RightbarUsers({ user }) {
  const { currentUser } = useContext(AuthContext);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [notification, setNotification] = useState({
    to: user.id,
    type: "follow",
  });

  const { isLoading, error, data } = useQuery(
    ["relationships", currentUser.id],
    async () => {
      const res = await makeRequest.get(
        "/relationships?followerId=" + currentUser.id
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        setHasFollowed(data.includes(user.id));
      },
    }
  );

  const followMutation = useMutation(async () => {
    await makeRequest.post("/relationships?followedId=" + user.id);
    setHasFollowed(true);
  });

  const handleFollow = async (e) => {
    e.preventDefault();
    followMutation.mutate();
    await makeRequest.post("/notifications", notification);
  };

  return (
    <div className="item">
      <img src={"/upload/" + user.profilePicture} alt="" />
      <div className="user-info">
        <span>{user.username}</span>
        {/* <span className="friends">12 mutual friends</span> */}
      </div>
      <div className="button">
        {hasFollowed ? (
          <button disabled>Followed</button>
        ) : (
          <button onClick={handleFollow}>Follow</button>
        )}
      </div>
    </div>
  );
}
