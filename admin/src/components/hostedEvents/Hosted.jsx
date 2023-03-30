import "./hosted.scss";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import Loading from "../loading/Loading";

import EventsTable from "../eventsTable/EventsTable";

export default function Hosted({ details }) {
  const { isLoading, error, data } = useQuery(
    ["events", details.id],
    async () => {
      const res = await makeRequest.get("/userevents?userId=" + details.id);
      return res.data;
    }
  );
  return (
    <div>
      {isLoading ? <Loading /> : <EventsTable events={data} hosted={true} />}
    </div>
  );
}
