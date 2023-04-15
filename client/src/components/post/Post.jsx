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
import Loading from "../loading/Loading";
import { SocketContext } from "../../context/socketContext";
export default function Post({ post }) {
  const { currentUser } = useContext(AuthContext);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [commentOpen, setCommentOpen] = useState(false);

  const [notification, setNotification] = useState({
    from: currentUser.id,
    to: post.User.id,
    postId: post.id,
    type: "like",
    status: "unread",
  });
  const queryClient = useQueryClient();

  // get likes, add like, remove like
  const { isLoading, error, data } = useQuery(["likes", post.id], async () => {
    const res = await makeRequest.get("/likes?postId=" + post.id);
    return res.data;
  });

  const [liked, setLiked] = useState(data?.includes(currentUser.id));

  const handleLike = () => {
    if (notification.to !== currentUser.id) {
      socket.emit("createNotification", notification);
    }
    if (liked) {
      makeRequest.delete("/likes?postId=" + post.id).then(() => {
        setLiked(false);
        queryClient.invalidateQueries(["likes"]);
      });
    } else {
      makeRequest.post("/likes?postId=" + post.id).then(() => {
        setLiked(true);
        queryClient.invalidateQueries(["likes"]);
        makeRequest.post("/notifications", notification);
      });
    }
  };

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts?postId=" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  const { socket } = useContext(SocketContext);

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            <div className="user">
              <div className="user-info">
                <img src={"/upload/" + post.User.profilePicture} alt="" />
                <div className="details">
                  <Link
                    to={`/profile/${post.userId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span>{post.User.username}</span>
                  </Link>
                  <span className="date">
                    {moment(post.post_date).fromNow()}
                  </span>
                </div>
              </div>
              <div className="options">
                <MoreHorizIcon
                  onClick={() => setDeleteOpen(!deleteOpen)}
                  style={{ cursor: "pointer" }}
                />
                {post.userId === currentUser.id ? (
                  deleteOpen ? (
                    <span onClick={handleDelete}>Delete</span>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="content">
              <div className="p">{post.post_description}</div>
              <img src={"/upload/" + post.post_image} alt="" />
            </div>
            <div className="post-info">
              <div className="item">
                {liked ? (
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
            {commentOpen && <Comments postId={post.id} userId={post.User.id} />}
          </div>
        </>
      )}
    </div>
  );
}
