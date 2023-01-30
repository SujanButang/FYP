import './post.scss'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { Link } from 'react-router-dom'

export default function Post({post}) {
  return (
    <div className="post">
        <div className="container">
            <div className="user">
                <div className="user-info">
                    <img src={post.profilePicture} alt="" />
                    <div className="details">

                        <Link to={`/profile/${post.userid}`} style={{textDecoration:"none", color:"inherit"}}>
                            <span>
                                {post.username}
                            </span >
                        </Link>
                            <span className="date">
                                1 min ago
                            </span>
                    </div>
                </div>
                <MoreHorizIcon/>
            </div>
            <div className="content">
                <div className="p">{post.desc}</div>
                <img src={post.img} alt="" />
            </div>
            <div className="info">
                <div className="item">
                    <FavoriteBorderOutlinedIcon/>
                    <span>12 likes</span>
                </div>
                <div className="item">
                    <TextsmsOutlinedIcon/>
                    <span>4 comments</span>
                </div>
                <div className="item">
                    <ShareOutlinedIcon/>
                    <span>Share</span>
                </div>
            </div>
        </div>

    </div>
  )
}
