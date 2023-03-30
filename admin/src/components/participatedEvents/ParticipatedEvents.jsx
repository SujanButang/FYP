import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import EventsTable from "../eventsTable/EventsTable";
import Loading from "../loading/Loading";

export default function ParticipatedEvents({ details }) {
  const { isLoading, error, data } = useQuery(
    ["events", details.id],
    async () => {
      const res = await makeRequest.get(
        "/participatedevents?userId=" + details.id
      );
      return res.data;
    }
  );
  return <div>{isLoading ? <Loading /> : <EventsTable events={data} />}</div>;
}
