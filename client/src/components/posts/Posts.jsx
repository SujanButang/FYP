import "./posts.scss";
import Post from "../../components/post/Post";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SellIcon from "@mui/icons-material/Sell";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

export default function Posts() {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.id;
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState(null);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = (e) => {
    e.preventDefault();
    mutation.mutate({ postDescription });
    setPostDescription("");
  };
  return (
    <div className="posts">
      <div className="create-post">
        <div className="post-info">
          <img src={currentUser.profilePicture} alt="" />
          <textarea
            placeholder="Write Something"
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
          />
          <button onClick={handleClick} style={{ cursor: "pointer" }}>
            Post
          </button>
        </div>
        <div className="actions">
          <div className="item">
            <input
              type="file"
              onChange={(e) => setPostImage(e.target.files[0])}
            />
            {/* <AddPhotoAlternateIcon /> */}
            {/* <span>Add images</span> */}
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
