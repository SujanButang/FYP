import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { userColumns } from "../../datatablesource";
import "./usertable.scss";
import { useNavigate } from "react-router-dom";

export default function UserTable({ users, title }) {
  const columns = userColumns.filter((column) => column.field !== "age");
  const userActionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleUserView(params.row)}
            >
              View
            </div>
          </div>
        );
      },
    },
  ];

  const navigate = useNavigate();

  const handleUserView = (row) => {
    navigate("/single", { state: row });
  };
  return (
    <div className="usertable">
      <div className="usertableTitle">{title}</div>
      <DataGrid
        className="datagrid"
        rows={users}
        columns={columns.concat(userActionColumn)}
        pageSize={9}
        rowsPerPageOption={[9]}
      />
    </div>
  );
}
