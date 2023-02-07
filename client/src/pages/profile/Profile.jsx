import React, { useContext } from "react";
import "./profile.scss";
import AddIcon from "@mui/icons-material/Add";
import CircleIcon from "@mui/icons-material/Circle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InterestsIcon from "@mui/icons-material/Interests";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

import Post from "../../components/post/Post";
export default function Profile() {
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["users"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="profile">
      <div className="images">
        <img
          src={data && "/upload/" + data[0].coverPicture}
          alt=""
          className="cover"
        />
        <img
          src={data && "/upload/" + data[0].profilePicture}
          alt=""
          className="profile"
        />
      </div>
      <div className="profile-container">
        <div className="user-info">
          <div className="user-name">
            <span className="username">
              {data && data[0].username}
              <CircleIcon style={{ fontSize: "12px", color: "green" }} />
            </span>
            <span className="info">{data && data[0].shortBio}</span>
          </div>
        </div>
        <div className="action">
          {userId !== currentUser.id ? (
            <>
              <button className="item">
                <ChatBubbleIcon fontSize="small" style={{ color: "#a974ff" }} />
                Message
              </button>
              <button className="item">
                <AddIcon fontSize="small" />
                <span>Follow</span>
              </button>
            </>
          ) : (
            <button className="item">
              <EditIcon fontSize="small" />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>
      <div className="details">
        <div className="bio">
          <span className="bio-head">About Me</span>
          <p>{data && data[0].bio}</p>
          <hr />

          <div className="section">
            <div className="section-heading">
              <LocationOnIcon fontSize="small" />
              <span className="section-head">Address</span>
            </div>
            <div className="section-details">
              <p>{data && data[0].address}</p>
            </div>
          </div>

          <hr />

          <div className="section">
            <div className="section-heading">
              <CakeIcon fontSize="small" />
              <span className="section-head">Birthday</span>
            </div>
            <div className="section-details">
              <p>{data && data[0].birthDate}</p>
            </div>
          </div>
        </div>
        <div className="personal">
          <div className="right-section">
            <span className="right-head">
              <InterestsIcon
                style={{ fontSize: "small", paddingRight: "10px" }}
              />
              Interests
            </span>
            <div className="right-list">
              {data &&
                data[0].userinterests.map((inter) => (
                  <span key={inter.id}>{inter.interest.interestName}</span>
                ))}
            </div>

            <hr />
            <span className="right-head" style={{ paddingTop: "10px" }}>
              <CallIcon style={{ fontSize: "small", paddingRight: "10px" }} />
              Contact
            </span>
            <div className="right-list">
              <span>{data && data[0].phone}</span>
            </div>

            <hr />
            <span className="right-head" style={{ paddingTop: "10px" }}>
              <EmailIcon style={{ fontSize: "small", paddingRight: "10px" }} />{" "}
              Email
            </span>
            <div className="right-list">
              <span>{data && data[0].email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
