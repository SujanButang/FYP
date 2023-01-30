import React from 'react'
import "./leftbar.scss"
import Friends from "../../assets/friends.png";
import Groups from "../../assets/groups.png";
import Events from "../../assets/events.png";
import Market from "../../assets/market.png";
import User from "../../assets/user.png"

export default function Leftbar() {
  return (
    <div className="leftbar">
        <div className="container">
            <div className="menu">
                <div className="user">
                <img src="images/sujan.jpg" alt="" />
                <span>Sujan Rai</span>
                </div>
                <div className="item">
                    <img src={Friends} alt="" />
                    <span>Friends</span>
                </div>
                <div className="item">
                    <img src={Groups} alt="" />
                    <span>Groups</span>
                </div>
                <div className="item">
                    <img src={Events} alt="" />
                    <span>Events</span>
                </div>
                <div className="item">
                    <img src={Market} alt="" />
                    <span>Market</span>
                </div>
            </div>
            <hr/>
            <div className="menu">
                <span>Your friends online</span>
                
                <div className="item">
                    <img src={User} alt="" />
                    <span>Friend</span>
                </div>
                
                <div className="item">
                    <img src={User} alt="" />
                    <span>Friend</span>
                </div>
                <div className="item">
                    <img src={User} alt="" />
                    <span>Friend</span>
                </div>
                <div className="item">
                    <img src={User} alt="" />
                    <span>Friend</span>
                </div>
                <div className="item">
                    <img src={User} alt="" />
                    <span>Friend</span>
                </div>
                <div className="item">
                    <img src={User} alt="" />
                    <span>Friend</span>
                </div>
                <div className="item">
                    <img src={User} alt="" />
                    <span>Friend</span>
                </div>
                <div className="item">
                    <img src={User} alt="" />
                    <span>Friend</span>
                </div>
                <div className="item">
                    <img src={User} alt="" />
                    <span>Friend</span>
                </div>
                <div className="item">
                    <img src={User} alt="" />
                    <span>Friend</span>
                </div>
                <div className="item">
                    <img src={User} alt="" />
                    <span>Friend</span>
                </div>


            </div>
        </div>
    </div>
  )
}
