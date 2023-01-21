import React from "react";
import "./explore.scss";

export default function Explore() {
  return (
    <>
      <div className="explore-container">
        <div className="explore-heading">
          <h1>Explore</h1>
        </div>
        <div className="active-indicator">
          <img src="images/Active Indicator.svg" alt="" />
        </div>
        <div className="explore1-container">
          <div className="explore1-img">
            <img src="images/explore1-img.svg" alt="" />
          </div>
          <div className="explore1-details">
            <h2>
              <span className="oval">
                <img src="images/Oval.png" alt="" />
              </span>
              Create Your Own Travel Event or Join One
            </h2>
            <p>
              Thinking to travel?
              <br /> Create a travel event to find travelling partners. <br />
              Or join an existing event and have fun travelling with other
              travellers.
            </p>
          </div>          
        </div>
      </div>
    </>
  );
}
