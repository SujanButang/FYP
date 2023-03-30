import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import hotel from "../../scraper";

export default function New({ inputs }) {
  const [input, setInput] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const hotels = await hotel(input);
    console.log(hotels);
  };
  return (
    <div className="new">
      <div className="new-container">
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="center">
          <div className="left">
            <img
              src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button>Send</button>
            </form>
          </div>
        </div>
        <div className="bottom">
          <h4>OR</h4>
          <h3>Search from Booking.com</h3>
          <form>
            <label htmlFor="search">Search</label>
            <input
              type="text"
              name="search"
              placeholder="Enter destination place"
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </form>
        </div>
      </div>
    </div>
  );
}
