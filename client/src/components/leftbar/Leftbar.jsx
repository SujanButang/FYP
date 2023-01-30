import React, { useContext, useState } from 'react'
import "./leftbar.scss"
import { AuthContext } from '../../context/authContext';
import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';
import HikingIcon from '@mui/icons-material/Hiking';
import StoreIcon from '@mui/icons-material/Store';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Leftbar() {
    const {currentUser} = useContext(AuthContext);

  return (
    <div className="leftbar">
        <div className="container">
            <div className="logo">
                <img src="/images/logo/logo.png" alt="" />
            </div>
            <div className="menu">
                <span>Menu</span>
                <div className="item">
                    <HomeIcon/>
                    <span>Home</span>
                </div>
                <div className="item">
                    <ChatBubbleIcon />
                    <span>Messages</span>
                </div>
                <div className="item">
                    <PersonIcon/>
                    <span>Profile</span>
                </div>
                <div className="item">
                    <HikingIcon/>
                    <span>Travel Events</span>
                </div>
                <div className="item">
                    <StoreIcon/>
                    <span>Bookings</span>
                </div>
                <div className="item">
                    <SettingsIcon/>
                    <span>Settings</span>
                </div>
            </div>

            
        </div>
    </div>
  )
}
