import React from "react";
import "./profile.scss";
import AddIcon from "@mui/icons-material/Add";
import CircleIcon from "@mui/icons-material/Circle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export default function Profile() {
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.freeimages.com/images/large-previews/d28/dog-fight-1313740.jpg"
          alt=""
          className="cover"
        />
        <img
          src="https://images.freeimages.com/images/large-previews/d28/dog-fight-1313740.jpg"
          alt=""
          className="profile"
        />
      </div>
      <div className="profile-container">
        <div className="user-info">
          <div className="user-name">
            <span className="username">
              Sujan Rai{" "}
              <CircleIcon style={{ fontSize: "12px", color: "green" }} />
            </span>
            <span className="info">
              I am a Junior Web Developer based in Dharan.
            </span>
          </div>
        </div>
        <div className="action">
          <button className="item">
            <ChatBubbleIcon fontSize="small" style={{ color: "#a974ff" }} />
            Message
          </button>
          <button className="item">
            <AddIcon fontSize="small" />
            <span>Follow</span>
          </button>
        </div>
      </div>
    </div>
  );
}
