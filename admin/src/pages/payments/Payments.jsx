import React from "react";
import { makeRequest } from "../../axios";
import Loading from "../../components/loading/Loading";
import PaymentTable from "../../components/paymentsTable/PaymentTable";
import { useQuery } from "react-query";

export default function Payments() {
  const { isLoading, error, data } = useQuery(["payments"], async () => {
    const res = await makeRequest.get("/allpayments");
    return res.data;
  });
  return (
    <div>{isLoading ? <Loading /> : <PaymentTable payments={data} />}</div>
  );
}
