import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./rightbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import Notification from "../notification/Notification";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { SocketContext } from "../../context/socketContext";

export default function Rightbar() {
  const { logout, currentUser } = useContext(AuthContext);
  const [notification, setNotification] = useState([]);
  const [arrivalNotification, setArrivalNotification] = useState(null);

  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const { isLoading, error, data } = useQuery(["notifications"], async () => {
    const res = await makeRequest.get("/notifications");
    setNotification(res.data);
    return res.data;
  });

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("getNotification", (noti) => {
      setArrivalNotification(noti);
    });
  }, []);

  useEffect(() => {
    if (arrivalNotification) {
      setNotification((prev) => [arrivalNotification, ...prev]);
    }
  }, [arrivalNotification]);

  const handleClick = async (e) => {
    try {
      await logout();
      if (!currentUser) {
        navigate("/");
      }
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

            <div className="logout">
              <LogoutIcon className="logout-icon" onClick={handleClick} />
            </div>
          </div>
          <div className="notifications">
            <div className="header">
              <span className="title">Your Notifications</span>
            </div>
          </div>
          <div className="items">
            {notification.length > 0 ? (
              notification.map((noti, index) => {
                return <Notification notification={noti} key={index} />;
              })
            ) : (
              <></>
            )}
          </div>
          <hr />
          <div className="suggestion">
            <div className="header">
              <span className="title">Follow some users</span>
              <span className="see-all">See All</span>
            </div>
          </div>
          <div className="items">
            <div className="item">
              <img src={"/upload/" + currentUser.profilePicture} alt="" />
              <div className="user-info">
                <span>{currentUser.username}</span>
                <span className="friends">12 mutual friends</span>
              </div>
              <div className="button">
                <button>Follow</button>
              </div>
            </div>
            <div className="item">
              <img src={"/upload/" + currentUser.profilePicture} alt="" />
              <div className="user-info">
                <span>{currentUser.username}</span>
                <span className="friends">12 mutual friends</span>
              </div>
              <div className="button">
                <button>Follow</button>
              </div>
            </div>
            <div className="item">
              <img src={"/upload/" + currentUser.profilePicture} alt="" />
              <div className="user-info">
                <span>{currentUser.username}</span>
                <span className="friends">12 mutual friends</span>
              </div>
              <div className="button">
                <button className="followed">Followed</button>
              </div>
            </div>
            <div className="item">
              <img src={"/upload/" + currentUser.profilePicture} alt="" />
              <div className="user-info">
                <span>{currentUser.username}</span>
                <span className="friends">12 mutual friends</span>
              </div>
              <div className="button">
                <button>Follow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
