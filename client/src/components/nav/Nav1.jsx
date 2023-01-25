import React from "react";
import "./nav1.scss";
import { Link } from "react-router-dom";

export default function Nav1() {
  return (
    <>
      <div className="nav">
        <div className="logo">
          <a href="/home">
            <img src="images/logo/logo.png" alt="" />
          </a>
        </div>
        <div className="links">
          <a href="/home" className="home">
            <span className="link1">Home</span>
          </a>
          
          <a href="/explore" className="explore">
            <span className="link3">Explore</span>
          </a>
          <a href="/discover" className="discover">
            <span className="link2">Discover</span>
          </a>
        </div>
        <div className="buttons">
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="login">Login</button>
          </Link>
          <span className="splitter">|</span>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button className="register">Register</button>
          </Link>
        </div>
      </div>
    </>
  );
}
