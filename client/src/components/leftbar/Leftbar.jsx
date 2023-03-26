import React, { useContext } from "react";
import "./leftbar.scss";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import HikingIcon from "@mui/icons-material/Hiking";
import StoreIcon from "@mui/icons-material/Store";
import SettingsIcon from "@mui/icons-material/Settings";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function Leftbar() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftbar">
      <div className="container">
        <div className="logo">
          {darkMode ? (
            <img src="/images/logo/logolight.png" alt="" />
          ) : (
            <img src="/images/logo/logo.png" alt="" />
          )}
        </div>
        <div className="menu">
          <span>Menu</span>
          <nav>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="item" tabIndex={0} type="button">
                <HomeIcon />
                <span>Home</span>
              </div>
            </Link>
            <Link
              to={`/chats/${currentUser.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="item" tabIndex={1} type="button">
                <ChatBubbleIcon />
                <span>Messages</span>
              </div>
            </Link>
            <Link
              to={`/profile/${currentUser.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="item" tabIndex={2} type="button">
                <PersonIcon />
                <span>Profile</span>
              </div>
            </Link>

            <Link
              to={`/events/${currentUser.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="item" tabIndex={3} type="button">
                <HikingIcon />
                <span>Travel Events</span>
              </div>
            </Link>
            <Link to={`/hotels`} style={{ textDecoration: "none" }}>
              <div className="item" tabIndex={4} type="button">
                <StoreIcon />
                <span>Hotels</span>
              </div>
            </Link>
            <Link to={"/settings"} style={{ textDecoration: "none" }}>
              <div className="item" tabIndex={5} type="button">
                <SettingsIcon />
                <span>Settings</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
