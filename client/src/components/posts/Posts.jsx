import "./posts.scss";
import Post from "../../components/post/Post";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SellIcon from "@mui/icons-material/Sell";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Loading from "../loading/Loading";
import { ToastContainer, toast } from "react-toastify";

export default function Posts() {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );

  console.log(data);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);
  const [postDescription, setPostDescription] = useState("");
  const [file, setFile] = useState(null);
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

  const handleClick = async (e) => {
    e.preventDefault();
    let imgURL = "";
    if (file) imgURL = await upload();
    mutation.mutate({ postDescription, imgURL });
    setPostDescription("");
    setFile(null);
    toast.success("Post created");
  };

  return (
    <div className="posts">
      <div className="create-post">
        <div className="post-info">
          <div className="left">
            <img src={"/upload/" + currentUser.profilePicture} alt="" />
            <textarea
              placeholder="Write Something"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
            />
          </div>
          <div className="right">
            {file && <img className="file" src={URL.createObjectURL(file)} />}
          </div>
        </div>
        <div className="actions">
          <div className="item">
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file" style={{ cursor: "pointer" }}>
              <AddPhotoAlternateIcon />
              <span>Add images</span>
            </label>
          </div>
          {/* <div className="item">
            <SellIcon />
            <span>Tag friends</span>
          </div> */}
          <div className="item">
            {postDescription == "" ? (
              <button
                onClick={handleClick}
                style={{ cursor: "pointer" }}
                disabled
              >
                Post
              </button>
            ) : (
              <button onClick={handleClick} style={{ cursor: "pointer" }}>
                Post
              </button>
            )}
          </div>
        </div>
      </div>
      {data?.length !== 0 ? (
        data?.map((post) => {
          return <Post post={post} key={post.id} />;
        })
      ) : (
        <div className="no-posts">
          <div className="message">
            <h3>You are not following anyone</h3>
          </div>
          <div className="suggestion">
            <h3>Follow some users to start looking for their posts</h3>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
