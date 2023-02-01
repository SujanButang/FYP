import "./posts.scss";
import Post from "../../components/post/Post";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SellIcon from "@mui/icons-material/Sell";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

export default function Posts() {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );

  const { currentUser } = useContext(AuthContext);
  return (
    <div className="posts">
      <div className="create-post">
        <div className="post-info">
          <img src={currentUser.profilePicture} alt="" />
          <textarea placeholder="Write Something" />
          <button>Post</button>
        </div>
        <div className="actions">
          <div className="item">
            <AddPhotoAlternateIcon />
            <span>Add images</span>
          </div>
          <div className="item">
            <SellIcon />
            <span>Tag friends</span>
          </div>
        </div>
      </div>
      {data &&
        data.map((post) => {
          return <Post post={post} key={post.id} />;
        })}
    </div>
  );
}
