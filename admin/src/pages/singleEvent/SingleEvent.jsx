import "./singleEvent.scss";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { makeRequest } from "../../axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import Datatable from "../../components/dataTable/Datatable";
import UserTable from "../../components/userTable/UserTable";
import { useQuery } from "react-query";
import PaymentTable from "../../components/paymentsTable/PaymentTable";

export default function SingleEvent() {
  const location = useLocation();
  const details = location.state;

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchMembers() {
    const membersData = [];
    for (const user of details.members) {
      const mem = await makeRequest.get("/users/find/" + user);
      membersData.push(mem.data[0]);
    }
    setMembers(membersData);
  }

  useEffect(() => {
    setLoading(true);
    fetchMembers();
    setLoading(false);
  }, [details]);

  const { isLoading, error, data } = useQuery(
    ["payments", details.id],
    async () => {
      const res = await makeRequest.get("/payments?eventId=" + details.id);
      return res.data;
    }
  );

  console.log(data);

  return (
    <div className="single-event">
      <div className="single-event-container">
        <div className="top">
          <img src={"/upload/" + details.destinationImage} alt="" />
        </div>
        <div className="mid">
          <h1>{details.destination}</h1>
          <h3>{details.eventType}</h3>
          <h4>Start Date: {moment(details.startDate).format("YYYY-MM-DD")}</h4>
          <h4>End Date: {moment(details.endDate).format("YYYY-MM-DD")}</h4>
          <h5>{details.eventDescription}</h5>
          <div className="host">
            <h4>Host: </h4>
            <img src={"/upload/" + details.User.profilePicture} alt="" />
            <span>{details.User.username}</span>
          </div>
        </div>
        <div className="bottom">
          <div className="members">
            {loading ? (
              <Loading />
            ) : (
              <UserTable users={members} title={"Members"} />
            )}
          </div>
          <div className="payments">
            {isLoading ? (
              <Loading />
            ) : (
              <PaymentTable payments={data} title={"single"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
