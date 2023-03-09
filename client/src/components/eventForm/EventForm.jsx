import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { makeRequest } from "../../axios";
import "./eventForm.scss";

export default function EventForm({ setForm }) {
  const [inputs, setInputs] = useState({
    destination: "",
    type: "",
    start: "",
    end: "",
    members: "",
    desc: "",
  });

  const queryClient = useQueryClient();

  const [destPic, setDestPic] = useState(null);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useMutation(
    (newEvent) => {
      return makeRequest.post("/events", newEvent);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["events"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let destPicUrl;
    destPicUrl = await upload(destPic);
    mutation.mutate({ ...inputs, destPic: destPicUrl });
    setForm(false);
  };
  return (
    <div className="eventForm">
      <div className="event-form-container">
        <form action="">
          <div className="item-container">
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              id="destination"
              name="destination"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="item-container">
            <label htmlFor="type">Type:</label>
            <select id="type" name="type" onChange={handleChange}>
              <option value="Hiking">Hiking</option>
              <option value="Trekking">Trekking</option>
              <option value="Bike Riding">Bike Riding</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>
          <br />
          <div className="item-container">
            <label htmlFor="start">Event Start Date:</label>
            <input
              type="date"
              id="start"
              name="start"
              onChange={handleChange}
            />

            <label htmlFor="end">Event End Date:</label>
            <input type="date" id="end" name="end" onChange={handleChange} />
          </div>
          <br />
          <div className="item-container">
            <label htmlFor="members">Members:</label>
            <input
              type="number"
              id="members"
              name="members"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="item-container">
            <label htmlFor="desc">Description:</label>
            <br />
            <textarea
              id="desc"
              name="desc"
              rows="4"
              cols="50"
              onChange={handleChange}
            ></textarea>
          </div>
          <br />
          <div className="item-container">
            <label htmlFor="destPic">Destination Image:</label>
            <input
              type="file"
              id="destPic"
              name="destPic"
              onChange={(e) => setDestPic(e.target.files[0])}
            />
          </div>
          <br />
          <div className="buttons">
            <button className="cancel-button" onClick={(e) => setForm(false)}>
              Cancel
            </button>
            <button className="create-button" onClick={handleClick}>
              Create
            </button>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
}
