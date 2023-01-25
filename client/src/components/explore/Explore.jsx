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
        <div className="explore2-container">
          <div className="explore2-details">
            <h2><img src="images/Oval.png" alt="" />Communication is the Key</h2>
            <p>Chat with your friends or tavel mates.<br/>
            Plan your trips together.</p>
            
          </div> 
          <div className="explore2-img">
              <img src="images/explore2-img.svg" alt="" />
            </div>       
        </div>
        <div className="explore3-container">
          <div className="explore3-details">
          
          <h2><img src="images/Oval.png" alt="" />Share Your Journey</h2>
            <p> Share your travel journey with your friends.<br/>
            Post photos, clips and write about your journey and inspire your friends to travel.
            </p>
          </div>
          <div className="explore3-img">
            <img src="images/explore3-img.svg" alt="" />
          </div>
            
          </div>
      </div>
    </>
  );
}
