import "./post.scss";
import { useContext, useState } from "react";
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
import { AuthContext } from "../../context/authContext";
export default function Post({ post }) {
  const { currentUser } = useContext(AuthContext);

  const [commentOpen, setCommentOpen] = useState(false);
  const queryClient = useQueryClient();

  // get likes, add like, remove like
  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const likeMutation = useMutation(
    (liked) => {
      if (liked) makeRequest.delete("/likes?postId=" + post.id);
      makeRequest.post("/likes?postId=" + post.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = () => {
    var liked = data && data.includes(currentUser.id);
    likeMutation.mutate(liked);
  };

  return (
    <div className="post">
      {isLoading ? (
        "loading"
      ) : (
        <>
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
                  <span className="date">
                    {moment(post.post_date).fromNow()}
                  </span>
                </div>
              </div>
              <MoreHorizIcon />
            </div>
            <div className="content">
              <div className="p">{post.post_description}</div>
              <img src={"/upload/" + post.post_image} alt="" />
            </div>
            <div className="info">
              <div className="item">
                {data.includes(currentUser.id) ? (
                  <FavoriteOutlinedIcon onClick={handleLike} />
                ) : (
                  <FavoriteBorderOutlinedIcon onClick={handleLike} />
                )}
                <span>{data.length} likes</span>
              </div>
              <div
                className="item"
                onClick={() => setCommentOpen(!commentOpen)}
              >
                <TextsmsOutlinedIcon />
              </div>
              <div className="item">
                <ShareOutlinedIcon />
                <span>Share</span>
              </div>
            </div>
            {commentOpen && <Comments postId={post.id} />}
          </div>
        </>
      )}
    </div>
  );
}
