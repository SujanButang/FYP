import "./post.scss";
import { useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../../components/comments/Comments";

import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
export default function Post({ post }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [like, setLike] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments?postId=" + post.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="user-info">
            <img src={post.user.profilePicture} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>{post.user.username}</span>
              </Link>
              <span className="date">{moment(post.post_date).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <div className="p">{post.post_description}</div>
          <img src={"/upload/" + post.post_image} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={() => setLike(!like)}>
            {like ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            <span>{post.like_count} likes</span>
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            <span>14 comments</span>
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            <span>Share</span>
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
}
