import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import EventsTable from "../eventsTable/EventsTable";
import Loading from "../loading/Loading";

export default function ParticipatedEvents({ details }) {
  console.log(typeof details.id);
  const { isLoading, error, data } = useQuery(
    ["participatedevents", details.id],
    async () => {
      const res = await makeRequest.get("/participatedevents?id=" + 11);
      return res.data;
    }
  );

  console.log(data);
  return <div>{isLoading ? <Loading /> : <EventsTable events={data} />}</div>;
}
