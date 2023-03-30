import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { eventsColumn, hotelColumns, userColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Datatable = ({ users, events, hotels }) => {
  const [data, setData] = useState(users);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const navigate = useNavigate();
  const handleView = (row) => {
    if (users) {
      navigate("/single", { state: row });
    } else if (events) {
      navigate("/singleEvent", { state: row });
    } else {
      navigate("/singleHotel", { state: row });
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => handleView(params.row)}>
              View
            </div>
            {users ? (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Ban
              </div>
            ) : (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {users ? "Users" : events ? "Events" : "Hotels"}
        <Link to="/new" className="link">
          Add New
        </Link>
      </div>
      {users ? (
        <DataGrid
          className="datagrid"
          rows={users}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      ) : events ? (
        <DataGrid
          className="datagrid"
          rows={events}
          columns={eventsColumn.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      ) : (
        <DataGrid
          className="datagrid"
          rows={hotels}
          columns={hotelColumns.concat(actionColumn)}
          getRowId={(row) => row.name}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default Datatable;
