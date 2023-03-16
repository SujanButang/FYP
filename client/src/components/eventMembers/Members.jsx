import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./members.scss";

export default function Members({ user }) {
  const { isLoading, error, data } = useQuery(["users", user], async () => {
    const res = await makeRequest.get("/users/find/" + user);
    return res.data[0];
  });
  return (
    <div className="members">
      <Link
        to={`/profile/${data && data.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="user-profile">
          {isLoading ? (
            "loading"
          ) : (
            <>
              <img src={"/upload/" + data.profilePicture} alt="" />
              <div className="user-details">
                <span>{data.username}</span>
                <div className="online"></div>
              </div>
            </>
          )}
        </div>
      </Link>
    </div>
  );
}
