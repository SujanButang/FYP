import { DataGrid } from "@mui/x-data-grid";
import { eventsColumn } from "../../datatablesource";
import "./eventsTable.scss";

export default function EventsTable({ events, hosted }) {
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton">View</div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {hosted === true ? "Hosted Events" : "Participated Events"}
      </div>
      <DataGrid
        className="datagrid"
        rows={events}
        columns={eventsColumn.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
}
