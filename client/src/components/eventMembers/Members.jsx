import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import PaidIcon from "@mui/icons-material/Paid";
import "./members.scss";

export default function Members({ user }) {
  const eventId = parseInt(useLocation().pathname.split("/")[2]);
  const { isLoading, error, data } = useQuery(["users", user], async () => {
    const res = await makeRequest.get("/users/find/" + user);
    return res.data[0];
  });

  const {
    isLoading: paymentLoading,
    error: paymentError,
    data: paymentData,
  } = useQuery(["payments", eventId], async () => {
    const res = await makeRequest.get("/events/payments?eventId=" + eventId);
    return res.data;
  });

  const hasPaid = paymentData?.some((obj) => obj.user_id === data?.id);

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
                {hasPaid ? (
                  <div className="payment">
                    <PaidIcon />
                    <span>Paid</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </div>
      </Link>
    </div>
  );
}
