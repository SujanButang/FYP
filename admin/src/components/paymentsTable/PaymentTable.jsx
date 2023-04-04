import { DataGrid } from "@mui/x-data-grid";
import "./paymentTable.scss";
import { paymentColumns } from "../../datatablesource";

export default function PaymentTable({ payments, title }) {
  const columns = paymentColumns.filter(
    (column) => column.field !== "destination"
  );
  return (
    <div className="paymenttable">
      <div className="paymenttableTitle">Payments</div>
      {title === "single" ? (
        <DataGrid
          className="datagrid"
          rows={payments}
          columns={columns}
          pageSize={9}
          rowsPerPageOption={[9]}
        />
      ) : (
        <DataGrid
          className="datagrid"
          rows={payments}
          columns={paymentColumns}
          pageSize={9}
          rowsPerPageOption={[9]}
        />
      )}
    </div>
  );
}
