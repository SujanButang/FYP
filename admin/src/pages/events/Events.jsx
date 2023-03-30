import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import Datatable from "../../components/dataTable/Datatable";
import Loading from "../../components/loading/Loading";
import "./events.scss";

export default function Events() {
  const { isLoading, error, data } = useQuery(["events"], async () => {
    const res = await makeRequest.get("/events");
    return res.data;
  });
  return <div>{isLoading ? <Loading /> : <Datatable events={data} />}</div>;
}
