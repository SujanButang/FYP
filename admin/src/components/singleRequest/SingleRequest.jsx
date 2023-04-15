import { useLocation } from "react-router-dom";
import "./singleRequest.scss";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

export default function SingleRequest() {
  const location = useLocation();
  const details = location.state;

  const { isLoading, error, data } = useQuery(
    ["users", details.User.id],
    async () => {
      const res = await makeRequest.get("/users/find/" + details.User.id);
      return res.data[0];
    }
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (userId) => {
      await makeRequest.put("/users/approve", { userId: userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );
  const Revokemutation = useMutation(
    async (userId) => {
      await makeRequest.put("/users/revoke", { userId: userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const handleApprove = (e) => {
    e.preventDefault();
    mutation.mutate(details.User.id);
  };

  const handleRevoke = (e) => {
    e.preventDefault();
    Revokemutation.mutate(details.User.id);
  };
  return (
    <div className="single-request">
      <h2>Profile Verification</h2>
      <div className="single-request-container">
        <div className="left">
          <h4>Document</h4>
          <div className="front">
            <img src={"/upload/" + details.documentImageFront} alt="" />
          </div>
          <div className="back">
            <img src={"/upload/" + details.documentImageBack} alt="" />
          </div>
        </div>
        <div className="right">
          <h4>Profile Details</h4>
          <div className="profile">
            <img src={"/upload/" + details.User.profilePicture} alt="" />
            <div className="details">
              <h4>
                Name: <span>{data?.username}</span>
              </h4>
              <h4>
                Phone: <span>{data?.phone}</span>
              </h4>
              <h4>
                Birth Date:{" "}
                <span>{moment(data?.birthDate).format("YYYY MMMM DD")}</span>
              </h4>
              <h4>
                Address: <span>{data?.address}</span>
              </h4>
              <h4>
                Email: <span>{data?.email}</span>
              </h4>
            </div>
          </div>
          <div className="button">
            <button className="revoke" onClick={handleRevoke}>
              Revoke
            </button>
            <button className="approve" onClick={handleApprove}>
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
