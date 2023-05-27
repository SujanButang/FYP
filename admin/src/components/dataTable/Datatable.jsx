import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { eventsColumn, hotelColumns, userColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import { makeRequest } from "../../axios";

const Datatable = ({ users, events, hotels }) => {
  const [data, setData] = useState(users);

  const banMutation = useMutation(async (id) => {
    const user = users.find((user) => user.id === id);

    if (user) {
      if (user.isBanned) {
        await makeRequest.put("/unBanUser?userId=" + id);
        user.isBanned = false;
      } else {
        await makeRequest.put("/banUser?userId=" + id);
        user.isBanned = true;
      }
    }
  });

  const handleBan = (id) => {
    banMutation.mutate(id);
  };

  const handleDelete = () => {};

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
                onClick={() => handleBan(params.row.id)}
              >
                {params.row.isBanned == "true" ? "Unban" : "Ban"}
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
