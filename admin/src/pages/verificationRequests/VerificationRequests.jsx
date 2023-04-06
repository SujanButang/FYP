import { useQuery } from "react-query";
import "./verificationRequest.scss";
import { makeRequest } from "../../axios";
import Loading from "../../components/loading/Loading";
import VerificationTable from "../../components/verificationTable/VerificationTable";

export default function VerificationRequests() {
  const { isLoading, error, data } = useQuery(["verifications"], async () => {
    const res = await makeRequest.get("/verifications");
    return res.data;
  });

  return (
    <div>{isLoading ? <Loading /> : <VerificationTable requests={data} />}</div>
  );
}
