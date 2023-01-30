import React from 'react'
import "./navbar.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import {Link }from "react-router-dom"

export default function Navbar() {
  return (
    <>
    <div className="navbar">
        <div className="left">
            <div className="logo">
                <Link to="/newsfeed">
                    <img src="images/logo/logo.png" alt="" className="logo" />
                </Link>
            </div>
            <HomeOutlinedIcon/>
            <DarkModeOutlinedIcon/>
            <GridViewOutlinedIcon/>
            <div className="search">
                <SearchOutlinedIcon/>
                <input type="text" placeholder='Search for friends, events or more...' />
            </div>
        </div>
        <div className="right">
            <PersonOutlinedIcon/>
            <EmailOutlinedIcon/>
            <NotificationsOutlinedIcon/>
            <div className="user">
                <img src="images/sujan.jpg" alt="" />
                <span>Sujan Rai</span>
            </div>
        </div>
    </div>
    </>
  )
}
