import React, { useContext } from 'react'
import "./navbar.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import WbSunnyOutLinedIcon from "@mui/icons-material/WbSunnyOutlined"
import {Link }from "react-router-dom"
import { DarkModeContext } from '../../context/darkModeContext'
import { AuthContext } from '../../context/authContext'

export default function Navbar() {

    const {changeMode, darkMode} = useContext(DarkModeContext)
    const {login, currentUser} = useContext(AuthContext);

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
            {darkMode?<WbSunnyOutLinedIcon onClick={changeMode}/>:<DarkModeOutlinedIcon onClick={changeMode}/>}
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
                <span>{currentUser.name}</span>
            </div>
        </div>
    </div>
    </>
  )
}
