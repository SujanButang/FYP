import React from 'react'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import "./footer.scss"

export default function Footer() {
  return (
    <>
    <div className="footer-container">
        <div className="footer-logo">
            <img src="images/footer-logo.png" alt="" />
        </div>
        <div className="links-container">
            <div className="social-logo-container">
                <div className="facebook-logo"><FacebookRoundedIcon fontSize='large'/></div>
                <div className="linkedin-logo"><LinkedInIcon fontSize='large'/></div>
                <div className="twitter-logo"><TwitterIcon fontSize='large'/></div>
                <div className="insta-logo"><InstagramIcon fontSize='large'/></div>
            </div>
        </div>
    </div>
    </>
  )
}
