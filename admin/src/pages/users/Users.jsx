import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import Datatable from "../../components/dataTable/Datatable";
import Loading from "../../components/loading/Loading";
import "./users.scss";

export default function Users() {
  // const [users, setUsers] = useState(null)

  const { isLoading, error, data } = useQuery(["users"], async () => {
    const res = await makeRequest.get("/users");
    return res.data;
  });

  return <div>{isLoading ? <Loading /> : <Datatable users={data} />}</div>;
}
