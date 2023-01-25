import React from "react";
import "./home.scss";
import Nav1 from "../../components/nav/Nav1";
import Explore from "../../components/explore/Explore";
import Discover from "../../components/discover/Discover"
import Footer from "../../components/footer/Footer"
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="container">
        <Nav1 />
        <div className="home-container">
          <div className="content">
            <span className="heading-message">
              <h1>
                Find Your <span className="travel">Travel</span>
                <br />
                <span className="sathi">Sathi</span>
              </h1>
            </span>
            <div className="content-message">
              <p>
                Going on a trip?
                <br /> Meet people who love to travel. <br />
                Share your adventures with a travel companion.
              </p>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button>Find Now</button>
              </Link>
            </div>
          </div>
          <div className="image">
            <img src="images/home/home-page.svg" alt="" />
          </div>
        </div>
        <Explore />
        <Discover/>
        <Footer/>
      </div>
    </>
  );
}
