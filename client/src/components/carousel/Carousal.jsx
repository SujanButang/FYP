import React from 'react'
import "./carousal.scss"
import {Link} from "react-router-dom"

export default function Carousal() {
  return (
<>
<div className="card">
  <div className="event-image">
  <img src="images/carousal/carousal1.png" alt="" />
  </div>
  <div className="event-content">

    <div className="event-title">
      <h3>Mustang Hiking Trip</h3>
    </div>
    <div className="event-duration">
      <h5><span className="duration-label">Duration:</span> 11 days</h5>
    </div>
    <div className="event-type">
      <h5>Hiking</h5>
    </div>
    <div className="event-host">
      <h5>Host: Sujan Rai</h5>
    </div>
    <div className="event-capacity">
      <h5>Capacity: 5</h5>
    </div>
      <Link to="/login" className='buttons'>
        <button>Join</button>
      </Link>
  </div>
</div>
</>  )
}
