import { useLocation } from "react-router-dom";
import "./singleRequest.scss";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

export default function SingleRequest() {
  const location = useLocation();
  const details = location.state;
  console.log(details);

  const { isLoading, error, data } = useQuery(
    ["users", details.User.id],
    async () => {
      const res = await makeRequest.get("/users/find/" + details.User.id);
      return res.data[0];
    }
  );

  console.log(data);
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
        </div>
      </div>
    </div>
  );
}
