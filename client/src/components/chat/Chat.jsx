import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import "./chat.scss";

export default function Chat({ member }) {
  const memberId = member[0];
  const { isLoading, error, data } = useQuery(["users", memberId], async () => {
    return await makeRequest.get("/users/find/" + memberId).then((res) => {
      return res.data[0];
    });
  });

  return (
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
  );
}
