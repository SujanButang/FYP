import React, { useContext, useState } from "react";
import "./rightbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

export default function Rightbar() {
  const { currentUser } = useContext(AuthContext);

  const [err, setErr] = useState(null);

  const handleClick = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/logout"
      );
      console.log(response);
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="rightbar">
      <div className="container">
        <div className="menu">
          <div className="right-nav">
            <div className="search">
              <SearchOutlinedIcon />
              <input type="text" placeholder="Search" />
            </div>
            <div className="notification">
              <NotificationsIcon className="notification-icon" />
            </div>
            <div className="logout">
              <LogoutIcon className="logout-icon" onClick={handleClick} />
            </div>
          </div>
          <div className="suggestion">
            <div className="header">
              <span className="title">Suggestions for You</span>
              <span className="see-all">See All</span>
            </div>
          </div>
          <div className="items">
            <div className="item">
              <img src={currentUser.profilePicture} alt="" />
              <div className="user-info">
                <span>{currentUser.username}</span>
                <span className="friends">12 mutual friends</span>
              </div>
              <div className="button">
                <button>Follow</button>
              </div>
            </div>
            <div className="item">
              <img src={currentUser.profilePicture} alt="" />
              <div className="user-info">
                <span>{currentUser.username}</span>
                <span className="friends">12 mutual friends</span>
              </div>
              <div className="button">
                <button>Follow</button>
              </div>
            </div>
            <div className="item">
              <img src={currentUser.profilePicture} alt="" />
              <div className="user-info">
                <span>{currentUser.username}</span>
                <span className="friends">12 mutual friends</span>
              </div>
              <div className="button">
                <button className="followed">Followed</button>
              </div>
            </div>
            <div className="item">
              <img src={currentUser.profilePicture} alt="" />
              <div className="user-info">
                <span>{currentUser.username}</span>
                <span className="friends">12 mutual friends</span>
              </div>
              <div className="button">
                <button>Follow</button>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}
