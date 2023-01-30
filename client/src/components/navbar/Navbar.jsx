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
    const { currentUser} = useContext(AuthContext);

  return (
    <>
    <div className="navbar">
        <div className="left">
            <div className="logo">
                <Link to="/newsfeed">
                    <img src="images/logo/logo.png" alt="" className="logo" />
                </Link>
            </div>
            <HomeOutlinedIcon style={{color:"#6A7CF6"}}/>
            {darkMode?<WbSunnyOutLinedIcon onClick={changeMode} style={{color:"#6A7CF6"}}/>:<DarkModeOutlinedIcon onClick={changeMode} style={{color:"#6A7CF6"}}/>}
            <GridViewOutlinedIcon style={{color:"#6A7CF6"}}/>
            <div className="search">
                <SearchOutlinedIcon style={{color:"#eb5153", paddingLeft:"5px"}}/>
                <input type="text" placeholder='Search for friends, events or more...' />
            </div>
        </div>
        <div className="right">
            <PersonOutlinedIcon style={{color:"#6A7CF6"}}/>
            <EmailOutlinedIcon style={{color:"#6A7CF6"}}/>
            <NotificationsOutlinedIcon style={{color:"#6A7CF6"}}/>
            <div className="user">
                <img src= {currentUser.profilePicture} alt="" />
                <span>{currentUser.name}</span>
            </div>
        </div>
    </div>
    </>
  )
}
