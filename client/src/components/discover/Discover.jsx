import React from 'react'
import "./discover.scss"
import Carousal from "../carousel/Carousal"
export default function Discover() {
  return (
    <>
    <div className="discover-container">
        <div className="discover-heading">
            <h1>Discover</h1>
        </div>
        <div className="active-indicator">
            <img src="images/Active Indicator.svg" alt="" />
        </div>
        <div className="carousal">
            <Carousal/>
            <Carousal/>
            <Carousal/>
            <Carousal/>
        </div>
    </div>
    </>
  )
}
