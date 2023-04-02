import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

export default function RightbarUsers({ user }) {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(
    ["relationships", currentUser.id],
    async () => {
      const res = await makeRequest.get(
        "/relationships?followerId=" + currentUser.id
      );
      return res.data;
    }
  );

  console.log(data);
  console.log(currentUser.id);

  const handleFollow = async (e) => {
    e.preventDefault();
    await makeRequest.post("/relationships?followedId=" + user.id);
  };

  const hasFollowed = data && data?.includes(currentUser.id);

  console.log(hasFollowed);
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
