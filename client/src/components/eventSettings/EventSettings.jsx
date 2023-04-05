import "./eventSettings.scss";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import EditEvent from "../editEvent/EditEvent";
import CancelIcon from "@mui/icons-material/Cancel";

export default function EventSettings({ event }) {
  console.log(event);
  const queryClient = useQueryClient();
  const [intake, setIntake] = useState(
    event.status === "open" ? "open" : "close"
  );

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const mutation = useMutation(
    (status) => {
      makeRequest
        .put(`/events/intake?eventId=${event.id}`, {
          status: status,
        })
        .then(toast.success("Intake update"));
    },
    {
      onSuccess: () => {
        console.log("first");
        setIntake(intake === "open" ? "close" : "open");
      },
    }
  );

  const handleIntake = () => {
    const status = event.status === "open" ? "closed" : "open";
    mutation.mutate(status);
  };

  const handleCancel = async () => {
    window.confirm("Are you sure you want to cancel the Event?");
    await makeRequest.put("/events/cancel?eventId=" + event.id);
  };

  return (
    <div className="event-settings">
      <div className="event-settings-container">
        <div className="items">
          <div className="item" onClick={handleIntake}>
            <span>Members Intake</span>
            {intake === "open" ? <ToggleOnIcon /> : <ToggleOffIcon />}
          </div>
          <div className="item" onClick={() => setEditDialogOpen(true)}>
            <span>Edit Details</span>
            <EditIcon />
          </div>
          <div className="item" onClick={() => handleCancel}>
            <span>Cancel Event</span>
            <CancelIcon />
          </div>
        </div>
      </div>
      {editDialogOpen && (
        <EditEvent event={event} setEditDialogOpen={setEditDialogOpen} />
      )}
      <ToastContainer />
    </div>
  );
}
