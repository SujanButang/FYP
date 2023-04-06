import { DataGrid } from "@mui/x-data-grid";
import { verificationColumn } from "../../datatablesource";
import "./verificationTable.scss";
import { useNavigate } from "react-router-dom";

export default function VerificationTable({ requests }) {
  const navigate = useNavigate();
  const handleView = (row) => {
    console.log(row);
    navigate("/singleRequest", { state: row });
  };
  const verificationActionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => handleView(params.row)}>
              View
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="verificationtable">
      <div className="verificationtableTitle"> Verification Requests</div>
      <DataGrid
        className="datagrid"
        rows={requests}
        columns={verificationColumn.concat(verificationActionColumn)}
        pageSize={9}
        rowsPerPageOption={[9]}
      />
    </div>
  );
}
